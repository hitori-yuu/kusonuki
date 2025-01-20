import prisma from "@/lib/prismaClient";
import {
	CreateAssignment,
	findAssignmentsByDate,
	findAssignmentsByRange,
	getAllAssignments,
} from "@/lib/server/actions";
import { AssignmentData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to retrieve assignment data based on query parameters.
 *
 * @remarks
 * This function supports filtering assignments by academic year, grade, class name,
 * and optionally by date range or specific due date.
 *
 * @param req - The Next.js request object containing search parameters
 * @returns A JSON response with filtered assignment data
 *
 * @throws {Error} If required parameters (academicYear, grade, className) are missing
 *
 * @example
 * // Retrieve assignments for a specific academic year, grade, and class
 * GET /assignments?academicYear=2024&grade=10&className=Mathematics
 *
 * @example
 * // Retrieve assignments within a specific date range
 * GET /assignments?academicYear=2024&grade=10&className=Mathematics&dateRange=30
 *
 * @example
 * // Retrieve assignments for a specific due date
 * GET /assignments?academicYear=2024&grade=10&className=Mathematics&dueDate=2024-05-15
 */
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

/**
 * Handles the creation of a new assignment via HTTP POST request.
 *
 * @remarks
 * Extracts assignment details from the request body and creates a new assignment using the CreateAssignment function.
 *
 * @param req - The incoming HTTP request containing assignment details in JSON format
 * @returns A JSON response with the newly created assignment
 *
 * @throws {Error} If the request body is invalid or assignment creation fails
 */
export async function POST(req: Request) {
	const { title, subject, dueDate, grade, className, isEvery, authorId } = await req.json();

	const assignment = await CreateAssignment(
		title,
		subject,
		dueDate,
		grade,
		className,
		isEvery,
		authorId,
	);
	return NextResponse.json(assignment);
}
