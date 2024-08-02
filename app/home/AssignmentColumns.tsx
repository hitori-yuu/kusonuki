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

export const columns: ColumnDef<AssignmentData>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "subject",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Subject" />;
		},
	},
	{
		accessorKey: "deadline",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Deadline" />;
		},
		cell: ({ row }) => {
			const dateTo = dayjs(new Date());
			const dateFrom = dayjs(row.getValue("deadline"));
			const diff = dateFrom.diff(dateTo, "day");

			let diffDays: string;
			if (diff == 0) {
				diffDays = "今日";
			} else {
				diffDays = `${diff}日後`;
			}
			return <div>{diffDays}</div>;
		},
	},
];
