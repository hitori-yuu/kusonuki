import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;
	const studentData = await prisma.student.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json(studentData);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
	const studentData = await prisma.student.delete({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json({
		message: "Deleted student with DisplayName: " + studentData.fullName,
	});
}
