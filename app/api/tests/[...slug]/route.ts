import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request, { params }: { params: { slug: any } }) {
	const grade = params.slug[0];
	const group = params.slug[1];
	const date = new Date(params.slug[2]);
	const allTests = await prisma.test.findMany({
		where: {
			grade: parseInt(grade),
			group: group,
			implementationDate: {
				gte: dayjs(date).toDate(),
				lt: dayjs(date).add(1, "day").toDate(),
			},
		},
	});
	return NextResponse.json(allTests);
}
