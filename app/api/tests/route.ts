import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const allTest = await prisma.test.findMany({
		orderBy: [
			{
				group: "asc",
			},
			{
				implementationDate: "asc",
			},
		],
	});
	return NextResponse.json(allTest);
}

export async function POST(req: Request) {
	const { name, grade, group, subject, implementationDate, authorId } = await req.json();
	const date = new Date(implementationDate);

	const timetable = await prisma.test.create({
		data: {
			name,
			grade,
			group,
			subject,
			implementationDate: date,
			authorId,
		},
	});
	return NextResponse.json(timetable);
}
