"use client";

import type { Tag } from "@/app/_types";
import type { DiaryFormData, DiaryFormError } from "@/app/_types/diary/form";
import { diaryFormSchema } from "@/app/_types/diary/validation";
import { redirect } from "next/navigation";
import { useId, useState } from "react";
import { DiaryFormPresentation } from "./presentation";

export const DiaryFormContainer = ({
	initialData,
	isSubmitting = false,
}: {
	initialData?: DiaryFormData;
	isSubmitting?: boolean;
}) => {
	const formId = useId();

	// フォームの状態管理
	const [content, setContent] = useState(initialData?.content || "");
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		initialData?.entryDate || undefined,
	);
	const [selectedEmotionId, setSelectedEmotionId] = useState<
		number | undefined
	>(initialData?.emotionStampId);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(
		initialData?.tags || [],
	);

	// エラー状態管理
	const [errors, setErrors] = useState<DiaryFormError>({});

	// タグ選択ハンドラー
	const handleTagSelect = (tagId: string) => {
		setSelectedTags((prevTags) => {
			const existingTagIndex = prevTags.findIndex((tag) => tag.id === tagId);

			// タグが既に選択されていれば削除
			if (existingTagIndex !== -1) {
				return prevTags.filter((tag) => tag.id !== tagId);
			}

			// タグを追加 (実際の実装ではallTagsから対応するタグを見つける必要があります)
			const newTag = { id: tagId, userId: "", name: "", color: "" };
			return [...prevTags, newTag];
		});
	};

	// 感情スタンプ選択ハンドラー
	const handleEmotionSelect = (emotionId: number) => {
		setSelectedEmotionId(emotionId);
	};

	// 入力ハンドラー
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	// 日付選択ハンドラー
	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDate(date);
	};

	// 送信ハンドラー
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// エラーをリセット
		setErrors({});

		// バリデーションの実行
		try {
			// 基本データをバリデーション
			const validationResult = diaryFormSchema.safeParse({
				content,
				entryDate: selectedDate,
			});

			if (!validationResult.success) {
				// エラーのフォーマットを調整
				const formattedErrors: DiaryFormError = {};

				const formattedError = validationResult.error.format();

				if (formattedError.content?._errors) {
					formattedErrors.content = formattedError.content._errors;
				}

				if (formattedError.entryDate?._errors) {
					formattedErrors.entryDate = formattedError.entryDate._errors;
				}

				setErrors(formattedErrors);
				return;
			}

			// 送信用のデータを作成
			const submissionData: DiaryFormData = {
				...validationResult.data,
				emotionStampId: selectedEmotionId,
				tags: selectedTags,
			};

			// APIリクエスト;
			try {
				const response = await fetch("/api/diary", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...submissionData,
						tags: selectedTags.map((tag) => tag.id),
					}),
				});

				const data = await response.json();

				if (!response.ok) {
					const errorMessage = data.message || "日記の保存に失敗しました";
					setErrors({ _form: [errorMessage] });
					return;
				}

				redirect("/diary");
			} catch (error) {
				console.error("Failed to save diary entry:", error);
				setErrors({ _form: ["日記の保存に失敗しました"] });
			}
		} catch (error) {
			console.error("Validation error:", error);
			setErrors({ _form: ["入力内容に問題があります"] });
		}
	};

	// 仮のタグリスト (実際の実装ではAPIから取得など)
	const dummyTags: Tag[] = [
		{ id: "1", userId: "", name: "仕事", color: "#ff0000" },
		{ id: "2", userId: "", name: "プライベート", color: "#00ff00" },
		{ id: "3", userId: "", name: "勉強", color: "#0000ff" },
	];

	return (
		<DiaryFormPresentation
			formId={formId}
			content={content}
			selectedDate={selectedDate}
			selectedEmotionId={selectedEmotionId}
			selectedTags={selectedTags}
			errors={errors}
			onContentChange={handleContentChange}
			onDateSelect={handleDateSelect}
			onEmotionSelect={handleEmotionSelect}
			onTagSelect={handleTagSelect}
			onSubmit={handleSubmit}
			isSubmitting={isSubmitting}
			allTags={dummyTags} // 実際の実装ではAPIから取得したタグリスト
		/>
	);
};
