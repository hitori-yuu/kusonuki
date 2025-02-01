import AssignmentForm from "@/components/layouts/forms/AssignmentForm";
import QuizForm from "@/components/layouts/forms/QuizForm";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleForm from "@/components/layouts/forms/ScheduleForm";
import ChangeForm from "@/components/layouts/forms/ChangeForm";
import ExamScopeForm from "@/components/layouts/forms/ExamScopeForm";
import InformationForm from "@/components/layouts/forms/InformationForm";
import ExamScheduleForm from "@/components/layouts/forms/ExamScheduleForm";

const page = () => {
	return (
		<div>
			<Tabs defaultValue='schedule' className='space-y-6'>
				<TabsList className='grid w-full grid-cols-7'>
					<TabsTrigger value='schedule'>予定</TabsTrigger>
					<TabsTrigger value='quiz'>小テスト</TabsTrigger>
					<TabsTrigger value='assignment'>課題</TabsTrigger>
					<TabsTrigger value='change'>変更</TabsTrigger>
					<TabsTrigger value='examScope'>試験範囲</TabsTrigger>
					<TabsTrigger value='examSchedule'>試験予定</TabsTrigger>
					<TabsTrigger value='information'>お知らせ</TabsTrigger>
				</TabsList>
				<TabsContent value='schedule'>
					<ScheduleForm />
				</TabsContent>
				<TabsContent value='quiz'>
					<QuizForm />
				</TabsContent>
				<TabsContent value='assignment'>
					<AssignmentForm />
				</TabsContent>
				<TabsContent value='change'>
					<ChangeForm />
				</TabsContent>
				<TabsContent value='examScope'>
					<ExamScopeForm />
				</TabsContent>
				<TabsContent value='examSchedule'>
					<ExamScheduleForm />
				</TabsContent>
				<TabsContent value='information'>
					<InformationForm />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default page;
