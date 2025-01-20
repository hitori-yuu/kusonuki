"use client";
import { useUser } from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
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
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getExamSchedules, getSchedules, getQuiz, getTimetable } from "@/lib/server/actions";
import { typeWeek } from "@/lib/utils";
import { ExamScheduleData, ScheduleData, QuizData, TimetableData } from "@/types/types";

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const DailyTimetable = () => {
	const { user, student, liff } = useUser();
	const [timetable, setTimetable] = useState<TimetableData | null>(null);
	const [schedule, setSchedule] = useState<ScheduleData[] | null>([]);
	const [examSchedule, setExamSchedule] = useState<ExamScheduleData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [typeOfDay, setTypeOfDay] = useState<string>("今日");

	useEffect(() => {
		const fetchTimetable = async () => {
			if (!student) {
				setLoading(false);
				return;
			}

			try {
				const today = new Date();
				const date = today;

				if (daysOfWeek[today.getDay()] == "日") {
					setTypeOfDay("明日");
					date.setDate(today.getDate() + 1);
				} else if (daysOfWeek[today.getDay()] == "土") {
					setTypeOfDay("明後日");
					date.setDate(today.getDate() + 2);
				}

				const week = typeWeek(date).toString();
				const dayOfWeek = daysOfWeek[date.getDay()];

				const timetableData = (await getTimetable(
					student.currentGrade,
					student.currentClass,
					week,
					dayOfWeek,
				)) as TimetableData[];

				const examScheduleData = (await getExamSchedules(
					student.currentGrade,
					date,
				)) as unknown as ExamScheduleData;

				setTimetable(timetableData[0]);
				setExamSchedule(examScheduleData);
			} catch (error) {
				setError(error instanceof Error ? error.message : "Failed to fetch timetable");
			} finally {
				setLoading(false);
			}
		};

		const fetchSchedule = async () => {
			if (!student) {
				setLoading(false);
				return;
			}
			try {
				const today = new Date();
				const date = today;

				if (daysOfWeek[today.getDay()] == "日") {
					setTypeOfDay("明日");
					date.setDate(today.getDate() + 1);
				} else if (daysOfWeek[today.getDay()] == "土") {
					setTypeOfDay("明後日");
					date.setDate(today.getDate() + 2);
				}

				const scheduleData = (await getSchedules(
					student.currentGrade,
					student.currentClass,
					date,
				)) as ScheduleData[];
				setSchedule(scheduleData);
			} catch (error) {
				setError(error instanceof Error ? error.message : "Failed to fetch quiz");
			} finally {
				setLoading(false);
			}
		};

		fetchTimetable();
		fetchSchedule();
	}, [student]);

	const SkeletonLoader = () => (
		<Card className="my-4">
			<CardHeader>
				<CardTitle>{typeOfDay}の予定</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead colSpan={2}>
								<Skeleton className="h-4 w-[450px]" />
							</TableHead>
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

	if (loading) {
		return <SkeletonLoader />;
	}

	if (!student) {
		return <SkeletonLoader />;
	}

	return (
		<Card className="my-2">
			<CardHeader>
				<CardTitle>{typeOfDay}の予定</CardTitle>
				<CardDescription>
					{timetable?.week}週{timetable?.day}曜日の時間割
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table className="my-2">
					<TableHeader>
						<TableRow>
							<TableHead>時限</TableHead>
							<TableHead>教科</TableHead>
						</TableRow>
					</TableHeader>
					{!examSchedule && timetable ? (
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
					) : examSchedule ? (
						examSchedule.timetable?.map((item, index) => (
							<TableRow key={index}>
								<TableHead>{index + 1}.</TableHead>
								<TableCell>{item}</TableCell>
							</TableRow>
						))
					) : (
						<TableBody>
							<TableRow>
								<TableHead colSpan={2}>時間割がありません。</TableHead>
							</TableRow>
						</TableBody>
					)}
				</Table>
				{schedule &&
					schedule.map((item, index) => (
						<Card key={index} className="my-1 py-[-5px]">
							<CardHeader className="text-center">{item.content}</CardHeader>
						</Card>
					))}
				{examSchedule && (
					<Card className="my-1 py-[-5px]">
						<CardHeader className="text-center">{examSchedule.period}試験</CardHeader>
					</Card>
				)}
			</CardContent>
		</Card>
	);
};

export default DailyTimetable;
