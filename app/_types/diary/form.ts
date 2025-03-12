import type { z } from "zod";
import type { diaryFormSchema } from "./validation";

/**
 * 日記フォームのデータ型
 */
export type DiaryFormData = z.infer<typeof diaryFormSchema>;

/**
 * 日記フォームのProps型
 */

/**
 * 日記フォームのProps型
 */
export type DiaryFormProps = {
	/** 初期値（編集時に使用） */
	initialData?: DiaryFormData;
	/** フォーム送信時のコールバック */
	onSubmit?: (data: DiaryFormData) => Promise<void>;
	/** 送信中かどうか */
	isSubmitting?: boolean;
};

/**
 * 日記フォームのエラー型
 */
export type DiaryFormError = {
	content?: string[];
	entryDate?: string[];
};

/**
 * テキストエリアコンポーネントのProps型
 */
export type DiaryTextAreaProps = {
	/** 現在の文字数 */
	currentLength: number;
	/** 最大文字数 */
	maxLength: number;
	/** エラーメッセージ */
	error?: string;
	/** 無効化されているかどうか */
	disabled?: boolean;
};

/**
 * 文字数カウンターコンポーネントのProps型
 */
export type CharacterCounterProps = {
	/** 現在の文字数 */
	current: number;
	/** 最大文字数 */
	max: number;
	/** 警告を表示する残り文字数のしきい値 */
	warningThreshold?: number;
};

/**
 * 日付選択コンポーネントのProps型
 */
export type DatePickerProps = {
	/** 選択された日付 */
	selected?: Date;
	/** 日付が変更された時のコールバック */
	onSelect?: (date: Date) => void;
	/** エラーメッセージ */
	error?: string;
	/** 無効化されているかどうか */
	disabled?: boolean;
};
