"use client";

import { AssignmentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";

const formatDate = (date: Date): string => {
	const y: number = date.getFullYear();
	const m: string = ("00" + (date.getMonth() + 1)).slice(-2);
	const d: string = ("00" + date.getDate()).slice(-2);
	return `${y + "-" + m + "-" + d}`;
};

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

export const columns: ColumnDef<AssignmentData>[] = [
	{
		accessorKey: "title",
		header: "課題名",
	},
	{
		accessorKey: "subject",
		header: "教科",
	},
	{
		accessorKey: "deadline",
		header: "提出日",
		cell: ({ row }) => {
			const dateTo = dayjs(new Date()).startOf("day");
			const dateFrom = dayjs(row.getValue("deadline")).startOf("day");
			const diff = dateFrom.diff(dateTo, "day");

			let diffDays: string;
			if (daysOfWeek[new Date().getDay()] == "日") diff + 1;
			else if (daysOfWeek[new Date().getDay()] == "日") diff + 2;
			if (diff == 0) {
				diffDays = "今日";
			} else if (diff == 1) {
				diffDays = "明日";
			} else {
				diffDays = `${diff}日後`;
			}
			return <div>{diffDays}</div>;
		},
	},
];
