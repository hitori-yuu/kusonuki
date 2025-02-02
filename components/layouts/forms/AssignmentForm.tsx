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
import { CreateAssignment } from "@/lib/server/actions";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "課題名は2文字以上で入力してください。",
	}),
	subject: z.string(),
	deadline: z.date(),
	isEvery: z.boolean().default(false),
});

const AssignmentForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();
	const [isLoading, setLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			subject: "",
			deadline: new Date(),
			isEvery: false,
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		if (user && student) {
			await CreateAssignment(
				values.name,
				values.subject,
				values.deadline,
				student.currentGrade,
				student.currentClass,
				values.isEvery,
				user.id,
			);

			toast.success("課題を作成しました。", {
				description: values.name,
			});
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
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>課題名</FormLabel>
							<FormControl>
								<Input placeholder='例 ） プリントNo.1' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
					name='deadline'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>提出日</FormLabel>
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

export default AssignmentForm;
