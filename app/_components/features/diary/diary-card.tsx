import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/app/_components/ui/card";
import { cn } from "@/lib/utils";
import type { DiaryEntry, Tag } from "@/types";
import { EmotionBadge } from "../emotions/emotion-badge";
import { TagList } from "../tags/tag-list";
import { DiaryContentPreview } from "./diary-content-preview";
import { DiaryHeader } from "./diary-header";

interface DiaryCardProps {
	entry: DiaryEntry;
	tags: Tag[];
	className?: string;
	isCompact?: boolean;
	onCardClick?: () => void;
}

/**
 * 日記カード
 *
 * @param {DiaryCardProps} props - 日記カードのプロパティ
 */
export function DiaryCard({
	entry,
	tags,
	className,
	isCompact = false,
	onCardClick,
}: DiaryCardProps) {
	const previewLength = isCompact ? 100 : 200;

	return (
		<Card
			className={cn(
				"w-full transition-shadow hover:shadow-md",
				onCardClick && "cursor-pointer",
				className,
			)}
			onClick={onCardClick}
		>
			<CardHeader className="pb-2">
				<DiaryHeader
					date={entry.entryDate}
					emotionStampId={entry.emotionStampId}
				/>
			</CardHeader>
			<CardContent>
				<DiaryContentPreview
					content={entry.content}
					maxLength={previewLength}
				/>
			</CardContent>
			{tags.length > 0 && (
				<CardFooter className="flex justify-between pt-0">
					<TagList tags={tags} limit={isCompact ? 3 : undefined} />
					{entry.emotionStampId && !isCompact && (
						<EmotionBadge emotionId={entry.emotionStampId} showName />
					)}
				</CardFooter>
			)}
		</Card>
	);
}
