"use client";

import { DiaryCard } from "@/app/_components/features/diary/diary-card";
import { MonthSelector } from "@/app/_components/features/diary/month-selector";
import { Pagination } from "@/app/_components/ui/pagination";
import type { Tag } from "@/app/_types";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { cn } from "@/lib/utils";
import * as React from "react";

interface MonthlyDiaryListProps {
	entries: DiaryEntryWithTags[];
	tags: Tag[];
	availableMonths: Date[];
	selectedMonth: Date;
	onMonthChange: (month: Date) => void;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onEntryClick?: (entryId: string) => void;
	className?: string;
}

/**
 * 月別日記一覧コンポーネント
 */
export function MonthlyDiaryList({
	entries,
	tags,
	availableMonths,
	selectedMonth,
	onMonthChange,
	currentPage,
	totalPages,
	onPageChange,
	onEntryClick,
	className,
}: MonthlyDiaryListProps) {
	// 日記エントリーに関連するタグを取得する関数
	const getTagsForEntry = (entry: DiaryEntryWithTags) => {
		if (!entry.tags || entry.tags.length === 0) return [];

		return entry.tags.map((tagRelation) => {
			return (
				tags.find((tag) => tag.id === tagRelation.tag.id) || tagRelation.tag
			);
		});
	};

	return (
		<div className={cn("space-y-6", className)}>
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">日記一覧</h2>
				<MonthSelector
					availableMonths={availableMonths}
					selectedMonth={selectedMonth}
					onMonthChange={onMonthChange}
				/>
			</div>

			{entries.length === 0 ? (
				<div className="text-center py-10">
					<p className="text-muted-foreground">この月の日記はありません</p>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{entries.map((entry) => (
						<DiaryCard
							key={entry.id}
							entry={entry}
							tags={getTagsForEntry(entry)}
							isCompact
							onCardClick={
								onEntryClick ? () => onEntryClick(entry.id) : undefined
							}
						/>
					))}
				</div>
			)}

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={onPageChange}
					className="mt-8"
				/>
			)}
		</div>
	);
}
