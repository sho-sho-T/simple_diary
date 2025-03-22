"use client";

import type { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";

interface LottieAnimationProps {
	animationPath: string;
	loop?: boolean;
	autoplay?: boolean;
	className?: string;
	width?: number | string;
	height?: number | string;
}

export function LottieAnimation({
	animationPath,
	loop = true,
	autoplay = true,
	className,
	width = 40,
	height = 40,
}: LottieAnimationProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<AnimationItem | null>(null);

	useEffect(() => {
		// すでにアニメーションが存在する場合は破棄
		if (animationRef.current) {
			animationRef.current.destroy();
			animationRef.current = null;
		}

		// 動的にlottie-webをインポート
		import("lottie-web").then((lottieModule) => {
			const lottie = lottieModule.default;
			if (!containerRef.current) return;

			// 念のため再度チェック（非同期処理中にアンマウントされる可能性）
			if (animationRef.current) {
				animationRef.current.destroy();
			}

			animationRef.current = lottie.loadAnimation({
				container: containerRef.current,
				renderer: "svg",
				loop,
				autoplay,
				path: animationPath,
			});
		});

		return () => {
			if (animationRef.current) {
				animationRef.current.destroy();
				animationRef.current = null;
			}
		};
	}, [animationPath, loop, autoplay]);

	return (
		<div ref={containerRef} className={className} style={{ width, height }} />
	);
}
