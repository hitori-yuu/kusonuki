import prisma from "@/lib/prismaClient";
import React from "react";

async function getData() {
	const result = await prisma.assignment.findMany();

	console.log(result);
}

const page = async () => {
	await getData();
	return <div>Information page</div>;
};

export default page;
