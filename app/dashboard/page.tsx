import { DashboardContainer } from "@/components/dashboard/dashboard-container";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  // ログインしていない場合はログインページにリダイレクト
  if (!session) {
    redirect("/auth/login");
  }

  const userName = session.user?.name || "ゲスト";

  return <DashboardContainer userName={userName} />;
} 