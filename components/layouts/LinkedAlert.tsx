"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const LinkedAlert = () => {
	const { user, student, liff } = useUser();

	return (
		<>
			{!student && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>
						生徒情報が連携されていません。設定から連携してください。
					</AlertTitle>
				</Alert>
			)}
		</>
	);
};

export default LinkedAlert;
