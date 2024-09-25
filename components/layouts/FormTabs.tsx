import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignmentForm from "./AssignmentForm";
import TestForm from "./TestForm";

const FormTabs = () => {
	return (
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
	);
};

export default FormTabs;
