"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AssignmentData, QuizData, DocumentData } from "@/types/types";

interface SubjectPieChartsGridProps {
	assignments: AssignmentData[];
	quizzes: QuizData[];
	documents: DocumentData[];
}

interface ChartDataPoint {
	subject: string;
	count: number;
	fill: string;
}

type UnifiedSubject = "国語" | "数学" | "英語" | "理科" | "H.R.";

const SubjectPieChartsGrid: React.FC<SubjectPieChartsGridProps> = ({ assignments, quizzes, documents }) => {
	const colors = {
		国語: "hsl(var(--chart-1))",
		数学: "hsl(var(--chart-2))",
		英語: "hsl(var(--chart-3))",
		理科: "hsl(var(--chart-4))",
		"H.R.": "hsl(var(--chart-5))",
	};

	const chartConfig: ChartConfig = Object.entries(colors).reduce(
		(acc, [subject, color]) => ({
			...acc,
			[subject]: {
				label: subject,
				color: color,
			},
		}),
		{},
	);

	const unifySubject = (subject: string): UnifiedSubject => {
		if (subject === "論理国語" || subject === "古典探求") return "国語";
		if (subject === "英語コミュニケーション" || subject === "論理表現") return "英語";
		if (subject === "生物" || subject === "物理" || subject === "化学") return "理科";
		if (subject === "HR") return "H.R.";
		return subject as UnifiedSubject;
	};

	const transformData = <T extends { subject: string }>(items: T[]): ChartDataPoint[] => {
		const subjects: Record<UnifiedSubject, number> = {
			国語: 0,
			数学: 0,
			英語: 0,
			理科: 0,
			"H.R.": 0,
		};

		items?.forEach((item) => {
			const unifiedSubject = unifySubject(item.subject);
			subjects[unifiedSubject]++;
		});

		return Object.entries(subjects)
			.filter(([_, count]) => count > 0)
			.map(([subject, count]) => ({
				subject,
				count,
				fill: colors[subject as UnifiedSubject],
			}))
			.sort((a, b) => b.count - a.count); // 件数で降順ソート
	};

	const assignmentData = React.useMemo(() => transformData(assignments), [assignments]);
	const quizData = React.useMemo(() => transformData(quizzes), [quizzes]);
	const documentData = React.useMemo(() => transformData(documents), [documents]);

	const PieChartCard: React.FC<{
		title: string;
		description: string;
		data: ChartDataPoint[];
		type: "課題" | "小テスト" | "ドキュメント";
	}> = ({ title, description, data, type }) => {
		const total = React.useMemo(() => {
			return data.reduce((acc, curr) => acc + curr.count, 0);
		}, [data]);

		const getPercentage = (count: number) => {
			return total > 0 ? Math.round((count / total) * 100) : 0;
		};

		return (
			<Card className='flex flex-col'>
				<CardHeader className='items-center pb-0'>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className='flex-1 pb-0'>
					<ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
						<PieChart>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Pie data={data} dataKey='count' nameKey='subject' innerRadius={60} strokeWidth={5}>
								<Label
									content={({ viewBox }) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor='middle'
													dominantBaseline='middle'
												>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className='fill-foreground text-3xl font-bold'
													>
														{total.toLocaleString()}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) + 24}
														className='fill-muted-foreground'
													>
														件
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className='flex-col gap-2 text-sm'>
					<div className='leading-none text-muted-foreground'>
						全{data.length}教科の{type}
					</div>
				</CardFooter>
			</Card>
		);
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			<PieChartCard title='課題' description='教科別割合' data={assignmentData} type='課題' />
			<PieChartCard title='小テスト' description='教科別割合' data={quizData} type='小テスト' />
			<PieChartCard title='ドキュメント' description='教科別割合' data={documentData} type='ドキュメント' />
		</div>
	);
};

export default SubjectPieChartsGrid;
