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

/**
 * Deletes a student record from the database by their ID.
 *
 * @param req - The incoming Next.js request object
 * @param params - An object containing the student ID to be deleted
 * @returns A JSON response confirming the deletion with the student's full name
 *
 * @throws Will throw an error if the student with the specified ID cannot be found or deleted
 */
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
