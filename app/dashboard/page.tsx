import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Dashboard } from "../_components/containers/dashboad";
import { Header } from "../_layouts/header";

export default async function DashboardPage() {
	const session = await auth();

	// ログインしていない場合はログインページにリダイレクト
	if (!session) {
		redirect("/auth/login");
	}

	const userName = session.user?.name || "ゲスト";

	return (
		<>
			<Header />
			<Dashboard userName={userName} />
		</>
	);
}
