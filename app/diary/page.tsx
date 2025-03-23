import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DiaryList } from "../_components/containers/diary/list";
import { Header } from "../_layouts/header";

export default async function DiaryPage() {
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
			<DiaryList userId={session.user.id} />
		</Suspense>
	);
}
