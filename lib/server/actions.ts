"use server";

import { PostData, StudentData, UserData } from "@/types/types";
import prisma from "../prismaClient";
import { cache } from "react";
import { getFiscalYear } from "../utils";

const classNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export async function LinkUser(
	lastName: string,
	firstName: string,
	currentGrade: number,
	currentClass: string,
	currentNumber: number,
	authorId: string,
) {
	try {
		const student = await searchStudent(lastName, firstName, currentGrade, currentClass, currentNumber);

		if (!student) return;

		await prisma.user.update({
			where: {
				id: authorId,
			},
			data: {
				studentName: lastName + firstName,
				studentId: student.id,
				isLinked: true,
			},
		});
		await prisma.student.update({
			where: {
				id: student.id,
			},
			data: {
				lastName: lastName,
				firstName: firstName,
				isLinked: true,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateStudent(fullName: string, enrollmentYear: number, currentGrade: number, currentClass: string, currentNumber: number) {
	try {
		await prisma.student.create({
            data: {
                fullName,
                enrollmentYear,
                currentGrade,
                currentClass,
                currentNumber,
                isActive: true,
                isLinked: false,
            },
        });
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateInformation(title: string, content: string, authorId: string) {
	try {
		await prisma.information.create({
			data: {
				title,
				content,
				date: new Date(),
				authorId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateAssignment(
	title: string,
	subject : string,
	dueDate: Date,
	grade: number,
	className: string,
	isEvery: boolean,
	authorId: string,
) {
	try {
		dueDate.setDate(dueDate.getDate() + 1);
		if (isEvery) {
			await prisma.assignment.create({
				data: {
					title,
					subject,
					dueDate,
					academicYear: getFiscalYear(),
					grade,
                    className,
                    isEvery: true,
                    authorId,
				},
			});
		} else {
			await prisma.assignment.create({
				data: {
					title,
					subject,
					dueDate,
					academicYear: getFiscalYear(),
					grade,
                    className,
                    isEvery: false,
                    authorId,
				},
			});
		}
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateQuiz(
	scope: string,
	subject : string,
	testDate: Date,
	grade: number,
	className: string,
	isEvery: boolean,
	authorId: string,
) {
	try {
		testDate.setDate(testDate.getDate() + 1);
		if (isEvery) {
			await prisma.quiz.create({
				data: {
					scope,
					subject,
					testDate,
					academicYear: getFiscalYear(),
					grade,
                    className,
                    isEvery: true,
                    authorId,
				},
			});
		} else {
			await prisma.quiz.create({
				data: {
					scope,
					subject,
					testDate,
					academicYear: getFiscalYear(),
					grade,
                    className,
                    isEvery: false,
                    authorId,
				},
			});
		}
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateExam(
	term: string,
	subject: string,
	scopeItems: string[],
	excludedItems: string[],
	grade: number,
    authorId: string,
) {
	try {
		await prisma.examScope.create({
			data: {
				term,
				subject,
				scopeItems,
				excludedItems,
				academicYear: getFiscalYear(),
				grade,
				authorId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateSchedule(
    date: Date,
    content: string,
    grade: number,
    className: string,
    isEvery: boolean,
	authorId: string,
) {
	try {
		date.setDate(date.getDate() + 1);
		if (isEvery) {
			await prisma.schedule.create({
				data: {
					date,
					content,
					academicYear: getFiscalYear(),
					grade,
					className,
					isEvery: true,
					authorId,
				},
			});
		} else {
			await prisma.schedule.create({
				data: {
					date,
					content,
					academicYear: getFiscalYear(),
					grade,
					className,
					isEvery: false,
					authorId,
				},
			});
		}
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateChange(
    date: Date,
    period: number,
	subject: string,
    grade: number,
    className: string,
    isEvery: boolean,
	authorId: string,
) {
	try {
		date.setDate(date.getDate() + 1);
		if (isEvery) {
			await prisma.change.create({
				data: {
					date,
					period,
					subject,
					academicYear: getFiscalYear(),
					grade,
					className,
					isEvery: true,
					authorId,
				},
			});
		} else {
			await prisma.change.create({
				data: {
					date,
					period,
					subject,
					academicYear: getFiscalYear(),
					grade,
					className,
					isEvery: false,
					authorId,
				},
			});
		}
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateExamSchedule(
	date: Date,
	period: string,
	timetable: string[],
    grade: number,
	authorId: string,
) {
	try {
		date.setDate(date.getDate() + 1);
		await prisma.examSchedule.create({
			data: {
				date,
				period,
				academicYear: getFiscalYear(),
				grade,
				timetable,
				authorId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function searchStudent(
	lastName: string,
	firstName: string,
	grade: number,
	group: string,
	number: number,
) {
	const student = await prisma.student.findFirst({
		where: {
			fullName: lastName + firstName,
			currentGrade: grade,
			currentClass: group,
			currentNumber: number,
		},
	});
	return student;
}

export async function getAssignments(grade: number, group: string, rangeDays: number) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const after = new Date(today);
	after.setDate(today.getDate() + rangeDays);

	const assignments = await prisma.assignment.findMany({
		where: {
			academicYear: getFiscalYear(),
			grade: grade,
			className: group,
			AND: [
				{
					dueDate: {
						lte: after,
						gte: today,
					},
				},
			],
		},
		orderBy: [
			{
				dueDate: "asc",
			},
		],
	});

	return assignments;
}

export async function getQuiz(grade: number, group: string, date: Date) {
	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const quiz = await prisma.quiz.findMany({
		where: {
			academicYear: getFiscalYear(),
			grade: grade,
			className: group,
			AND: [
				{
					testDate: {
						lte: after,
						gt: inputDate,
					},
				},
			],
		},
	});

	return quiz;
}

export async function getTimetable(grade: number, group: string, week: string, day: string) {
	const timetable = await prisma.timetable.findMany({
		where: {
			academicYear: getFiscalYear(),
			grade: grade,
			className: group,
			week: week,
			day: day,
		},
		orderBy: [
			{
				createdAt: "desc",
			},
		],
	});

	return timetable;
}

export async function getSchedules(grade: number, group: string, date: Date) {
	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const schedule = await prisma.schedule.findMany({
		where: {
			academicYear: getFiscalYear(),
			grade: grade,
			OR: [
				{
					className: group,
				},
				{
					isEvery: true,
				},
			],
			AND: [
				{
					date: {
						gt: inputDate,
						lte: after,
					},
				},
			],
		},
	});
	return schedule;
}

export async function getExamSchedules(grade: number, date: Date) {
	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const examSchedules = await prisma.examSchedule.findFirst({
		where: {
			academicYear: getFiscalYear(),
			grade: grade,
			AND: [
				{
					date: {
						lte: after,
						gt: inputDate,
					},
				},
			],
		},
		orderBy: [
			{
				date: "desc",
			},
		],
	});
	return examSchedules;
}

export async function getAllAssignments() {
	const assignments = await prisma.assignment.findMany({
		orderBy: [
			{
				createdAt: "asc",
			},
		],
	});

	return assignments;
}
export async function getAllQuiz() {
	const quizs = await prisma.quiz.findMany({
		orderBy: [
			{
				createdAt: "asc",
			},
		],
	});

	return quizs;
}
export async function getAllChanges() {
	const changes = await prisma.change.findMany({
		orderBy: [
			{
				createdAt: "asc",
			},
		],
	});

	return changes;
}

export async function getAllUsers(): Promise<UserData[]> {
	const result = await prisma.user.findMany({
		orderBy: [
			{
				displayName: "asc",
			},
		],
	});

	return result as unknown as UserData[];
}

export const User = cache(async (userId: string): Promise<UserData> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	return user as unknown as UserData;
});

export const getAllStudents = cache(async (): Promise<StudentData[]> => {
	const result = await prisma.student.findMany({
		orderBy: [
			{
				currentGrade: "asc",
			},
			{
				currentClass: "asc",
			},
			{
				currentNumber: "asc",
			},
		],
	});

	return result as StudentData[];
});

export async function Student(studentId: number): Promise<StudentData> {
    const student = await prisma.student.findUnique({
        where: {
            id: studentId,
        },
    });

    return student as StudentData;
}

export async function getAllPosts(): Promise<PostData[]> {
	const result = await prisma.post.findMany({
		orderBy: [
			{
				createdAt: "asc",
			},
		],
	});

	return result as unknown as PostData[];
}

export async function getPost(): Promise<PostData> {
	const result = await prisma.post.findMany({
		orderBy: [
			{
				createdAt: "asc",
			},
		],
	});

	return result as unknown as PostData;
}
