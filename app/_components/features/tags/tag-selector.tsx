"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import type { Tag } from "@/app/_types";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { TagBadge } from "./tag-badge";
import { TagCreateModal } from "./tag-create-modal";

interface TagSelectorProps {
	allTags: Tag[];
	selectedTags: Tag[];
	onTagSelect: (tagId: string) => void;
	onTagCreated?: (tag: Tag) => void;
	className?: string;
	maxHeight?: number | string;
}

/**
 * タグセレクターコンポーネント
 *
 * @param {TagSelectorProps} props - タグセレクターのプロパティ
 */
export function TagSelector({
	allTags,
	selectedTags,
	onTagSelect,
	onTagCreated,
	className,
	maxHeight = 200,
}: TagSelectorProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [createModalOpen, setCreateModalOpen] = useState(false);

	const filteredTags = allTags.filter((tag) =>
		tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const selectedTagIds = new Set(selectedTags.map((tag) => tag.id));

	// タグ作成成功時の処理
	const handleTagCreated = (newTag: Tag) => {
		if (onTagCreated) {
			onTagCreated(newTag);
		}
	};

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex items-center gap-2">
				<Input
					type="text"
					placeholder="タグを検索..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full"
				/>
				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={() => setCreateModalOpen(true)}
					title="タグを追加"
				>
					<PlusIcon className="h-4 w-4" />
					<span className="sr-only">タグを追加</span>
				</Button>
			</div>

			<ScrollArea className="w-full" style={{ maxHeight }}>
				<div className="space-y-1 p-1">
					{filteredTags.length === 0 ? (
						<p className="text-center text-sm text-muted-foreground py-2">
							タグがありません
						</p>
					) : (
						filteredTags.map((tag) => (
							<button
								type="button"
								key={tag.id}
								className={cn(
									"flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 transition-colors",
									selectedTagIds.has(tag.id)
										? "bg-muted/60"
										: "hover:bg-muted/40",
								)}
								onClick={() => onTagSelect(tag.id)}
							>
								<TagBadge tag={tag} />
								{selectedTagIds.has(tag.id) && (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-primary"
										aria-label="選択済み"
									>
										<title>選択済み</title>
										<path d="M20 6 9 17l-5-5" />
									</svg>
								)}
							</button>
						))
					)}
				</div>
			</ScrollArea>

			{/* タグ作成モーダル */}
			<TagCreateModal
				open={createModalOpen}
				onOpenChange={setCreateModalOpen}
				onSuccess={handleTagCreated}
			/>
		</div>
	);
}
