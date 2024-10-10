import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const assignmentData = await prisma.assignment.findUnique({
		where: {
            id: parseInt(params.id)
		},
	});
	return NextResponse.json(assignmentData);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	// DELETE /api/users/[id] リクエストの処理
}
