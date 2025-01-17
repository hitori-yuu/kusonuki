import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;
	const quizData = await prisma.quiz.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json(quizData);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
    const quizData = await prisma.quiz.delete({
        where: {
            id: parseInt(id),
        },
    });
    return NextResponse.json({ message: "Deleted quiz with Scope: " + quizData.scope });
}
