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

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
	getAllAssignments,
	getAllChanges,
	getAllQuiz,
	getExamSchedules,
	getSchedules,
	getQuiz,
	getTimetable,
} from "@/lib/server/actions";
import { CalendarMinus2, ClipboardPenLine, NotepadText, PencilLine } from "lucide-react";
import DashboardCard from "./DashboardCard";

export function UserDashboard() {
	const { user, student, liff } = useUser();
	const [userAssignments, setuserAssignments] = useState<number | null>(0);
	const [userTests, setuserTests] = useState<number | null>(0);
	const [userChanges, setuserChanges] = useState<number | null>(0);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!user) {
				setLoading(false);
				return;
			}

			try {
				setuserAssignments(
					(await getAllAssignments()).filter((data) => data.authorId == user.id).length,
				);
				setuserTests(
					(await getAllQuiz()).filter((data) => data.authorId == user.id).length,
				);
				setuserChanges(
					(await getAllChanges()).filter((data) => data.authorId == user.id).length,
				);
			} catch (error) {
				setError(error instanceof Error ? error.message : "Failed to fetch timetable");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [user]);

	return (
		user && (
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-4">
				<DashboardCard
					title="課題作成"
					content={userAssignments}
					isLoading={isLoading}
					icon={<PencilLine />}
				/>
				<DashboardCard
					title="小テスト作成"
					content={userTests}
					isLoading={isLoading}
					icon={<NotepadText />}
				/>
				<DashboardCard
					title="変更作成"
					content={userChanges}
					isLoading={isLoading}
					icon={<CalendarMinus2 />}
				/>
			</div>
		)
	);
}
