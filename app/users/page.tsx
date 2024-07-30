import React from "react";
import { UserData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<UserData[]> {
	const response = await fetch("http://localhost:3000/api/users", {
		cache: "no-store",
	});

	const userAllData: UserData[] = await response.json();

	return userAllData;
}

const page = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default page;
