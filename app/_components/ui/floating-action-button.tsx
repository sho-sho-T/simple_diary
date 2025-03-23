"use client";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { buttonVariants } from "./button";

const floatingActionButtonVariants = cva(
	"fixed z-50 rounded-full shadow-lg transition-all duration-200 ease-in-out focus:outline-none",
	{
		variants: {
			position: {
				"bottom-right": "bottom-6 right-6",
				"bottom-left": "bottom-6 left-6",
				"top-right": "top-6 right-6",
				"top-left": "top-6 left-6",
				"bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
				"top-center": "top-6 left-1/2 -translate-x-1/2",
			},
			size: {
				default: "h-14 w-14",
				sm: "h-12 w-12",
				lg: "h-16 w-16",
			},
		},
		defaultVariants: {
			position: "bottom-right",
			size: "default",
		},
	},
);

export interface FloatingActionButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof floatingActionButtonVariants> {
	asChild?: boolean;
}

/**
 * 浮動アクションボタン（Floating Action Button）コンポーネント
 * 画面の固定位置に表示され、主要アクションを提供します
 */
const FloatingActionButton = forwardRef<
	HTMLButtonElement,
	FloatingActionButtonProps
>(({ className, position, size, ...props }, ref) => {
	return (
		<button
			className={cn(
				buttonVariants({ variant: "default" }),
				floatingActionButtonVariants({ position, size }),
				"flex items-center justify-center",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});

FloatingActionButton.displayName = "FloatingActionButton";

export { FloatingActionButton, floatingActionButtonVariants };
