"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/app/_components/ui/dialog";
import { useDeleteTag } from "@/app/_hooks/use-tags";
import type { Tag } from "@/app/_types";
import { useState } from "react";

interface TagDeleteDialogProps {
	tag: Tag | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

/**
 * タグ削除確認ダイアログコンポーネント
 */
export function TagDeleteDialog({
	tag,
	open,
	onOpenChange,
	onSuccess,
}: TagDeleteDialogProps) {
	const [error, setError] = useState<string | null>(null);
	const deleteTagMutation = useDeleteTag();

	// 削除処理
	const handleDelete = async () => {
		if (!tag) return;

		setError(null);
		try {
			await deleteTagMutation.mutateAsync(tag.id);
			onOpenChange(false);

			// 成功コールバック
			if (onSuccess) {
				onSuccess();
			}
		} catch (err) {
			// エラーメッセージ設定
			setError(err instanceof Error ? err.message : "タグの削除に失敗しました");
		}
	};

	// モーダルが閉じられるときにリセット
	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setError(null);
		}
		onOpenChange(open);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>タグを削除</DialogTitle>
					<DialogDescription>
						{tag &&
							`タグ「${tag.name}」を削除します。この操作は元に戻せません。`}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<p className="text-sm text-muted-foreground">
						タグが日記エントリーで使用されている場合は削除できません。
					</p>

					{/* エラーメッセージ */}
					{error && <p className="text-sm text-red-500">{error}</p>}

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							キャンセル
						</Button>
						<Button
							type="button"
							variant="destructive"
							onClick={handleDelete}
							disabled={deleteTagMutation.isPending}
						>
							{deleteTagMutation.isPending ? "削除中..." : "削除"}
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
