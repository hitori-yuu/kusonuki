import React from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WeekData from "./WeekData";

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const WeeklyInformation = () => {
	const days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - date.getDay() + i);
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const dateString = `${month}/${day}`;
		const dayOfWeek = daysOfWeek[date.getDay()];

		return {
			dateString,
			dayOfWeek,
		};
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>一週間の予定</CardTitle>
				<CardDescription>クリックして詳細を確認</CardDescription>
			</CardHeader>
			<CardContent>
				<Drawer>
					<DrawerTrigger asChild>
						<div className='overflow-x-auto whitespace-no-wrap'>
							<div className='flex items-center space-x-4 xl:justify-around'>
								{days.map(({ dateString, dayOfWeek }) => (
									<div key={dateString} className='block p-4 cursor-pointer text-center'>
										<p className='font-bold'>{dateString}</p>
										<p>{dayOfWeek}</p>
									</div>
								))}
							</div>
						</div>
					</DrawerTrigger>
					<DrawerContent className='h-full w-full'>
						<WeekData />
						<DrawerFooter>
							<DrawerClose asChild>
								<Button className='w-full' variant='outline'>
									閉じる
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</CardContent>
		</Card>
	);
};

export default WeeklyInformation;
