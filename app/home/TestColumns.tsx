"use client";

import { AssignmentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { DataTableColumnHeader } from "@/components/layouts/table/ColumnHeader";

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
];
