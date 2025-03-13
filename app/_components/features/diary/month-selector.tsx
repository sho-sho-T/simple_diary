"use client";

import { Button } from "@/app/_components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import * as React from "react";

interface MonthSelectorProps {
	availableMonths: Date[];
	selectedMonth: Date;
	onMonthChange: (month: Date) => void;
	className?: string;
}

/**
 * 月選択ドロップダウン
 */
export function MonthSelector({
	availableMonths,
	selectedMonth,
	onMonthChange,
	className,
}: MonthSelectorProps) {
	// 月のフォーマット (例: 2023年4月)
	const formatMonth = (date: Date) => {
		return format(date, "yyyy年M月", { locale: ja });
	};

	// 月を比較する関数（年と月が同じかどうか）
	const isSameMonth = (date1: Date, date2: Date) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth()
		);
	};

	// 月のキーを生成する関数
	const getMonthKey = (date: Date) => {
		return `${date.getFullYear()}-${date.getMonth() + 1}`;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={cn("flex items-center justify-between gap-2", className)}
				>
					{formatMonth(selectedMonth)}
					<ChevronDown className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				className="w-[200px] max-h-[300px] overflow-y-auto"
			>
				{availableMonths.map((month) => (
					<DropdownMenuItem
						key={getMonthKey(month)}
						onClick={() => onMonthChange(month)}
						className={cn(
							isSameMonth(month, selectedMonth) &&
								"bg-accent text-accent-foreground",
						)}
					>
						{formatMonth(month)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
