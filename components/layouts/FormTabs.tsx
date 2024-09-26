import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import AssignmentForm from "./AssignmentForm";
import TestForm from "./TestForm";
import ScheduleForm from "./ScheduleForm";
import ExamScheduleForm from "./ExamScheduleForm";

const FormTabs = () => {
	return (
		<>
			<Card className="my-2">
				<CardHeader>
					<CardTitle>Assignment Forms</CardTitle>
					<CardDescription>description.</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="assignment">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="assignment">Assignment</TabsTrigger>
							<TabsTrigger value="test">Test</TabsTrigger>
						</TabsList>
						<TabsContent value="assignment">
							<AssignmentForm />
						</TabsContent>
						<TabsContent value="test">
							<TestForm />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			<Card className="my-2">
				<CardHeader>
					<CardTitle>Schedule Forms</CardTitle>
					<CardDescription>description.</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="schedule">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="schedule">Schedule</TabsTrigger>
							<TabsTrigger value="examSchedule">ExamSchedule</TabsTrigger>
						</TabsList>
						<TabsContent value="schedule">
							<ScheduleForm />
						</TabsContent>
						<TabsContent value="examSchedule">
							<ExamScheduleForm />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</>
	);
};

export default FormTabs;
