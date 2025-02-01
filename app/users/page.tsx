import React, { cache } from "react";
import { UserData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllUsers } from "@/lib/server/actions";

async function getData(): Promise<UserData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/users`, {
		cache: "no-store",
	});

	const allUserData: UserData[] = await response.json();

	return allUserData;
}

const page = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default page;
