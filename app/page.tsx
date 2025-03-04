import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  // ログインしているかどうかに応じてリダイレクト
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }

  // 通常は以下のコードは実行されない
  return null;
}
