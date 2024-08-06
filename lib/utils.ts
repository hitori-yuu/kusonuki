import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import prisma from "./prismaClient"

export function cn(...inputs: ClassValue[]) {
  	return twMerge(clsx(inputs))
}

export async function LiffUser(userId: string) {
	console.log(userId)
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});
	console.log(user)
	return user;
}

export async function User(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	return user;
};

export async function Student(studentName: string) {
	const student = await prisma.student.findUnique({
		where: {
			name: studentName
		}
	});

	return student;
};

export async function isLinked(userId: string) {
	if (await isUser(userId)) {
		const user = await User(userId);
		if (user) {
			return user.isLinked;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

export async function isUser(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	if (user) {
		return true;
	} else {
		return false
	}
};

export function typeWeek(date: Date = new Date()): String {
	// 基準日（A週の開始日）
	const baseDate = new Date('2024-01-01'); // 例えば2024年1月1日をA週の開始日とする

	// 日付のみにフォーカスするために時刻部分をクリア
	baseDate.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);

	// 基準日からの経過日数を計算
	const msInDay = 24 * 60 * 60 * 1000;
	const daysDifference = Math.floor((date.getTime() - baseDate.getTime()) / msInDay);

	// 経過日数を14で割った余りが0から6ならA週、7から13ならB週
	if (daysDifference % 14 < 7) {
		return "A";
	} else {
		return "B";
	}
};