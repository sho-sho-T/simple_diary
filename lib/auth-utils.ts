import 'server-only';
import { auth } from '../auth';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { createAuthError } from './api-utils';

/**
 * 現在のセッションからユーザーIDを取得
 * 未認証の場合はエラーをスロー
 */
export async function getCurrentUserId(): Promise<string> {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('認証されていません');
  }
  
  return session.user.id;
}

/**
 * APIリクエストからユーザーIDを取得
 * 未認証の場合はnullを返す
 */
export async function getUserIdFromRequest(req: NextRequest): Promise<string | null> {
  // 実際の実装では、JWTやクッキーからユーザー情報を取得する
  const session = await auth();
  return session?.user?.id || null;
}

/**
 * ページへのアクセス時に認証を確認し、未認証ならログインページへリダイレクト
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/api/auth/signin');
  }
  
  return session;
}

/**
 * APIルートで認証を確認する関数
 * 認証されていない場合は適切なエラーレスポンスを返す
 */
export async function checkApiAuth(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  
  if (!userId) {
    return createAuthError();
  }
  
  return { userId };
} 