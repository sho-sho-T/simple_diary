"use client";

import type { Tag } from "@/app/_types";
import { getAllDiaryEntries } from "@/app/api/diary/_lib/diary-service";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { getAllTags } from "@/app/api/tags/_lib/tag-service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DiaryListPresentation } from "./presentation";

interface DiaryListContainerProps {
	userId: string;
}

/**
 * 日記一覧コンテナコンポーネント
 */
export function DiaryListContainer({ userId }: DiaryListContainerProps) {
	const [entries, setEntries] = useState<DiaryEntryWithTags[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalEntries, setTotalEntries] = useState(0);
	const [selectedMonth, setSelectedMonth] = useState(new Date());

	const ITEMS_PER_PAGE = 10;

	// 利用可能な月のリストを計算
	const availableMonths = useMemo(() => {
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
	}, [entries]);

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

	// 日記エントリーとタグを取得
	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			// 日記エントリーを取得
			const response = await fetch("/api/diary?limit=1000");
			if (!response.ok) {
				throw new Error("日記データの取得に失敗しました");
			}
			const data = await response.json();
			setEntries(data.data || []);
			setTotalEntries(data.data?.length || 0);

			// タグを取得
			const tagsResponse = await fetch("/api/tags");
			if (!tagsResponse.ok) {
				throw new Error("タグデータの取得に失敗しました");
			}
			const tagsData = await tagsResponse.json();
			setTags(tagsData.data || []);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "不明なエラーが発生しました",
			);
			console.error("データ取得エラー:", err);
		} finally {
			setIsLoading(false);
		}
	}, []);

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

	// 初回レンダリング時にデータを取得
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	// ページが変わったときに現在のページが総ページ数を超えていないか確認
	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	// ローディング中
	if (isLoading) {
		return <div className="container py-8">データを読み込み中...</div>;
	}

	// エラー発生時
	if (error) {
		return <div className="container py-8 text-red-500">{error}</div>;
	}

	return (
		<DiaryListPresentation
			entries={currentEntries}
			tags={tags}
			availableMonths={availableMonths}
			selectedMonth={selectedMonth}
			onMonthChange={handleMonthChange}
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={handlePageChange}
		/>
	);
}
