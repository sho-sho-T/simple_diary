import type { Tag } from "@/app/_types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLoading } from "../_providers/loading-provider";

/**
 * タグ一覧を取得するカスタムフック
 */
export function useTags() {
	const { showLoading, hideLoading } = useLoading();

	const result = useQuery<Tag[]>({
		queryKey: ["tags"],
		queryFn: async () => {
			const response = await fetch("/api/tags");
			if (!response.ok) {
				throw new Error("タグの取得に失敗しました");
			}
			const data = await response.json();
			return data.data;
		},
	});

	// ローディング状態が変更されたときにローディングアニメーションを表示/非表示
	useEffect(() => {
		if (result.isLoading) {
			showLoading();
		} else {
			hideLoading();
		}
	}, [result.isLoading, showLoading, hideLoading]);

	return result;
}

/**
 * タグを作成するカスタムフック
 */
export function useCreateTag() {
	const queryClient = useQueryClient();
	const { showLoading, hideLoading } = useLoading();

	return useMutation({
		mutationFn: async (tagData: { name: string; color: string }) => {
			showLoading();
			try {
				const response = await fetch("/api/tags", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(tagData),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error?.message || "タグの作成に失敗しました");
				}

				return data.data as Tag;
			} finally {
				hideLoading();
			}
		},
		onSuccess: (newTag) => {
			// タグ一覧のキャッシュを更新
			queryClient.invalidateQueries({ queryKey: ["tags"] });
			// 成功メッセージを表示
			toast.success(`タグ「${newTag.name}」を作成しました`);
		},
	});
}

/**
 * タグを更新するカスタムフック
 */
export function useUpdateTag() {
	const queryClient = useQueryClient();
	const { showLoading, hideLoading } = useLoading();

	return useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: { name?: string; color?: string };
		}) => {
			showLoading();
			try {
				const response = await fetch(`/api/tags/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(
						responseData.error?.message || "タグの更新に失敗しました",
					);
				}

				return responseData.data as Tag;
			} finally {
				hideLoading();
			}
		},
		onSuccess: (updatedTag) => {
			// タグ一覧のキャッシュを更新
			queryClient.invalidateQueries({ queryKey: ["tags"] });
			// 成功メッセージを表示
			toast.success(`タグ「${updatedTag.name}」を更新しました`);
		},
	});
}

/**
 * タグを削除するカスタムフック
 */
export function useDeleteTag() {
	const queryClient = useQueryClient();
	const { showLoading, hideLoading } = useLoading();

	return useMutation({
		mutationFn: async (id: string) => {
			showLoading();
			try {
				const response = await fetch(`/api/tags/${id}`, {
					method: "DELETE",
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error?.message || "タグの削除に失敗しました");
				}

				return id;
			} finally {
				hideLoading();
			}
		},
		onSuccess: (_, variables) => {
			// タグ一覧のキャッシュを更新
			queryClient.invalidateQueries({ queryKey: ["tags"] });
			// 成功メッセージを表示
			toast.success("タグを削除しました");
		},
		onError: (error) => {
			// エラーメッセージを表示
			toast.error(
				error instanceof Error ? error.message : "タグの削除に失敗しました",
			);
		},
	});
}
