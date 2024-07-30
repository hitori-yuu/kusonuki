import prisma from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export async function GET(req: Request,
    { params }: { params: { userId: string }}
) {
    const id = params.userId
    const userData = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });
    console.log(userData);
    return NextResponse.json(userData)
};