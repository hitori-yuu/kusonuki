"use client";

import { QuizData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";
import { classNames, subjects } from "@/components/layouts/table/DataTables";

export const columns: ColumnDef<QuizData>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="テスト名" />;
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
		accessorKey: "testDate",
		header: ({ column }) => <DataTableColumnHeader column={column} title="実施日" />,
		cell: ({ row }) => {
			const date = new Date(row.getValue("testDate"));
			const formatted = date.toLocaleDateString();
			return <div>{formatted}</div>;
		},
	},
];
