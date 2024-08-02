import React from "react";
import { StudentData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<StudentData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}students`, {
		cache: "no-store",
	});

	const studentAllData: StudentData[] = await response.json();

	return studentAllData;
}

const page = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default page;
