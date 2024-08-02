import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const allUser = await prisma.user.findMany({
        orderBy: [
            {
                displayName: 'asc',
            },
        ]
    })
    return NextResponse.json(allUser)
};

export async function POST(req: Request) {
    const { id, displayName, pictureUrl } = await req.json();

    const user = await prisma.user.create({
        data: {
            id,
            displayName,
            pictureUrl,
        }
    });
    return NextResponse.json(user)
}
