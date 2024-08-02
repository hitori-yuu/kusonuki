"use client";

import { StudentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";
import { groups } from "@/components/layouts/table/DataTables";

export const columns: ColumnDef<StudentData>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Name" />;
		},
	},
	{
		accessorKey: "group",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Group" />,
		cell: ({ row }) => {
			const grade = row.original.grade;
			const group = groups.find((group) => group.value === row.getValue("group"));

			if (!group) {
				return null;
			}

			return (
				<div className="flex w-[100px] items-center">
					<span>
						{grade}
						{group.label}
					</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "number",
		header: "Number",
	},
	{
		accessorKey: "firstGroupNumber",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="1st" />;
		},
	},
];
