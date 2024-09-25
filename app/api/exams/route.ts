import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const allExamSchedule = await prisma.scheduleWeek.findMany({
		orderBy: [
			{
				date: "asc",
			},
		],
	});
	return NextResponse.json(allExamSchedule);
}

export async function POST(req: Request) {
	const { date, grade, term, authorId } = await req.json();
	const examSchedule = await prisma.examSchedule.create({
		data: {
			grade,
			term,
            date,
			authorId,
		},
	});
	return NextResponse.json(examSchedule);
}
