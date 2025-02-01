import prisma from "@/lib/prismaClient";
import {
	CreateAssignment,
	findAssignmentsByDate,
	findAssignmentsByRange,
	getAllAssignments,
} from "@/lib/server/actions";
import { AssignmentData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const academicYear = params.get("academicYear");
	const grade = params.get("grade");
	const className = params.get("className");
	const dateRange = params.get("dateRange");
	const dueDate = params.get("dueDate");

	if (academicYear && grade && className) {
		if (dateRange) {
			const quizData = (await findAssignmentsByRange(
				parseInt(academicYear),
				parseInt(grade),
				className,
				parseInt(dateRange),
			)) as AssignmentData[];
			return NextResponse.json(quizData);
		} else if (dueDate) {
			const quizData = (await findAssignmentsByDate(
				parseInt(academicYear),
				parseInt(grade),
				className,
				new Date(dueDate),
			)) as AssignmentData[];
			return NextResponse.json(quizData);
		} else {
			const allQuiz = (await getAllAssignments()) as AssignmentData[];
			return NextResponse.json(allQuiz);
		}
	}
}

export async function POST(req: Request) {
	const { title, subject, dueDate, grade, className, isEvery, authorId } = await req.json();

	const assignment = await CreateAssignment(title, subject, dueDate, grade, className, isEvery, authorId);
	return NextResponse.json(assignment);
}
