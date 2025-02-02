"use server";

import { MediaType, PostData, StudentData, UserData } from "@/types/types";
import prisma from "../prismaClient";
import { cache } from "react";
import { getFiscalYear } from "../utils";
import { mediaType, Role } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

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

export async function CreateUser(id: string, displayName: string, pictureUrl: string) {
	try {
		const userData = await prisma.user.create({
			data: {
				id,
				displayName,
				pictureUrl,
			},
		});
		return userData;
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
}

export async function UpdateUser(id: string, displayName: string, pictureUrl: string) {
	try {
		const userData = await prisma.user.update({
			where: {
				id,
			},
			data: {
				displayName,
				pictureUrl,
			},
		});
		return userData;
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
}

export async function CreateStudent(
	fullName: string,
	enrollmentYear: number,
	currentGrade: number,
	currentClass: string,
	currentNumber: number,
) {
	try {
		const studentData = await prisma.student.create({
			data: {
				fullName,
				enrollmentYear,
				currentGrade,
				currentClass,
				currentNumber,
			},
		});
		return studentData;
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
}

export async function CreateStudentHistory(
	fullName: string,
	enrollmentYear: number,
	academicYear: number,
	grade: number,
	className: string,
	number: number,
) {
	try {
		const studentData = await prisma.student.findFirst({
			where: {
				fullName,
				enrollmentYear,
			},
		});
		if (studentData) {
			const studentHistoryData = await prisma.studentHistory.create({
				data: {
					studentId: studentData.id,
					academicYear,
					grade,
					className,
					number,
				},
			});
			return studentHistoryData;
		} else {
			return;
		}
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
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
	subject: string,
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

export async function DeleteAssignment(id: number) {
	try {
		await prisma.assignment.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateQuiz(
	scope: string,
	subject: string,
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

export async function DeleteQuiz(id: number) {
	try {
		await prisma.quiz.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateTimetable(
	week: string,
	day: string,
	first: string,
	second: string,
	third: string,
	fourth: string,
	fifth: string,
	grade: number,
	className: string,
	authorId: string,
) {
	try {
		await prisma.timetable.create({
			data: {
				week,
				day,
				first,
				second,
				third,
				fourth,
				fifth,
				academicYear: getFiscalYear(),
				grade,
				className,
				authorId,
			},
		});
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

export async function CreatePost(username: string, content: string, authorId: string) {
	try {
		await prisma.post.create({
			data: {
				username,
				content,
				authorId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreatePostMedia(
	username: string,
	content: string,
	mediaUrl: string,
	mediaType: mediaType,
	authorId: string,
) {
	try {
		await prisma.post.create({
			data: {
				username,
				content,
				mediaUrl,
				mediaType,
				authorId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateDocument(
	title: string,
	fileUrl: string,
	subject: string,
	grade: number,
	className: string,
	authorId: string,
) {
	try {
		await prisma.document.create({
			data: {
				title,
				fileUrl,
				subject,
				academicYear: getFiscalYear(),
				grade,
				className,
				authorId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function searchStudent(lastName: string, firstName: string, grade: number, group: string, number: number) {
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

export async function findStudentByCurrent(currentGrade: number, currentClass: string, currentNumber: number) {
	const student = await prisma.student.findFirst({
		where: {
			currentGrade,
			currentClass,
			currentNumber,
		},
	});
	return student;
}

export async function findStudentByFullName(fullName: string, grade: number, group: string, number: number) {
	const student = await prisma.student.findFirst({
		where: {
			fullName,
			currentGrade: grade,
			currentClass: group,
			currentNumber: number,
		},
	});
	return student;
}

export async function findStudentByHistory(academicYear: number, grade: number, className: string, number: number) {
	const studentHistory = await prisma.studentHistory.findFirst({
		where: {
			academicYear,
			grade,
			className,
			number,
		},
	});
	const student = await prisma.student.findUnique({
		where: {
			id: studentHistory?.studentId,
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

export async function findAssignmentsByRange(
	academicYear: number,
	grade: number,
	className: string,
	dateRange: number,
) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const after = new Date(today);
	after.setDate(today.getDate() + dateRange);
	const assignments = await prisma.assignment.findMany({
		where: {
			academicYear,
			grade,
			OR: [
				{
					className,
				},
				{
					isEvery: true,
				},
			],
			AND: [
				{
					dueDate: {
						lte: after,
						gte: today,
					},
				},
			],
		},
	});

	return assignments;
}

export async function findAssignmentsByDate(academicYear: number, grade: number, className: string, dueDate: Date) {
	const assignments = await prisma.assignment.findMany({
		where: {
			academicYear,
			grade,
			dueDate,
			OR: [
				{
					className,
				},
				{
					isEvery: true,
				},
			],
		},
	});

	return assignments;
}

export async function findHistoryByStudent(studentId: number) {
	const history = await prisma.studentHistory.findMany({
		where: {
			studentId,
		},
		orderBy: [
			{
				academicYear: "asc",
			},
		],
	});
	return history;
}

export async function findQuizByRange(academicYear: number, grade: number, className: string, dateRange: number) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const after = new Date(today);
	after.setDate(today.getDate() + dateRange);

	const quiz = await prisma.quiz.findMany({
		where: {
			academicYear,
			grade,
			OR: [
				{
					className,
				},
				{
					isEvery: true,
				},
			],
			AND: [
				{
					testDate: {
						lte: after,
						gte: today,
					},
				},
			],
		},
	});
	return quiz;
}

export async function findQuizByDate(academicYear: number, grade: number, className: string, testDate: Date) {
	const quiz = await prisma.quiz.findMany({
		where: {
			academicYear,
			grade,
			testDate,
			OR: [
				{
					className,
				},
				{
					isEvery: true,
				},
			],
		},
	});

	return quiz;
}

export async function getAllQuiz() {
	const quiz = await prisma.quiz.findMany({
		orderBy: [
			{
				createdAt: "desc",
			},
		],
	});

	return quiz;
}
export async function getAllChanges() {
	const changes = await prisma.change.findMany({
		orderBy: [
			{
				createdAt: "desc",
			},
		],
	});

	return changes;
}

export async function getAllDocuments() {
	const assignments = await prisma.document.findMany({
		orderBy: [
			{
				createdAt: "desc",
			},
		],
	});

	return assignments;
}

export async function getAllUsers(): Promise<UserData[]> {
	const result = await prisma.user.findMany({
		orderBy: [
			{
				displayName: "desc",
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
		include: {
			student: {},
			Assignment: {
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			},
			Quiz: {
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			},
			Schedule: {
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			},
			Post: {
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			},
			Document: {
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			},
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
				createdAt: "desc",
			},
		],
	});

	return result as PostData[];
}

export async function getPost(postId: number): Promise<PostData> {
	const result = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	return result as PostData;
}
