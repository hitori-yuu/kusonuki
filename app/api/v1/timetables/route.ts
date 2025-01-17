import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const allTimetable = await prisma.timetable.findMany({
		orderBy: [
			{
				group: "asc",
			},
			{
				week: "asc",
			},
			{
				day: "asc",
			},
		],
	});
	return NextResponse.json(allTimetable);
}

export async function POST(req: Request) {
	const { week, day, grade, group, first, second, third, fourth, fifth, authorId } =
		await req.json();

	const timetable = await prisma.timetable.create({
		data: {
			week,
			day,
			grade,
			group,
			first,
			second,
			third,
			fourth,
			fifth,
			authorId,
		},
	});
	return NextResponse.json(timetable);
}
