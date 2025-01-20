import React from "react";
import { findHistoryByStudent, Student } from "@/lib/server/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const student = await Student(parseInt(id));
	const studentHistory = await findHistoryByStudent(parseInt(id));
	return (
		<div>
			<Pagination className="text-left">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href={"/students"} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">生徒詳細情報</h1>
				<div className="space-x-2">
					<Badge variant={student.isActive ? "default" : "secondary"}>
						{student.isActive ? "在籍中" : "離籍"}
					</Badge>
					<Badge variant={student.isLinked ? "default" : "secondary"}>
						{student.isLinked ? "連携済" : "未連携"}
					</Badge>
				</div>
			</div>

			<div className="mt-2 grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>基本情報</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<div className="text-sm font-medium text-gray-500">氏名</div>
								<div className="text-lg">{student.fullName}</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-sm font-medium text-gray-500">
										入学年度
									</div>
									<div>{student.enrollmentYear}年度</div>
								</div>
								<div>
									<div className="text-sm font-medium text-gray-500">
										現在の学年
									</div>
									<div>{student.currentGrade}年</div>
								</div>
								<div>
									<div className="text-sm font-medium text-gray-500">クラス</div>
									<div>{student.currentClass}組</div>
								</div>
								<div>
									<div className="text-sm font-medium text-gray-500">
										出席番号
									</div>
									<div>{student.currentNumber}番</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>システム情報</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<div className="text-sm font-medium text-gray-500">学生ID</div>
								<div>{student.id}</div>
							</div>
							<div>
								<div className="text-sm font-medium text-gray-500">作成日時</div>
								<div>{new Date(student.createdAt).toLocaleString()}</div>
							</div>
							<div>
								<div className="text-sm font-medium text-gray-500">更新日時</div>
								<div>{new Date(student.updatedAt).toLocaleString()}</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="mt-2">
				<Card className="mt-2">
					<CardHeader>
						<CardTitle>履歴情報</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="w-full">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>年度</TableHead>
										<TableHead>学年</TableHead>
										<TableHead>クラス</TableHead>
										<TableHead>出席番号</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{studentHistory ? (
										studentHistory.map((history) => (
											<TableRow key={history.id}>
												<TableCell>{history.academicYear}年度</TableCell>
												<TableCell>{history.grade}年</TableCell>
												<TableCell>{history.className}組</TableCell>
												<TableCell>{history.number}番</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell className="text-center" colSpan={4}>
												履歴なし
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default page;
