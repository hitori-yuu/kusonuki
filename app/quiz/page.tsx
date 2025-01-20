import React from "react";
import { QuizData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { getAllQuiz } from "@/lib/server/actions";

const page = async () => {
	const data = (await getAllQuiz()) as QuizData[];
	return <DataTable columns={columns} data={data} />;
};

export default page;
