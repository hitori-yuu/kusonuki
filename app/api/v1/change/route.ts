import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const allChange = await prisma.change.findMany({
		orderBy: [
			{
				date: "asc",
			},
		],
	});
	return NextResponse.json(allChange);
}

export async function POST(req: Request) {
	const { date, period, subject, grade, group, authorId } = await req.json();
	const change = await prisma.change.create({
		data: {
			date,
			period,
			subject,
			grade,
			group,
			authorId,
		},
	});
	return NextResponse.json(change);
}
