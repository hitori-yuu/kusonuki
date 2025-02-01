import prisma from "@/lib/prismaClient";
import {
	CreateAssignment,
	CreateQuiz,
	findQuizByDate,
	findQuizByRange,
	getAllAssignments,
	getAllQuiz,
} from "@/lib/server/actions";
import { QuizData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const academicYear = params.get("academicYear");
	const grade = params.get("grade");
	const className = params.get("className");
	const dateRange = params.get("dateRange");
	const testDate = params.get("testDate");

	if (academicYear && grade && className) {
		if (dateRange) {
			const quizData = (await findQuizByRange(
				parseInt(academicYear),
				parseInt(grade),
				className,
				parseInt(dateRange),
			)) as QuizData[];
			return NextResponse.json(quizData);
		} else if (testDate) {
			const quizData = (await findQuizByDate(
				parseInt(academicYear),
				parseInt(grade),
				className,
				new Date(testDate),
			)) as QuizData[];
			return NextResponse.json(quizData);
		} else {
			const allQuiz = (await getAllQuiz()) as QuizData[];
			return NextResponse.json(allQuiz);
		}
	} else {
		const allQuiz = (await getAllQuiz()) as QuizData[];
		return NextResponse.json(allQuiz);
	}
}

export async function POST(req: Request) {
	const { scope, subject, testDate, grade, className, isEvery, authorId } = await req.json();

	const assignment = await CreateQuiz(scope, subject, testDate, grade, className, isEvery, authorId);
	return NextResponse.json(assignment);
}
