import React from "react";
import { findStudentByFullName, Student, User } from "@/lib/server/actions";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const user = await User(id);
	let student = null;
	if (user.studentId && user.isLinked) {
		try {
			student = await Student(user.studentId);
		} catch (error) {
			console.error("Failed to fetch student data:", error);
		}
	}
	return (
		<div>
			<Pagination className="text-left">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href={"/users"} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">ユーザー情報</h1>
				<div className="space-x-2">
					<Badge variant={user.isAvailable ? "default" : "secondary"}>
						{user.isAvailable ? "利用可" : "利用禁止"}
					</Badge>
					<Badge variant={user.isLinked ? "default" : "secondary"}>
						{user.isLinked ? "連携済" : "未連携"}
					</Badge>
				</div>
			</div>

			<div className="mt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>基本情報</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<Avatar className="h-32 w-32 mx-auto">
								<AvatarImage src={String(user.pictureUrl)} />
								<AvatarFallback>{user.displayName}</AvatarFallback>
							</Avatar>
							<div>
								<div className="text-sm font-medium text-gray-500">ID</div>
								<div>{user.id}</div>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div>
									<div className="text-sm font-medium text-gray-500">
										ユーザー名
									</div>
									<div className="text-lg">{user.displayName}</div>
								</div>

								<div>
									<div className="text-sm font-medium text-gray-500">権限</div>
									<div>{user.role}</div>
								</div>
								<div>
									<div className="text-sm font-medium text-gray-500">
										メールアドレス
									</div>
									<div>{user.email || "-"}</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>連携情報</CardTitle>
					</CardHeader>
					<CardContent>
						<div>
							<div className="text-sm font-medium text-gray-500">連携状態</div>
							<div>{user.isLinked ? "連携済" : "未連携"}</div>
						</div>
						{student && (
							<div className="mt-4 grid grid-cols-2 gap-2">
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
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default page;
