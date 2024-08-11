import React, { useEffect, useState } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";

async function getUserData(userId: string): Promise<UserData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${userId}`);
    const userData: UserData = await response.json();
    return userData;
}

async function getStudentData(studentName: string): Promise<StudentData> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}students/${studentName}`);
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

    return {user, student, liff};
}

