import type { Tag } from "@/app/_types";
import { getAllDiaryEntries } from "@/app/api/diary/_lib/diary-service";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { getAllTags } from "@/app/api/tags/_lib/tag-service";
import { DiaryListPresentation } from "./presentation";

interface DiaryListContainerProps {
	userId: string;
}

/**
 * 日記一覧コンテナコンポーネント
 * サーバーコンポーネントとして実装し、データフェッチを担当
 */
export async function DiaryListContainer({ userId }: DiaryListContainerProps) {
	try {
		// サーバーサイドでデータフェッチ
		const entries = await getAllDiaryEntries(userId, 1000); // 一度に全データを取得
		const tags = await getAllTags(userId);

		// デフォルトの月を設定（現在の月）
		const defaultMonth = new Date();

		// 利用可能な月のリストを計算
		const availableMonths = getAvailableMonths(entries);

		return (
			<DiaryListPresentation
				entries={entries}
				tags={tags}
				initialMonth={defaultMonth}
				availableMonths={availableMonths}
			/>
		);
	} catch (error) {
		// エラーハンドリング
		console.error("日記一覧の取得中にエラーが発生しました:", error);
		return (
			<div className="container py-8">
				<div className="p-4 bg-red-50 rounded-md border border-red-200">
					<h2 className="text-xl font-semibold text-red-800">
						エラーが発生しました
					</h2>
					<p className="mt-2 text-red-700">
						{error instanceof Error
							? error.message
							: "データの取得中に不明なエラーが発生しました。しばらく経ってからもう一度お試しください。"}
					</p>
				</div>
			</div>
		);
	}
}

/**
 * 利用可能な月のリストを計算する関数
 */
function getAvailableMonths(entries: DiaryEntryWithTags[]): Date[] {
	if (entries.length === 0) return [new Date()];

	// 全エントリーから一意の年月を抽出
	const uniqueMonths = new Map();

	for (const entry of entries) {
		const date = new Date(entry.entryDate);
		const key = `${date.getFullYear()}-${date.getMonth()}`;
		if (!uniqueMonths.has(key)) {
			// 日付を月の初日に設定
			const monthDate = new Date(date.getFullYear(), date.getMonth(), 1);
			uniqueMonths.set(key, monthDate);
		}
	}

	// 日付順にソート（降順）
	return Array.from(uniqueMonths.values()).sort(
		(a, b) => b.getTime() - a.getTime(),
	);
}
