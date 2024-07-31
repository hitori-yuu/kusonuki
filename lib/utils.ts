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