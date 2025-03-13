"use client";

import { getEmotionById } from "@/lib/emotions";
import { cn } from "@/lib/utils";
import { EmotionIcon } from "./emotion-icon";

interface EmotionBadgeProps {
	emotionId: number | undefined;
	showName?: boolean;
	className?: string;
}

/**
 * 感情バッジコンポーネント
 *
 * @param {EmotionBadgeProps} props - 感情バッジのプロパティ
 */
export function EmotionBadge({
	emotionId,
	showName = false,
	className,
}: EmotionBadgeProps) {
	const emotion = getEmotionById(emotionId);

	if (!emotion) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex items-center gap-1.5 rounded-full bg-muted px-2 py-1",
				className,
			)}
		>
			<EmotionIcon emotionId={emotionId} size={24} />
			{showName && <span className="text-xs font-medium">{emotion.name}</span>}
		</div>
	);
}
