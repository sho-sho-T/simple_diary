import { DiaryCard } from "@/app/_components/features/diary/diary-card";
import { Header } from "@/app/_layouts/header";
import { getDiaryEntryById } from "@/app/api/diary/_lib/diary-service";
import { getAllTags } from "@/app/api/tags/_lib/tag-service";
import { getCurrentUserId } from "@/lib/auth-utils";
import { notFound, redirect } from "next/navigation";
import { EditButton } from "./edit-button";

/**
 * 日記詳細ページ
 */
export default async function DiaryDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	try {
		// 認証情報からユーザーIDを取得
		const userId = await getCurrentUserId();

		// 日記エントリーを取得
		const entry = await getDiaryEntryById(userId, id);

		// 存在しない場合は404
		if (!entry) {
			notFound();
		}

		// すべてのタグを取得
		const allTags = await getAllTags(userId);

		// エントリーに関連付けられたタグIDを抽出
		const entryTagIds = new Set(entry.tags.map((t) => t.tag.id));

		// エントリーに関連付けられたタグのみをフィルタリング
		const entryTags = allTags.filter((tag) => entryTagIds.has(tag.id));

		return (
			<>
				<Header />
				<main className="container mx-auto py-6 max-w-4xl">
					<div className="mb-6">
						<DiaryCard entry={entry} tags={entryTags} className="shadow-md" />
					</div>

					{/* ローディングアニメーション付き編集ボタン */}
					<EditButton entryId={id} />
				</main>
			</>
		);
	} catch (error) {
		// 認証エラーの場合はログインページにリダイレクト
		console.error("Authentication error:", error);
		redirect("/api/auth/signin");
	}
}
