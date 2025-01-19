"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/use-toast";
import { CreatePost } from "@/lib/server/actions";
import { useState } from "react";
import { ImageIcon, MusicIcon, VideoIcon } from "lucide-react";

const formSchema = z.object({
	username: z.string().min(2, { message: "ユーザー名は2文字以上で入力してください。" }),
	content: z.string(),
});

const PostForm = () => {
	const { user, student, liff } = useUser();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			content: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		const { username, content } = values;
		console.log(values);
		// await CreatePost(username, content, "Ud713d7bf56b49d0f40c0712335f625ba");
		// form.reset();
		// toast({
		// 	description: "生徒情報を連携しました。",
		// });
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input placeholder="ユーザー名" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Textarea placeholder="シェアしよう" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					投稿する
				</Button>
			</form>
		</Form>
	);
};

export default PostForm;
