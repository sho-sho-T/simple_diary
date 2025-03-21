"use client";

import { CharacterCounter } from "@/app/_components/features/diary/form/character-counter";
import { DatePicker } from "@/app/_components/features/diary/form/date-picker";
import { DiaryTextArea } from "@/app/_components/features/diary/form/text-area";
import { EmotionSelector } from "@/app/_components/features/emotions/emotion-selector";
import { TagSelector } from "@/app/_components/features/tags/tag-selector";
import { Button } from "@/app/_components/ui/button";
import type { Tag } from "@/app/_types";

type DiaryFormPresentationProps = {
	formId: string;
	content: string;
	selectedDate?: Date;
	selectedEmotionId?: number;
	selectedTags: Tag[];
	errors: {
		content?: string[];
		entryDate?: string[];
		_form?: string[];
	};
	onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onDateSelect: (date: Date | undefined) => void;
	onEmotionSelect: (emotionId: number) => void;
	onTagSelect: (tagId: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isSubmitting: boolean;
	allTags?: Tag[]; // タグリスト（実際の実装ではAPIから取得など）
};

export const DiaryFormPresentation = ({
	formId,
	content,
	selectedDate,
	selectedEmotionId,
	selectedTags,
	errors,
	onContentChange,
	onDateSelect,
	onEmotionSelect,
	onTagSelect,
	onSubmit,
	isSubmitting,
	allTags = [], // 仮の空配列（実際の実装では適切に初期化）
}: DiaryFormPresentationProps) => {
	return (
		<form id={formId} className="space-y-4" onSubmit={onSubmit} noValidate>
			<div className="space-y-2">
				<DatePicker
					selected={selectedDate}
					onSelect={onDateSelect}
					error={errors.entryDate?.join(", ")}
					disabled={isSubmitting}
				/>
				{errors.entryDate && errors.entryDate.length > 0 && (
					<p className="text-sm text-red-500" role="alert">
						{errors.entryDate.join(", ")}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<DiaryTextArea
					name="content"
					value={content}
					onChange={onContentChange}
					maxLength={2000}
					currentLength={content.length}
					error={errors.content?.join(", ")}
					disabled={isSubmitting}
					placeholder="今日の出来事を書いてみましょう"
				/>
				<div className="flex justify-between items-center">
					<CharacterCounter current={content.length} max={2000} />
					{errors.content && errors.content.length > 0 && (
						<p className="text-sm text-red-500" role="alert">
							{errors.content.join(", ")}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-sm font-medium">気分</h3>
				<EmotionSelector
					selectedEmotionId={selectedEmotionId}
					onSelect={onEmotionSelect}
					className="mb-2"
				/>
			</div>

			<div className="space-y-2">
				<h3 className="text-sm font-medium">タグ</h3>
				<TagSelector
					allTags={allTags}
					selectedTags={selectedTags}
					onTagSelect={onTagSelect}
					maxHeight={150}
				/>
			</div>

			{errors._form && errors._form.length > 0 && (
				<p className="text-sm text-red-500" role="alert">
					{errors._form.join(", ")}
				</p>
			)}

			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? "保存中..." : "保存する"}
			</Button>
		</form>
	);
};
