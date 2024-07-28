import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient"

export async function POST(req: Request) {
    const { user, name, subject, deadline } = await req.json();
    console.log(user, name, subject, deadline)
    return NextResponse.json("");
};