"use client";

import { StudentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";
import { classNames, grades } from "@/components/layouts/table/DataTables";
import Link from "next/link";

export const columns: ColumnDef<StudentData>[] = [
	{
		accessorKey: "fullName",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='氏名' />;
		},
		cell: ({ row }) => {
			return <Link href={`students/${row.original.id}`}>{row.getValue("fullName")}</Link>;
		},
	},
	{
		accessorKey: "currentGrade",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='学年' />;
		},
	},
	{
		accessorKey: "currentClass",
		header: ({ column }) => <DataTableColumnHeader column={column} title='クラス' />,
		cell: ({ row }) => {
			const className = classNames.find((className) => className.value === row.getValue("currentClass"));

			if (!className) {
				return null;
			}

			return className.label;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "currentNumber",
		header: "出席番号",
	},
];
