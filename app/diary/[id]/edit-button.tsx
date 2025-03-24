"use client";

import { FloatingActionButton } from "@/app/_components/ui/floating-action-button";
import { useLoadingNavigation } from "@/app/_hooks/use-loading-navigation";
import { Pencil } from "lucide-react";

interface EditButtonProps {
	entryId: string;
}

/**
 * 日記編集ボタン
 * ローディングアニメーション付きの遷移を行います
 */
export function EditButton({ entryId }: EditButtonProps) {
	const { navigateWithLoading } = useLoadingNavigation();

	const handleClick = () => {
		navigateWithLoading(`/diary/${entryId}/edit`);
	};

	return (
		<FloatingActionButton
			position="bottom-right"
			aria-label="日記を編集"
			onClick={handleClick}
		>
			<Pencil className="h-6 w-6" />
		</FloatingActionButton>
	);
}
