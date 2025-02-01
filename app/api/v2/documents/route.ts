import prisma from "@/lib/prismaClient";
import {
	CreateAssignment,
	CreateQuiz,
	findQuizByDate,
	findQuizByRange,
	getAllAssignments,
	getAllDocuments,
	getAllPosts,
	getAllQuiz,
} from "@/lib/server/actions";
import { DocumentData, PostData, PostType, QuizData } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const author = params.get("author");
	const subject = params.get("subject");
	const academicYear = params.get("academicYear");
	const grade = params.get("grade");
	const className = params.get("className");

	if (academicYear && grade && className) {
		if (subject) {
			const allDocumentData = (await getAllDocuments()) as DocumentData[];
			const documentData = allDocumentData.filter((post) => post.subject === subject);
			return NextResponse.json(documentData);
		} else {
			const allDocumentData = (await getAllDocuments()) as DocumentData[];
			const documentData = allDocumentData.filter(
				(post) =>
					post.academicYear === parseInt(academicYear) &&
					post.grade === parseInt(grade) &&
					post.className === className,
			);
			return NextResponse.json(documentData);
		}
	} else if (subject) {
		const allDocumentData = (await getAllDocuments()) as DocumentData[];
		const documentData = allDocumentData.filter((post) => post.subject === subject);
		return NextResponse.json(documentData);
	} else if (author) {
		const allDocumentData = (await getAllDocuments()) as DocumentData[];
		const documentData = allDocumentData.filter((post) => post.authorId === author);
		return NextResponse.json(documentData);
	} else {
		const allDocumentData = (await getAllDocuments()) as DocumentData[];
		return NextResponse.json(allDocumentData);
	}
}
