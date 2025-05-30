"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import type { CharacterCounterProps } from "@/app/_types/diary/form";
import { DIARY_CONTENT_LIMITS } from "@/app/_types/diary/validation";
import { AlertCircle } from "lucide-react";

export const CharacterCounter = ({
	current,
	max = DIARY_CONTENT_LIMITS.MAX_LENGTH,
	warningThreshold = DIARY_CONTENT_LIMITS.WARNING_THRESHOLD,
}: CharacterCounterProps) => {
	const remaining = max - current;
	const showWarning = remaining <= warningThreshold;

	return (
		<div className="flex items-center gap-2 text-sm">
			<span className={showWarning ? "text-yellow-600" : "text-gray-500"}>
				{current} / {max}文字
			</span>
			{showWarning && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<AlertCircle
								className="h-4 w-4 text-yellow-600 cursor-help"
								aria-label="文字数警告"
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p>残り{remaining}文字です</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</div>
	);
};
