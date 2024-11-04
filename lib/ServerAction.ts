"use server";

import { StudentData, UserData } from "@/types/types";
import prisma from "./prismaClient";
import { cache } from "react";

export async function LinkUser(
	lastName: string,
	firstName: string,
	grade: number,
	group: string,
	number: number,
	authorId: string,
) {
	try {
		await prisma.user.update({
			where: {
				id: authorId,
			},
			data: {
				studentName: lastName + firstName,
				isLinked: true,
			},
		});
		await prisma.student.update({
			where: {
				name: lastName + firstName,
				grade: grade,
				group: group,
				number: number,
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

export async function CreateInformation(
	title: string,
	content: string,
	authorId: string,
) {
	try {
		await prisma.information.create({
			data: {
				title,
                content,
				date: new Date(),
                authorId,
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateAssignment(
	name: string,
	grade: number,
	group: string,
	subject: string,
	deadline: Date,
	authorId: string,
) {
	try {
		deadline.setDate(deadline.getDate() + 1);
		await prisma.assignment.create({
            data: {
                name,
                grade,
                group,
                subject,
                deadline,
                authorId,
            }
        });

	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateTest(
	name: string,
	grade: number,
	group: string,
	subject: string,
	implementationDate: Date,
	authorId: string,
) {
	try {
		implementationDate.setDate(implementationDate.getDate() + 1);
		await prisma.test.create({
            data: {
                name,
                grade,
                group,
                subject,
                implementationDate,
                authorId,
            }
        });

	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateExam(
	grade: number,
	term: string,
	subject: string,
	scope: string,
	exclusion: string,
	authorId: string,
) {
	try {
		await prisma.exam.create({
            data: {
                grade,
				term,
                subject,
				scope,
				exclusion,
                authorId,
            }
        });

	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateSchedule(
	grade: number,
	group: string,
	content: string,
	date: Date,
	authorId: string,
) {
	try {
		date.setDate(date.getDate() + 1);
		await prisma.schedule.create({
            data: {
                grade,
                group,
				date,
				content,
                authorId,
            }
        });

	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateChange(
	grade: number,
	group: string,
	subject: string,
	period: number,
	date: Date,
	authorId: string,
) {
	try {
		date.setDate(date.getDate() + 1);
		await prisma.change.create({
            data: {
                grade,
                group,
				date,
				period,
				subject,
                authorId,
            }
        });

	} catch (error) {
		console.log(error);
		throw new Error("Database error");
	}
	return;
}

export async function CreateExamSchedule(
	grade: number,
	date: Date,
	period: string,
	timetable: string[],
	authorId: string,
) {
	try {
		date.setDate(date.getDate() + 1);
		await prisma.examSchedule.create({
            data: {
				grade,
				period,
				date,
				timetable,
				authorId,
            }
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
			name: lastName + firstName,
			grade: grade,
			group: group,
			number: number,
		},
	});
	if (student) {
		return true;
	} else {
		return false;
	}
}

export async function getAssignments(
	grade: number,
    group: string,
	rangeDays: number,
) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const after = new Date(today);
	after.setDate(today.getDate() + rangeDays);

	const assignments = await prisma.assignment.findMany({
		where: {
			grade: grade,
			group: group,
			AND: [
				{
					deadline: {
						lte: after,
						gte: today,
					},
				},
			],
		},
		orderBy: [
			{
				deadline: "asc",
			},
		],
	});

	return assignments;
}

export async function getTests(
	grade: number,
    group: string,
	date: Date,
) {
	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const tests = await prisma.test.findMany({
		where: {
			grade: grade,
			group: group,
			AND: [
				{
					implementationDate: {
						lte: after,
						gt: inputDate,
					},
				},
			],
		},
	});

	return tests;
}

export async function getTimetable(
	grade: number,
    group: string,
    week: string,
    day: string,
) {
	const timetable = await prisma.timetable.findFirst({
		where: {
			grade: grade,
			group: group,
			week: week,
			day: day,
		},
	});

	return timetable;
}

export async function getSchedules(
	grade: number,
    group: string,
	date: Date,
) {
	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const schedule = await prisma.schedule.findMany({
		where: {
			grade: grade,
			group: group,
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

export async function getExamSchedules(
	grade: number,
	date: Date,
) {
	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	const after = new Date(inputDate);
	after.setDate(inputDate.getDate() + 1);

	const examSchedules = await prisma.examSchedule.findFirst({
		where: {
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

export async function getAllUsers(): Promise<UserData[]> {
	const result = await prisma.user.findMany({
		orderBy: [
			{
				displayName: "asc",
			},
		],
	});

	return result as UserData[];
}

export const User = cache(async (userId: string): Promise<UserData> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	return user as UserData;
});

export const getAllStudents = cache(async (): Promise<StudentData[]> => {
	const result = await prisma.student.findMany({
		orderBy: [
			{
				group: "asc",
			},
			{
				number: "asc",
			},
		],
	});

	return result as StudentData[];
});

export async function Student(studentName: string): Promise<StudentData> {
	const student = await prisma.student.findUnique({
		where: {
			name: studentName,
		},
	});

	return student as StudentData;
}
