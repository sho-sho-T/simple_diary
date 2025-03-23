"use client";

import { DiaryCard } from "@/app/_components/features/diary/diary-card";
import { MonthNavigation } from "@/app/_components/features/diary/month-navigation";
import { FloatingActionButton } from "@/app/_components/ui/floating-action-button";
import type { Tag } from "@/app/_types";
import type { DiaryEntryWithTags } from "@/app/api/diary/_lib/diary-service";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
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
			<div className="flex flex-col items-center">
				<div className="mt-4">
					<MonthNavigation
						availableMonths={availableMonths}
						selectedMonth={selectedMonth}
						onMonthChange={onMonthChange}
					/>
				</div>
			</div>

			{entries.length === 0 ? (
				<div className="text-center py-10">
					<p className="text-muted-foreground">この月の日記はありません</p>
				</div>
			) : (
				<div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
					{entries.map((entry) => (
						<DiaryCard
							key={entry.id}
							entry={entry}
							tags={getTagsForEntry(entry)}
							isCompact
							onCardClick={
								onEntryClick ? () => onEntryClick(entry.id) : undefined
							}
							className="w-full"
						/>
					))}
				</div>
			)}

			{/* 日記追加ボタン */}
			<Link href="/diary/create" aria-label="日記を作成">
				<FloatingActionButton aria-label="日記を作成">
					<Plus className="h-6 w-6" />
				</FloatingActionButton>
			</Link>
		</div>
	);
}
