"use client";
import { typeWeek } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { StudentData, TestData, TimetableData, UserData } from "@/types/types";
import { useUser } from "@/hooks/useUser";

async function getTimetableData(
	grade: number,
	group: String,
	week: String,
	day: String,
): Promise<TimetableData> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}timetables/${grade}/${group}/${week}/${day}`,
	);
	const timetableData: TimetableData = await response.json();

	return timetableData;
}
async function getTestData(grade: number, group: String, date: Date): Promise<TestData[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}tests/${grade}/${group}/${date}`,
	);
	const testData: TestData[] = await response.json();

	return testData;
}

const WeekData = () => {
	const { user, student, liff } = useUser();
	const [timetable, setTimetable] = useState<TimetableData | null>();
	const [test, setTest] = useState<TestData[] | null>();
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<string>(
		String(today.getMonth() + 1).slice(-2) + "/" + String(today.getDate()).slice(-2),
	);
	const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
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

	var grade: number = 2;
	var group: string = "H";

	useEffect(() => {
		if (selectedDate) {
			if (student) {
				grade = student.grade;
				group = student.group;
			}
			(async () => {
				await getTestData(
					grade,
					group,
					new Date(today.getFullYear() + "/" + selectedDate),
				).then((data) => {
					setTest(data);
				});
				await getTimetableData(
					grade,
					group,
					typeWeek(new Date(selectedDate)),
					daysOfWeek[new Date(selectedDate).getDay()],
				).then((data) => {
					setTimetable(data);
				});
			})();
		}
		if (selectedRef.current) {
			selectedRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
		}
	}, [selectedDate]);

	return (
		<div>
			<p className="text-center">
				{grade}年{group}組 {today.getFullYear() + "/" + selectedDate}{" "}
				{typeWeek(new Date(selectedDate))}週{daysOfWeek[new Date(selectedDate).getDay()]}
				曜日
			</p>
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
			<Card className="my-2">
				<CardHeader>
					<CardTitle>Timetable</CardTitle>
					<CardDescription>Timetable of {selectedDate}</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Times</TableHead>
								<TableHead>Subjects</TableHead>
							</TableRow>
						</TableHeader>
						{timetable ? (
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
						) : (
							<TableBody>
								<TableRow>
									<TableCell colSpan={2} className="text-center">
										None
									</TableCell>
								</TableRow>
							</TableBody>
						)}
					</Table>
				</CardContent>
			</Card>

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
	);
};

export default WeekData;
