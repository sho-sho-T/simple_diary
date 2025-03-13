"use client";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	className?: string;
}

/**
 * ページネーションコンポーネント
 */
export function Pagination({
	totalPages,
	currentPage,
	onPageChange,
	className,
}: PaginationProps) {
	// 表示するページ番号の範囲を計算
	const getPageNumbers = () => {
		const pageNumbers = [];
		const maxPagesToShow = 5; // 表示するページ番号の最大数

		if (totalPages <= maxPagesToShow) {
			// 全ページ数が表示最大数以下の場合は全て表示
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			// 現在のページを中心に表示
			let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
			let endPage = startPage + maxPagesToShow - 1;

			// 終了ページが全ページ数を超える場合は調整
			if (endPage > totalPages) {
				endPage = totalPages;
				startPage = Math.max(1, endPage - maxPagesToShow + 1);
			}

			for (let i = startPage; i <= endPage; i++) {
				pageNumbers.push(i);
			}
		}

		return pageNumbers;
	};

	const pageNumbers = getPageNumbers();

	return (
		<nav
			className={cn("flex items-center justify-center space-x-2", className)}
			aria-label="ページネーション"
		>
			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
				aria-label="前のページ"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{pageNumbers.map((page) => (
				<Button
					key={page}
					variant={page === currentPage ? "default" : "outline"}
					size="sm"
					onClick={() => onPageChange(page)}
					aria-current={page === currentPage ? "page" : undefined}
					aria-label={`${page}ページ目`}
				>
					{page}
				</Button>
			))}

			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages || totalPages === 0}
				aria-label="次のページ"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</nav>
	);
}
