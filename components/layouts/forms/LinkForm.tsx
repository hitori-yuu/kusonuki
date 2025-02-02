"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/hooks/useUser";
import { LinkUser, searchStudent } from "@/lib/server/actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	grade: z.number(),
	group: z.string(),
	number: z
		.number()
		.min(1, { message: "出席番号は1～40の範囲で入力してください。" })
		.max(40, { message: "出席番号は1～40の範囲で入力してください。" }),
});

const LinkForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();
	const [isLoading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: student?.firstName || "",
			lastName: student?.lastName || "",
			grade: student?.currentGrade || 2,
			group: student?.currentClass || "",
			number: student?.currentNumber || 1,
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		const foundUser = await searchStudent(
			values.lastName,
			values.firstName,
			values.grade,
			values.group,
			values.number,
		);

		if (!foundUser) {
			form.setError("lastName", {
				type: "manual",
				message: "生徒が見つかりませんでした。",
			});
			form.setError("firstName", {
				type: "manual",
				message: "生徒が見つかりませんでした。",
			});
			return;
		}
		if (user) {
			await LinkUser(values.lastName, values.firstName, values.grade, values.group, values.number, user?.id);
			toast.success("生徒情報を連携しました。", {
				description: values.lastName + values.firstName,
			});
		} else {
			toast.error("ログイン時のみ実行できます。");
		}
		form.reset();
		router.refresh();
		setLoading(false);
	}

	if (!user) {
		return (
			<div>
				<p className='text-xl font-bold'>この機能を使うには、ログインしてください。</p>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<div className='flex space-x-4'>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>性</FormLabel>
								<FormControl>
									{student?.lastName ? (
										<Input placeholder={student.lastName} {...field} />
									) : (
										<Input placeholder='名字' {...field} />
									)}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>名</FormLabel>
								<FormControl>
									{student?.firstName ? (
										<Input placeholder={student.firstName} {...field} />
									) : (
										<Input placeholder='名前' {...field} />
									)}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex space-x-4'>
					<FormField
						control={form.control}
						name='grade'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>学年</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => field.onChange(Number(value))}
										defaultValue={student ? String(student.currentGrade) : String(field.value)}
									>
										<SelectTrigger>
											<SelectValue placeholder='学年を選択' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='1'>1</SelectItem>
											<SelectItem value='2'>2</SelectItem>
											<SelectItem value='3'>3</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='group'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>クラス</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger>
											{student ? (
												<SelectValue placeholder={student.currentClass} />
											) : (
												<SelectValue placeholder='クラスを選択' />
											)}
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='A'>A</SelectItem>
											<SelectItem value='B'>B</SelectItem>
											<SelectItem value='C'>C</SelectItem>
											<SelectItem value='D'>D</SelectItem>
											<SelectItem value='E'>E</SelectItem>
											<SelectItem value='F'>F</SelectItem>
											<SelectItem value='G'>G</SelectItem>
											<SelectItem value='H'>H</SelectItem>
											<SelectItem value='I'>I</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='number'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>出席番号</FormLabel>
								<FormControl>
									<Input
										type='number'
										defaultValue='出席番号を入力'
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type='submit' className='w-full' disabled={isLoading}>
					{isLoading ? "連携中..." : <>連携</>}
				</Button>
			</form>
		</Form>
	);
};

export default LinkForm;
