"use client";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
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

const formSchema = z.object({
	period: z.enum(["前期中間", "前期期末", "後期期末", "後期中間", "学年末"]),
	date: z.date(),
	timetable: z
		.array(
			z.enum([
				"数学α",
				"数学β",
				"英語コミュニケーション",
				"論理表現",
				"古典探求",
				"論理国語",
				"歴史総合",
				"物理/生物",
				"化学",
				"家庭基礎",
				"保健",
				"H.R.",
			]),
		)
		.min(1)
		.max(4), // Max 4 time slots
});

const ExamScheduleForm = () => {
	const router = useRouter();
	const { user } = useUser();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			period: "前期期末",
			date: new Date(),
			timetable: ["数学α"],
		},
	});

	// Specify the type explicitly
	const { fields, append, remove } = useFieldArray<any>({
		control: form.control,
		name: "timetable",
	});

	async function onSubmit(value: z.infer<typeof formSchema>) {
		const { period, date, timetable } = value;
		const authorId = user?.id || "guest";
		try {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}exams`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ period, date, timetable, authorId }),
			});
			router.push("/");
			router.refresh();
			toast({
				description: "試験用時間割を作成しました。",
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="period"
					render={({ field }) => (
						<FormItem>
							<FormLabel>範囲</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="範囲を選択" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="前期中間">前期中間</SelectItem>
										<SelectItem value="前期期末">前期期末</SelectItem>
										<SelectItem value="後期期末">後期期末</SelectItem>
										<SelectItem value="後期中間">後期中間</SelectItem>
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
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>日付</FormLabel>
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
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
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

				<div>
					<FormLabel>時間割</FormLabel>
					{fields.map((field, index) => (
						<div key={field.id} className="flex items-center gap-4 mb-4">
							<FormLabel className="w-20">{index + 1}時間目:</FormLabel>
							<FormField
								control={form.control}
								name={`timetable.${index}`}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="教科を選択" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="数学α">数学α</SelectItem>
													<SelectItem value="数学β">数学β</SelectItem>
													<SelectItem value="英語コミュニケーション">
														英語コミュニケーション
													</SelectItem>
													<SelectItem value="論理表現">
														論理表現
													</SelectItem>
													<SelectItem value="古典探求">
														古典探求
													</SelectItem>
													<SelectItem value="論理国語">
														論理国語
													</SelectItem>
													<SelectItem value="歴史総合">
														歴史総合
													</SelectItem>
													<SelectItem value="物理/生物">
														物理/生物
													</SelectItem>
													<SelectItem value="化学">化学</SelectItem>
													<SelectItem value="家庭基礎">
														家庭基礎
													</SelectItem>
													<SelectItem value="保健">保健</SelectItem>
													<SelectItem value="H.R.">H.R.</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								type="button"
								variant="outline"
								onClick={() => remove(index)}
								disabled={fields.length === 1}
							>
								削除
							</Button>
						</div>
					))}

					{fields.length < 4 && (
						<Button
							type="button"
							variant="secondary"
							onClick={() => append("数学α")}
							className="w-full"
						>
							時間割追加
						</Button>
					)}
				</div>

				<Button type="submit" className="w-full">
					時間割作成
				</Button>
			</form>
		</Form>
	);
};

export default ExamScheduleForm;
