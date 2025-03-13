import { LoginContainer } from "@/app/_containers/auth/container";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const session = await auth();

	// すでにログインしている場合は日記一覧にリダイレクト
	if (session) {
		redirect("/diary");
	}

	return <LoginContainer />;
}
