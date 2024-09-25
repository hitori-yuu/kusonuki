"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	subject: z.string(),
	deadline: z.date(),
});

const AssignmentForm = () => {
	const router = useRouter();
	const { user, student, liff } = useUser();
	const { toast } = useToast();

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
		const authorId = user?.id || "guest";
		try {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}assignments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, subject, deadline, authorId }),
			});
			router.push("/");
			router.refresh();
			toast({
				description: "Added Assignment",
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Assignment name" {...field} />
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
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Subject" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="数学">数学</SelectItem>
										<SelectItem value="英語コミュニケーション">
											英語コミュニケーション
										</SelectItem>
										<SelectItem value="論理表現">論理表現</SelectItem>
										<SelectItem value="古典探求">古典探求</SelectItem>
										<SelectItem value="論理国語">論理国語</SelectItem>
										<SelectItem value="歴史総合[日]">歴史総合[日]</SelectItem>
										<SelectItem value="歴史総合[世]">歴史総合[世]</SelectItem>
										<SelectItem value="物理">物理</SelectItem>
										<SelectItem value="生物">生物</SelectItem>
										<SelectItem value="化学">化学</SelectItem>
										<SelectItem value="家庭基礎">家庭基礎</SelectItem>
										<SelectItem value="体育">体育</SelectItem>
										<SelectItem value="保健">保健</SelectItem>
										<SelectItem value="ヴェリタス">ヴェリタス</SelectItem>
										<SelectItem value="H.R.">H.R.</SelectItem>
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
						<FormItem className="flex flex-col">
							<FormLabel>Deadline of assignment</FormLabel>
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
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
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
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AssignmentForm;
