import React from "react";

interface LoginPresentationProps {
	onGoogleLogin: () => void;
}

export const LoginPresentation = ({
	onGoogleLogin,
}: LoginPresentationProps) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
			<div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
				<div className="text-center">
					<h1 className="text-3xl font-bold">ログイン</h1>
					<p className="mt-2 text-gray-600">アカウントにログインしてください</p>
				</div>

				<div className="mt-8">
					<button
						type="button"
						onClick={onGoogleLogin}
						className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<img
							src="/images/google-logo.svg"
							alt="Google Logo"
							width={24}
							height={24}
						/>
						Googleでログイン
					</button>
				</div>
			</div>
		</div>
	);
};
