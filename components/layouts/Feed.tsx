import { getAllPosts } from "@/lib/server/actions";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, CircleUser, Megaphone, User } from "lucide-react";

const getTypeIcon = (type: string) => {
	// ステータスに応じて異なるアイコン名を返す
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

const Feed = async () => {
	const posts = await getAllPosts();
	if (!posts) return <div>No posts...</div>;
	return (
		<>
			<h1 className="text-center mt-5">ポスト一覧</h1>
			<Separator />
			<div className="mt-2">
				{posts.map((post) => (
					<div>
						<div className="flex items-center py-2">
							{getTypeIcon(post.type)}
							<div>
								<h1 className="ml-4 font-bold">{post.username}</h1>
								<p className="ml-4">{post.content}</p>
							</div>
						</div>
						<Separator />
					</div>
				))}
			</div>
		</>
	);
};

export default Feed;
