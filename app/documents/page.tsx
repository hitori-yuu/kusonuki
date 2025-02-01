import DocumentForm from "@/components/layouts/forms/DocumentForm";
import DocumentCard from "@/components/layouts/DocumentCard";
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

export const revalidate = 60;

async function getData(): Promise<DocumentData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/documents`, {
		cache: "no-store",
	});

	const allDocumentData: DocumentData[] = await response.json();

	return allDocumentData;
}

export default async function page() {
	const docs = await getData();
	return (
		<div>
			<div className='mb-4'>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='outline' className='w-full'>
							プリント追加
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DocumentForm />
					</DialogContent>
				</Dialog>
			</div>
			<Separator />
			<div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
				{docs.map((doc) => (
					<DocumentCard key={doc.id} title={doc.title} fileUrl={doc.fileUrl} authorId={doc.authorId} />
				))}
			</div>
		</div>
	);
}
