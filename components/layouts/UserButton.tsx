"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, Speech, UsersRound } from "lucide-react";
import { useLiff } from "./LiffProvider";
import { Profile } from "@liff/get-profile";

export const UserButton = () => {
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
		<div className="flex gap-2 items-center">
			<span className="hidden text-sm sm:inline-flex"></span>
			{profile && (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative w-8 h-8 rounded-full">
								<Avatar className="w-8 h-8">
									{profile.pictureUrl && (
										<AvatarImage src={profile.pictureUrl} alt={profile.displayName ?? ""} />
									)}
									<AvatarFallback>{profile.displayName}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel>{profile.displayName}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									<span>Settings</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem disabled>
									<UsersRound className="mr-2 h-4 w-4" />
									<span>Students</span>
								</DropdownMenuItem>
								<DropdownMenuItem disabled>
									<Speech className="mr-2 h-4 w-4" />
									<span>Teachers</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			)}
			{profile ? (
				<Button
					onClick={() => {
						liff?.logout();
						location.reload();
					}}
					variant="ghost"
					className="w-full p-0"
				>
					ログアウト
				</Button>
			) : (
				<Button onClick={() => liff?.login()}>LINEでログイン</Button>
			)}
		</div>
	);
};

export default UserButton;
