import {
	CreateStudent,
	CreateStudentHistory,
	findStudentByCurrent,
	findStudentByFullName,
	findStudentByHistory,
	getAllStudents,
} from "@/lib/server/actions";
import { StudentData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests for retrieving student data.
 *
 * @remarks
 * This method supports multiple query parameter combinations to fetch student information:
 * - Retrieve a specific student by full name and current details
 * - Retrieve a student's historical data for a specific academic year
 * - Retrieve a student's current information
 * - Retrieve all students if no specific parameters are provided
 *
 * @param req - The Next.js request object containing search parameters
 * @returns A JSON response with student data matching the query parameters
 *
 * @throws Will return an empty array or all students if no matching records are found
 *
 * @example
 * // Retrieve a student by full name
 * GET /api/v2/students?fullName=John%20Doe&grade=10&className=A&number=15
 *
 * @example
 * // Retrieve historical student data
 * GET /api/v2/students?academicYear=2022&grade=9&className=B&number=20
 *
 * @example
 * // Retrieve all students
 * GET /api/v2/students
 */
export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const academicYear = params.get("academicYear");
	const grade = params.get("grade");
	const className = params.get("className");
	const number = params.get("number");
	const fullName = params.get("fullName");

	if (grade && className && number) {
		if (fullName) {
			const studentData = (await findStudentByFullName(
				fullName,
				parseInt(grade),
				className,
				parseInt(number),
			)) as StudentData;
			return NextResponse.json(studentData);
		} else if (academicYear) {
			const studentData = (await findStudentByHistory(
				parseInt(academicYear),
				parseInt(grade),
				className,
				parseInt(number),
			)) as StudentData;
			return NextResponse.json(studentData);
		} else {
			const studentData = (await findStudentByCurrent(
				parseInt(grade),
				className,
				parseInt(number),
			)) as StudentData;
			return NextResponse.json(studentData);
		}
	}

	const allStudent = await getAllStudents();
	return NextResponse.json(allStudent);
}

/**
 * Handles POST requests for creating or updating student records.
 *
 * @remarks
 * This function processes student data submissions with two primary scenarios:
 * 1. Creating a new student record when no academic year is specified
 * 2. Creating a student history record when an academic year is provided
 *
 * @param req - The incoming Next.js request containing student data
 * @returns A JSON response with the created student or student history record
 *
 * @throws {Error} If required student data is missing or invalid
 *
 * @example
 * // Create a new student
 * POST /api/v2/students
 * {
 *   "fullName": "John Doe",
 *   "enrollmentYear": 2023,
 *   "currentGrade": 10,
 *   "currentClass": "A",
 *   "currentNumber": 15
 * }
 *
 * @example
 * // Create a student history record
 * POST /api/v2/students
 * {
 *   "fullName": "Jane Smith",
 *   "enrollmentYear": 2022,
 *   "academicYear": 2023,
 *   "grade": 11,
 *   "className": "B",
 *   "number": 20
 * }
 */
export async function POST(req: NextRequest) {
	const {
		fullName,
		enrollmentYear,
		currentGrade,
		currentClass,
		currentNumber,
		academicYear,
		grade,
		className,
		number,
	} = await req.json();
	if (academicYear) {
		const student = await CreateStudentHistory(
			fullName,
			enrollmentYear,
			academicYear,
			grade,
			className,
			number,
		);
		return NextResponse.json(student);
	} else {
		const student = await CreateStudent(
			fullName,
			enrollmentYear,
			currentGrade,
			currentClass,
			currentNumber,
		);
		return NextResponse.json(student);
	}
}
