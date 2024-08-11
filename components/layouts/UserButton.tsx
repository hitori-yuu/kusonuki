"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, Speech, UsersRound } from "lucide-react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";

export function UserButton() {
	const { setTheme, resolvedTheme } = useTheme();
	const { user, student, liff } = useUser();

	return (
		<div className="flex gap-2 items-center">
			<span className="hidden text-sm sm:inline-flex"></span>
			{user && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative w-8 h-8 rounded-full">
							<Avatar className="w-8 h-8">
								{user.pictureUrl && (
									<AvatarImage
										src={user.pictureUrl}
										alt={user.displayName ?? ""}
									/>
								)}
								<AvatarFallback>{user.displayName}</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="max-w-fit" align="end" forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">
									{user.displayName}
								</p>
								{student ? (
									<p className="text-xs leading-none text-muted-foreground">
										連携中: {student.name}
									</p>
								) : (
									<p className="text-xs leading-none text-muted-foreground">
										{user.id}
									</p>
								)}
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
							<a href="/teachers">
								<DropdownMenuItem disabled>
									<Speech className="mr-2 h-4 w-4" />
									<span>Teachers</span>
								</DropdownMenuItem>
							</a>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<a href="/assignments">
								<DropdownMenuItem>
									<UsersRound className="mr-2 h-4 w-4" />
									<span>Assignments</span>
								</DropdownMenuItem>
							</a>
							<a href="/tests">
								<DropdownMenuItem>
									<UsersRound className="mr-2 h-4 w-4" />
									<span>Tests</span>
								</DropdownMenuItem>
							</a>
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
			{!user && <Button onClick={() => liff?.login()}>ログイン</Button>}
		</div>
	);
}
