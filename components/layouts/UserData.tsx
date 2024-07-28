import { auth } from "@/auth";
import React from "react";

const UserData = async () => {
	const session = await auth();
	return (
		<div className="flex flex-col rounded-md bg-neutral-100">
			<div className="p-4 font-bold rounded-t-md bg-neutral-200">Session</div>
			<pre className="py-6 px-4 whitespace-pre-wrap break-all">{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
};

export default UserData;
