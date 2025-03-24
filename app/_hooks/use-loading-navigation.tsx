"use client";

import { useLoading } from "@/app/_providers/loading-provider";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * ローディング表示付きのナビゲーション機能を提供するカスタムフック
 */
export function useLoadingNavigation() {
	const router = useRouter();
	const { showLoading, hideLoading } = useLoading();

	/**
	 * ローディング表示付きのページ遷移
	 * @param path 遷移先のパス
	 */
	const navigateWithLoading = useCallback(
		(path: string) => {
			showLoading();
			// 次のティックでルーティングを実行（ローディングが表示されるため）
			setTimeout(() => {
				router.push(path);
				// ナビゲーション完了後にローディングを非表示にする
				// (実際にはナビゲーション完了を検知できないので、適当な時間後に非表示にする)
				setTimeout(() => {
					hideLoading();
				}, 1000);
			}, 0);
		},
		[router, showLoading, hideLoading],
	);

	return { navigateWithLoading };
}
