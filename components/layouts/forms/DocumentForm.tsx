"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";
import { CreateDocument } from "@/lib/server/actions";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

const DocumentForm = () => {
	const router = useRouter();
	const [isUploading, setIsUploading] = useState(false);
	const { user, student, liff } = useUser();
	const [preview, setPreview] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		subject: "",
		academicYear: "2024",
	});

	function getImageData(event: ChangeEvent<HTMLInputElement>) {
		const dataTransfer = new DataTransfer();

		Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

		const files = dataTransfer.files;
		const displayUrl = URL.createObjectURL(event.target.files![0]);

		return { files, displayUrl };
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUploading(true);

		if (user && student) {
			try {
				const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
				if (!fileInput?.files?.[0]) {
					alert("ファイルを選択してください");
					setIsUploading(false);
					return;
				}
				const file = fileInput.files[0];
				const fileExt = file.name.split(".").pop();
				const fileName = `${Math.random()}.${fileExt}`;
				const filePath = `${fileName}`;

				// Upload file to Supabase Storage
				const { data: uploadData, error: uploadError } = await supabase.storage
					.from("documents")
					.upload(filePath, file);

				if (uploadError) {
					throw uploadError;
				}

				// Get public URL for the uploaded file
				const {
					data: { publicUrl },
				} = supabase.storage.from("documents").getPublicUrl(filePath);

				await CreateDocument(
					formData.title,
					publicUrl,
					formData.subject,
					student.currentGrade,
					student.currentClass,
					user.id,
				);
				toast.success("プリントのアップロードが完了しました。", {
					description: `${formData.title}`,
				});
			} catch (error) {
				console.error("Error uploading document:", error);
				toast.error("プリントのアップロードに失敗しました。");
			} finally {
			}
		} else {
			toast.error("ログイン時のみ実行できます。");
		}
		setIsUploading(false);
		router.refresh();
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<h1>プリントをアップロード</h1>
			<div className='space-y-2'>
				<Label htmlFor='title'>タイトル</Label>
				<Input
					id='title'
					required
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='subject'>教科</Label>
				<Select
					value={formData.subject}
					onValueChange={(value) => setFormData({ ...formData, subject: value })}
				>
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
			</div>

			<div className='space-y-2'>
				<Label htmlFor='file'>プリント写真</Label>
				<Input
					id='file'
					type='file'
					required
					accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
					onChange={(event) => {
						const { files, displayUrl } = getImageData(event);
						setPreview(displayUrl);
					}}
				/>
			</div>

			{preview && (
				<div className='mx-auto max-w-[100px]'>
					<Image
						src={preview}
						width={50}
						height={50}
						alt=''
						className='w-full h-full object-contain object-center'
					/>
				</div>
			)}

			<Button type='submit' className='w-full' disabled={isUploading}>
				{isUploading ? "アップロード中..." : <>プリントをアップロード</>}
			</Button>
		</form>
	);
};

export default DocumentForm;
