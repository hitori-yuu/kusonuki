"use client";
import { useUser } from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuiz } from "@/lib/server/actions";
import { QuizData } from "@/types/types";

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const DailyQuiz = () => {
	const { user, student, liff } = useUser();
	const [quiz, setQuiz] = useState<QuizData[]>([]);
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
				const date = new Date();

				if (daysOfWeek[date.getDay()] == "日") {
					setTypeOfDay("明日");
					date.setDate(date.getDate() + 1);
				} else if (daysOfWeek[date.getDay()] == "土") {
					setTypeOfDay("明後日");
					date.setDate(date.getDate() + 2);
				}

				const quizData = (await getQuiz(student.currentGrade, student.currentClass, date)) as QuizData[];
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
		<Card>
			<CardHeader>
				<CardTitle>{typeOfDay}の小テスト</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead colSpan={2}>
								<Skeleton className='h-4 w-[250px]' />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4 w-[100px]' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4 w-[100px]' />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);

	if (loading) return <SkeletonLoader />;

	if (!student || !user) return <SkeletonLoader />;

	if (quiz?.length < 1) return;

	return (
		<Card>
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
						{quiz &&
							quiz.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.scope}</TableCell>
									<TableCell>{item.subject}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default DailyQuiz;
