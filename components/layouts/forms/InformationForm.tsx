"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { CreateInformation } from "@/lib/server/actions";

const formSchema = z.object({
	title: z.string().min(2, {
		message: "タイトルは2文字以上で入力してください。",
	}),
	content: z.string().min(10, {
		message: "内容は10文字以上で入力してください。",
	}),
});

const InformationForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		if (user) {
			await CreateInformation(values.title, values.content, user?.id);
			form.reset();
			toast.success("お知らせを作成しました。");
			router.refresh();
		}
	}

	if (!user) return;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>タイトル</FormLabel>
							<FormControl>
								<Input placeholder='タイトルを入力' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>内容</FormLabel>
							<FormControl>
								<Input placeholder='内容を入力' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					お知らせ作成
				</Button>
			</form>
		</Form>
	);
};

export default InformationForm;
