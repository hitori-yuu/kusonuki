import React from "react";
import { UserButton } from "@/components/layouts/UserButton";

const Header = () => {
	return (
		<header className='flex justify-around sticky top-0 items-center bg-gray-200/10 border-b border-gray-200/30 backdrop-blur-lg shadow-lg bg-fixed z-50'>
			<div className='flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6'>
				<p>くそぬきbot</p>
				<UserButton />
			</div>
		</header>
	);
};

export default Header;
