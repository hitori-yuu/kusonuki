import React from "react";
import { UserButton } from "@/components/layouts/UserButton";

const Header = () => {
	return (
		<header className="sticky flex justify-center border-b">
			<div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
				<p>テスト</p>
				<UserButton />
			</div>
		</header>
	);
};

export default Header;
