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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
    const userData = await prisma.user.delete({
        where: {
            id,
        },
    });
    return NextResponse.json({ message: "Deleted user with DisplayName: " + userData.displayName });
}
