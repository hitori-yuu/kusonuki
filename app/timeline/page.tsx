import PostForm from "@/components/forms/PostForm";
import Feed from "@/components/layouts/Feed";
import React from "react";

const page = () => {
	return (
		<div>
			<PostForm />
			<Feed />
		</div>
	);
};

export default page;
