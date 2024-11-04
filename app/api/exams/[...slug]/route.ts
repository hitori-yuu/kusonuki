import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request, { params }: { params: { slug: any } }) {
	const grade = params.slug[0];
    const subject = params.slug[1];

	const allExam = await prisma.exam.findMany({
		where: {
			grade: parseInt(grade),
            subject: subject,
		},
		orderBy: [
			{
				scope: "desc",
			},
		],
	});

	return NextResponse.json(allExam);
}
