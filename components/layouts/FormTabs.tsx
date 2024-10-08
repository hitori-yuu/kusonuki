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
					<CardTitle>課題・小テスト作成</CardTitle>
					<CardDescription>課題・小テストの情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="assignment">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="assignment">課題</TabsTrigger>
							<TabsTrigger value="test">小テスト</TabsTrigger>
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
					<CardTitle>予定作成</CardTitle>
					<CardDescription>予定・試験時間割の情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="schedule">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="schedule">予定</TabsTrigger>
							<TabsTrigger value="examSchedule">試験時間割</TabsTrigger>
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
