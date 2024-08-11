import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { date: string } }) {
	const inputDate = new Date(params.date);
	const scheduleWeekData = await prisma.scheduleWeek.findFirst({
		where: {
			date: inputDate,
		},
	});
	return NextResponse.json(scheduleWeekData);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	// DELETE /api/users/[id] リクエストの処理
}
