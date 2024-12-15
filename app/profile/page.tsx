import { ProfileData } from "@/components/layouts/ProfileData";
import { UserDashboard } from "@/components/layouts/UserDashboard";
import React from "react";

const page = () => {
	return (
		<div>
			<ProfileData />
			<UserDashboard />
		</div>
	);
};

export default page;
