import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LinkedAlert from "@/components/layouts/LinkedAlert";
import AccountSettings from "@/components/layouts/AccountSettings";

const page = () => {
	return (
		<>
			<LinkedAlert />
			<AccountSettings />
		</>
	);
};

export default page;
