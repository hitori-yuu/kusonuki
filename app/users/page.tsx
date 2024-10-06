import React, { cache } from "react";
import { UserData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllUsers } from "@/lib/utils";

const page = async () => {
	const data = await getAllUsers();
	return <DataTable columns={columns} data={data} />;
};

export default page;
