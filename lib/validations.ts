import { z } from "zod";

// ページネーションパラメータのバリデーション
export const paginationSchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().min(1).max(100).default(10),
});

// 日付のバリデーション
export const dateSchema = z.string().refine(
	(val) => {
		const date = new Date(val);
		return !isNaN(date.getTime());
	},
	{
		message: "有効な日付形式ではありません",
	},
);

// 日記エントリー作成のバリデーション
export const createDiaryEntrySchema = z.object({
	entryDate: z.coerce.date({
		required_error: "日付は必須です",
		invalid_type_error: "有効な日付を入力してください",
	}),
	content: z
		.string()
		.max(500, "日記の内容は500文字以内にしてください")
		.optional(),
	emotionStampId: z.number().int().min(1).max(10).optional(),
	tagIds: z.array(z.string()).optional(),
});

// 日記エントリー更新のバリデーション
export const updateDiaryEntrySchema = z.object({
	content: z
		.string()
		.max(500, "日記の内容は500文字以内にしてください")
		.optional(),
	emotionStampId: z.number().int().min(1).max(10).optional(),
	tagIds: z.array(z.string()).optional(),
});

// タグ作成のバリデーション
export const createTagSchema = z.object({
	name: z
		.string()
		.min(1, "タグ名は必須です")
		.max(50, "タグ名は50文字以内にしてください"),
	color: z
		.string()
		.regex(
			/^#[0-9A-Fa-f]{6}$/,
			"カラーコードは#000000の形式で入力してください",
		),
});

// タグ更新のバリデーション
export const updateTagSchema = z.object({
	name: z
		.string()
		.min(1, "タグ名は必須です")
		.max(50, "タグ名は50文字以内にしてください")
		.optional(),
	color: z
		.string()
		.regex(/^#[0-9A-Fa-f]{6}$/, "カラーコードは#000000の形式で入力してください")
		.optional(),
});
