// "use client";

// import React from "react";

// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuGroup,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuPortal,
// 	DropdownMenuSeparator,
// 	DropdownMenuShortcut,
// 	DropdownMenuSub,
// 	DropdownMenuSubContent,
// 	DropdownMenuSubTrigger,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Settings, User, Speech, UsersRound } from "lucide-react";

// export const UserButton = async () => {
// 	return (
// 		<div className="flex gap-2 items-center">
// 			<span className="hidden text-sm sm:inline-flex"></span>
// 			<DropdownMenu>
// 				<DropdownMenuTrigger asChild>
// 					<Button variant="ghost" className="relative w-8 h-8 rounded-full">
// 						<Avatar className="w-8 h-8">
// 							{UserJsonData.pictureUrl && (
// 								<AvatarImage src={UserJsonData.pictureUrl} alt={UserJsonData.displayName ?? ""} />
// 							)}
// 							<AvatarFallback>{UserJsonData.displayName}</AvatarFallback>
// 						</Avatar>
// 					</Button>
// 				</DropdownMenuTrigger>
// 				<DropdownMenuContent className="w-56" align="end" forceMount>
// 					<DropdownMenuLabel>{UserJsonData.displayName}</DropdownMenuLabel>
// 					<DropdownMenuSeparator />
// 					<DropdownMenuGroup>
// 						<DropdownMenuItem>
// 							<User className="mr-2 h-4 w-4" />
// 							<span>Profile</span>
// 						</DropdownMenuItem>
// 						<DropdownMenuItem>
// 							<Settings className="mr-2 h-4 w-4" />
// 							<span>Settings</span>
// 						</DropdownMenuItem>
// 					</DropdownMenuGroup>
// 					<DropdownMenuSeparator />
// 					<DropdownMenuGroup>
// 						<DropdownMenuItem disabled>
// 							<UsersRound className="mr-2 h-4 w-4" />
// 							<span>Students</span>
// 						</DropdownMenuItem>
// 						<DropdownMenuItem disabled>
// 							<Speech className="mr-2 h-4 w-4" />
// 							<span>Teachers</span>
// 						</DropdownMenuItem>
// 					</DropdownMenuGroup>
// 				</DropdownMenuContent>
// 			</DropdownMenu>
// 		</div>
// 	);
// };

// export default UserButton;
