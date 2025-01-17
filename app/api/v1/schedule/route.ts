import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const allSchedule = await prisma.schedule.findMany({
		orderBy: [
			{
				date: "asc",
			},
		],
	});
	return NextResponse.json(allSchedule);
}

export async function POST(req: Request) {
	const { date, grade, group, content, authorId } = await req.json();
	const schedule = await prisma.schedule.create({
		data: {
			date,
			grade,
			group,
			content,
			authorId,
		},
	});
	return NextResponse.json(schedule);
}
