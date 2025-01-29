import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { User } from "@/lib/server/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type DocumentCardType = {
	title: string;
	fileUrl: string;
	authorId: string;
};

const DocumentCard = async (props: DocumentCardType) => {
	const user = await User(props.authorId);
	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center space-y-0 pb-2">
					<Avatar>
						<AvatarImage src={user.pictureUrl?.toString()} />
						<AvatarFallback>{user.displayName}</AvatarFallback>
					</Avatar>
					<CardTitle className="text-sm font-medium ml-2">{props.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<Image
						src={props.fileUrl}
						width={500}
						height={500}
						alt={props.title}
						style={{ objectFit: "contain" }}
					/>
				</CardContent>
				<CardFooter>
					{/* Add download button or link here */}
					<Button className="w-full" variant="outline" asChild>
						<a href={props.fileUrl}>ダウンロード</a>
					</Button>
				</CardFooter>
			</Card>
		</>
	);
};

export default DocumentCard;
