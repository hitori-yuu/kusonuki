"use client";

import { AssignmentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";
import { groups, subjects } from "@/components/layouts/table/DataTables";

export const columns: ColumnDef<AssignmentData>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="課題名" />;
		},
	},
	{
		accessorKey: "group",
		header: ({ column }) => <DataTableColumnHeader column={column} title="クラス" />,
		cell: ({ row }) => {
			const grade = row.original.grade;
			const group = groups.find((group) => group.value === row.getValue("group"));

			if (!group) {
				return null;
			}

			return (
				<div>
					{grade}
					{group.label}
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "subject",
		header: ({ column }) => <DataTableColumnHeader column={column} title="教科" />,
		cell: ({ row }) => {
			const grade = row.original.grade;
			const subject = subjects.find((subject) => subject.value === row.getValue("subject"));

			if (!subject) {
				return null;
			}

			return <div>{subject.label}</div>;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "deadline",
		header: ({ column }) => <DataTableColumnHeader column={column} title="提出日" />,
		cell: ({ row }) => {
			const date = new Date(row.getValue("deadline"));
			const formatted = date.toLocaleDateString();
			return <div>{formatted}</div>;
		},
	},
];
