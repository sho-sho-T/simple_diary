import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
	createErrorResponse,
	createNotFoundError,
	createSuccessResponse,
} from "../../../../lib/api-utils";
import { checkApiAuth } from "../../../../lib/auth-utils";
import { updateTagSchema } from "../../../../lib/validations";
import { deleteTag, getTagById, updateTag } from "../_lib/tag-service";

/**
 * GET /api/tags/[id] - タグをIDで取得
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

		// タグ取得
		const tag = await getTagById(authResult.userId, params.id);

		// タグが見つからない場合
		if (!tag) {
			return createNotFoundError("指定されたIDのタグ");
		}

		// レスポンス返却
		return createSuccessResponse(tag);
	} catch (error) {
		console.error("タグ取得エラー:", error);
		return createErrorResponse("タグの取得に失敗しました", 500);
	}
}

/**
 * PUT /api/tags/[id] - タグ更新
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
		const data = updateTagSchema.parse(body);

		// タグ更新
		try {
			const updatedTag = await updateTag(authResult.userId, params.id, data);
			return createSuccessResponse(updatedTag);
		} catch (error) {
			// タグが存在しない場合
			if (error instanceof Error && error.message.includes("見つかりません")) {
				return createNotFoundError("更新対象のタグ");
			}
			// 重複エラー
			if (
				error instanceof Error &&
				error.message.includes("既に使用されています")
			) {
				return createErrorResponse(error.message, 409, "DUPLICATE_TAG");
			}
			throw error;
		}
	} catch (error) {
		console.error("タグ更新エラー:", error);

		if (error instanceof ZodError) {
			return createErrorResponse(
				"入力データが不正です",
				400,
				"VALIDATION_ERROR",
				error.errors,
			);
		}

		const message =
			error instanceof Error ? error.message : "タグの更新に失敗しました";
		return createErrorResponse(message, 500);
	}
}

/**
 * DELETE /api/tags/[id] - タグ削除
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

		// タグ削除
		try {
			await deleteTag(authResult.userId, params.id);
			return createSuccessResponse({ message: "タグが削除されました" });
		} catch (error) {
			// タグが存在しない場合
			if (error instanceof Error && error.message.includes("見つかりません")) {
				return createNotFoundError("削除対象のタグ");
			}
			// タグが使用中の場合
			if (error instanceof Error && error.message.includes("使用されている")) {
				return createErrorResponse(error.message, 409, "TAG_IN_USE");
			}
			throw error;
		}
	} catch (error) {
		console.error("タグ削除エラー:", error);
		const message =
			error instanceof Error ? error.message : "タグの削除に失敗しました";
		return createErrorResponse(message, 500);
	}
}
