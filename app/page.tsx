import WeekData from "@/components/layouts/WeekData";
import { columns } from "./home/AssignmentColumns";
import { DataTable } from "./home/AssignmentDataTable";
import { AssignmentData } from "@/types/types";

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
	return (
		<div>
			<WeekData />
			<DataTable columns={columns} data={data} />
		</div>
	);
};

export default page;
