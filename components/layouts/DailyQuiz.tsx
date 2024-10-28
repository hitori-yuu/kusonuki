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
import { getSchedules, getTests, getTimetable } from "@/lib/ServerAction";
import { typeWeek } from "@/lib/utils";
import { ScheduleData, TestData, TimetableData } from "@/types/types";

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const DailyQuiz = () => {
	const { user, student, liff } = useUser();
	const [quiz, setQuiz] = useState<TestData[] | null>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [typeOfDay, setTypeOfDay] = useState<string>("今日");

	useEffect(() => {
		const fetchQuiz = async () => {
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

				const quizData = (await getTests(student.grade, student.group, date)) as TestData[];
				setQuiz(quizData);
			} catch (error) {
				setError(error instanceof Error ? error.message : "Failed to fetch quiz");
			} finally {
				setLoading(false);
			}
		};

		fetchQuiz();
	}, [student]);

	const SkeletonLoader = () => (
		<Card className="my-2">
			<CardHeader>
				<CardTitle>{typeOfDay}の小テスト</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead colSpan={2}>
								<Skeleton className="h-4 w-[250px]" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<Skeleton className="h-4 w-[100px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[100px]" />
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
		return (
			<Card className="my-2">
				<CardHeader>
					<CardTitle>{typeOfDay}の小テスト</CardTitle>
				</CardHeader>
				<CardContent>この機能は生徒情報を連携してから使用できます。</CardContent>
			</Card>
		);
	}

	return (
		<Card className="my-2">
			<CardHeader>
				<CardTitle>{typeOfDay}のテスト</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>テスト名</TableHead>
							<TableHead>教科</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{quiz ? (
							quiz.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.subject}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={2}>小テストなし</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default DailyQuiz;
