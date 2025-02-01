import PostForm from "@/components/layouts/forms/PostForm";
import Feed from "@/components/layouts/Feed";
import React from "react";

const page = async () => {
	return (
		<div>
			<PostForm />
			<Feed />
		</div>
	);
};

export default page;
