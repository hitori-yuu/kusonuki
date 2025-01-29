import { useEffect, useState, useCallback } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";
import { CreateUser, Student, UpdateUser, User } from "@/lib/server/actions";
import type { Profile } from "@liff/get-profile/lib/index.d.ts";
import { toast } from "sonner";

type CacheData = {
	data: UserData | StudentData;
	timestamp: number;
};

const CACHE_DURATION = 10 * 60 * 1000; // 10分

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

function CheckUser(user: UserData, profile: Profile) {
	if (user.displayName === profile.displayName) return true;
	if (user.pictureUrl === profile.pictureUrl) return true;
	else return false;
}

export const useUser = () => {
	const [user, setUser] = useState<UserData | null>(null);
	const [student, setStudent] = useState<StudentData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const { liff } = useLiff();

	const refreshData = useCallback(async () => {
		if (!liff?.isLoggedIn()) {
			toast("未ログイン状態です。");
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			const profile = await liff.getProfile();
			const userData = await getUserData(profile.userId);
			if (!userData) {
				if (profile.pictureUrl) {
					toast("ユーザー情報を作成中です。");
					await CreateUser(profile.userId, profile.displayName, profile.pictureUrl);
				} else {
					await CreateUser(
						profile.userId,
						profile.displayName,
						"https://www.webiconio.com/_upload/255/image_255.svg",
					);
				}
			}
			if (CheckUser(userData, profile)) {
				if (!profile.pictureUrl) return;
				toast("ユーザー情報を更新中です。");
				await UpdateUser(userData.id, profile.displayName, profile.pictureUrl);
			}
			setUser(userData);

			if (userData?.isLinked) {
				if (!userData.studentId) return;
				toast("生徒情報を取得中です。");
				const studentData = await getStudentData(userData.studentId);
				setStudent(studentData);
			}
		} catch (error) {
			setError(error instanceof Error ? error : new Error("Failed to fetch data"));
			toast("情報の取得に失敗しました。");
			setUser(null);
			setStudent(null);
		} finally {
			toast("情報の取得が完了しました。");
			setIsLoading(false);
		}
	}, [liff]);

	useEffect(() => {
		void refreshData();
	}, [refreshData]);

	return { user, student, liff };
};
