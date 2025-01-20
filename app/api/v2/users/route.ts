import { CreateUser, getAllUsers } from "@/lib/server/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const allUser = await getAllUsers();
	return NextResponse.json(allUser);
}

export async function POST(req: NextRequest) {
    const { id, displayName, pictureUrl, role } = await req.json();
    const user = await CreateUser(id, displayName, pictureUrl, role);
    return NextResponse.json(user);
}