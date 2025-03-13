import { MonthSelector } from "@/app/_components/features/diary/month-selector";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MonthSelector> = {
	title: "Features/Diary/MonthSelector",
	component: MonthSelector,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MonthSelector>;

// モックデータ
const mockAvailableMonths = [
	new Date("2023-03-01"),
	new Date("2023-02-01"),
	new Date("2023-01-01"),
	new Date("2022-12-01"),
	new Date("2022-11-01"),
];

export const Default: Story = {
	args: {
		availableMonths: mockAvailableMonths,
		selectedMonth: new Date("2023-03-01"),
		onMonthChange: action("onMonthChange"),
	},
};

export const SingleMonth: Story = {
	args: {
		availableMonths: [new Date("2023-03-01")],
		selectedMonth: new Date("2023-03-01"),
		onMonthChange: action("onMonthChange"),
	},
};
