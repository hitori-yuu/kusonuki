import { ExtendedInit, LiffMockApi } from "@line/liff-mock";

declare module "@line/liff" {
	interface Config {
		mock?: boolean;
	}

	interface Liff {
		init: ExtendedInit;
		$mock: LiffMockApi;
	}
}
