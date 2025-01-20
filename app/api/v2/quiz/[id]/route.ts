import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;
	const quizData = await prisma.quiz.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json(quizData);
}

/**
 * Deletes a specific quiz from the database.
 *
 * @param req - The incoming HTTP request
 * @param params - An object containing the quiz ID to be deleted
 * @returns A JSON response confirming the deletion of the quiz with its scope
 *
 * @throws {Error} If the quiz with the specified ID cannot be found or deleted
 *
 * @remarks
 * This method uses Prisma ORM to remove a quiz from the database by its ID.
 * The ID is converted from a string to an integer before deletion.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
	const quizData = await prisma.quiz.delete({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json({ message: "Deleted quiz with Scope: " + quizData.scope });
}
