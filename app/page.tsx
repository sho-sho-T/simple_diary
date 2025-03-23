import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await auth();

	// ログインしているかどうかに応じてリダイレクト
	if (session) {
		redirect("/diary");
	} else {
		redirect("/auth/login");
	}

	// 通常は以下のコードは実行されない
	return null;
}
