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
	getAllTests,
	getExamSchedules,
	getSchedules,
	getTests,
	getTimetable,
} from "@/lib/ServerAction";
import { CalendarMinus2, ClipboardPenLine, NotepadText, PencilLine } from "lucide-react";

export function UserDashboard() {
	const { user, student, liff } = useUser();
	const [userAssignemtns, setuserAssignemtns] = useState<number | null>(0);
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
				setuserAssignemtns(
					(await getAllAssignments()).filter((data) => data.authorId == user.id).length,
				);
				setuserTests(
					(await getAllTests()).filter((data) => data.authorId == user.id).length,
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
	const SkeletonLoader = () => (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Skeleton className="h-4 w-[50px]" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						<Skeleton className="h-4 w-[150px]" />
					</div>
				</CardContent>
			</Card>
		</>
	);

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-4">
			{isLoading ? (
				<>
					<SkeletonLoader />
					<SkeletonLoader />
					<SkeletonLoader />
				</>
			) : (
				<>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">課題作成</CardTitle>
							<NotepadText />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{userAssignemtns}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">小テスト作成</CardTitle>
							<PencilLine />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{userTests}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">授業変更作成</CardTitle>
							<CalendarMinus2 />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{userChanges}</div>
						</CardContent>
					</Card>
				</>
			)}
		</div>
	);
}
