import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TagManager } from "../_components/features/tags/tag-manager";
import { Header } from "../_layouts/header";

export default async function TagPage() {
	const session = await auth();

	// ログインしていない場合はログインページにリダイレクト
	if (!session || !session.user?.id) {
		redirect("/auth/login");
	}

	return (
		<>
			<Header />
			<TagManager />
		</>
	);
}
