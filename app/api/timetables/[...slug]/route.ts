import prisma from '@/lib/prismaClient';
import { NextResponse } from 'next/server'

export async function GET(req: Request,
    { params }: { params: { slug: any }}
) {
    const grade = params.slug[0];
    const group = params.slug[1];
    const week = params.slug[2];
    const day = params.slug[3];
    const allTimetable = await prisma.timetable.findFirst({
        where: {
            grade: parseInt(grade),
            group: group,
            week: week,
            day: day,
        },
    })
    return NextResponse.json(allTimetable)
};