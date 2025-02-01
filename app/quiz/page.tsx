import React from "react";
import { QuizData } from "@/types/types";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<QuizData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/quiz`, {
		cache: "no-store",
	});

	const allQuizData: QuizData[] = await response.json();

	return allQuizData;
}

const page = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default page;
