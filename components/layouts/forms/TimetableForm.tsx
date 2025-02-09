"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as z from "zod";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { CreateSchedule, CreateTimetable } from "@/lib/server/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const weeks = ["A", "B", "C", "D"] as const;
const days = ["月", "火", "水", "木", "金"] as const;

const formSchema = z.object({
	week: z.string().min(1, {
		message: "週を選択してください。",
	}),
	day: z.string().min(1, {
		message: "曜日を選択してください。",
	}),
	timetable: z.array(z.string()),
	grade: z.number(),
	className: z.string(),
});

const TimetableForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();
	const [isLoading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			week: "",
			day: "",
			timetable: [""],
			grade: 2,
			className: "H",
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		if (user && student) {
			await CreateTimetable(values.week, values.day, values.timetable, values.grade, values.className, user.id);
			toast.success("時間割を作成しました。", {
				description: `${values.week}週${values.day}曜日`,
			});
		} else {
			toast.error("ログイン時のみ実行できます。");
		}
		form.reset();
		router.refresh();
		setLoading(false);
	}

	const { fields, append, remove } = useFieldArray<any>({
		control: form.control,
		name: "scope",
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<div className='grid grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='week'
						render={({ field }) => (
							<FormItem>
								<FormLabel>週</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='週を選択' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{weeks.map((week) => (
											<SelectItem key={week} value={week}>
												{week}週
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='day'
						render={({ field }) => (
							<FormItem>
								<FormLabel>曜日</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='曜日を選択' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{days.map((day) => (
											<SelectItem key={day} value={day}>
												{day}曜日
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='grid grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='grade'
						render={({ field }) => (
							<FormItem>
								<FormLabel>学年</FormLabel>
								<Select
									onValueChange={(value) => field.onChange(parseInt(value))}
									defaultValue={field.value.toString()}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='学年を選択' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{[1, 2, 3, 4, 5, 6].map((grade) => (
											<SelectItem key={grade} value={grade.toString()}>
												{grade}年
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='className'
						render={({ field }) => (
							<FormItem>
								<FormLabel>クラス</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='space-y-4'>
					{["first", "second", "third", "fourth", "fifth"].map((period, index) => (
						<FormField
							key={period}
							control={form.control}
							name={period as keyof z.infer<typeof formSchema>}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{index + 1}時間目</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder='教科を選択' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='数学'>数学</SelectItem>
												<SelectItem value='英語コミュニケーション'>
													英語コミュニケーション
												</SelectItem>
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
					))}
				</div>

				<div>
					<FormLabel>範囲</FormLabel>
					{fields.map((field, index) => (
						<div key={field.id} className='flex items-center gap-4 mb-4'>
							<FormField
								control={form.control}
								name={`timetable.${index}`}
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormControl>
											<Select onValueChange={field.onChange}>
												<SelectTrigger>
													<SelectValue placeholder='教科を選択' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='数学'>数学</SelectItem>
													<SelectItem value='英語コミュニケーション'>
														英語コミュニケーション
													</SelectItem>
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
									</FormItem>
								)}
							/>

							<Button
								type='button'
								variant='outline'
								onClick={() => remove(index)}
								disabled={fields.length === 1}
							>
								削除
							</Button>
						</div>
					))}

					{fields.length < 4 && (
						<Button type='button' variant='secondary' onClick={() => append("数学α")} className='w-full'>
							範囲追加
						</Button>
					)}
				</div>

				<Button type='submit' className='w-full' disabled={isLoading}>
					{isLoading ? "作成中..." : <>作成</>}
				</Button>
			</form>
		</Form>
	);
};

export default TimetableForm;
