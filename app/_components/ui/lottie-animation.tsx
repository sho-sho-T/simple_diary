"use client";

import lottie from "lottie-web";
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
		if (!containerRef.current) return;

		const animation = lottie.loadAnimation({
			container: containerRef.current,
			renderer: "svg",
			loop,
			autoplay,
			path: animationPath,
		});

		return () => {
			animation.destroy();
		};
	}, [animationPath, loop, autoplay]);

	return (
		<div ref={containerRef} className={className} style={{ width, height }} />
	);
}
