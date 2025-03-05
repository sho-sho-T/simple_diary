import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getAllDiaryEntries, createDiaryEntry } from './_lib/diary-service';
import { createSuccessResponse, createErrorResponse, createAuthError, ApiResponse } from '../../../lib/api-utils';
import { paginationSchema, createDiaryEntrySchema } from '../../../lib/validations';
import { checkApiAuth } from '../../../lib/auth-utils';

/**
 * GET /api/diary - 全日記エントリー取得
 */
export async function GET(req: NextRequest) {
  try {
    // 認証チェック
    const authResult = await checkApiAuth(req);
    
    // NextResponseが返された場合はエラーなのでそのまま返す
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    
    // クエリパラメータからページネーション情報を取得
    const { searchParams } = new URL(req.url);
    
    // バリデーション
    const params = paginationSchema.parse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
    });
    
    // データ取得
    const entries = await getAllDiaryEntries(authResult.userId, params.limit, params.page);
    
    // レスポンス返却
    return createSuccessResponse(entries);
  } catch (error) {
    console.error('日記エントリー取得エラー:', error);
    
    if (error instanceof ZodError) {
      return createErrorResponse('クエリパラメータが不正です', 400, 'VALIDATION_ERROR', error.errors);
    }
    
    return createErrorResponse('日記エントリーの取得に失敗しました', 500);
  }
}

/**
 * POST /api/diary - 日記エントリー作成
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
    const data = createDiaryEntrySchema.parse(body);
    
    // 日記エントリー作成
    const newEntry = await createDiaryEntry(authResult.userId, data);
    
    // 成功レスポンス
    return createSuccessResponse(newEntry, 201);
  } catch (error) {
    console.error('日記エントリー作成エラー:', error);
    
    if (error instanceof ZodError) {
      return createErrorResponse('入力データが不正です', 400, 'VALIDATION_ERROR', error.errors);
    }
    
    const message = error instanceof Error ? error.message : '日記エントリーの作成に失敗しました';
    return createErrorResponse(message, 500);
  }
} 