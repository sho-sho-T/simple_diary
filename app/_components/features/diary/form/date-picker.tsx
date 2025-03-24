"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

type DatePickerProps = {
	selected?: Date;
	onSelect: (date: Date | undefined) => void;
	error?: string;
	disabled?: boolean;
};

export const DatePicker = ({
	selected,
	onSelect,
	error,
	disabled,
}: DatePickerProps) => {
	// 日本時間の現在日
	const now = new Date();
	const today = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		9, // 日本時間の正午に設定することで UTC への変換時にも同じ日付を保持
		0,
		0,
		0,
	);

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			// タイムゾーンを考慮した日付設定
			// UTC への変換で日付がずれないように時間を正午に設定
			const selectedDate = new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				9, // 日本時間の正午に設定
				0,
				0,
				0,
			);
			onSelect(selectedDate);
		} else {
			onSelect(undefined);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className={cn(
						"w-full justify-start text-left font-normal",
						!selected && "text-muted-foreground",
						error && "border-red-500 focus-visible:ring-red-500",
						disabled && "opacity-50 cursor-not-allowed",
					)}
					disabled={disabled}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selected ? (
						format(selected, "PPP", { locale: ja })
					) : (
						<span>日付を選択</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={selected}
					onSelect={handleDateSelect}
					disabled={(date) => {
						const compareDate = new Date(
							date.getFullYear(),
							date.getMonth(),
							date.getDate(),
							9, // 日本時間の正午に設定
							0,
							0,
							0,
						);
						return compareDate > today;
					}}
					initialFocus
					locale={ja}
				/>
			</PopoverContent>
		</Popover>
	);
};
