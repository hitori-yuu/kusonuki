import React from "react";
import { StudentData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllStudents } from "@/lib/server/actions";

const page = async () => {
	const data = (await getAllStudents()) as StudentData[];
	return <DataTable columns={columns} data={data} />;
};

export default page;
