import prisma from "@/lib/prismaClient";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import InformationButton from "@/components/layouts/InformationButton";

async function getData() {
	const result = await prisma.information.findMany({
		orderBy: [
			{
				date: "desc",
			},
		],
	});
	return result;
}

const page = async () => {
	const informationData = await getData();
	return (
		<div className="space-y-4">
			<InformationButton />
			{informationData.map((info) => (
				<Card key={info.id} className="relative">
					<CardHeader>
						<CardTitle>{info.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>{info.content}</CardDescription>
						<div className="absolute right-4 top-4 text-sm text-muted-foreground">
							{format(new Date(info.date), "PPP", { locale: ja })}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default page;
