"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

const LinkedAlert = () => {
	const { user, student, liff, isLiffLoading } = useUser();

	if (!user || !isLiffLoading) return;
	return (
		!student && (
			<Alert variant='destructive'>
				<AlertCircle className='h-4 w-4' />
				<AlertTitle>
					生徒情報が連携されていません。
					<Link className='px-1 underline' href='/settings'>
						設定
					</Link>
					から連携してください。
				</AlertTitle>
			</Alert>
		)
	);
};

export default LinkedAlert;
