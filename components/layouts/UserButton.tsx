import React from "react";

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
import { Settings, User, Speech, UsersRound, CirclePlus } from "lucide-react";

import { SignIn, SignOut } from "./AuthComponents";
import { auth } from "@/auth";

export const UserButton = async () => {
	const session = await auth();
	if (!session?.user) return <SignIn provider="line" />;
	return (
		<div className="flex gap-2 items-center">
			<span className="hidden text-sm sm:inline-flex"></span>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative w-8 h-8 rounded-full">
						<Avatar className="w-8 h-8">
							{session.user.image && (
								<AvatarImage src={session.user.image} alt={session.user.name ?? ""} />
							)}
							<AvatarFallback>{session.user.id}</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{session.user.name}</p>
							<p className="text-xs leading-none text-muted-foreground">{session.user.id}</p>
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
						<DropdownMenuItem disabled>
							<UsersRound className="mr-2 h-4 w-4" />
							<span>Students</span>
						</DropdownMenuItem>
						<DropdownMenuItem disabled>
							<Speech className="mr-2 h-4 w-4" />
							<span>Teachers</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<a href="/assignments/create">
							<DropdownMenuItem>
								<CirclePlus className="mr-2 h-4 w-4" />
								<span>Assignment</span>
							</DropdownMenuItem>
						</a>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<SignOut />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserButton;
