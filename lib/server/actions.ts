"use server";

import { MediaType, PostData, StudentData, UserData } from "@/types/types";
import prisma from "../prismaClient";
import { cache } from "react";
import { getFiscalYear } from "../utils";
import { Role } from "@prisma/client";

const classNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

/**
 * Links a user to a student by updating their respective records.
 *
 * @remarks
 * This function searches for a student using provided details and updates both the user and student records to establish a link.
 *
 * @param lastName - The last name of the student
 * @param firstName - The first name of the student
 * @param currentGrade - The current grade of the student
 * @param currentClass - The current class of the student
 * @param currentNumber - The student's number within the class
 * @param authorId - The unique identifier of the user to be linked
 *
 * @returns Void
 *
 * @throws {Error} Throws a "Database error" if any database operation fails
 */
export async function LinkUser(
	lastName: string,
	firstName: string,
	currentGrade: number,
	currentClass: string,
	currentNumber: number,
	authorId: string,
) {
	try {
		const student = await searchStudent(
			lastName,
			firstName,
			currentGrade,
			currentClass,
			currentNumber,
		);

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

/**
 * Creates a new user in the database.
 *
 * @remarks
 * This function uses Prisma to insert a new user record with the provided details.
 *
 * @param id - The unique identifier for the user
 * @param displayName - The user's display name
 * @param pictureUrl - URL of the user's profile picture
 * @param role - The role assigned to the user
 * @returns The newly created user data
 *
 * @throws {Error} Throws a "Database error" if user creation fails
 */
export async function CreateUser(id: string, displayName: string, pictureUrl: string, role: Role) {
	try {
		const userData = await prisma.user.create({
			data: {
				id,
				displayName,
				pictureUrl,
				role,
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

/**
 * Creates a student history record for an existing student.
 *
 * @remarks
 * This function searches for a student by full name and enrollment year, and if found, creates a corresponding student history record.
 *
 * @param fullName - The full name of the student
 * @param enrollmentYear - The year the student was enrolled
 * @param academicYear - The academic year for the history record
 * @param grade - The grade level of the student
 * @param className - The class name for the student
 * @param number - The student's number or identifier within the class
 * @returns The created student history record or undefined if no student is found
 *
 * @throws {Error} Throws a "Database error" if there's an issue with database operations
 */
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

/**
 * Creates a new assignment in the database.
 *
 * @remarks
 * This function allows creating an assignment with optional recurring configuration. It automatically sets the academic year and adjusts the due date.
 *
 * @param title - The title of the assignment
 * @param subject - The subject of the assignment
 * @param dueDate - The due date for the assignment
 * @param grade - The grade level for the assignment
 * @param className - The class name associated with the assignment
 * @param isEvery - Flag indicating whether the assignment recurs
 * @param authorId - The ID of the user creating the assignment
 *
 * @throws {Error} Throws a "Database error" if the assignment creation fails
 *
 * @beta
 */
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

/**
 * Deletes an assignment from the database by its unique identifier.
 *
 * @param id - The unique numeric identifier of the assignment to be deleted
 * @throws {Error} Throws a "Database error" if deletion fails
 *
 * @remarks
 * This function attempts to remove a specific assignment record from the database.
 * If the deletion process encounters any issues, it logs the error and throws a generic database error.
 */
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

/**
 * Creates a new quiz record in the database.
 *
 * @remarks
 * This function allows creating a quiz with optional recurring configuration. It automatically sets the academic year using the fiscal year.
 *
 * @param scope - The scope or content area of the quiz
 * @param subject - The subject of the quiz
 * @param testDate - The date when the quiz will be conducted
 * @param grade - The grade level for which the quiz is created
 * @param className - The specific class associated with the quiz
 * @param isEvery - Flag indicating whether the quiz is a recurring event
 * @param authorId - The identifier of the user creating the quiz
 *
 * @throws {Error} Throws a "Database error" if quiz creation fails
 *
 * @beta
 */
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

/**
 * Deletes a quiz from the database by its unique identifier.
 *
 * @param id - The unique identifier of the quiz to be deleted
 * @throws {Error} Throws a "Database error" if deletion fails
 *
 * @remarks
 * This function attempts to remove a specific quiz record from the database.
 * If the deletion process encounters any issues, it logs the error and throws a generic database error.
 */
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

/**
 * Creates an exam schedule in the database.
 *
 * @param date - The date of the exam schedule
 * @param period - The period or time slot for the exam schedule
 * @param timetable - An array of timetable entries for the exam
 * @param grade - The grade level for which the exam schedule is created
 * @param authorId - The ID of the user creating the exam schedule
 *
 * @remarks
 * This function automatically adjusts the date by adding one day and calculates the academic year using getFiscalYear().
 * Throws a "Database error" if there's an issue creating the exam schedule.
 */
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

/**
 * Creates a new post in the database.
 *
 * @param username - The username associated with the post
 * @param content - The text content of the post
 * @param authorId - The unique identifier of the post's author
 * @throws {Error} Throws a "Database error" if post creation fails
 *
 * @remarks
 * This function attempts to create a post record in the database using Prisma ORM.
 * If an error occurs during post creation, it logs the error and throws a generic database error.
 */
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

export async function findStudentByCurrent(
	currentGrade: number,
	currentClass: string,
	currentNumber: number,
) {
	const student = await prisma.student.findFirst({
		where: {
			currentGrade,
			currentClass,
			currentNumber,
		},
	});
	return student;
}

export async function findStudentByFullName(
	fullName: string,
	grade: number,
	group: string,
	number: number,
) {
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

/**
 * Finds a student by their historical academic information.
 * 
 * @param academicYear - The academic year of the student's history
 * @param grade - The grade level of the student
 * @param className - The class name associated with the student
 * @param number - The student's number within the class
 * @returns The student record matching the provided historical information, or null if no student is found
 * 
 * @remarks
 * This function first searches the student history based on the provided parameters,
 * then retrieves the corresponding student record using the student ID from the history.
 */
export async function findStudentByHistory(
	academicYear: number,
	grade: number,
	className: string,
	number: number,
) {
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

/**
 * Retrieves assignments within a specified date range for a given academic context.
 *
 * @param academicYear - The academic year of the assignments
 * @param grade - The grade level for which assignments are being retrieved
 * @param className - The specific class name to filter assignments
 * @param dateRange - Number of days from today to search for assignments
 * @returns An array of assignments matching the specified criteria
 *
 * @remarks
 * This function searches for assignments that:
 * - Match the specified academic year and grade
 * - Belong to the specified class or are marked as applicable to all classes
 * - Are due within the specified date range from today
 */
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

/**
 * Retrieves assignments for a specific date, grade, and class.
 * 
 * @param academicYear - The academic year of the assignments
 * @param grade - The grade level of the assignments
 * @param className - The specific class name for the assignments
 * @param dueDate - The exact date when assignments are due
 * @returns An array of assignments matching the specified criteria
 * 
 * @remarks
 * This function searches for assignments that are either specific to the given class
 * or marked as applicable to all classes (isEvery: true).
 */
export async function findAssignmentsByDate(
	academicYear: number,
	grade: number,
	className: string,
	dueDate: Date,
) {
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

/**
 * Retrieves the academic history for a specific student.
 *
 * @param studentId - The unique identifier of the student
 * @returns An array of student history records, sorted by academic year in ascending order
 *
 * @remarks
 * This function queries the database to find all history records associated with a given student ID.
 * The results are sorted chronologically from the earliest to the latest academic year.
 */
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

/**
 * Retrieves quizzes within a specified date range for a given academic year, grade, and class.
 *
 * @param academicYear - The academic year of the quizzes
 * @param grade - The grade level of the quizzes
 * @param className - The specific class name for the quizzes
 * @param dateRange - The number of days from today to search for quizzes
 * @returns An array of quizzes matching the specified criteria
 *
 * @remarks
 * This function searches for quizzes that:
 * - Match the specified academic year and grade
 * - Belong to the specified class or are marked as applicable to every class
 * - Have a test date within the specified date range from today
 */
export async function findQuizByRange(
	academicYear: number,
	grade: number,
	className: string,
	dateRange: number,
) {
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

/**
 * Retrieves quizzes for a specific date, grade, and class.
 *
 * @param academicYear - The academic year of the quizzes
 * @param grade - The grade level of the quizzes
 * @param className - The specific class name
 * @param testDate - The date of the quiz
 * @returns An array of quizzes matching the specified criteria
 *
 * @remarks
 * This function searches for quizzes that either belong to a specific class or are marked as applicable to all classes.
 */
export async function findQuizByDate(
	academicYear: number,
	grade: number,
	className: string,
	testDate: Date,
) {
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
				createdAt: "asc",
			},
		],
	});

	return quiz;
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
