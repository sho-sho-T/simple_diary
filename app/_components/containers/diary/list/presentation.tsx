"use client";

import { MonthlyDiaryList } from "@/app/_components/features/diary/monthly-diary-list";
import type { Tag } from "@/app/_types";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface DiaryListPresentationProps {
	entries: DiaryEntryWithTags[];
	tags: Tag[];
	availableMonths: Date[];
	initialMonth?: Date; // サーバーから初期月を受け取る（オプション）
}

/**
 * 日記一覧プレゼンテーションコンポーネント
 * クライアント側の状態管理とUIレンダリングを担当
 */
export function DiaryListPresentation({
	entries,
	tags,
	availableMonths,
	initialMonth = new Date(),
}: DiaryListPresentationProps) {
	const router = useRouter();
	const [selectedMonth, setSelectedMonth] = useState(initialMonth);
	const [currentPage, setCurrentPage] = useState(1);

	const ITEMS_PER_PAGE = 10;

	// 選択された月のエントリーをフィルタリング
	const filteredEntries = useMemo(() => {
		return entries.filter((entry) => {
			const entryDate = new Date(entry.entryDate);
			return (
				entryDate.getFullYear() === selectedMonth.getFullYear() &&
				entryDate.getMonth() === selectedMonth.getMonth()
			);
		});
	}, [entries, selectedMonth]);

	// 現在のページのエントリー
	const currentEntries = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredEntries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	}, [filteredEntries, currentPage]);

	// 総ページ数
	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(filteredEntries.length / ITEMS_PER_PAGE));
	}, [filteredEntries]);

	// ページ変更ハンドラ
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// ページトップにスクロール
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// 月変更ハンドラ
	const handleMonthChange = (month: Date) => {
		setSelectedMonth(month);
		setCurrentPage(1); // 月が変わったらページを1に戻す
	};

	// 日記エントリーをクリックしたときの処理
	const handleEntryClick = (entryId: string) => {
		router.push(`/diary/${entryId}/edit`);
	};

	return (
		<div className="container py-8">
			<MonthlyDiaryList
				entries={currentEntries}
				tags={tags}
				availableMonths={availableMonths}
				selectedMonth={selectedMonth}
				onMonthChange={handleMonthChange}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
				onEntryClick={handleEntryClick}
			/>
		</div>
	);
}
