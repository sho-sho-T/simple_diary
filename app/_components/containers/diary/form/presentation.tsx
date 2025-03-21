"use client";

import { CharacterCounter } from "@/app/_components/features/diary/form/character-counter";
import { DatePicker } from "@/app/_components/features/diary/form/date-picker";
import { DiaryTextArea } from "@/app/_components/features/diary/form/text-area";
import { EmotionSelector } from "@/app/_components/features/emotions/emotion-selector";
import { TagSelector } from "@/app/_components/features/tags/tag-selector";
import { Button } from "@/app/_components/ui/button";
import type { Tag } from "@/app/_types";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar } from "lucide-react";

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
	onTagCreated?: (tag: Tag) => void;
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
	onTagCreated,
	onSubmit,
	isSubmitting,
	allTags = [], // 仮の空配列（実際の実装では適切に初期化）
}: DiaryFormPresentationProps) => {
	return (
		<form
			id={formId}
			className="max-w-3xl mx-auto p-4"
			onSubmit={onSubmit}
			noValidate
		>
			{/* ヘッダー: タイトルと日付選択 */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">日記を書く</h1>
				<div className="flex items-center space-x-2">
					<Calendar className="h-5 w-5 text-gray-500" />
					<DatePicker
						selected={selectedDate}
						onSelect={onDateSelect}
						error={errors.entryDate?.join(", ")}
						disabled={isSubmitting}
					/>
				</div>
			</div>

			{/* エラーメッセージ */}
			{errors.entryDate && errors.entryDate.length > 0 && (
				<p className="text-sm text-red-500 mb-4" role="alert">
					{errors.entryDate.join(", ")}
				</p>
			)}

			{/* テキストエリア */}
			<div className="mb-6">
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
				<div className="flex justify-end items-center mt-1">
					<CharacterCounter current={content.length} max={2000} />
				</div>
				{errors.content && errors.content.length > 0 && (
					<p className="text-sm text-red-500 mt-1" role="alert">
						{errors.content.join(", ")}
					</p>
				)}
			</div>

			{/* 気分セクション */}
			<div className="mb-6">
				<h3 className="text-base font-medium mb-3">気分</h3>
				<EmotionSelector
					selectedEmotionId={selectedEmotionId}
					onSelect={onEmotionSelect}
				/>
			</div>

			{/* タグセクション */}
			<div className="mb-8">
				<h3 className="text-base font-medium mb-3">タグ</h3>
				<TagSelector
					allTags={allTags}
					selectedTags={selectedTags}
					onTagSelect={onTagSelect}
					onTagCreated={onTagCreated}
					maxHeight={150}
				/>
			</div>

			{/* フォームエラー */}
			{errors._form && errors._form.length > 0 && (
				<p className="text-sm text-red-500 mb-4" role="alert">
					{errors._form.join(", ")}
				</p>
			)}

			{/* 保存ボタン */}
			<div className="flex justify-end">
				<Button
					type="submit"
					className="px-8 py-2 rounded-md"
					disabled={isSubmitting}
				>
					{isSubmitting ? "保存中..." : "保存する"}
				</Button>
			</div>
		</form>
	);
};
