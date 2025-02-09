"use client";
import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { Liff } from "@line/liff";
import { LiffMockPlugin } from "@line/liff-mock";

const LiffContext = createContext<{
	liff: Liff | null;
	liffError: string | null;
}>({ liff: null, liffError: null });

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: FC<PropsWithChildren<{ liffId: string }>> = ({ children, liffId }) => {
	const [liff, setLiff] = useState<Liff | null>(null);
	const [liffError, setLiffError] = useState<string | null>(null);

	const initLiff = useCallback(async () => {
		try {
			const liffModule = await import("@line/liff");
			const liff = liffModule.default;
			console.log("LIFFを初期化中...");

			liff.use(new LiffMockPlugin());

			liff.$mock.set((p) => ({
				...p,
				getProfile: {
					displayName: "ゆう",
					pictureUrl:
						"https://profile.line-scdn.net/0hqd_xr7vALktyAT4_zUNQNAJRLSFRcHdZX2ZkeUICJyscMTxOXG8zJE8Dc3oaMm8aWGJgfhUCJyx-ElktbFfSf3Uxc3pONG8ZV2ZhpA",
					userId: "Ud713d7bf56b49d0f40c0712335f625ba",
				},
			}));

			await liff.init({ liffId, mock: false });

			console.log("LIFFの初期化が完了しました。");
			setLiff(liff);
		} catch (error) {
			console.log("LIFFの初期化に失敗しました。");
			setLiffError((error as Error).toString());
		}
	}, [liffId]);

	// init Liff
	useEffect(() => {
		console.log("LIFFの初期化を開始します...");
		initLiff();
	}, [initLiff]);

	return (
		<LiffContext.Provider
			value={{
				liff,
				liffError,
			}}
		>
			{children}
		</LiffContext.Provider>
	);
};
