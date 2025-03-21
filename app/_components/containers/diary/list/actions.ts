"use server";

import { getAllDiaryEntries } from "@/app/api/diary/_lib/diary-service";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { revalidatePath } from "next/cache";

/**
 * 特定の月の日記エントリーを取得するためのサーバーアクション
 * 現在は不要ですが、将来的に月ごとにデータをフェッチする場合のために実装
 */
export async function getDiaryEntriesForMonth(
	userId: string,
	year: number,
	month: number,
): Promise<DiaryEntryWithTags[]> {
	// すべてのエントリーを取得
	const allEntries = await getAllDiaryEntries(userId, 1000);

	// 特定の月のエントリーをフィルタリング
	return allEntries.filter((entry) => {
		const entryDate = new Date(entry.entryDate);
		return entryDate.getFullYear() === year && entryDate.getMonth() === month;
	});
}

/**
 * 日記エントリーを削除するためのサーバーアクション
 * 削除ボタンがUIに追加された場合に使用
 */
export async function deleteDiaryEntry(
	entryId: string,
): Promise<{ success: boolean; message: string }> {
	try {
		// ここで実際の削除処理を実装
		// const response = await fetch(`/api/diary/${entryId}`, {
		//   method: "DELETE",
		// });

		// if (!response.ok) {
		//   throw new Error("エントリーの削除に失敗しました");
		// }

		// パスを再検証して最新のデータを表示
		revalidatePath("/diary");

		return {
			success: true,
			message: "エントリーを削除しました",
		};
	} catch (error) {
		console.error("エントリー削除エラー:", error);
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "不明なエラーが発生しました",
		};
	}
}
