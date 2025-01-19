"use client";

import { AssignmentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";
import { classNames, subjects } from "@/components/layouts/table/DataTables";

export const columns: ColumnDef<AssignmentData>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="課題名" />;
		},
	},
	{
		accessorKey: "className",
		header: ({ column }) => <DataTableColumnHeader column={column} title="クラス" />,
		cell: ({ row }) => {
			const grade = row.original.grade;
			const className = classNames.find(
				(className) => className.value === row.getValue("className"),
			);

			if (!className) {
				return null;
			}

			return (
				<div>
					{grade}
					{className.label}
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
		accessorKey: "dueDate",
		header: ({ column }) => <DataTableColumnHeader column={column} title="提出日" />,
		cell: ({ row }) => {
			const date = new Date(row.getValue("dueDate"));
			const formatted = date.toLocaleDateString();
			return <div>{formatted}</div>;
		},
	},
];
