import { prisma } from '../prisma';

/**
 * データベース接続テスト用の関数
 * 接続が成功した場合はtrueを返し、失敗した場合はエラーをスローします
 */
export async function testDatabaseConnection() {
  try {
    // 簡単なクエリを実行してデータベース接続をテスト
    await prisma.$queryRaw`SELECT 1`;
    console.log('🟢 データベース接続テスト成功');
    return true;
  } catch (error) {
    console.error('🔴 データベース接続テスト失敗:', error);
    throw error;
  }
}

/**
 * ユーザーがいない場合にテストユーザーを作成する関数
 */
export async function createTestUserIfNotExists() {
  try {
    const userCount = await prisma.user.count();
    
    if (userCount === 0) {
      const testUser = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log('🟢 テストユーザー作成成功:', testUser.id);
    } else {
      console.log('🟢 既存ユーザーが存在します');
    }
    return true;
  } catch (error) {
    console.error('🔴 テストユーザー作成失敗:', error);
    throw error;
  }
}

/**
 * データベース初期化関数
 * 接続テストとテストユーザー作成を行います
 */
export async function initializeDatabase() {
  try {
    await testDatabaseConnection();
    await createTestUserIfNotExists();
    return true;
  } catch (error) {
    console.error('🔴 データベース初期化失敗:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
} 