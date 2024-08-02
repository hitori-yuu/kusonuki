"use client";

import { AssignmentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import AssignmentForm from "@/components/layouts/AssignmentForm";

const formatDate = (date: Date): string => {
	const y: number = date.getFullYear();
	const m: string = ("00" + (date.getMonth() + 1)).slice(-2);
	const d: string = ("00" + date.getDate()).slice(-2);
	return `${y + "-" + m + "-" + d}`;
};

export const columns: ColumnDef<AssignmentData>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "subject",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Subject
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "deadline",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Deadline
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date = new Date(row.getValue("deadline"));
			const formatted = ("0" + (date.getMonth() + 1)).slice(-2) + "月" + ("0" + date.getDate()).slice(-2) + "日";
			return <div>{formatted.replace(/0+(?=[0-9])/g, "")}</div>;
			// const setDate: Date = new Date(row.getValue("deadline"));
			// const nowDate: Date = new Date(formatDate(new Date()));

			// const diffDay: number = Math.floor((nowDate.getTime() - setDate.getTime()) / 86400000);
			// let diffDays: string;
			// if (Math.abs(diffDay) == 0) {
			// 	diffDays = "今日";
			// } else {
			// 	diffDays = `${Math.abs(diffDay)}日後`;
			// }
			// return <div>{diffDays}</div>;
		},
	},
];
