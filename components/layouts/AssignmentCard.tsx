"use client";
import prisma from "@/lib/prismaClient";
import { AssignmentData } from "@/types/types";
import { columns } from "../../app/home/AssignmentColumns";
import { DataTable } from "../../app/home/AssignmentDataTable";
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
import { useUser } from "@/hooks/useUser";

async function getData(grade: number, group: string): Promise<AssignmentData[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}assignments/${grade}/${group}/10`,
		{
			cache: "no-store",
		},
	);
	const assignmentData: AssignmentData[] = await response.json();

	return assignmentData;
}

const AssignmentCard = () => {
	const { user, student, liff } = useUser();
	const [assignment, setAssignment] = useState<AssignmentData[]>();

	useEffect(() => {
		const fetchData = async () => {
			if (student) {
				const fetchedData = await getData(student.grade ?? 2, student.group ?? "H");
				setAssignment(fetchedData);
			}
		};
		fetchData();
	}, [student]);

	return (
		<>
			{assignment && (
				<Card className="my-2">
					<CardHeader>
						<CardTitle>Assignment</CardTitle>
						<CardDescription>Assignments due within 10 days.</CardDescription>
					</CardHeader>
					<CardContent>
						<DataTable columns={columns} data={assignment} />
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default AssignmentCard;
