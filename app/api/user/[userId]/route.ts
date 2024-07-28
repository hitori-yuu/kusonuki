import { createUser } from "@/app/actions/createUserAction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const params = await request.json();
    createUser(params.id, params.name, params.avatar)
    return NextResponse.json(
        params
    );
}