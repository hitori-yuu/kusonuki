import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request, { params }: { params: { slug: any } }) {
	const grade = params.slug[0];
	const group = params.slug[1];
	const inputDate = new Date(params.slug[2]);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const allChange = await prisma.change.findMany({
		where: {
			grade: parseInt(grade),
			group: group,
			AND: [
				{
					date: {
						lte: inputDate,
						gt: after,
					},
				},
			],
		},
		orderBy: [
			{
				date: "desc",
			},
		],
	});
	return NextResponse.json(allChange);
}
