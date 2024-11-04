"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { CreateExam } from "@/lib/ServerAction";

const formSchema = z.object({
	term: z.string(),
	subject: z.string(),
	scope: z.string().min(2, {
		message: "試験範囲は2文字以上で入力してください。",
	}),
	exclusion: z.string(),
	deadline: z.date(),
});

const ExamForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			term: "",
			subject: "",
			scope: "",
			exclusion: "",
			deadline: new Date(),
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		if (user && student) {
			await CreateExam(
				student.grade,
				values.subject,
				values.scope,
				values.exclusion,
				user.id,
			);
			form.reset();
			toast({
				description: "試験範囲を作成しました。",
			});
			router.refresh();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="term"
					render={({ field }) => (
						<FormItem>
							<FormLabel>試験学期</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="学期を選択" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="前期中間">前期中間</SelectItem>
										<SelectItem value="前期期末">前期期末</SelectItem>
										<SelectItem value="後期中間">後期中間</SelectItem>
										<SelectItem value="後期期末">後期期末</SelectItem>
										<SelectItem value="学年末">学年末</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>教科</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="教科を選択" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="数学α">数学α</SelectItem>
										<SelectItem value="数学β">数学β</SelectItem>
										<SelectItem value="英語コミュニケーション">
											英語コミュニケーション
										</SelectItem>
										<SelectItem value="論理表現">論理表現</SelectItem>
										<SelectItem value="古典探求">古典探求</SelectItem>
										<SelectItem value="論理国語">論理国語</SelectItem>
										<SelectItem value="歴史総合">歴史総合</SelectItem>
										<SelectItem value="物理">物理</SelectItem>
										<SelectItem value="生物">生物</SelectItem>
										<SelectItem value="化学">化学</SelectItem>
										<SelectItem value="家庭基礎">家庭基礎</SelectItem>
										<SelectItem value="保健">保健</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="scope"
					render={({ field }) => (
						<FormItem>
							<FormLabel>試験範囲</FormLabel>
							<FormControl>
								<Input placeholder="例 ） 教科書p.20-40" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="exclusion"
					render={({ field }) => (
						<FormItem>
							<FormLabel>除外範囲</FormLabel>
							<FormControl>
								<Input placeholder="例 ） 教科書p.25-28" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					試験範囲作成
				</Button>
			</form>
		</Form>
	);
};

export default ExamForm;
