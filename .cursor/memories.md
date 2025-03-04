このメモリーファイルは、プロジェクトのすべての活動、決定、およびやり取りを時系列で記録するものです。
ディスカッション、計画、問い合わせの際には、手動更新用のトリガーワード「mems」を使用してください。開発活動は、自動的にタイムスタンプ付きで記録され、機能、バグ、改善のための #タグ を含む明確な説明が追加されます。

すべてのエントリは、「### Memories」セクションの下に、一行で簡潔に記述してください。1000行に達した場合は @memories2.md を作成してください。

# Project Memories (AI & User) 🧠

### Memories（編集可）
[v1.0.1] Development: Prismaスキーマ変更後は必ずマイグレーションコマンド(prisma migrate/db push)を実行することで変更をDBに反映する必要がある。標準のmigrateコマンドが失敗した場合は`npx prisma db push`または`migrate dev --create-only`と`migrate deploy`の組み合わせを代替手段として使用。データベースの実際の状態と期待される状態の不一致は`The table does not exist`エラーとして現れる。 #database #error-handling #migration
[v1.0.0] Development: Prismaモデル設計において、タグに色情報(color)を追加することで視覚的区別が容易になる設計を実装。感情スタンプは整数IDで管理し、フロントエンド側で対応する感情を表示する設計パターンを採用。複合インデックス(userId+entryDate)と一意制約で日記の取得効率と整合性を確保。日記コンテンツは通常テキストとマークダウン両方を保存する二重構造で柔軟性を向上。 #database #schema #design-pattern

### Note(編集不可)
*注: このメモリーファイルは時系列順に整理され、タグを活用して分類されます。1000行に達した際には @memories2.md とのクロスリファレンスを作成します。