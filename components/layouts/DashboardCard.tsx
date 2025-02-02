import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardCardType = {
	title: string;
	content: number | null;
	icon: React.ReactNode;
};

const DashboardCard = (props: DashboardCardType) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{props.title}</CardTitle>
				{props.icon}
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{props.content}</div>
			</CardContent>
		</Card>
	);
};

export default DashboardCard;
