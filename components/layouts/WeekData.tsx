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
import {
	ExamScheduleData,
	ScheduleData,
	StudentData,
	TestData,
	TimetableData,
	UserData,
} from "@/types/types";
import { useUser } from "@/hooks/useUser";

const fetchData = async (url: string): Promise<any> => {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url);
	const data = await response.json();
	return data;
};

const getTimetableData = async (
	grade: number,
	group: String,
	week: String,
	day: String,
): Promise<TimetableData> => {
	const url = `timetables/${grade}/${group}/${week}/${day}`;
	return fetchData(url);
};

const getTestData = async (grade: number, group: String, date: Date): Promise<TestData[]> => {
	const url = `tests/${grade}/${group}/${date}`;
	return fetchData(url);
};

const getExamScheduleData = async (grade: number, date: Date): Promise<ExamScheduleData> => {
	const url = `exams/${grade}/${date}`;
	return fetchData(url);
};

const getScheduleData = async (
	grade: number,
	group: String,
	inputDate: Date,
): Promise<ScheduleData[]> => {
	const url = `schedule/${grade}/${group}/${inputDate}`;
	return fetchData(url);
};

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const WeekData = () => {
	const { user, student, liff } = useUser();
	const [timetable, setTimetable] = useState<TimetableData | null>();
	const [test, setTest] = useState<TestData[] | null>();
	const [schedule, setSchedule] = useState<ScheduleData[] | null>();
	const [examSchedule, setExamSchedule] = useState<ExamScheduleData | null>();
	const [isClient, setIsClient] = useState(false);
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<string>(
		`${today.getMonth() + 1}/${today.getDate()}`,
	);
	const selectedRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const dateString = `${month > 10 ? "0" : ""}${month}/${day < 10 ? "0" : ""}${day}`;
		const dayOfWeek = daysOfWeek[date.getDay()];

		return {
			dateString,
			dayOfWeek,
		};
	});

	useEffect(() => {
		const fetchAndSetData = async () => {
			today.setDate(today.getDate() - today.getDay());

			if (selectedDate) {
				const date = new Date(today.getFullYear() + "/" + selectedDate);
				const grade = student ? student.grade : 2;
				const group = student ? student.group : "H";
				const week = typeWeek(date);
				const dayOfWeek = daysOfWeek[date.getDay()];

				await getTestData(grade, group, date).then((data) => {
					setTest(data);
				});
				await getTimetableData(grade, group, week, dayOfWeek).then((data) => {
					setTimetable(data);
				});
				await getScheduleData(grade, group, date).then((data) => {
					setSchedule(data);
				});
				await getExamScheduleData(grade, date).then((data) => {
					setExamSchedule(data);
				});
			}
		};

		fetchAndSetData();

		if (selectedRef.current) {
			selectedRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
		}
	}, [selectedDate, student]);

	return (
		<div>
			{isClient && (
				<>
					<div className="overflow-x-auto whitespace-no-wrap">
						<div className="flex items-center space-x-4 xl:justify-around">
							{days.map(({ dateString, dayOfWeek }) => (
								<div
									key={dateString}
									ref={selectedDate === dateString ? selectedRef : null}
									className={`block p-4 cursor-pointer text-center opacity-70 ${
										selectedDate === dateString
											? "font-bold text-xl opacity-100"
											: ""
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
							<CardDescription>
								Timetable of {selectedDate} (
								{typeWeek(new Date(today.getFullYear() + "/" + selectedDate))})
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
								{examSchedule?.timetable?.map((item, index) => {
									return (
										<TableBody>
											<TableRow key={index}>
												<TableHead>{index}.</TableHead>
												<TableCell>{item}</TableCell>
											</TableRow>
										</TableBody>
									);
								})}
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
							{schedule &&
								schedule.map((item, index) => {
									return (
										<Card className="my-1 py-[-5px]">
											<CardHeader className="text-center">
												{item.content}
											</CardHeader>
										</Card>
									);
								})}
						</CardContent>
					</Card>

					{test && test.length > 0 && (
						<Card className="my-2 py-0">
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
				</>
			)}
		</div>
	);
};

export default WeekData;
