"use client";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { addMonths, format, isSameMonth, subMonths } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

interface MonthNavigationProps {
	availableMonths: Date[];
	selectedMonth: Date;
	onMonthChange: (month: Date) => void;
	className?: string;
}

/**
 * 月ナビゲーションコンポーネント
 * 前月・次月ボタンと現在の月を表示します
 */
export function MonthNavigation({
	availableMonths,
	selectedMonth,
	onMonthChange,
	className,
}: MonthNavigationProps) {
	// 月のフォーマット (例: 2023年4月)
	const formatMonth = (date: Date) => {
		return format(date, "yyyy年M月", { locale: ja });
	};

	// 前月ボタンクリック時の処理
	const handlePreviousMonth = () => {
		const prevMonth = subMonths(selectedMonth, 1);
		// 利用可能な月リストから最も近い月を見つける
		const nearestAvailableMonth = findNearestAvailableMonth(prevMonth);
		if (nearestAvailableMonth) {
			onMonthChange(nearestAvailableMonth);
		}
	};

	// 次月ボタンクリック時の処理
	const handleNextMonth = () => {
		const nextMonth = addMonths(selectedMonth, 1);
		// 利用可能な月リストから最も近い月を見つける
		const nearestAvailableMonth = findNearestAvailableMonth(nextMonth);
		if (nearestAvailableMonth) {
			onMonthChange(nearestAvailableMonth);
		}
	};

	// 指定された日付に最も近い利用可能な月を見つける
	const findNearestAvailableMonth = (targetDate: Date): Date | null => {
		if (!availableMonths.length) return null;

		// 完全に一致する月がある場合はそれを返す
		const exactMatch = availableMonths.find((month) =>
			isSameMonth(month, targetDate),
		);
		if (exactMatch) return exactMatch;

		// それ以外の場合は、時間的に最も近い月を返す
		let closestMonth = availableMonths[0];
		let minDiff = Math.abs(targetDate.getTime() - closestMonth.getTime());

		for (let i = 1; i < availableMonths.length; i++) {
			const diff = Math.abs(
				targetDate.getTime() - availableMonths[i].getTime(),
			);
			if (diff < minDiff) {
				minDiff = diff;
				closestMonth = availableMonths[i];
			}
		}

		return closestMonth;
	};

	// 前月・次月ボタンの有効/無効状態を計算
	const isPreviousDisabled = (): boolean => {
		const prevMonth = subMonths(selectedMonth, 1);
		const nearestMonth = findNearestAvailableMonth(prevMonth);
		return !nearestMonth || isSameMonth(nearestMonth, selectedMonth);
	};

	const isNextDisabled = (): boolean => {
		const nextMonth = addMonths(selectedMonth, 1);
		const nearestMonth = findNearestAvailableMonth(nextMonth);
		return !nearestMonth || isSameMonth(nearestMonth, selectedMonth);
	};

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Button
				variant="outline"
				size="icon"
				onClick={handlePreviousMonth}
				disabled={isPreviousDisabled()}
				aria-label="前月"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<div className="min-w-24 text-center font-medium">
				{formatMonth(selectedMonth)}
			</div>
			<Button
				variant="outline"
				size="icon"
				onClick={handleNextMonth}
				disabled={isNextDisabled()}
				aria-label="次月"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
