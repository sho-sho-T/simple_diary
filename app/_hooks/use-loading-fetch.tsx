"use client";

import { useLoading } from "@/app/_providers/loading-provider";
import { useCallback } from "react";

/**
 * ローディング表示付きのfetch関数を提供するカスタムフック
 */
export function useLoadingFetch() {
	const { showLoading, hideLoading } = useLoading();

	/**
	 * ローディング表示付きのfetch
	 * @param url fetch先のURL
	 * @param options fetchオプション
	 * @returns fetch結果
	 */
	const fetchWithLoading = useCallback(
		async <T,>(url: string, options?: RequestInit): Promise<T> => {
			try {
				showLoading();
				const response = await fetch(url, options);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error?.message || "フェッチに失敗しました");
				}

				return data;
			} finally {
				hideLoading();
			}
		},
		[showLoading, hideLoading],
	);

	return { fetchWithLoading };
}
