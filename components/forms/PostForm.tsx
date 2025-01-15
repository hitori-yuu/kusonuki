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
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
	username: z.string(),
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
	return (
		<Form {...form}>
			<form className="space-y-2">
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
