"use client";
import prisma from "@/lib/prismaClient";
import { AssignmentData } from "@/types/types";
import { columns } from "../../app/home/AssignmentColumns";
import { DataTable } from "../../app/home/AssignmentDataTable";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/useUser";
import { getAssignments } from "@/lib/server/actions";

const AssignmentCard = () => {
	const { user, student, liff } = useUser();
	const [assignment, setAssignment] = useState<AssignmentData[]>();

	useEffect(() => {
		const fetchData = async () => {
			if (student) {
				const fetchedData = (await getAssignments(
					student.currentGrade,
					student.currentClass,
					10,
				)) as AssignmentData[];
				setAssignment(fetchedData);
			}
		};
		fetchData();
	}, [student]);

	if (!student || !user) return;

	return (
		<>
			{assignment && (
				<Card>
					<CardHeader>
						<CardTitle>直近の課題</CardTitle>
						<CardDescription>10日間以内に提出期限の課題一覧</CardDescription>
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
