import { NextResponse } from "next/server";
import { typeWeek } from "@/lib/utils";

export async function GET(req: Request, { params }: { params: { date: string } }) {
	const { date } = params;
	if (!date) {
		return NextResponse.json({ error: "日付が必要です。" }, { status: 400 });
	}

	const weekType = typeWeek(new Date(date));

	return NextResponse.json({ weekType });
}
