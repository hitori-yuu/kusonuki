import React from "react";
import { DocumentData, StudentData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllStudents } from "@/lib/server/actions";

async function getData(): Promise<StudentData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/students`, {
		cache: "no-store",
	});

	const allStudentData: StudentData[] = await response.json();

	return allStudentData;
}

const page = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default page;
