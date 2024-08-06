import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const allTimetable = await prisma.timetable.findMany({
        orderBy: [
            {
                group: 'asc',
            },
            {
                week: 'asc',
            },
            {
                day: 'asc',
            },
        ]
    })
    return NextResponse.json(allTimetable)
};

export async function POST(req: Request) {
    const { id, week, day, grade, group, first, second, third, fourth, fifth, authorId, createdAt, updatedAt } = await req.json();
    const created_at = new Date(createdAt)
    const updated_at = new Date(updatedAt)

    const timetable = await prisma.timetable.create({
        data: {
            id, week, day, grade, group, first, second, third, fourth, fifth, authorId, createdAt: created_at, updatedAt: updated_at
        }
    });
    return NextResponse.json(timetable)
}
