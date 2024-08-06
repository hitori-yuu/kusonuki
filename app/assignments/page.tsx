import React from "react";
import { AssignmentData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<AssignmentData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}assignments`, {
		cache: "no-store",
	});

	const assignmentAllData: AssignmentData[] = await response.json();

	return assignmentAllData;
}

const page = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default page;
