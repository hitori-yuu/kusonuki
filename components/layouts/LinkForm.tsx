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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/useUser";
import { LinkUser, searchStudent } from "@/lib/ServerAction";

const formSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	grade: z.number(),
	group: z.string(),
	number: z.number(),
});

const LinkForm = () => {
	const { user } = useUser();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			grade: 2,
			group: "",
			number: 1,
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		const foundUser = await searchStudent(
			values.lastName,
			values.firstName,
			values.grade,
			values.group,
			values.number,
		); // ユーザー検索の関数を呼び出す

		if (!foundUser) {
			// ユーザーが見つからなかった場合
			form.setError("lastName", {
				type: "manual",
				message: "ユーザーが見つかりませんでした。",
			});
			form.setError("firstName", {
				type: "manual",
				message: "ユーザーが見つかりませんでした。",
			});
			return; // 処理を終了
		}
		if (user) {
			await LinkUser(
				values.lastName,
				values.firstName,
				values.grade,
				values.group,
				values.number,
				user?.id,
			);
		}
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<div className="flex space-x-4">
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Last Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="First Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex space-x-4">
					<FormField
						control={form.control}
						name="grade"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Grade</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => field.onChange(Number(value))}
										defaultValue={String(field.value)} // 数値を文字列に変換して渡す
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Grade" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">1</SelectItem>
											<SelectItem value="2">2</SelectItem>
											<SelectItem value="3">3</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="group"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Group</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Group" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="A">A</SelectItem>
											<SelectItem value="B">B</SelectItem>
											<SelectItem value="C">C</SelectItem>
											<SelectItem value="D">D</SelectItem>
											<SelectItem value="E">E</SelectItem>
											<SelectItem value="F">F</SelectItem>
											<SelectItem value="G">G</SelectItem>
											<SelectItem value="H">H</SelectItem>
											<SelectItem value="I">I</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="number"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Number</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default LinkForm;
