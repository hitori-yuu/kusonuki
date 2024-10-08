import AssignmentForm from "@/components/layouts/AssignmentForm";
import TestForm from "@/components/layouts/TestForm";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ScheduleForm from "@/components/layouts/ScheduleForm";

const page = () => {
	return (
		<div>
			<Card className="my-2">
				<CardHeader>課題フォーム</CardHeader>
				<CardContent>
					<AssignmentForm />
				</CardContent>
			</Card>
			<Card className="my-2">
				<CardHeader>テストフォーム</CardHeader>
				<CardContent>
					<TestForm />
				</CardContent>
			</Card>
			<Card className="my-2">
				<CardHeader>予定フォーム</CardHeader>
				<CardContent>
					<ScheduleForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default page;
