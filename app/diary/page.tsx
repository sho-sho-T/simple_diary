import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DiaryList } from "../_containers/diary/list";

export default async function DiaryPage() {
	const session = await auth();

	// ログインしていない場合はログインページにリダイレクト
	if (!session || !session.user?.id) {
		redirect("/auth/login");
	}

	return <DiaryList userId={session.user.id} />;
}
