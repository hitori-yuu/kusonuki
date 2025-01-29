import DocumentForm from "@/components/forms/DocumentForm";
import DocumentCard from "@/components/layouts/DocumentCard";
import { getAllDocuments } from "@/lib/server/actions";
import { DocumentData } from "@/types/types";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prismaClient";

async function getData() {
	const result = await prisma.document.findMany({
		orderBy: [
			{
				createdAt: "desc",
			},
		],
	});
	return result;
}

const page = async () => {
	const data = (await getData()) as DocumentData[];
	return (
		<div>
			<div className="mb-4">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="w-full">
							プリント追加
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DocumentForm />
					</DialogContent>
				</Dialog>
			</div>
			<Separator />
			<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{data.map((doc) => (
					<DocumentCard
						key={doc.id}
						title={doc.title}
						fileUrl={doc.fileUrl}
						authorId={doc.authorId}
					/>
				))}
			</div>
		</div>
	);
};

export default page;
