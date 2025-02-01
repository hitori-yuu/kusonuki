export type Role = "DEFAULT" | "EDITOR" | "ADMIN";
export type PostType = "POST" | "INFORMATION" | "ADVERTISEMENT";

export type MediaType = "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";

export interface UserData {
	id: string;
	displayName?: string | null;
	pictureUrl?: string | null;
	email: string;
	role: Role;
	studentName?: string | null;
	studentId?: number | null;
	isLinked: boolean;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
	student: StudentData;
	Assignment: AssignmentData[];
	Quiz: QuizData[];
	Change: ChangeData[];
	Timetable: TimetableData[];
	Schedule: ScheduleData[];
	ScheduleWeek: ScheduleWeekData[];
	ExamSchedule: ExamScheduleData[];
	Information: InformationData[];
	Exam: ExamData[];
	Post: PostData[];
	Like: LikeData[];
	View: ViewData[];
}

export interface StudentData {
	id: number;
	uniqueId: string;
	fullName: string;
	lastName?: string | null;
	firstName?: string | null;
	enrollmentYear: number;
	currentGrade: number;
	currentClass: string;
	currentNumber: number;
	isActive: boolean;
	isLinked: boolean;
	createdAt: Date;
	updatedAt: Date;
	StudentHistory: StudentHistoryData[];
}

export interface StudentHistoryData {
	id: number;
	studentId: number;
	academicYear: number;
	grade: number;
	className: string;
	number: number;
	createdAt: Date;
	updatedAt: Date;
	student: StudentData;
}

export interface TeacherData {
	name: string;
	subject: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface AssignmentData {
	id: number;
	title: string;
	subject: string;
	dueDate: Date;
	academicYear: number;
	grade: number;
	className: string;
	isEvery: boolean;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface QuizData {
	id: number;
	scope: string;
	subject: string;
	testDate: Date;
	academicYear: number;
	grade: number;
	className: string;
	isEvery: boolean;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface DocumentData {
	id: number;
	title: string;
	fileUrl: string;
	subject: string;
	academicYear: number;
	grade: number;
	className: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ExamData {
	id: number;
	term: string;
	subject: string;
	scope: string;
	exclusion?: string | null;
	academicYear: number;
	grade: number;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface ChangeData {
	id: number;
	date: Date;
	period: number;
	subject: string;
	academicYear: number;
	grade: number;
	className: string;
	isEvery: boolean;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface ScheduleData {
	id: number;
	date: Date;
	academicYear: number;
	grade: number;
	className: string;
	content: string;
	isEvery: boolean;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface ScheduleWeekData {
	id: number;
	date: Date;
	week: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface ExamScheduleData {
	id: number;
	academicYear: number;
	grade: number;
	date: Date;
	period: string;
	timetable: string[];
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface TimetableData {
	id: number;
	week: string;
	day: string;
	academicYear: number;
	grade: number;
	className: string;
	first: string;
	second: string;
	third: string;
	fourth: string;
	fifth: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface InformationData {
	id: number;
	date: Date;
	title: string;
	content: string;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
	author: UserData;
}

export interface PostData {
	id: number;
	username: string;
	content: string;
	type: PostType;
	mediaUrl?: string | null;
	mediaType?: MediaType | null;
	authorId: string;
	author: UserData;
	createdAt: Date;
}

export interface LikeData {
	id: number;
	authorId: string;
	postId: number;
	createdAt: Date;
	author: UserData;
}

export interface ViewData {
	id: number;
	authorId: string;
	postId: number;
	createdAt: Date;
	author: UserData;
}
