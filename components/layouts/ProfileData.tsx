"use client";
import { useLiff } from "@/components/layouts/LiffProvider";
import { Profile } from "@liff/get-profile";
import { LiffUser } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { useEffect, useState } from "react";
import { UserData } from "@/types/types";

async function getUserData(userId: string): Promise<UserData> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}users/${userId}`);

	const userData: UserData = await response.json();

	return userData;
}

export function ProfileData() {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [user, setUser] = useState<UserData | null>(null);
	const { liff } = useLiff();

	useEffect(() => {
		if (liff?.isLoggedIn()) {
			(async () => {
				const profile = await liff.getProfile();
				const user = await getUserData(profile.userId);
				setProfile(profile);
				setUser(user);
			})();
		} else {
			(async () => {
				const profile = {
					userId: "Ud713d7bf56b49d0f40c0712335f625ba",
					displayName: "TEST USER",
					pictureUrl: "https://i.pinimg.com/736x/77/5a/9a/775a9a4dc09ddc80a2595c49cd0a43a7.jpg",
				};
				const user = await getUserData(profile.userId);
				setProfile(profile);
				setUser(user);
			})();
		}
	}, [liff]);

	return (
		<div>
			{profile && user && (
				<>
					<h2 className="text-center text-lg font-bold py-5">{profile.displayName}</h2>
					<div className="flex justify-between">
						<Avatar className="h-10 w-10">
							{profile.pictureUrl && (
								<AvatarImage src={profile.pictureUrl} alt={profile.displayName ?? ""} />
							)}
							<AvatarFallback>{profile.displayName}</AvatarFallback>
						</Avatar>
						<div className="flex">
							<div className="block px-10 text-center">
								<p className="text-lg font-semibold">{user.role}</p>
								<HoverCard>
									<HoverCardTrigger>
										<p>権限</p>
									</HoverCardTrigger>
									<HoverCardContent>ユーザーが所持している権限の情報です。</HoverCardContent>
								</HoverCard>
							</div>
							<div className="block px-10 text-center">
								<p className="text-lg font-semibold">{user?.isLinked ? "連携済" : "未連携"}</p>
								<HoverCard>
									<HoverCardTrigger>
										<p>連携状態</p>
									</HoverCardTrigger>
									{user?.isLinked ? (
										<HoverCardContent>{user?.studentName}</HoverCardContent>
									) : (
										<HoverCardContent>
											生徒情報を連携しているかの情報です。<br></br>
											連携していれば生徒氏名が表示されます。
										</HoverCardContent>
									)}
								</HoverCard>
							</div>
							<div className="block px-10 text-center">
								<p className="text-lg font-semibold">{user?.isAvailable ? "利用可能" : "利用不可"}</p>
								<HoverCard>
									<HoverCardTrigger>
										<p>利用状態</p>
									</HoverCardTrigger>
									<HoverCardContent>アプリケーションを利用可能かの情報です。</HoverCardContent>
								</HoverCard>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
