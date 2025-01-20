import React from "react";
import { AssignmentData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllAssignments } from "@/lib/server/actions";

const page = async () => {
	const data = (await getAllAssignments()) as AssignmentData[];
	return <DataTable columns={columns} data={data} />;
};

export default page;
