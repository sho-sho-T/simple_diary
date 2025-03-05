import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
};

/**
 * 成功レスポンスを作成する関数
 */
export function createSuccessResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
  }, { status });
}

/**
 * エラーレスポンスを作成する関数
 */
export function createErrorResponse(
  message: string, 
  status = 400, 
  code?: string, 
  details?: any
): NextResponse<ApiResponse<null>> {
  return NextResponse.json({
    success: false,
    error: {
      message,
      code,
      details,
    },
  }, { status });
}

/**
 * Zodバリデーションエラーをハンドリングする関数
 */
export function handleZodError(error: ZodError): NextResponse<ApiResponse<null>> {
  return createErrorResponse(
    'データバリデーションエラー',
    400,
    'VALIDATION_ERROR',
    error.errors
  );
}

/**
 * 認証エラーを作成する関数
 */
export function createAuthError(message = '認証が必要です'): NextResponse<ApiResponse<null>> {
  return createErrorResponse(message, 401, 'UNAUTHORIZED');
}

/**
 * 権限エラーを作成する関数
 */
export function createForbiddenError(message = 'アクセス権限がありません'): NextResponse<ApiResponse<null>> {
  return createErrorResponse(message, 403, 'FORBIDDEN');
}

/**
 * リソース不存在エラーを作成する関数
 */
export function createNotFoundError(resource = 'リソース'): NextResponse<ApiResponse<null>> {
  return createErrorResponse(`${resource}が見つかりません`, 404, 'NOT_FOUND');
}

/**
 * サーバーエラーを作成する関数
 */
export function createServerError(message = 'サーバーエラーが発生しました'): NextResponse<ApiResponse<null>> {
  return createErrorResponse(message, 500, 'SERVER_ERROR');
} 