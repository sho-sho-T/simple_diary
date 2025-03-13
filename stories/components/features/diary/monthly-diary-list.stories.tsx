import { MonthlyDiaryList } from "@/app/_components/features/diary/monthly-diary-list";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MonthlyDiaryList> = {
	title: "Features/Diary/MonthlyDiaryList",
	component: MonthlyDiaryList,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MonthlyDiaryList>;

// モックデータ
const mockEntries = [
	{
		id: "1",
		userId: "user1",
		entryDate: new Date("2023-03-15"),
		content: "今日は晴れでした。散歩に行きました。",
		emotionStampId: 1,
		createdAt: new Date("2023-03-15"),
		updatedAt: new Date("2023-03-15"),
		tags: [
			{
				tag: {
					id: "tag1",
					userId: "user1",
					name: "散歩",
					color: "#4CAF50",
				},
			},
			{
				tag: {
					id: "tag2",
					userId: "user1",
					name: "晴れ",
					color: "#FFC107",
				},
			},
		],
	},
	{
		id: "2",
		userId: "user1",
		entryDate: new Date("2023-03-10"),
		content: "今日は雨でした。家で本を読みました。",
		emotionStampId: 3,
		createdAt: new Date("2023-03-10"),
		updatedAt: new Date("2023-03-10"),
		tags: [
			{
				tag: {
					id: "tag3",
					userId: "user1",
					name: "読書",
					color: "#2196F3",
				},
			},
			{
				tag: {
					id: "tag4",
					userId: "user1",
					name: "雨",
					color: "#607D8B",
				},
			},
		],
	},
];

const mockTags = [
	{
		id: "tag1",
		userId: "user1",
		name: "散歩",
		color: "#4CAF50",
		createdAt: new Date("2023-01-01"),
	},
	{
		id: "tag2",
		userId: "user1",
		name: "晴れ",
		color: "#FFC107",
		createdAt: new Date("2023-01-01"),
	},
	{
		id: "tag3",
		userId: "user1",
		name: "読書",
		color: "#2196F3",
		createdAt: new Date("2023-01-01"),
	},
	{
		id: "tag4",
		userId: "user1",
		name: "雨",
		color: "#607D8B",
		createdAt: new Date("2023-01-01"),
	},
];

const mockAvailableMonths = [
	new Date("2023-03-01"),
	new Date("2023-02-01"),
	new Date("2023-01-01"),
];

export const Default: Story = {
	args: {
		entries: mockEntries,
		tags: mockTags,
		availableMonths: mockAvailableMonths,
		selectedMonth: new Date("2023-03-01"),
		onMonthChange: action("onMonthChange"),
		currentPage: 1,
		totalPages: 1,
		onPageChange: action("onPageChange"),
		onEntryClick: action("onEntryClick"),
	},
};

export const Empty: Story = {
	args: {
		entries: [],
		tags: mockTags,
		availableMonths: mockAvailableMonths,
		selectedMonth: new Date("2023-03-01"),
		onMonthChange: action("onMonthChange"),
		currentPage: 1,
		totalPages: 0,
		onPageChange: action("onPageChange"),
		onEntryClick: action("onEntryClick"),
	},
};

export const WithPagination: Story = {
	args: {
		entries: mockEntries,
		tags: mockTags,
		availableMonths: mockAvailableMonths,
		selectedMonth: new Date("2023-03-01"),
		onMonthChange: action("onMonthChange"),
		currentPage: 1,
		totalPages: 3,
		onPageChange: action("onPageChange"),
		onEntryClick: action("onEntryClick"),
	},
};
