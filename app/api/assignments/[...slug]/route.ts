import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request, { params }: { params: { slug: any } }) {
	const grade = params.slug[0];
	const group = params.slug[1];

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const after = new Date(today);
	after.setDate(today.getDate() + parseInt(params.slug[2]));

	const allAssignment = await prisma.assignment.findMany({
		where: {
			grade: parseInt(grade),
			group: group,
			AND: [
				{
					deadline: {
						lte: after,
						gte: today,
					},
				},
			],
		},
		orderBy: [
			{
				deadline: "asc",
			},
		],
	});

	return NextResponse.json(allAssignment);
}
