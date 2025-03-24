import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DiaryList } from "../_components/containers/diary/list";
import { Header } from "../_layouts/header";

export default async function DiaryPage() {
	const session = await auth();

	// ログインしていない場合はログインページにリダイレクト
	if (!session || !session.user?.id) {
		redirect("/auth/login");
	}

	return (
		<>
			<Header />
			<DiaryList userId={session.user.id} />
		</>
	);
}
