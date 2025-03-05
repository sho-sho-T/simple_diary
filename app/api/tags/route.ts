import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getAllTags, createTag } from './_lib/tag-service';
import { createSuccessResponse, createErrorResponse } from '../../../lib/api-utils';
import { createTagSchema } from '../../../lib/validations';
import { checkApiAuth } from '../../../lib/auth-utils';

/**
 * GET /api/tags - タグ一覧取得
 */
export async function GET(req: NextRequest) {
  try {
    // 認証チェック
    const authResult = await checkApiAuth(req);
    
    // NextResponseが返された場合はエラーなのでそのまま返す
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    
    // タグ一覧取得
    const tags = await getAllTags(authResult.userId);
    
    // レスポンス返却
    return createSuccessResponse(tags);
  } catch (error) {
    console.error('タグ一覧取得エラー:', error);
    return createErrorResponse('タグ一覧の取得に失敗しました', 500);
  }
}

/**
 * POST /api/tags - タグ作成
 */
export async function POST(req: NextRequest) {
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
    const data = createTagSchema.parse(body);
    
    // タグ作成
    try {
      const newTag = await createTag(authResult.userId, data);
      return createSuccessResponse(newTag, 201);
    } catch (error) {
      // 重複エラー
      if (error instanceof Error && error.message.includes('既に使用されています')) {
        return createErrorResponse(error.message, 409, 'DUPLICATE_TAG');
      }
      throw error;
    }
  } catch (error) {
    console.error('タグ作成エラー:', error);
    
    if (error instanceof ZodError) {
      return createErrorResponse('入力データが不正です', 400, 'VALIDATION_ERROR', error.errors);
    }
    
    const message = error instanceof Error ? error.message : 'タグの作成に失敗しました';
    return createErrorResponse(message, 500);
  }
} 