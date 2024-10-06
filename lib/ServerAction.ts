"use server";

import prisma from "./prismaClient";

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
