"use client";
import { useUser } from "@/hooks/useUser";
import React, { useEffect, useMemo, useState } from "react";
import { CalendarMinus2, ClipboardPenLine, NotepadText, PencilLine, TrendingUp } from "lucide-react";
import DashboardCard from "./DashboardCard";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Pie, PieChart } from "recharts";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import SubjectPieCharts from "@/components/layouts/SubjectPieCharts";

export function UserDashboard() {
	const { user, student, liff } = useUser();

	if (!user) return;

	return (
		user && (
			<div className='space-y-4 mt-4'>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					<DashboardCard title='課題作成' content={user.Assignment?.length || 0} icon={<PencilLine />} />
					<DashboardCard title='小テスト作成' content={user.Quiz?.length || 0} icon={<NotepadText />} />
					<DashboardCard title='変更作成' content={user.Change?.length || 0} icon={<CalendarMinus2 />} />
				</div>

				<SubjectPieCharts assignments={user.Assignment} quizzes={user.Quiz} documents={user.Document} />

				<Tabs defaultValue='post' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='post'>ポスト</TabsTrigger>
						<TabsTrigger value='document'>プリント</TabsTrigger>
					</TabsList>
					<TabsContent value='post'>
						<Card>
							<CardHeader>
								<CardTitle>あなたのポスト</CardTitle>
								<CardDescription>{user.Post.length}ポスト を表示</CardDescription>
							</CardHeader>
							<CardContent>
								{user.Post.map((post) => (
									<div className='block' key={post.id}>
										<div className='py-2'>
											<div className='flex items-center py-2'>
												<div>
													<h1 className='ml-4 font-bold'>{post.username}</h1>
													<p className='ml-4'>{post.content}</p>
												</div>
											</div>
											{post.mediaUrl && (
												<Image
													className='mx-auto'
													src={post.mediaUrl}
													alt=''
													width={400}
													height={400}
												/>
											)}
										</div>
										<Separator />
									</div>
								))}
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value='document'>
						<Carousel>
							<CarouselContent>
								{user.Document.map((doc, i) => (
									<CarouselItem>
										<Card className='text-center'>
											<CardHeader>
												<CardTitle>{doc.title}</CardTitle>
												<CardDescription>
													{doc.subject} {new Date(doc.createdAt).toLocaleDateString()}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<Image
													className='mx-auto mt-auto'
													src={doc.fileUrl}
													width={500}
													height={200}
													alt={doc.title}
												/>
											</CardContent>
											<CardFooter>
												<p className='w-full text-center'>
													{i} / {user.Document.length}
												</p>
											</CardFooter>
										</Card>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</TabsContent>
				</Tabs>
			</div>
		)
	);
}
