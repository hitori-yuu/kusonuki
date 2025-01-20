import { CreateUser, getAllUsers } from "@/lib/server/actions";
import { NextRequest, NextResponse } from "next/server";

/**
 * Retrieves all users from the database.
 *
 * @remarks
 * This method handles GET requests to fetch all user records.
 *
 * @param req - The incoming Next.js request object
 * @returns A JSON response containing an array of all users
 *
 * @throws {Error} If there is an issue retrieving users from the database
 */
export async function GET(req: NextRequest) {
	const allUser = await getAllUsers();
	return NextResponse.json(allUser);
}

/**
 * Creates a new user via a POST request.
 *
 * @remarks
 * Extracts user details from the request body and uses CreateUser to persist the new user.
 *
 * @param req - The incoming Next.js request containing user creation details
 * @returns A JSON response with the newly created user data
 *
 * @throws {Error} If user creation fails or required parameters are missing
 */
export async function POST(req: NextRequest) {
	const { id, displayName, pictureUrl, role } = await req.json();
	const user = await CreateUser(id, displayName, pictureUrl, role);
	return NextResponse.json(user);
}
