import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request, { params }: { params: { slug: any } }) {
	const grade = params.slug[0];
	const term = params.slug[1];

	const allExam = await prisma.exam.findMany({
		where: {
			grade: parseInt(grade),
			term: term,
		},
		orderBy: [
			{
				scope: "asc",
			},
		],
	});

	return NextResponse.json(allExam);
}
