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
import { Settings, User, Speech, UsersRound, FileStack } from "lucide-react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

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
							<Avatar className="w-10 h-10 shadow hover:ring-2 focus:ring-2">
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
										連携中: {student.fullName}
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
							<Link href="/profile">
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									<span>プロフィール</span>
								</DropdownMenuItem>
							</Link>
							<Link href="/settings">
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									<span>設定</span>
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href="/users">
								<DropdownMenuItem>
									<UsersRound className="mr-2 h-4 w-4" />
									<span>ユーザー</span>
								</DropdownMenuItem>
							</Link>
							<Link href="/students">
								<DropdownMenuItem>
									<UsersRound className="mr-2 h-4 w-4" />
									<span>生徒</span>
								</DropdownMenuItem>
							</Link>
							<Link href="/teachers">
								<DropdownMenuItem disabled>
									<Speech className="mr-2 h-4 w-4" />
									<span>教師</span>
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href="/assignments">
								<DropdownMenuItem>
									<FileStack className="mr-2 h-4 w-4" />
									<span>課題</span>
								</DropdownMenuItem>
							</Link>
							<Link href="/tests">
								<DropdownMenuItem>
									<FileStack className="mr-2 h-4 w-4" />
									<span>小テスト</span>
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{resolvedTheme === "light" ? (
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									<MoonIcon className="mr-2 h-4 w-4" />
									<span>ダークモード</span>
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem onClick={() => setTheme("light")}>
									<SunIcon className="mr-2 h-4 w-4" />
									<span>ライトモード</span>
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
