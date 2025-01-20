import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;
	const assignmentData = await prisma.assignment.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json(assignmentData);
}

/**
 * Deletes an assignment from the database by its unique identifier.
 *
 * @param req - The incoming Next.js request object
 * @param params - An object containing the assignment ID to be deleted
 * @returns A JSON response confirming the deletion with the assignment's title
 *
 * @remarks
 * This method uses Prisma to remove an assignment from the database.
 * The ID is converted from a string to an integer for database querying.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
	const assignmentData = await prisma.assignment.delete({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json({ message: "Deleted assignment with Title: " + assignmentData.title });
}
