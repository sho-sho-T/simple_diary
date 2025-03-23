"use client";

import { Button } from "@/app/_components/ui/button";
import { FloatingActionButton } from "@/app/_components/ui/floating-action-button";
import { useTags } from "@/app/_hooks/use-tags";
import type { Tag } from "@/app/_types";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { TagBadge } from "./tag-badge";
import { TagCreateModal } from "./tag-create-modal";
import { TagDeleteDialog } from "./tag-delete-dialog";
import { TagEditModal } from "./tag-edit-modal";

/**
 * タグ管理コンポーネント
 * タグの一覧表示、作成、編集、削除を管理します
 */
export function TagManager() {
	// タグデータ取得
	const { data: tags, isLoading, error } = useTags();

	// モーダル状態
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

	// 編集モーダルを開く
	const handleEditTag = (tag: Tag) => {
		setSelectedTag(tag);
		setIsEditModalOpen(true);
	};

	// 削除ダイアログを開く
	const handleDeleteTag = (tag: Tag) => {
		setSelectedTag(tag);
		setIsDeleteDialogOpen(true);
	};

	// タグ作成モーダルを開く
	const handleCreateTag = () => {
		setIsCreateModalOpen(true);
	};

	// ロード中表示
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[200px]">
				<div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
				<span className="ml-2 text-muted-foreground">タグを読み込み中...</span>
			</div>
		);
	}

	// エラー表示
	if (error) {
		return (
			<div className="p-4 text-center">
				<p className="text-red-500">
					エラーが発生しました: {error.message || "タグの取得に失敗しました"}
				</p>
				<Button
					variant="outline"
					className="mt-4"
					onClick={() => window.location.reload()}
				>
					再読み込み
				</Button>
			</div>
		);
	}

	// タグが存在しない場合
	if (!tags || tags.length === 0) {
		return (
			<div className="flex flex-col items-center p-4 text-center">
				<p className="text-muted-foreground mb-4">タグがまだありません</p>
				<Button onClick={handleCreateTag} className="mt-2">
					<Plus className="mr-2 h-4 w-4" />
					新しいタグを作成
				</Button>

				{/* タグ作成モーダル */}
				<TagCreateModal
					open={isCreateModalOpen}
					onOpenChange={setIsCreateModalOpen}
				/>

				{/* 新規作成ボタン（フローティング） */}
				<FloatingActionButton
					onClick={handleCreateTag}
					position="bottom-right"
					size="default"
					aria-label="新しいタグを作成"
				>
					<Plus className="h-5 w-5" />
				</FloatingActionButton>
			</div>
		);
	}

	return (
		<div className="container py-4">
			<div className="flex flex-col items-center">
				{/* タグリスト */}
				<div className="space-y-4 max-w-xl mx-auto w-full">
					{tags.map((tag) => (
						<div
							key={tag.id}
							className="flex items-center justify-between p-4 bg-card rounded-lg border w-full"
						>
							<div className="flex items-center gap-2">
								<TagBadge tag={tag} />
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleEditTag(tag)}
									aria-label={`タグ「${tag.name}」を編集`}
								>
									<Edit className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleDeleteTag(tag)}
									aria-label={`タグ「${tag.name}」を削除`}
								>
									<Trash2 className="h-4 w-4 text-destructive" />
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* モーダル類 */}
			<TagCreateModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
			/>
			<TagEditModal
				tag={selectedTag}
				open={isEditModalOpen}
				onOpenChange={setIsEditModalOpen}
			/>
			<TagDeleteDialog
				tag={selectedTag}
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			/>

			{/* 新規作成ボタン（フローティング） */}
			<FloatingActionButton
				onClick={handleCreateTag}
				position="bottom-right"
				size="default"
				aria-label="新しいタグを作成"
			>
				<Plus className="h-5 w-5" />
			</FloatingActionButton>
		</div>
	);
}
