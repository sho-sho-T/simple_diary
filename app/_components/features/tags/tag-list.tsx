import type { Tag } from "@/app/_types";
import { cn } from "@/lib/utils";
import { TagBadge } from "./tag-badge";

interface TagListProps {
	tags: Tag[];
	className?: string;
	onTagClick?: (tagId: string) => void;
	limit?: number;
}

/**
 * タグリストコンポーネント
 *
 * @param {TagListProps} props - タグリストのプロパティ
 */
export function TagList({ tags, className, onTagClick, limit }: TagListProps) {
	const displayTags = limit ? tags.slice(0, limit) : tags;
	const hasMore = limit && tags.length > limit;

	return (
		<div className={cn("flex flex-wrap gap-1", className)}>
			{displayTags.map((tag) => (
				<TagBadge
					key={tag.id}
					tag={tag}
					onClick={onTagClick ? () => onTagClick(tag.id) : undefined}
				/>
			))}

			{hasMore && (
				<div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
					+{tags.length - limit}
				</div>
			)}
		</div>
	);
}
