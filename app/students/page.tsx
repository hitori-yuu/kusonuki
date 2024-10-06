import React from "react";
import { StudentData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllStudents } from "@/lib/utils";

const page = async () => {
	const data = await getAllStudents();
	return <DataTable columns={columns} data={data} />;
};

export default page;
