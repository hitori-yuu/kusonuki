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
	const { date, grade, period, timetable, authorId } = await req.json();
	const examSchedule = await prisma.examSchedule.create({
		data: {
			grade,
			period,
			date,
			timetable,
			authorId,
		},
	});
	return NextResponse.json(examSchedule);
}
