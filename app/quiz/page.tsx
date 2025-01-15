import React from "react";
import { TestData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<TestData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}tests`, {
		cache: "no-store",
	});

	const testAllData: TestData[] = await response.json();

	return testAllData;
}

const page = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default page;
