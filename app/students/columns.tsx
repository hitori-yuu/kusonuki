"use client";

import { StudentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";
import { groups } from "@/components/layouts/table/DataTables";

export const columns: ColumnDef<StudentData>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="氏名" />;
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
		accessorKey: "number",
		header: "出席番号",
	},
	{
		accessorKey: "firstGroupNumber",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="1年" />;
		},
	},
];
