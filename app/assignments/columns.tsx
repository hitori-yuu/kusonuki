"use client";

import { AssignmentData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import AssignmentForm from "@/components/layouts/AssignmentForm";

export const columns: ColumnDef<AssignmentData>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "subject",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Subject
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "deadline",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Deadline
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];
