"use client";
import { typeWeek } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ExamScheduleData, ScheduleData, TestData, TimetableData } from "@/types/types";
import { useUser } from "@/hooks/useUser";

const fetchData = async (url: string): Promise<any> => {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url);
	const data = await response.json();
	return data;
};

const getTimetableData = async (
	grade: number,
	group: string,
	week: string,
	day: string,
): Promise<TimetableData> => {
	const url = `timetables/${grade}/${group}/${week}/${day}`;
	return fetchData(url);
};

const getTestData = async (grade: number, group: string, date: Date): Promise<TestData[]> => {
	const url = `tests/${grade}/${group}/${date.toISOString().split("T")[0]}`;
	return fetchData(url);
};

const getExamScheduleData = async (grade: number, date: Date): Promise<ExamScheduleData> => {
	const url = `exams/${grade}/${date.toISOString().split("T")[0]}`;
	return fetchData(url);
};

const getScheduleData = async (
	grade: number,
	group: string,
	inputDate: Date,
): Promise<ScheduleData[]> => {
	const url = `schedule/${grade}/${group}/${inputDate.toISOString().split("T")[0]}`;
	return fetchData(url);
};

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

interface WeekDataType {
	[date: string]: {
		timetable: TimetableData | null;
		test: TestData[] | null;
		schedule: ScheduleData[] | null;
		examSchedule: ExamScheduleData | null;
	};
}

const WeekData: React.FC = () => {
	const { user, student, liff } = useUser();
	const [weekData, setWeekData] = useState<WeekDataType>({});
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const [isClient, setIsClient] = useState(false);
	const selectedRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		const fetchWeekData = async () => {
			if (!student) return;

			setIsLoading(true);
			const today = new Date();
			today.setDate(today.getDate() - today.getDay());
			const grade = student.grade;
			const group = student.group;

			const weekDataTemp: WeekDataType = {};

			for (let i = 0; i < 7; i++) {
				const date = new Date(today);
				date.setDate(today.getDate() + i);
				const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
				const week = typeWeek(date).toString();
				const dayOfWeek = daysOfWeek[date.getDay()];

				const [timetable, test, schedule, examSchedule] = await Promise.all([
					getTimetableData(grade, group, week, dayOfWeek),
					getTestData(grade, group, date),
					getScheduleData(grade, group, date),
					getExamScheduleData(grade, date),
				]);

				weekDataTemp[dateString] = { timetable, test, schedule, examSchedule };
			}

			setWeekData(weekDataTemp);
			setSelectedDate(`${today.getMonth() + 1}/${today.getDate()}`);
			setIsLoading(false);
		};

		fetchWeekData();
	}, [student]);

	useEffect(() => {
		if (selectedRef.current) {
			selectedRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
		}

		// コンソールログに指定した日付とそのデータを表示
		if (selectedDate && weekData[selectedDate]) {
			console.log("Selected Date:", selectedDate);
			console.log("Data for selected date:", weekData[selectedDate]);
		}
	}, [selectedDate, weekData]);

	const days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - date.getDay() + i);
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const dateString = `${month}/${day}`;
		const dayOfWeek = daysOfWeek[date.getDay()];

		return {
			dateString,
			dayOfWeek,
		};
	});

	const selectedData = selectedDate ? weekData[selectedDate] : null;

	const SkeletonLoader = () => (
		<Card className="my-2">
			<CardHeader>
				<CardTitle>Timetable</CardTitle>
				<Skeleton className="h-4 w-[250px]" />
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
							<TableHead>
								<Skeleton className="h-4 w-[50px]" />
							</TableHead>
							<TableCell>
								<Skeleton className="h-4 w-[250px]" />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>
								<Skeleton className="h-4 w-[50px]" />
							</TableHead>
							<TableCell>
								<Skeleton className="h-4 w-[250px]" />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>
								<Skeleton className="h-4 w-[50px]" />
							</TableHead>
							<TableCell>
								<Skeleton className="h-4 w-[250px]" />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>
								<Skeleton className="h-4 w-[50px]" />
							</TableHead>
							<TableCell>
								<Skeleton className="h-4 w-[250px]" />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);

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
					{isLoading ? (
						<>
							<SkeletonLoader />
						</>
					) : selectedData ? (
						<>
							<Card className="my-2">
								<CardHeader>
									<CardTitle>Timetable</CardTitle>
									<CardDescription>
										Timetable of {selectedDate} (
										{typeWeek(
											new Date(new Date().getFullYear() + "/" + selectedDate),
										)}
										)
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
											{!selectedData.examSchedule &&
											selectedData.timetable ? (
												<>
													<TableRow>
														<TableHead>1.</TableHead>
														<TableCell>
															{selectedData.timetable.first}
														</TableCell>
													</TableRow>
													<TableRow>
														<TableHead>2.</TableHead>
														<TableCell>
															{selectedData.timetable.second}
														</TableCell>
													</TableRow>
													<TableRow>
														<TableHead>3.</TableHead>
														<TableCell>
															{selectedData.timetable.third}
														</TableCell>
													</TableRow>
													<TableRow>
														<TableHead>4.</TableHead>
														<TableCell>
															{selectedData.timetable.fourth}
														</TableCell>
													</TableRow>
													<TableRow>
														<TableHead>5.</TableHead>
														<TableCell>
															{selectedData.timetable.fifth}
														</TableCell>
													</TableRow>
												</>
											) : selectedData.examSchedule ? (
												selectedData.examSchedule.timetable?.map(
													(item, index) => (
														<TableRow key={index}>
															<TableHead>{index + 1}.</TableHead>
															<TableCell>{item}</TableCell>
														</TableRow>
													),
												)
											) : (
												<TableRow>
													<TableCell colSpan={2} className="text-center">
														None
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
									{selectedData.schedule &&
										selectedData.schedule.map((item, index) => (
											<Card key={index} className="my-1 py-[-5px]">
												<CardHeader className="text-center">
													{item.content}
												</CardHeader>
											</Card>
										))}
									{selectedData.examSchedule && (
										<Card className="my-1 py-[-5px]">
											<CardHeader className="text-center">
												{selectedData.examSchedule.period}試験
											</CardHeader>
										</Card>
									)}
								</CardContent>
							</Card>

							{selectedData.test && selectedData.test.length > 0 && (
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
												{selectedData.test.map((item, index) => (
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
					) : (
						<Card className="my-2">
							<CardContent>
								<p className="text-center">
									No data available for the selected date.
								</p>
							</CardContent>
						</Card>
					)}
				</>
			)}
		</div>
	);
};

export default WeekData;
