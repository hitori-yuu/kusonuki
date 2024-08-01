import prisma from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request,
    { params }: { params: { slug: any }}
) {
    const grade = params.slug[0];
    const group = params.slug[1];
    const range = new Date(params.slug[2]);
    const allAssignment = await prisma.assignment.findMany({
        where: {
            grade: parseInt(grade),
            group: group,
            AND: [{
                deadline: {
                    lte: range,
                    gte: new Date()
                },
            }]
        },
        orderBy: [
            {
                deadline: 'desc',
            },
        ]
    })
    return NextResponse.json(allAssignment)
};