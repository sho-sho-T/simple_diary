import type { Tag } from "@/app/_types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * タグ一覧を取得するカスタムフック
 */
export function useTags() {
	return useQuery<Tag[]>({
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
}

/**
 * タグを作成するカスタムフック
 */
export function useCreateTag() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (tagData: { name: string; color: string }) => {
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
		},
		onSuccess: () => {
			// タグ一覧のキャッシュを更新
			queryClient.invalidateQueries({ queryKey: ["tags"] });
		},
	});
}
