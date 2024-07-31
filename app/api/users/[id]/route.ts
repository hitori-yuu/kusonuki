import prisma from "@/lib/prismaClient"
import { NextResponse } from "next/server"

export async function GET(req: Request,
    { params }: { params: { id: string }}
) {
    const id = params.id
    const userData = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });
    return NextResponse.json(userData)
};