import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { EmotionIcon } from "../emotions/emotion-icon";

interface DiaryHeaderProps {
	date: Date;
	emotionStampId: number | null;
	className?: string;
	showDayOfWeek?: boolean;
}

/**
 * 日記ヘッダーコンポーネント
 *
 * @param {DiaryHeaderProps} props - 日記ヘッダーのプロパティ
 */
export function DiaryHeader({
	date,
	emotionStampId,
	className,
	showDayOfWeek = true,
}: DiaryHeaderProps) {
	// 日付をフォーマット (例: 2023年4月1日 (土))
	const formattedDate = format(date, "yyyy年M月d日", { locale: ja });
	const dayOfWeek = showDayOfWeek
		? `(${format(date, "E", { locale: ja })})`
		: "";

	return (
		<div className={cn("flex items-center justify-between", className)}>
			<div className="flex-1">
				<h3 className="text-lg font-medium">
					{formattedDate} {dayOfWeek}
				</h3>
			</div>
			{emotionStampId && (
				<div className="h-8 w-8">
					<EmotionIcon emotionId={emotionStampId} size={32} />
				</div>
			)}
		</div>
	);
}
