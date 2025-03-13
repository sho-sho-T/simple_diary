"use client";

import { MonthlyDiaryList } from "@/app/_components/features/diary/monthly-diary-list";
import type { Tag } from "@/app/_types";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { useRouter } from "next/navigation";
import * as React from "react";

interface DiaryListPresentationProps {
	entries: DiaryEntryWithTags[];
	tags: Tag[];
	availableMonths: Date[];
	selectedMonth: Date;
	onMonthChange: (month: Date) => void;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

/**
 * 日記一覧プレゼンテーションコンポーネント
 */
export function DiaryListPresentation({
	entries,
	tags,
	availableMonths,
	selectedMonth,
	onMonthChange,
	currentPage,
	totalPages,
	onPageChange,
}: DiaryListPresentationProps) {
	const router = useRouter();

	// 日記エントリーをクリックしたときの処理
	const handleEntryClick = (entryId: string) => {
		router.push(`/diary/${entryId}`);
	};

	return (
		<div className="container py-8">
			<MonthlyDiaryList
				entries={entries}
				tags={tags}
				availableMonths={availableMonths}
				selectedMonth={selectedMonth}
				onMonthChange={onMonthChange}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
				onEntryClick={handleEntryClick}
			/>
		</div>
	);
}
