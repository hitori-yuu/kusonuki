import prisma from "@/lib/prismaClient";
import {
	CreateAssignment,
	CreateQuiz,
	findQuizByDate,
	findQuizByRange,
	getAllAssignments,
	getAllPosts,
	getAllQuiz,
} from "@/lib/server/actions";
import { PostData, PostType, QuizData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const author = params.get("author");
	const postType = params.get("post_type");
	const mediaType = params.get("media_type");
	const dateRange = params.get("dateRange");

	if (author) {
		const allPostData = (await getAllPosts()) as PostData[];
		const postData = allPostData.filter((post) => post.authorId === author);
		return NextResponse.json(postData);
	} else if (postType) {
		const allPostData = (await getAllPosts()) as PostData[];
		const postData = allPostData.filter((post) => post.type === postType);
		return NextResponse.json(postData);
	} else if (mediaType) {
		const allPostData = (await getAllPosts()) as PostData[];
		const postData = allPostData.filter((post) => post.mediaType === mediaType);
		return NextResponse.json(postData);
	} else if (dateRange) {
		const startDate = new Date(new Date().getTime() - parseInt(dateRange) * 24 * 60 * 60 * 1000);
		const allPostData = (await getAllPosts()) as PostData[];
		const postData = allPostData.filter((post) => post.createdAt >= startDate);
		return NextResponse.json(postData);
	} else {
		const allPostData = (await getAllPosts()) as PostData[];
		return NextResponse.json(allPostData);
	}
}
