import React from "react";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, CircleUser, Megaphone, User } from "lucide-react";
import { PostData } from "@/types/types";
import Image from "next/image";
import { getAllPosts } from "@/lib/server/actions";

const getTypeIcon = (type: string) => {
	switch (type) {
		case "POST":
			return <User size={40} />;
		case "INFORMATION":
			return <CircleAlert size={40} />;
		case "ADVERTISEMENT":
			return <Megaphone size={40} />;
		default:
			return <User size={40} />;
	}
};

async function getData(): Promise<PostData[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/posts`, {
		cache: "no-store",
	});

	const allPostData: PostData[] = await response.json();

	return allPostData;
}

export default async function Feed() {
	const posts = await getData();

	if (!posts) return <div>ポストはありません...</div>;
	return (
		<>
			<h1 className='text-center mt-5'>ポスト一覧</h1>
			<Separator />
			<div className='space-y-2'>
				{posts.map((post) => (
					<div className='block' key={post.id}>
						<div className='py-2'>
							<div className='flex items-center py-2'>
								{getTypeIcon(post.type)}
								<div>
									<h1 className='ml-4 font-bold'>{post.username}</h1>
									<p className='ml-4'>{post.content}</p>
								</div>
							</div>
							{post.mediaUrl && (
								<Image className='mx-auto' src={post.mediaUrl} alt='' width={400} height={400} />
							)}
						</div>

						<Separator />
					</div>
				))}
			</div>
		</>
	);
}
