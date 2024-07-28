"use client";
import { useLiff } from "@/components/layouts/LiffProvider";
import { Profile } from "@liff/get-profile";

import { useEffect, useState } from "react";

export default function Home() {
	const [profile, setProfile] = useState<Profile | null>(null);
	const { liff } = useLiff();

	useEffect(() => {
		if (liff?.isLoggedIn()) {
			(async () => {
				const profile = await liff.getProfile();
				setProfile(profile);
			})();
		}
	}, [liff]);

	console.log(profile);
	return <div></div>;
}
