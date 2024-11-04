"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import React, { useState, useEffect, useRef } from "react";
import ExamForm from "./ExamForm";
import ExamScheduleForm from "./ExamScheduleForm";

const AdminCards = () => {
	const { user, student, liff } = useUser();
	if (user?.role !== "ADMIN") return;
	return (
		<>
			<Card className="my-2">
				<CardHeader>
					<CardTitle>試験範囲</CardTitle>
					<CardDescription>試験範囲の情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<ExamForm />
				</CardContent>
			</Card>
			<Card className="my-2">
				<CardHeader>
					<CardTitle>試験時間割</CardTitle>
					<CardDescription>試験時間割の情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<ExamScheduleForm />
				</CardContent>
			</Card>
		</>
	);
};

export default AdminCards;
