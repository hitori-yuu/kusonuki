import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;
	const userData = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	return NextResponse.json(userData);
}

/**
 * Deletes a user from the database by their unique identifier.
 *
 * @param req - The incoming HTTP request object
 * @param params - An object containing the user ID to be deleted
 * @returns A JSON response confirming the deletion with the user's display name
 *
 * @throws {Error} If the user cannot be found or deleted
 *
 * @remarks
 * This method uses Prisma to permanently remove a user record from the database.
 * It requires a valid user ID and returns a confirmation message upon successful deletion.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
	const userData = await prisma.user.delete({
		where: {
			id,
		},
	});
	return NextResponse.json({ message: "Deleted user with DisplayName: " + userData.displayName });
}
