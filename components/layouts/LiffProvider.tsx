"use client";

import liff, { type Liff } from "@line/liff";
import { createContext, useState, useEffect, FC, ReactNode, useContext } from "react";

type LiffContextType = {
	liffState: Liff | null;
	liffError: string | null;
};

const LiffContext = createContext<LiffContextType>({
	liffState: null,
	liffError: null,
});

export const useLiff = (): LiffContextType => {
	const context = useContext(LiffContext);
	return context;
};

/**
 * Liff スターターテンプレートがあるのでこちらを参考にしています
 * @see https://github.com/line/create-liff-app/blob/main/templates/nextjs-ts/pages/_app.tsx
 */
export const LiffProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [liffState, setliffState] = useState<Liff | null>(null);
	const [liffError, setLiffError] = useState<string | null>(null);

	useEffect(() => {
		liff.init(
			{ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "" },
			() => {
				setliffState(liff);
			}, // 成功時に liff をセット
			(error) => {
				console.error("LIFF initialization failed", error);
				setLiffError(error.toString()); // エラー時にエラーメッセージをセット
			}
		);
	}, []);

	return <LiffContext.Provider value={{ liffState, liffError }}>{children}</LiffContext.Provider>;
};
