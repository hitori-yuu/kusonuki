"use client";
import { typeWeek } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StudentData, TestData, TimetableData, UserData } from "@/types/types";
import { useLiff } from "./LiffProvider";
import { Profile } from "@liff/get-profile";

async function getTimetableData(grade: number, group: String, week: String, day: String): Promise<TimetableData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}timetables/${grade}/${group}/${week}/${day}`, {
		cache: "no-store",
	});
	const timetableData: TimetableData[] = await response.json();

	return timetableData;
}
async function getTestData(grade: number, group: String, date: Date): Promise<TestData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}tests/${grade}/${group}/${date}`, {
		cache: "no-store",
	});
	const testData: TestData[] = await response.json();

	return testData;
}

async function getUserData(userId: string): Promise<UserData> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}users/${userId}`);

	const userData: UserData = await response.json();

	return userData;
}

async function getStudentData(studentName: string): Promise<StudentData> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}students/${studentName}`);

	const studentData: StudentData = await response.json();

	return studentData;
}

const WeekData = () => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [user, setUser] = useState<UserData | null>(null);
	const [student, setStudent] = useState<StudentData | null>();
	const { liff } = useLiff();
	const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<string>(
		String(today.getMonth() + 1).slice(-2) + "/" + String(today.getDate()).slice(-2)
	);
	const [timetable, setTimetable] = useState<TimetableData>();
	const [test, setTest] = useState<TestData[]>();
	const selectedRef = useRef<HTMLDivElement | null>(null);
	today.setDate(today.getDate() - today.getDay());

	const days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		var month = String(date.getMonth() + 1).slice(-2);
		var day = String(date.getDate() + 1).slice(-2);
		const dateString = month + "/" + day;
		const dayOfWeek = daysOfWeek[date.getDay()];

		return {
			dateString,
			dayOfWeek,
		};
	});

	useEffect(() => {
		if (liff?.isLoggedIn()) {
			(async () => {
				const profile = await liff.getProfile();
				setProfile(profile);
				const user = await getUserData(profile?.userId);
				setUser(user);
			})();
		} else {
			const profile = {
				userId: "Ud713d7bf56b49d0f40c0712335f625ba",
				displayName: "TEST USER",
				pictureUrl: "https://i.pinimg.com/736x/77/5a/9a/775a9a4dc09ddc80a2595c49cd0a43a7.jpg",
			};
			setProfile(profile);
			(async () => {
				const user = await getUserData(profile?.userId);
				setUser(user);
			})();
		}
		if (user?.isLinked) {
			(async () => {
				const student = await getStudentData(user?.studentName);
				setStudent(student);
			})();
		}
		if (selectedDate) {
			var grade: number = 2;
			var group: string = "H";
			if (student) {
				grade = student.grade;
				group = student.group;
			}
			(async () => {
				await getTimetableData(
					grade,
					group,
					typeWeek(new Date(selectedDate)),
					daysOfWeek[new Date(selectedDate).getDay()]
				).then((data) => {
					setTimetable(data[0]);
				});
				await getTestData(grade, group, new Date(today.getFullYear() + "/" + selectedDate)).then((data) => {
					setTest(data);
				});
			})();
		}
		if (selectedRef.current) {
			selectedRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
		}
	}, [selectedDate, liff]);

	return (
		<div>
			<div className="overflow-x-auto whitespace-no-wrap">
				<div className="flex items-center space-x-4 xl:justify-around">
					{days.map(({ dateString, dayOfWeek }) => (
						<div
							key={dateString}
							ref={selectedDate === dateString ? selectedRef : null}
							className={`block p-4 cursor-pointer text-center opacity-70 ${
								selectedDate === dateString ? "font-bold text-xl opacity-100" : ""
							}`}
							onClick={() => setSelectedDate(dateString)}
						>
							<p className="font-bold">{dateString}</p>
							<p>{dayOfWeek}</p>
						</div>
					))}
				</div>
			</div>
			<div>
				{timetable && (
					<Card className="my-2">
						<CardHeader>
							<CardTitle>Timetable</CardTitle>
							<CardDescription>
								Timetable of {selectedDate} {timetable.day}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Times</TableHead>
										<TableHead>Subjects</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableHead>1.</TableHead>
										<TableCell>{timetable.first}</TableCell>
									</TableRow>
									<TableRow>
										<TableHead>2.</TableHead>
										<TableCell>{timetable.second}</TableCell>
									</TableRow>
									<TableRow>
										<TableHead>3.</TableHead>
										<TableCell>{timetable.third}</TableCell>
									</TableRow>
									<TableRow>
										<TableHead>4.</TableHead>
										<TableCell>{timetable.fourth}</TableCell>
									</TableRow>
									<TableRow>
										<TableHead>5.</TableHead>
										<TableCell>{timetable.fifth}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
				{test && test.length > 0 && (
					<Card className="my-2">
						<CardHeader>
							<CardTitle>Test</CardTitle>
							<CardDescription>News of {selectedDate}</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Subject</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{test.map((item, index) => (
										<TableRow key={index}>
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.subject}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
};

export default WeekData;
