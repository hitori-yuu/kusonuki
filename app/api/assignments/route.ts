import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const allAssignment = await prisma.assignment.findMany({
        orderBy: [
            {
                deadline: 'desc',
            },
        ]
    })
    return NextResponse.json(allAssignment)
};

export async function POST(req: Request) {
    const { name, subject, deadline, authorId } = await req.json();

    const assignment = await prisma.assignment.create({
        data: {
            name,
            subject,
            deadline,
            authorId
        }
    });
    return NextResponse.json(assignment)
};