"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/_components/ui/dialog";
import { FloatingActionButton } from "@/app/_components/ui/floating-action-button";
import { useLoadingNavigation } from "@/app/_hooks/use-loading-navigation";
import { useLoading } from "@/app/_providers/loading-provider";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type DeleteButtonProps = {
	entryId: string;
};

/**
 * 日記削除ボタンコンポーネント
 * FloatingActionButtonを使用して画面右下に表示し、クリック時に確認ダイアログを表示
 */
export function DeleteButton({ entryId }: DeleteButtonProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();
	const { showLoading, hideLoading } = useLoading();
	const { navigateWithLoading } = useLoadingNavigation();

	// 日記削除処理
	const handleDelete = async () => {
		setIsDeleting(true);
		showLoading();

		try {
			const response = await fetch(`/api/diary/${entryId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const data = await response.json();
				toast.error(data.message || "日記の削除に失敗しました");
				return;
			}

			toast.success("日記を削除しました");
			setIsDialogOpen(false);
			navigateWithLoading("/diary");
		} catch (error) {
			console.error("Failed to delete diary entry:", error);
			toast.error("日記の削除に失敗しました");
		} finally {
			setIsDeleting(false);
			hideLoading();
		}
	};

	return (
		<>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<FloatingActionButton
						position="bottom-right"
						size="default"
						className="bg-red-500 hover:bg-red-600 text-white"
						aria-label="日記を削除"
					>
						<Trash2 className="h-6 w-6" />
					</FloatingActionButton>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>日記の削除</DialogTitle>
						<DialogDescription>
							この日記を削除します。この操作は元に戻せません。
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-4">
						<Button
							variant="outline"
							onClick={() => setIsDialogOpen(false)}
							disabled={isDeleting}
						>
							キャンセル
						</Button>
						<Button
							variant="destructive"
							onClick={handleDelete}
							disabled={isDeleting}
						>
							{isDeleting ? "削除中..." : "削除する"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
