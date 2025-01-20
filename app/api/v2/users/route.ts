import { CreateUser, getAllUsers, UpdateUser } from "@/lib/server/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const allUser = await getAllUsers();
	return NextResponse.json(allUser);
}

export async function POST(req: NextRequest) {
	const { id, displayName, pictureUrl } = await req.json();
	const user = await CreateUser(id, displayName, pictureUrl);
	return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
	const { id, displayName, pictureUrl } = await req.json();
	const user = await UpdateUser(id, displayName, pictureUrl);
	return NextResponse.json(user);
}
