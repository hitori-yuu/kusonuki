import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request, { params }: { params: { slug: any } }) {
	const grade = params.slug[0];

	const inputDate = new Date(params.slug[1]);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const allExamSchedule = await prisma.examSchedule.findFirst({
		where: {
			grade: parseInt(grade),
			AND: [
				{
					date: {
						lte: after,
						gt: inputDate,
					},
				},
			],
		},
	});

	return NextResponse.json(allExamSchedule);
}
