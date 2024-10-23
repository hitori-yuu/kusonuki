import React, { useEffect, useState } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";
import { Student, User } from "@/lib/ServerAction";

const getUserData = async (userId: string): Promise<UserData> => {
	return await User(userId);
};

const getStudentData = async (studentName: string): Promise<StudentData> => {
	return await Student(studentName);
};

export const useUser = () => {
	const [user, setUser] = useState<UserData | null>(null);
	const [student, setStudent] = useState<StudentData | null>(null);
	const { liff } = useLiff();

	useEffect(() => {
		const fetchData = async () => {
			if (liff?.isLoggedIn()) {
				const profile = await liff.getProfile();
				const userData = await getUserData(profile.userId);
				setUser(userData);

				if (userData?.isLinked) {
					const studentData = await getStudentData(userData.studentName);
					setStudent(studentData);
				}
			} else {
				const userData = await getUserData("Ud713d7bf56b49d0f40c0712335f625ba");
				setUser(userData);

				if (userData?.isLinked) {
					const studentData = await getStudentData(userData.studentName);
					setStudent(studentData);
				}
			}
		};

		fetchData();
	}, [liff]);

	return { user, student, liff };
};
