import { LoginContainer } from "@/app/_components/containers/auth/container";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const session = await auth();

	// すでにログインしている場合はダッシュボードにリダイレクト
	if (session) {
		redirect("/dashboard");
	}

	return <LoginContainer />;
}
