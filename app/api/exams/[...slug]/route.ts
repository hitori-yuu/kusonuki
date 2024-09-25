import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request, { params }: { params: { slug: any } }) {
	const grade = params.slug[0];
	const inputDate = new Date(params.slug[1]);
	const inputDateAfter = new Date();
	inputDate.setHours(0, 0, 0, 0);
	inputDateAfter.setHours(0, 0, 0, 0);
	inputDateAfter.setDate(inputDate.getDate() + 1);

	const allExam = await prisma.examSchedule.findMany({
		where: {
			grade: parseInt(grade),
			AND: [
				{
					date: {
						lte: inputDateAfter,
						gt: inputDate,
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

    console.log(allExam);
	return NextResponse.json(allExam);
}
