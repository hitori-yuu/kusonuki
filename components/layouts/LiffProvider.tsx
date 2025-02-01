"use client";
import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { Liff } from "@line/liff";

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

			await liff.init({ liffId });

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
