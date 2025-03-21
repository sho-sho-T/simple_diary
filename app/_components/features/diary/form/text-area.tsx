"use client";

import { Textarea } from "@/app/_components/ui/textarea";
import type { DiaryTextAreaProps } from "@/app/_types/diary/form";
import { DIARY_CONTENT_LIMITS } from "@/app/_types/diary/validation";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export const DiaryTextArea = ({
	currentLength,
	maxLength = DIARY_CONTENT_LIMITS.MAX_LENGTH,
	error,
	disabled,
	onChange,
	value,
	...props
}: DiaryTextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// 変更ハンドラを修正 - 単純にonChangeイベントを親コンポーネントに渡す
	// maxLengthはHTMLの属性として設定するだけで十分
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange?.(e);
	};

	return (
		<Textarea
			ref={textareaRef}
			className={cn(
				"min-h-[240px] resize-none w-full p-4 text-base rounded-md focus:ring-2 focus:ring-offset-1",
				error && "border-red-500 focus-visible:ring-red-500",
				disabled && "opacity-50 cursor-not-allowed",
			)}
			onChange={handleChange}
			maxLength={maxLength}
			aria-invalid={!!error}
			aria-errormessage={error}
			disabled={disabled}
			value={value}
			{...props}
		/>
	);
};
