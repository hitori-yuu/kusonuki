"use client";
import { useLiff } from "@/components/layouts/LiffProvider";
import { Profile } from "@liff/get-profile";

import { useEffect, useState } from "react";

export function ProfileData() {
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

	

	return (
		<div>
			{profile && (
				<>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={profile.pictureUrl} alt="profile" className="rounded-full w-20 h-20 mx-auto mb-4" />
					<p className="text-center font-bold text-xl">userId: {profile.userId}</p>
					<p className="text-center text-gray-500">displayName: {profile.displayName}</p>
				</>
			)}
			{profile ? (
				<button
					onClick={() => {
						liff?.logout();
						location.reload();
					}}
					className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600"
				>
					logout
				</button>
			) : (
				<button
					onClick={() => liff?.login()}
					className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
				>
					login
				</button>
			)}
		</div>
	);
}
