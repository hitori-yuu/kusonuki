"use client";

import React from "react";

import { Home, User, TableOfContents, ScrollText } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	const footerItems = [
		{ icon: Home, label: "ホーム", href: "/" },
		{ icon: User, label: "プロフィール", href: "/profile" },
		{ icon: TableOfContents, label: "タイムライン", href: "/timeline" },
		{ icon: ScrollText, label: "プリント", href: "/documents" },
	];

	return (
		<footer className='flex justify-around sticky bottom-0 items-center bg-gray-200/10 backdrop-blur-lg border-x border-t border-gray-200/30 shadow-lg py-4 rounded-t-3xl bg-fixed'>
			{footerItems.map((item, index) => (
				<Link key={index} href={item.href} className='flex flex-col items-center'>
					<item.icon className='w-6 h-6 mb-1' />
					<span onClick={vibratePatternOnClick} className='text-sm'>
						{item.label}
					</span>
				</Link>
			))}
		</footer>
	);
};

const vibratePatternOnClick = () => {
	window.navigator.vibrate([50, 200, 50, 200]);
};

export default Footer;
