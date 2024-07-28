"use client";

import React from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";

const formSchema = z.object({
	name: z.string().min(2, { message: "課題の名前は2文字以上で入力してください。" }),
	subject: z.string(),
	deadline: z.date(),
});

const CreateAssignment = () => {
	const router = useRouter();
	const [date, setDate] = React.useState<Date>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			subject: "",
			deadline: new Date(),
		},
	});

	async function onSubmit(value: z.infer<typeof formSchema>) {
		const { name, subject, deadline } = value;
		console.log(name, subject, deadline);
		try {
			await fetch("http://localhost:3000/api/assignments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, subject, deadline }),
			});
			router.push("/");
			router.refresh();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<SessionProvider>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>課題名</FormLabel>
								<FormControl>
									<Input placeholder="課題名を入力" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem>
								<FormLabel>教科</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="教科を選択" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">Light</SelectItem>
											<SelectItem value="dark">Dark</SelectItem>
											<SelectItem value="system">System</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="deadline"
						render={({ field }) => (
							<FormItem>
								<FormLabel>教科</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-[280px] justify-start text-left font-normal",
													!date && "text-muted-foreground"
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={date}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</SessionProvider>
	);
};

export default CreateAssignment;
