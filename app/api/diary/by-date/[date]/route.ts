import { getDiaryEntryByDate } from "@/app/api/diary/_lib/diary-service";
import {
	createErrorResponse,
	createNotFoundError,
	createSuccessResponse,
} from "@/lib/api-utils";
import { checkApiAuth } from "@/lib/auth-utils";
import { dateSchema } from "@/lib/validations";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * GET /api/diary/by-date/[date] - 特定日付の日記エントリー取得
 */
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ date: string }> },
) {
	try {
		// パラメータを取得
		const { date } = await params;

		// 認証チェック
		const authResult = await checkApiAuth(req);

		// NextResponseが返された場合はエラーなのでそのまま返す
		if (authResult instanceof NextResponse) {
			return authResult;
		}

		// 日付パラメータのバリデーション
		const validatedDate = dateSchema.parse(date);
		const dateObj = new Date(validatedDate);

		// データ取得
		const entry = await getDiaryEntryByDate(authResult.userId, dateObj);

		// エントリーが見つからない場合
		if (!entry) {
			return createNotFoundError("指定された日付の日記エントリー");
		}

		// レスポンス返却（キャッシュ設定）
		return createSuccessResponse(entry);
	} catch (error) {
		console.error("日記エントリー取得エラー:", error);

		if (error instanceof ZodError) {
			return createErrorResponse(
				"日付パラメータが不正です",
				400,
				"VALIDATION_ERROR",
				error.errors,
			);
		}

		return createErrorResponse("日記エントリーの取得に失敗しました", 500);
	}
}
