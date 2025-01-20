"use client";

import { UserData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";
import { roles } from "@/components/layouts/table/DataTables";
import Link from "next/link";

export const columns: ColumnDef<UserData>[] = [
	{
		accessorKey: "displayName",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="ユーザー名" />;
		},
		cell: ({ row }) => (
			<Link href={`users/${row.original.id}`}>
				<div className="flex items-center">
					<Avatar>
						<AvatarImage src={row.original.pictureUrl as string} />
						<AvatarFallback>{row.original.displayName}</AvatarFallback>
					</Avatar>
					<p className="px-4">{row.original.displayName}</p>
				</div>
			</Link>
		),
	},
	{
		accessorKey: "role",
		header: ({ column }) => <DataTableColumnHeader column={column} title="権限" />,
		cell: ({ row }) => {
			const priority = roles.find((role) => role.value === row.getValue("role"));

			if (!priority) {
				return null;
			}

			return (
				<div className="flex items-center">
					<span>{priority.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "createdAt",
		header: "作成日",
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt"));
			const formatted = date.toLocaleDateString();
			return <div>{formatted}</div>;
		},
	},
];
