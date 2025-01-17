import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { name: string } }) {
	const name = params.name;
	const studentData = await prisma.student.findUnique({
		where: {
			name: name,
		},
	});
	return NextResponse.json(studentData);
}

export async function POST(req: NextRequest, { params }: { params: { name: string } }) {
	const name = params.name;
	const { group, number, grade } = await req.json();
	let student;

	if (grade == 1) {
		student = await prisma.student.update({
			where: {
				name: name,
			},
			data: {
				firstGroupNumber: group + number,
			},
		});
	} else if (grade == 2) {
		student = await prisma.student.update({
			where: {
				name: name,
			},
			data: {
				secondGroupNumber: group + number,
			},
		});
	} else {
		student = await prisma.student.update({
			where: {
				name: name,
			},
			data: {
				thirdGroupNumber: group + number,
			},
		});
	}

	return NextResponse.json(student);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	// DELETE /api/users/[id] リクエストの処理
}
