import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AssignmentForm from "./forms/AssignmentForm";
import QuizForm from "./forms/QuizForm";
import ScheduleForm from "./forms/ScheduleForm";
import ChangeForm from "./forms/ChangeForm";

const FormTabs = () => {
	return (
		<div className='space-y-4'>
			<Card>
				<CardHeader>
					<CardTitle>課題・小テスト作成</CardTitle>
					<CardDescription>課題・小テストの情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='assignment'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='assignment'>課題</TabsTrigger>
							<TabsTrigger value='quiz'>小テスト</TabsTrigger>
						</TabsList>
						<TabsContent value='assignment'>
							<AssignmentForm />
						</TabsContent>
						<TabsContent value='quiz'>
							<QuizForm />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>予定作成</CardTitle>
					<CardDescription>予定・授業変更の情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='schedule'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='schedule'>予定</TabsTrigger>
							<TabsTrigger value='change'>授業変更</TabsTrigger>
						</TabsList>
						<TabsContent value='schedule'>
							<ScheduleForm />
						</TabsContent>
						<TabsContent value='change'>
							<ChangeForm />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};

export default FormTabs;
