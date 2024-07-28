"use client";
import { useLiff } from "@/components/layouts/LiffProvider";
import { UserData } from "@/types/types";
import { Profile } from "@liff/get-profile";

import { useCallback, useEffect, useState } from "react";

export default function Page() {
	const { liffState, liffError } = useLiff();
	const [authenticated, setAuthenticated] = useState(false);

	const login = useCallback(async () => {
		const token = liffState?.getAccessToken();
		const res = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});
		if (!res.ok) {
			console.error("failed to login");
			return;
		}
		setAuthenticated(true);
		window.location.href = "/<トップ画面>";
	}, [liffState, setAuthenticated]);

	useEffect(() => {
		if (!liffState || authenticated) return;
		login();
	}, [liffState, authenticated, login]);

	if (liffError) {
		return "エラーが発生しました";
	}

	if (!authenticated) {
		return "認証中...";
	}

	return "認証完了";
}
