import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const timetables = [
	{
		period: "1",
		subject: "Math",
		change: "",
	},
	{
		period: "2",
		subject: "Math",
		change: "",
	},
	{
		period: "3",
		subject: "Math",
		change: "AAAA",
	},
	{
		period: "4",
		subject: "Math",
		change: "",
	},
	{
		period: "5",
		subject: "Math",
		change: "",
	},
];

const Timetable = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Timetable</CardTitle>
				<CardDescription>A week 7/21</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableBody>
						{timetables.map((timetable) => (
							<TableRow key={timetable.period}>
								<TableCell className="font-bold">{timetable.period}</TableCell>
								{timetable.change
									? timetable.change && (
											<TableCell className="text-red-600">
												<Popover>
													<PopoverTrigger>{timetable.change}</PopoverTrigger>
													<PopoverContent>
														<p className="text-center">前: {timetable.subject}</p>
													</PopoverContent>
												</Popover>
											</TableCell>
									  )
									: timetable.subject && <TableCell>{timetable.subject}</TableCell>}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default Timetable;
