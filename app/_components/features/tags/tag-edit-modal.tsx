"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useUpdateTag } from "@/app/_hooks/use-tags";
import type { Tag } from "@/app/_types";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface TagEditModalProps {
	tag: Tag | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: (updatedTag: Tag) => void;
}

/**
 * タグ編集モーダルコンポーネント
 */
export function TagEditModal({
	tag,
	open,
	onOpenChange,
	onSuccess,
}: TagEditModalProps) {
	// フォーム状態
	const [name, setName] = useState("");
	const [color, setColor] = useState("#3b82f6"); // デフォルト青色
	const [error, setError] = useState<string | null>(null);

	// ミューテーションフック
	const updateTagMutation = useUpdateTag();

	// タグが変更されたときに状態を更新
	useEffect(() => {
		if (tag) {
			setName(tag.name);
			setColor(tag.color);
		}
	}, [tag]);

	// 送信処理
	const handleSubmit = async () => {
		if (!tag) return;

		setError(null);

		// 入力検証
		if (!name.trim()) {
			setError("タグ名を入力してください");
			return;
		}

		try {
			// タグ更新APIの呼び出し
			const updatedTag = await updateTagMutation.mutateAsync({
				id: tag.id,
				data: { name, color },
			});

			// 成功時の処理
			onOpenChange(false);

			// 成功コールバック
			if (onSuccess) {
				onSuccess(updatedTag);
			}
		} catch (err) {
			// エラーメッセージ設定
			setError(err instanceof Error ? err.message : "タグの更新に失敗しました");
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
					<DialogTitle>タグを編集</DialogTitle>
				</DialogHeader>

				{/* form要素ではなくdivを使用 */}
				<div className="space-y-6">
					<div className="space-y-4">
						{/* タグ名入力 */}
						<div className="space-y-2">
							<Label htmlFor="tag-name">タグ名</Label>
							<Input
								id="tag-name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="タグ名を入力"
								maxLength={50}
							/>
						</div>

						{/* カラーピッカー */}
						<div className="space-y-2">
							<Label>カラー</Label>
							<div className="flex flex-col items-center gap-4">
								<HexColorPicker color={color} onChange={setColor} />
								<div className="flex items-center gap-2">
									<div
										className="w-6 h-6 rounded-full border"
										style={{ backgroundColor: color }}
									/>
									<Input
										value={color}
										onChange={(e) => setColor(e.target.value)}
										className="w-24 font-mono"
										pattern="^#[0-9A-Fa-f]{6}$"
									/>
								</div>
							</div>
						</div>

						{/* エラーメッセージ */}
						{error && <p className="text-sm text-red-500">{error}</p>}
					</div>

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
							onClick={handleSubmit}
							disabled={updateTagMutation.isPending}
						>
							{updateTagMutation.isPending ? "更新中..." : "更新"}
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
