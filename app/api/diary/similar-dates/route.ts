import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
	createErrorResponse,
	createSuccessResponse,
} from "../../../../lib/api-utils";
import { checkApiAuth } from "../../../../lib/auth-utils";
import { dateSchema } from "../../../../lib/validations";
import { getSimilarDateEntries } from "../_lib/diary-service";

/**
 * GET /api/diary/similar-dates - 過去の同日の日記エントリー取得
 */
export async function GET(req: NextRequest) {
	try {
		// 認証チェック
		const authResult = await checkApiAuth(req);

		// NextResponseが返された場合はエラーなのでそのまま返す
		if (authResult instanceof NextResponse) {
			return authResult;
		}

		// クエリパラメータから日付を取得
		const { searchParams } = new URL(req.url);
		const dateParam = searchParams.get("date");

		if (!dateParam) {
			return createErrorResponse("日付パラメータが必要です", 400);
		}

		// 日付パラメータのバリデーション
		const validatedDate = dateSchema.parse(dateParam);
		const date = new Date(validatedDate);

		// 取得件数制限（オプション）
		const limitParam = searchParams.get("limit");
		const limit = limitParam ? Number.parseInt(limitParam, 10) : 5;

		// 過去の同日エントリー取得
		const entries = await getSimilarDateEntries(authResult.userId, date, limit);

		// レスポンス返却
		return createSuccessResponse(entries);
	} catch (error) {
		console.error("過去の同日エントリー取得エラー:", error);

		if (error instanceof ZodError) {
			return createErrorResponse(
				"日付パラメータが不正です",
				400,
				"VALIDATION_ERROR",
				error.errors,
			);
		}

		return createErrorResponse("過去の同日エントリーの取得に失敗しました", 500);
	}
}
