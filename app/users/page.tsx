import React, { cache } from "react";
import { UserData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllUsers } from "@/lib/server/actions";

const page = async () => {
	const data = (await getAllUsers()) as UserData[];
	return <DataTable columns={columns} data={data} />;
};

export default page;
