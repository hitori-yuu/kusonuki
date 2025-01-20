"use client";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InformationForm from "../forms/InformationForm";
import { useUser } from "@/hooks/useUser";

const InformationButton = () => {
	const { user, student, liff } = useUser();

	if (!user) return;
	if (user.role !== "ADMIN") return;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full">お知らせ作成</Button>
			</DialogTrigger>
			<DialogContent>
				<InformationForm />
			</DialogContent>
		</Dialog>
	);
};

export default InformationButton;
