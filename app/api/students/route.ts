import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const allStudent = await prisma.student.findMany({
		orderBy: [
			{
				group: "asc",
			},
			{
				number: "asc",
			},
		],
	});
	return NextResponse.json(allStudent);
}

export async function POST(req: Request) {
	const { name, group, number, grade } = await req.json();
	const user = await prisma.student.create({
		data: {
			name,
			group,
			number,
			grade,
		},
	});
	return NextResponse.json(user);
}
