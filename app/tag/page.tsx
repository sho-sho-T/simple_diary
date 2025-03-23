import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { TagManager } from "../_components/features/tags/tag-manager";
import { Header } from "../_layouts/header";

export default async function TagPage() {
	const session = await auth();

	// ログインしていない場合はログインページにリダイレクト
	if (!session || !session.user?.id) {
		redirect("/auth/login");
	}

	return (
		<Suspense
			fallback={
				<div className="container py-8">
					<div className="flex items-center justify-center min-h-[200px]">
						<div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
						<span className="ml-2 text-muted-foreground">
							データを読み込み中...
						</span>
					</div>
				</div>
			}
		>
			<Header />
			<TagManager />
		</Suspense>
	);
}
