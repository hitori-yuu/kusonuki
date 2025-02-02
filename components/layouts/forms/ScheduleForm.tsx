"use client";
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
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { CreateSchedule } from "@/lib/server/actions";
import { useState } from "react";

const formSchema = z.object({
	content: z.string().min(2, {
		message: "予定名は2文字以上で入力してください。",
	}),
	isEvery: z.boolean().default(false),
	date: z.date(),
});

const ScheduleForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();
	const [isLoading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
			date: new Date(),
			isEvery: false,
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		if (user && student) {
			await CreateSchedule(
				values.date,
				values.content,
				student.currentGrade,
				student.currentClass,
				values.isEvery,
				user.id,
			);
			toast.success("予定を作成しました。", { description: values.content });
		} else {
			toast.error("ログイン時のみ実行できます。");
		}
		form.reset();
		router.refresh();
		setLoading(false);
	}

	if (!user) return;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>予定名</FormLabel>
							<FormControl>
								<Input placeholder='例 ） 知の探求講座' {...field} />
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

				<Button type='submit' className='w-full' disabled={isLoading}>
					{isLoading ? "作成中..." : <>作成</>}
				</Button>
			</form>
		</Form>
	);
};

export default ScheduleForm;
