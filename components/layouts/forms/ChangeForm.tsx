"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { CreateAssignment, CreateChange } from "@/lib/server/actions";

const formSchema = z.object({
	subject: z.string(),
	period: z
		.number()
		.min(1, { message: "時限は1～5の範囲で入力してください。" })
		.max(5, { message: "時限は1～5の範囲で入力してください。" }),
	date: z.date(),
	isEvery: z.boolean().default(false),
});

const ChangeForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			subject: "",
			period: 1,
			date: new Date(),
			isEvery: false,
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		if (user && student) {
			await CreateChange(
				values.date,
				values.period,
				values.subject,
				student.currentGrade,
				student.currentClass,
				values.isEvery,
				user.id,
			);
			form.reset();
			toast.success("授業変更を作成しました。");
			router.refresh();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='subject'
					render={({ field }) => (
						<FormItem>
							<FormLabel>教科</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder='教科を選択' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='数学'>数学</SelectItem>
										<SelectItem value='英語コミュニケーション'>英語コミュニケーション</SelectItem>
										<SelectItem value='論理表現'>論理表現</SelectItem>
										<SelectItem value='古典探求'>古典探求</SelectItem>
										<SelectItem value='論理国語'>論理国語</SelectItem>
										<SelectItem value='歴史総合[日]'>歴史総合[日]</SelectItem>
										<SelectItem value='歴史総合[世]'>歴史総合[世]</SelectItem>
										<SelectItem value='物理'>物理</SelectItem>
										<SelectItem value='生物'>生物</SelectItem>
										<SelectItem value='化学'>化学</SelectItem>
										<SelectItem value='家庭基礎'>家庭基礎</SelectItem>
										<SelectItem value='体育'>体育</SelectItem>
										<SelectItem value='保健'>保健</SelectItem>
										<SelectItem value='ヴェリタス'>ヴェリタス</SelectItem>
										<SelectItem value='H.R.'>H.R.</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='period'
					render={({ field }) => (
						<FormItem>
							<FormLabel>時限</FormLabel>
							<FormControl>
								<Input
									type='number'
									placeholder='時限'
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>変更日</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP", { locale: ja })
											) : (
												<span>日付を選択</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
										locale={ja}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				{user?.role === "ADMIN" ||
					(user?.role === "EDITOR" && (
						<FormField
							control={form.control}
							name='isEvery'
							render={({ field }) => (
								<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel>全てのクラスに追加</FormLabel>
								</FormItem>
							)}
						/>
					))}
				<Button type='submit' className='w-full'>
					授業変更作成
				</Button>
			</form>
		</Form>
	);
};

export default ChangeForm;
