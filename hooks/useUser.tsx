import React, { useEffect, useState } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";

async function getUserData(userId: string): Promise<UserData> {
	const response = await fetch(
		`https://231f-240d-1a-da0-c200-bd03-7ba0-f8c4-933e.ngrok-free.app/api/users/${userId}`,
	);
	const userData: UserData = await response.json();
	return userData;
}

async function getStudentData(studentName: string): Promise<StudentData> {
	const response = await fetch(
		`https://231f-240d-1a-da0-c200-bd03-7ba0-f8c4-933e.ngrok-free.app/api/students/${studentName}`,
	);
	const studentData: StudentData = await response.json();
	return studentData;
}

export const useUser = () => {
	const [user, setUser] = useState<UserData | null>(null);
	const [student, setStudent] = useState<StudentData | null>(null);
	const { liff } = useLiff();

	useEffect(() => {
		const fetchData = async () => {
			if (liff?.isLoggedIn()) {
				const profile = await liff.getProfile();
				console.log(profile);
				const userData = await getUserData(profile.userId);
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
