import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./prismaClient";
import { StudentData, UserData } from "@/types/types";
import { cache } from "react";
import { User } from "./server/actions";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function LiffUser(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	return user;
}

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
			id: userId,
		},
	});

	if (user) {
		return true;
	} else {
		return false;
	}
}

export function typeWeek(date: Date = new Date()): String {
	if (date.getMonth() > 3 && date.getMonth() < 10) {
		// 週の開始日
		const baseDate = new Date("2024-12-09"); // A週の開始日

		// 時刻クリア
		baseDate.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);

		// 経過日数
		const msInDay = 24 * 60 * 60 * 1000;
		const daysDifference = Math.floor((date.getTime() - baseDate.getTime()) / msInDay);

		if (daysDifference % 14 < 7) {
			return "A";
		} else {
			return "B";
		}
	} else {
		// 週の開始日
		const baseDate = new Date("2024-12-09"); // C週の開始日

		// 時刻クリア
		baseDate.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);

		// 経過日数
		const msInDay = 24 * 60 * 60 * 1000;
		const daysDifference = Math.floor((date.getTime() - baseDate.getTime()) / msInDay);

		if (daysDifference % 14 < 7) {
			return "C";
		} else {
			return "D";
		}
	}
}

export function getFiscalYear() {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1; // getMonth() は 0-11 を返すため +1 する
	// 月が1～3月なら前年の年度を返す
	return month <= 3 ? year - 1 : year;
}
