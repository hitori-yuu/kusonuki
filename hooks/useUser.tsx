import { useEffect, useState, useCallback } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";
import { Student, User } from "@/lib/server/actions";

type CacheData = {
	data: UserData | StudentData;
	timestamp: number;
};

const CACHE_DURATION = 5 * 60 * 1000; // 5分

const getUserData = async (userId: string): Promise<UserData> => {
	const cachedUser = sessionStorage.getItem(`userData_${userId}`);
	if (cachedUser) {
		const { data, timestamp }: CacheData = JSON.parse(cachedUser);
		if (Date.now() - timestamp < CACHE_DURATION) {
			return data as UserData;
		}
	}

	const userData = await User(userId);
	sessionStorage.setItem(
		`userData_${userId}`,
		JSON.stringify({ data: userData, timestamp: Date.now() }),
	);
	return userData;
};

const getStudentData = async (studentId: number): Promise<StudentData> => {
	const cachedStudent = sessionStorage.getItem(`studentData_${studentId}`);
	if (cachedStudent) {
		const { data, timestamp }: CacheData = JSON.parse(cachedStudent);
		if (Date.now() - timestamp < CACHE_DURATION) {
			return data as StudentData;
		}
	}

	const studentData = await Student(studentId);
	sessionStorage.setItem(
		`studentData_${studentId}`,
		JSON.stringify({ data: studentData, timestamp: Date.now() }),
	);
	return studentData;
};

export const useUser = () => {
	const [user, setUser] = useState<UserData | null>(null);
	const [student, setStudent] = useState<StudentData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const { liff } = useLiff();

	const refreshData = useCallback(async () => {
		if (!liff?.isLoggedIn()) {
			const userData = await getUserData("Ud713d7bf56b49d0f40c0712335f625ba");
			setUser(userData);
			return;
		}

		try {
			setIsLoading(true);
			const profile = await liff.getProfile();
			const userData = await getUserData(profile.userId);
			setUser(userData);

			if (userData?.isLinked) {
				if (!userData.studentId) return;
				const studentData = await getStudentData(userData.studentId);
				setStudent(studentData);
			}
		} catch (error) {
			setError(error instanceof Error ? error : new Error("Failed to fetch data"));
			setUser(null);
			setStudent(null);
		} finally {
			setIsLoading(false);
		}
	}, [liff]);

	useEffect(() => {
		void refreshData();
	}, [refreshData]);

	return { user, student, liff };
};
