import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const allScheduleWeek = await prisma.scheduleWeek.findMany({
		orderBy: [
			{
				date: "asc",
			},
		],
	});
	return NextResponse.json(allScheduleWeek);
}

export async function POST(req: Request) {
	const { date, week, authorId } = await req.json();
	const scheduleWeek = await prisma.scheduleWeek.create({
		data: {
			date,
			week,
			authorId,
		},
	});
	return NextResponse.json(scheduleWeek);
}
