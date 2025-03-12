import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
	createErrorResponse,
	createNotFoundError,
	createSuccessResponse,
} from "../../../../lib/api-utils";
import { checkApiAuth } from "../../../../lib/auth-utils";
import { updateDiaryEntrySchema } from "../../../../lib/validations";
import {
	deleteDiaryEntry,
	getDiaryEntryById,
	updateDiaryEntry,
} from "../_lib/diary-service";

/**
 * GET /api/diary/[id] - 日記エントリーをIDで取得
 */
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		// 認証チェック
		const authResult = await checkApiAuth(req);

		// NextResponseが返された場合はエラーなのでそのまま返す
		if (authResult instanceof NextResponse) {
			return authResult;
		}

		// データ取得
		const entry = await getDiaryEntryById(authResult.userId, params.id);

		// エントリーが見つからない場合
		if (!entry) {
			return createNotFoundError("指定されたIDの日記エントリー");
		}

		// レスポンス返却
		return createSuccessResponse(entry);
	} catch (error) {
		console.error("日記エントリー取得エラー:", error);
		return createErrorResponse("日記エントリーの取得に失敗しました", 500);
	}
}

/**
 * PUT /api/diary/[id] - 日記エントリー更新
 */
export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		// 認証チェック
		const authResult = await checkApiAuth(req);

		// NextResponseが返された場合はエラーなのでそのまま返す
		if (authResult instanceof NextResponse) {
			return authResult;
		}

		// リクエストボディの取得
		const body = await req.json();

		// バリデーション
		const data = updateDiaryEntrySchema.parse(body);

		// 日記エントリー更新
		try {
			const updatedEntry = await updateDiaryEntry(
				authResult.userId,
				params.id,
				data,
			);
			return createSuccessResponse(updatedEntry);
		} catch (error) {
			// エントリーが存在しない場合
			if (error instanceof Error && error.message.includes("見つかりません")) {
				return createNotFoundError("更新対象の日記エントリー");
			}
			throw error;
		}
	} catch (error) {
		console.error("日記エントリー更新エラー:", error);

		if (error instanceof ZodError) {
			return createErrorResponse(
				"入力データが不正です",
				400,
				"VALIDATION_ERROR",
				error.errors,
			);
		}

		const message =
			error instanceof Error
				? error.message
				: "日記エントリーの更新に失敗しました";
		return createErrorResponse(message, 500);
	}
}

/**
 * DELETE /api/diary/[id] - 日記エントリー削除
 */
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		// 認証チェック
		const authResult = await checkApiAuth(req);

		// NextResponseが返された場合はエラーなのでそのまま返す
		if (authResult instanceof NextResponse) {
			return authResult;
		}

		// 日記エントリー削除
		try {
			await deleteDiaryEntry(authResult.userId, params.id);
			return createSuccessResponse({
				message: "日記エントリーが削除されました",
			});
		} catch (error) {
			// エントリーが存在しない場合
			if (error instanceof Error && error.message.includes("見つかりません")) {
				return createNotFoundError("削除対象の日記エントリー");
			}
			throw error;
		}
	} catch (error) {
		console.error("日記エントリー削除エラー:", error);
		const message =
			error instanceof Error
				? error.message
				: "日記エントリーの削除に失敗しました";
		return createErrorResponse(message, 500);
	}
}
