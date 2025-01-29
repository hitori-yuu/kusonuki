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
import { CreatePost, CreatePostMedia } from "@/lib/server/actions";
import { ChangeEvent, useState } from "react";
import { ImageIcon, MusicIcon, VideoIcon } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	username: z.string().min(2, { message: "ユーザー名は2文字以上で入力してください。" }),
	content: z.string(),
	mediaUrl: z.string(),
});

const PostForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();
	const [isUploading, setIsUploading] = useState(false);
	const [preview, setPreview] = useState("");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			content: "",
			mediaUrl: "",
		},
	});

	function getImageData(event: ChangeEvent<HTMLInputElement>) {
		const dataTransfer = new DataTransfer();

		Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

		const files = dataTransfer.files;
		const displayUrl = URL.createObjectURL(event.target.files![0]);

		return { files, displayUrl };
	}

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		setIsUploading(true);
		const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
		const { username, content } = values;

		if (user && student) {
			try {
				if (fileInput?.files?.[0]) {
					const file = fileInput.files[0];
					const fileExt = file.name.split(".").pop();
					const fileName = `${Math.random()}.${fileExt}`;
					const filePath = `${fileName}`;

					const { data: uploadData, error: uploadError } = await supabase.storage
						.from("posts")
						.upload(filePath, file);

					if (uploadError) {
						throw uploadError;
					}

					const {
						data: { publicUrl },
					} = supabase.storage.from("posts").getPublicUrl(filePath);

					await CreatePostMedia(username, content, publicUrl, "IMAGE", user.id);
				} else {
					await CreatePost(username, content, user.id);
				}
			} catch (error) {
				console.error("Error creating post:", error);
				toast.error("ポストの投稿に失敗しました。");
			} finally {
				toast("ポストを投稿しました。");
			}
		} else {
			toast.error("ログイン時のみ実行できます");
		}
		setIsUploading(false);
		form.reset();
		router.refresh();
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
				<div className="flex justify-center">
					<Label htmlFor="file">
						<ImageIcon size={32} />
					</Label>
					<Input
						name="mediaUrl"
						className="hidden"
						id="file"
						type="file"
						accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
						onChange={(event) => {
							const { files, displayUrl } = getImageData(event);
							setPreview(displayUrl);
						}}
					/>
				</div>
				{preview && (
					<div className="mx-auto max-w-[100px]">
						<Image
							src={preview}
							width={50}
							height={50}
							alt=""
							className="w-full h-full object-contain object-center"
						/>
					</div>
				)}

				<Button type="submit" className="w-full" disabled={isUploading}>
					{isUploading ? "投稿中..." : <>投稿する</>}
				</Button>
			</form>
		</Form>
	);
};

export default PostForm;
