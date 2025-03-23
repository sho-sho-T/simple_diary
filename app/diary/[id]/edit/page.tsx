import { DiaryForm } from "@/app/_components/containers/diary/form";
import { Header } from "@/app/_layouts/header";
import type { DiaryFormData } from "@/app/_types/diary/form";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { getDiaryEntryById } from "@/app/api/diary/_lib/diary-service";
import { getCurrentUserId } from "@/lib/auth-utils";
import { notFound, redirect } from "next/navigation";
import { DeleteButton } from "./delete-button";

/**
 * 日記編集ページ
 */
export default async function DiaryEditPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	try {
		// 認証情報からユーザーIDを取得
		const userId = await getCurrentUserId();

		// サービス関数を直接呼び出して日記エントリーを取得
		const entry = await getDiaryEntryById(userId, id);

		// 存在しない場合は404
		if (!entry) {
			notFound();
		}

		// DiaryForm用のデータ形式に変換
		const initialData: DiaryFormData = {
			content: entry.content || "",
			entryDate: new Date(entry.entryDate),
			emotionStampId: entry.emotionStampId || undefined,
			tags: entry.tags.map((tag) => tag.tag),
		};

		return (
			<>
				<Header />
				<div className="container mx-auto py-6 max-w-4xl relative">
					<DiaryForm initialData={initialData} />
					<DeleteButton entryId={id} />
				</div>
			</>
		);
	} catch (error) {
		// 認証エラーの場合はログインページにリダイレクト
		console.error("Authentication error:", error);
		redirect("/api/auth/signin");
	}
}
