import React, { useEffect, useState } from "react";
import { useLiff } from "@/components/layouts/LiffProvider";
import { StudentData, UserData } from "@/types/types";

const fetchData = async (url: string): Promise<any> => {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url);
	const data = await response.json();
	return data;
};

const getUserData = async (userId: string): Promise<UserData> => {
	const url = `users/${userId}`;
	return fetchData(url);
};

const getStudentData = async (studentName: string): Promise<StudentData> => {
	const url = `students/${studentName}`;
	return fetchData(url);
};

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
			} else {
				const userData = await getUserData("Uaf3fff4affec66cf3705df6f848fdce5");
				setUser(userData);
				if (userData?.isLinked) {
					const studentData = await getStudentData(userData.studentName);
					setStudent(studentData);
				}
				console.log("user" + user);
				console.log("student: " + student);
			}
		};

		fetchData();
	}, [liff]);

	return { user, student, liff };
};
