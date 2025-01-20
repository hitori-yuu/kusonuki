import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardCardType = {
	title: string;
	content: number | null;
	isLoading: boolean;
	icon: React.ReactNode;
};

const DashboardCard = (props: DashboardCardType) => {
	const SkeletonLoader = () => (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Skeleton className="h-4 w-[50px]" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						<Skeleton className="h-4 w-[150px]" />
					</div>
				</CardContent>
			</Card>
		</>
	);

	return (
		<>
			{props.isLoading ? (
				<SkeletonLoader />
			) : (
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{props.title}</CardTitle>
						{props.icon}
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{props.content}</div>
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default DashboardCard;
