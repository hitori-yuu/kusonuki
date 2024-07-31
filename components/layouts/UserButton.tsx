"use client";
import { useEffect, useState } from "react";

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
import { useLiff } from "@/components/layouts/LiffProvider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Profile } from "@liff/get-profile";
import { UserData } from "@/types/types";
import ThemeChanger from "./ThemeChanger";

export function UserButton() {
	const [profile, setProfile] = useState<Profile | null>(null);
	const { setTheme, resolvedTheme } = useTheme();
	const { liff } = useLiff();

	useEffect(() => {
		if (liff?.isLoggedIn()) {
			(async () => {
				const profile = await liff.getProfile();
				setProfile(profile);
			})();
		} else {
			const profile = {
				userId: "Ud713d7bf56b49d0f40c0712335f625ba",
				displayName: "TEST USER",
				pictureUrl: "https://i.pinimg.com/736x/77/5a/9a/775a9a4dc09ddc80a2595c49cd0a43a7.jpg",
			};
			setProfile(profile);
		}
	}, [liff]);

	return (
		<div className="flex gap-2 items-center">
			<span className="hidden text-sm sm:inline-flex"></span>
			{profile && (
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
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{profile.displayName}</p>
								<p className="text-xs leading-none text-muted-foreground">{profile.userId}</p>
							</div>
						</DropdownMenuLabel>
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
							<a href="/users">
								<DropdownMenuItem>
									<UsersRound className="mr-2 h-4 w-4" />
									<span>Users</span>
								</DropdownMenuItem>
							</a>
							<a href="/students">
								<DropdownMenuItem>
									<UsersRound className="mr-2 h-4 w-4" />
									<span>Students</span>
								</DropdownMenuItem>
							</a>
							<DropdownMenuItem disabled>
								<Speech className="mr-2 h-4 w-4" />
								<span>Teachers</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{resolvedTheme === "light" ? (
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									<MoonIcon className="mr-2 h-4 w-4" />
									<span>Change Dark Theme</span>
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem onClick={() => setTheme("light")}>
									<SunIcon className="mr-2 h-4 w-4" />
									<span>Change Light Theme</span>
								</DropdownMenuItem>
							)}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
			{/* {!profile && <Button onClick={() => liff?.login()}>ログイン</Button>} */}
		</div>
	);
}
