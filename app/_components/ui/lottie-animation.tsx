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

	useEffect(() => {
		let animation: AnimationItem | undefined;

		// 動的にlottie-webをインポート
		import("lottie-web").then((lottieModule) => {
			const lottie = lottieModule.default;
			if (!containerRef.current) return;

			animation = lottie.loadAnimation({
				container: containerRef.current,
				renderer: "svg",
				loop,
				autoplay,
				path: animationPath,
			});
		});

		return () => {
			if (animation) {
				animation.destroy();
			}
		};
	}, [animationPath, loop, autoplay]);

	return (
		<div ref={containerRef} className={className} style={{ width, height }} />
	);
}
