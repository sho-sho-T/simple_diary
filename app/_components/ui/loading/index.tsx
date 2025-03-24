"use client";

import { useEffect, useState } from "react";
import { LottieAnimation } from "../lottie-animation";

interface LoadingProps {
	isLoading: boolean;
}

/**
 * ローディングアニメーションを表示するコンポーネント
 * @param isLoading ローディング中かどうか
 */
export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
	const [isMounted, setIsMounted] = useState(false);

	// マウント時の処理
	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	if (!isMounted || !isLoading) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
			<div className="relative h-64 w-64">
				<LottieAnimation
					animationPath="/loading.json"
					loop={true}
					autoplay={true}
					className="h-full w-full"
					width="100%"
					height="100%"
				/>
			</div>
		</div>
	);
};
