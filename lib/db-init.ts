import { initializeDatabase } from "./db-test";

/**
 * データベース初期化を実行するメインスクリプト
 */
async function main() {
	try {
		console.log("🔄 データベース初期化を開始します...");
		await initializeDatabase();
		console.log("✅ データベース初期化が完了しました");
		process.exit(0);
	} catch (error) {
		console.error("❌ データベース初期化に失敗しました:", error);
		process.exit(1);
	}
}

main();
