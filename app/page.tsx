import { columns } from "./assignments/columns";
import { AssignmentData } from "@/types/types";
import { DataTable } from "@/components/layouts/DataTable";

async function getData(grade: number, group: string, range: Date): Promise<AssignmentData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}assignments/${grade}/${group}/${range}`, {
		cache: "no-store",
	});
	const assignmentData: AssignmentData[] = await response.json();

	return assignmentData;
}

const page = async () => {
	var today = new Date();
	const range = today.setDate(today.getDate() + 10);
	const data = await getData(2, "H", new Date(range));
	return <DataTable columns={columns} data={data} />;
};

export default page;
