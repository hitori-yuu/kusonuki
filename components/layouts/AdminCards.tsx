"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import React, { useState, useEffect, useRef } from "react";
import ExamForm from "./forms/ExamScopeForm";
import ExamScheduleForm from "./forms/ExamScheduleForm";
import TimetableForm from "@/components/layouts/forms/TimetableForm";

const AdminCards = () => {
	const { user, student, liff } = useUser();
	if (user?.role !== "ADMIN") return;
	return (
		<div className='space-y-4'>
			<Card>
				<CardHeader>
					<CardTitle>試験範囲</CardTitle>
					<CardDescription>試験範囲の情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<ExamForm />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>試験時間割</CardTitle>
					<CardDescription>試験時間割の情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<ExamScheduleForm />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>時間割</CardTitle>
					<CardDescription>時間割の情報を作成します。</CardDescription>
				</CardHeader>
				<CardContent>
					<TimetableForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminCards;
