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
import type { SelectSingleEventHandler } from "react-day-picker";

type DatePickerProps = {
	selected?: Date;
	onSelect: SelectSingleEventHandler;
	error?: string;
	disabled?: boolean;
};

export const DatePicker = ({
	selected,
	onSelect,
	error,
	disabled,
}: DatePickerProps) => {
	const today = new Date();
	today.setHours(23, 59, 59, 999);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
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
					onSelect={onSelect}
					disabled={(date) => date > today}
					initialFocus
					locale={ja}
				/>
			</PopoverContent>
		</Popover>
	);
};
