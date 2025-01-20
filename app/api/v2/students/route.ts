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
