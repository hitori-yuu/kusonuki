import Timetable from "@/components/layouts/Timetable";
import UserData from "@/components/layouts/UserData";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
	return (
		<div>
			<SessionProvider>
				<UserData />
			</SessionProvider>
			<Timetable />
		</div>
	);
}
