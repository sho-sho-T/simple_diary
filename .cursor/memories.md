このメモリーファイルは、プロジェクトのすべての活動、決定、およびやり取りを時系列で記録するものです。
ディスカッション、計画、問い合わせの際には、手動更新用のトリガーワード「mems」を使用してください。開発活動は、自動的にタイムスタンプ付きで記録され、機能、バグ、改善のための #タグ を含む明確な説明が追加されます。

すべてのエントリは、「### Memories」セクションの下に、一行で簡潔に記述してください。1000行に達した場合は @memories2.md を作成してください。

# Project Memories (AI & User) 🧠

### Memories（編集可）
[v1.1.1] Development: Reactのフォーム実装では、ボタンのtype属性が未指定の場合、フォーム内のボタンは自動的にtype="submit"として扱われる。特にEmotionSelectorやDatePickerなどの複合コンポーネントを使用する場合、明示的にtype="button"を指定しないと意図しないフォーム送信が発生する。また、useFormなどのライブラリからuseStateベースの実装に移行する際は、バリデーションロジックを再構築する必要があり、特にZodを用いた場合はエラー形式の変換処理が必要となる。テキストエリアでの文字数制限実装では、単純なmaxLength属性の利用が、複雑なJavaScriptによる制御よりもフォーカス維持の観点で信頼性が高い。 #form-handling #react #validation #best-practice
[v1.1.0] Development: Prismaスキーマの変更時は、`prisma db pull`でデータベースの実際の状態を確認することが重要。"Already in sync"メッセージは必ずしもエラーではなく、期待する状態がすでに実現されている可能性を示唆する。また、スキーマ変更時は型定義(types)、バリデーション(validations)、サービス層(services)、UIコンポーネント(components)など、全レイヤーでの整合性を確保する必要がある。特に、StoryBookのモックデータは実際のデータ構造を反映させることで、UIの正確なテストが可能となる。 #database #schema #testing #best-practice

[v1.0.9] Development: TailwindCSSの最新バージョンではPostCSSプラグインが@tailwindcss/postcssという別パッケージに移動しており、postcss.config.mjsでは配列形式["@tailwindcss/postcss"]で指定する必要がある。Storybookでのグローバルスタイル読み込み(.storybook/preview.ts)では、Next.jsの場合app/globals.cssのように正確なファイルパスを指定する必要がある。Webpackエラーの「Module not found」は単純なパス問題に見えても、実際は依存関係の構成問題である可能性があり、StackTraceを含めた分析が重要。 #tailwindcss #storybook #error-handling #css
[v1.0.8] Development: Next.jsのUIコンポーネント実装では、shadcnパッケージ（旧shadcn-ui）を使用する際にReact 19との互換性問題が発生することがある。このような場合は`--force`オプションを使用することで解決できる。また、コンポーネント間の相互依存関係に注意し、関連コンポーネントも一緒にインストールする必要がある。コンポーネント設計では、ui（基本UI）/layout（レイアウト）/features（機能別）の3層構造が管理しやすい。クライアントサイドで動作するアニメーション（lottie-web等）はuseEffectでクリーンアップを適切に行い、メモリリークを防止する実装が重要。 #ui-components #react #shadcn #typescript #performance
[v1.0.7] Development: Next.jsのApp Routerでは同じパスパターンに対して異なる動的セグメント名（スラグ名）を使用することはできない。例えば `/api/diary/[date]` と `/api/diary/[id]` は競合する。この問題は `/api/diary/by-date/[date]` のようにパスパターンを変更することで解決できる。パスの変更に伴いインポートパスも調整が必要となるが、絶対パス（@/エイリアス）を使用すると簡潔に記述できる。動的ルートの設計時には将来的な競合を避けるためにセグメント名ではなくパスパターンの分離を検討すべき。 #api-design #next-js #routing #error-fix
[v1.0.6] Development: Next.jsのAPI Routes設計では、関連する機能ごとに_libディレクトリを配置し内部モジュールを整理することで、コードの再利用性と保守性が大幅に向上する。動的ルートパラメータと静的ルートを組み合わせたAPI階層構造により、RESTfulな設計を実現できる。ルートハンドラを対応するHTTPメソッド別に明確に分離することで、関心の分離が実現できる。 #api-design #next-js #maintainability
[v1.0.5] Development: 認証処理の実装において、checkApiAuthのような再利用可能な認証関数を作成することで、全APIエンドポイントでの一貫した認証チェックが可能になる。早期リターンパターン（認証エラー時に即座にエラーレスポンスを返す）を採用することで、コードの可読性と保守性が向上する。NextResponseインスタンスの型チェックを活用した条件分岐により、シームレスなエラーハンドリングが実現できる。 #authentication #api #error-handling
[v1.0.4] Development: データベースクエリ最適化において、特に過去の同日エントリー取得などの複雑なクエリでは、PrismaのfindManyとAND条件の組み合わせが効果的。日付操作（月・日の抽出など）はデータベース固有の関数に依存する場合があり、PostgreSQLではEXTRACT関数を活用。トランザクションを活用してデータ整合性を保護し、エラー発生時に自動的にロールバックされる仕組みが重要。 #database #query-optimization #performance
[v1.0.3] Development: エラーハンドリング戦略として、Zodによる入力バリデーションとZodErrorのキャッチを組み合わせることで、クライアントに詳細なバリデーションエラーを返せる。Prismaのエラーコードパターン（特にP2002のユニーク制約違反）をキャッチしてユーザーフレンドリーなエラーメッセージに変換する実装が効果的。各種エラーに対応するcreateErrorResponse系関数を用意することで、一貫したエラーレスポンス形式を維持できる。 #error-handling #validation #user-experience
[v1.0.2] Development: Next.jsのAPI実装において、標準化されたレスポンス形式（success, data, errorフィールドを持つオブジェクト）を採用することで、フロントエンドでの処理が統一化される。createSuccessResponseやcreateErrorResponseなどの再利用可能なユーティリティ関数を作成することで、レスポンス生成のコードが簡潔になり、一貫性と保守性が向上する。APIエンドポイントでtry-catchパターンを採用し、細分化されたエラーハンドリングを実装することで堅牢なAPIを実現できる。 #api-design #error-handling #best-practice
[v1.0.1] Development: Prismaスキーマ変更後は必ずマイグレーションコマンド(prisma migrate/db push)を実行することで変更をDBに反映する必要がある。標準のmigrateコマンドが失敗した場合は`npx prisma db push`または`migrate dev --create-only`と`migrate deploy`の組み合わせを代替手段として使用。データベースの実際の状態と期待される状態の不一致は`The table does not exist`エラーとして現れる。 #database #error-handling #migration
[v1.0.0] Development: Prismaモデル設計において、タグに色情報(color)を追加することで視覚的区別が容易になる設計を実装。感情スタンプは整数IDで管理し、フロントエンド側で対応する感情を表示する設計パターンを採用。複合インデックス(userId+entryDate)と一意制約で日記の取得効率と整合性を確保。日記コンテンツは通常テキストとマークダウン両方を保存する二重構造で柔軟性を向上。 #database #schema #design-pattern

### Note(編集不可)
*注: このメモリーファイルは時系列順に整理され、タグを活用して分類されます。1000行に達した際には @memories2.md とのクロスリファレンスを作成します。