export interface UserData {
	id: string;
	displayName: string;
	pictureUrl: string;
	role: string;
	studentName: string;
	isLinked: boolean;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface StudentData {
	name: string;
	lastName: string;
	firstName: string;
	grade: number;
	group: string;
	number: number;
	firstGroupNumber: string;
	secondGroupNumber: string;
	thirdGroupNumber: string;
	isLinked: boolean;
	isAvailable: boolean;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface AssignmentData {
	id: number;
	name: string;
	subject: string;
	deadline: Date;
	grade: number;
	group: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface TimetableData {
	id: number;
	week: string;
	day: string;
	grade: number;
	group: string;
	first: string;
	second: string;
	third: string;
	fourth: string;
	fifth: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface TestData {
	id: number;
	name: string;
	subject: string;
	implementationDate: Date;
	grade: number;
	group: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
}
