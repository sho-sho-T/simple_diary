import React from "react";

interface DashboardPresentationProps {
	userName: string;
	onLogout: () => void;
}

export const DashboardPresentation = ({
	userName,
	onLogout,
}: DashboardPresentationProps) => {
	return (
		<div className="flex flex-col min-h-screen p-8">
			<header className="flex justify-between items-center mb-8 pb-4 border-b">
				<h1 className="text-2xl font-bold">ダッシュボード</h1>
				<div className="flex items-center gap-4">
					<span className="text-gray-600">
						ようこそ、<span className="font-semibold">{userName}</span> さん
					</span>
					<button
						type="button"
						onClick={onLogout}
						className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
					>
						ログアウト
					</button>
				</div>
			</header>

			<main className="flex-1">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4">正常にログインしました</h2>
					<p className="text-gray-600">
						NextAuth v5によるGoogle認証でログインに成功しました。
					</p>
				</div>
			</main>
		</div>
	);
};
