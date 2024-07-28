import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { signOut } from "@/auth";

import { LogOut, User } from "lucide-react";

export function SignIn({ provider, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
	return (
		<form
			action={async () => {
				"use server";
				await signIn(provider);
			}}
		>
			<Button variant="ghost" {...props}>
				<User />
			</Button>
		</form>
	);
}

export function SignOut({ provider, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
	return (
		<form
			className="w-full"
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<Button variant="ghost" className="w-full p-0" {...props}>
				<LogOut className="mr-2 h-4 w-4" />
				ログアウト
			</Button>
		</form>
	);
}
