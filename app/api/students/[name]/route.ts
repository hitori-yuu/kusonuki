import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // GET /api/users/[id] リクエストの処理
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { name, group, number, grade } = await req.json();
    let student;

    if (grade == 1) {
        student = await prisma.student.update({
            where: {
                name: name,
            },
            data: {
                firstGroup: group,
                firstNumber: number,
            }
        });
    } else if (grade == 2) {
        student = await prisma.student.update({
            where: {
                name: name,
            },
            data: {
                secondGroup: group,
                secondNumber: number,
            }
        });
    } else {
        student = await prisma.student.update({
            where: {
                name: name,
            },
            data: {
                thirdGroup: group,
                thirdNumber: number,
            }
        });
    }

    return NextResponse.json(student)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    // DELETE /api/users/[id] リクエストの処理
}