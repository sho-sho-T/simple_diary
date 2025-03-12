import { z } from 'zod';

/**
 * 日記フォームのバリデーションスキーマ
 */
export const diaryFormSchema = z.object({
  content: z
    .string()
    .min(1, 'コンテンツを入力してください')
    .max(500, '500文字以内で入力してください')
    .transform((value) => value.trim()),
  entryDate: z
    .date({
      required_error: '日付を選択してください',
      invalid_type_error: '無効な日付形式です',
    })
    .refine((date) => {
      // 未来の日付は許可しない
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      return date <= now;
    }, '未来の日付は選択できません'),
});

/**
 * バリデーションエラーメッセージの型
 */
export type ValidationErrors = z.inferFormattedError<typeof diaryFormSchema>;

/**
 * 文字数制限の定数
 */
export const DIARY_CONTENT_LIMITS = {
  MAX_LENGTH: 500,
  WARNING_THRESHOLD: 50,
} as const;

/**
 * 日記フォームのバリデーション関数
 */
export const validateDiaryForm = (data: unknown) => {
  const result = diaryFormSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false as const,
      error: result.error.format(),
    };
  }

  return {
    success: true as const,
    data: result.data,
  };
}; 