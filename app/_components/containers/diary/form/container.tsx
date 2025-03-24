"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/app/_components/ui/dialog";
import { useLoadingNavigation } from "@/app/_hooks/use-loading-navigation";
import { useTags } from "@/app/_hooks/use-tags";
import { useLoading } from "@/app/_providers/loading-provider";
import type { Tag } from "@/app/_types";
import type { DiaryFormData, DiaryFormError } from "@/app/_types/diary/form";
import { diaryFormSchema } from "@/app/_types/diary/validation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { toast } from "sonner";
import { DiaryFormPresentation } from "./presentation";

export const DiaryFormContainer = ({
	initialData,
	isSubmitting = false,
	entryId = "", // 編集時には親コンポーネントからIDを渡すようにする
}: {
	initialData?: DiaryFormData;
	isSubmitting?: boolean;
	entryId?: string;
}) => {
	const formId = useId();
	const router = useRouter();
	const pathname = usePathname();
	const { showLoading, hideLoading } = useLoading();
	const { navigateWithLoading } = useLoadingNavigation();
	const today = new Date();

	// 編集モードかどうかの判定（初期データとIDの有無で判断）
	const isEditMode = !!initialData?.entryDate && !!entryId;

	// タグ一覧の取得
	const { data: tags = [], isLoading: isTagsLoading } = useTags();

	// フォームの状態管理
	const [content, setContent] = useState(initialData?.content || "");
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		initialData?.entryDate || today,
	);

	const [selectedEmotionId, setSelectedEmotionId] = useState<
		number | undefined
	>(initialData?.emotionStampId);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(
		initialData?.tags || [],
	);

	// エラー状態管理
	const [errors, setErrors] = useState<DiaryFormError>({});
	// 内部送信状態
	const [isSubmittingForm, setIsSubmittingForm] = useState(false);
	// 削除確認ダイアログの状態
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	// 削除処理の状態
	const [isDeleting, setIsDeleting] = useState(false);

	// タグ選択ハンドラー
	const handleTagSelect = (tagId: string) => {
		setSelectedTags((prevTags) => {
			const existingTagIndex = prevTags.findIndex((tag) => tag.id === tagId);

			// タグが既に選択されていれば削除
			if (existingTagIndex !== -1) {
				return prevTags.filter((tag) => tag.id !== tagId);
			}

			// タグを追加（タグ一覧から対応するタグを取得）
			const tagToAdd = tags.find((tag) => tag.id === tagId);
			if (!tagToAdd) return prevTags;

			return [...prevTags, tagToAdd];
		});
	};

	// 新しいタグが作成された時の処理
	const handleTagCreated = (newTag: Tag) => {
		// 新しく作成されたタグを自動的に選択する場合は以下を実装
		// setSelectedTags((prevTags) => [...prevTags, newTag]);
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
		setIsSubmittingForm(true);
		showLoading();

		try {
			// バリデーションの実行
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

			// APIリクエスト
			// 編集モードと新規作成モードでエンドポイントと方法を変える
			const url = isEditMode ? `/api/diary/${entryId}` : "/api/diary";
			const method = isEditMode ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...submissionData,
					tagIds: selectedTags.map((tag) => tag.id),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				const errorMessage = data.message || "日記の保存に失敗しました";
				setErrors({ _form: [errorMessage] });
				return;
			}

			toast.success(isEditMode ? "日記を更新しました" : "日記を保存しました");
			navigateWithLoading("/diary");
		} catch (error) {
			console.error("Failed to save diary entry:", error);
			setErrors({ _form: ["日記の保存に失敗しました"] });
		} finally {
			setIsSubmittingForm(false);
			hideLoading();
		}
	};

	// 削除確認ダイアログを開くハンドラー
	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true);
	};

	// 日記削除処理
	const handleDelete = async () => {
		if (!isEditMode || !entryId) return;

		setIsDeleting(true);
		showLoading();

		try {
			const response = await fetch(`/api/diary/${entryId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const data = await response.json();
				toast.error(data.message || "日記の削除に失敗しました");
				return;
			}

			toast.success("日記を削除しました");
			setIsDeleteDialogOpen(false);
			navigateWithLoading("/diary");
		} catch (error) {
			console.error("Failed to delete diary entry:", error);
			toast.error("日記の削除に失敗しました");
		} finally {
			setIsDeleting(false);
			hideLoading();
		}
	};

	return (
		<>
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
				onTagCreated={handleTagCreated}
				onSubmit={handleSubmit}
				isSubmitting={
					isSubmitting || isTagsLoading || isSubmittingForm || isDeleting
				}
				allTags={tags}
				isEditMode={isEditMode}
				entryId={entryId}
				onDelete={handleDeleteClick}
			/>

			{/* 削除確認ダイアログ */}
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>日記の削除</DialogTitle>
						<DialogDescription>
							この日記を削除します。この操作は元に戻せません。
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-4">
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
							disabled={isDeleting}
						>
							キャンセル
						</Button>
						<Button
							variant="destructive"
							onClick={handleDelete}
							disabled={isDeleting}
						>
							{isDeleting ? "削除中..." : "削除する"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
