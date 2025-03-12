import { DiaryCard } from "@/app/_components/features/diary/diary-card";
import type { DiaryEntry, Tag } from "@/app/_types";
import type { Meta, StoryObj } from "@storybook/react";

// モックデータ
const mockTags: Tag[] = [
	{
		id: "1",
		userId: "user1",
		name: "仕事",
		color: "#4f46e5",
		createdAt: new Date(),
	},
	{
		id: "2",
		userId: "user1",
		name: "家族",
		color: "#16a34a",
		createdAt: new Date(),
	},
	{
		id: "3",
		userId: "user1",
		name: "趣味",
		color: "#ea580c",
		createdAt: new Date(),
	},
	{
		id: "4",
		userId: "user1",
		name: "旅行",
		color: "#0ea5e9",
		createdAt: new Date(),
	},
];

const mockEntry: DiaryEntry = {
	id: "entry1",
	userId: "user1",
	entryDate: new Date("2024-03-08"),
	content:
		"今日は素晴らしい一日でした。朝早く起きて、公園でジョギングをしました。その後、家族と朝食を食べて、仕事に行きました。仕事では新しいプロジェクトの提案が承認されて、とても嬉しかったです。夕方は友人と食事に行き、楽しい時間を過ごしました。",
	emotionStampId: 1,
	createdAt: new Date("2024-03-08T09:00:00"),
	updatedAt: new Date("2024-03-08T09:00:00"),
};

const meta = {
	title: "Features/Diary/DiaryCard",
	component: DiaryCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		isCompact: {
			control: "boolean",
			description: "コンパクト表示モード",
		},
		onCardClick: {
			action: "clicked",
			description: "カードクリック時のコールバック",
		},
	},
} satisfies Meta<typeof DiaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な日記カード
export const Default: Story = {
	args: {
		entry: mockEntry,
		tags: mockTags.slice(0, 2),
	},
};

// タグなしの日記カード
export const WithoutTags: Story = {
	args: {
		entry: mockEntry,
		tags: [],
	},
};

// 多数のタグを持つ日記カード
export const WithManyTags: Story = {
	args: {
		entry: mockEntry,
		tags: mockTags,
	},
};

// 感情スタンプなしの日記カード
export const WithoutEmotionStamp: Story = {
	args: {
		entry: { ...mockEntry, emotionStampId: undefined },
		tags: mockTags.slice(0, 2),
	},
};

// コンパクトモードの日記カード
export const CompactMode: Story = {
	args: {
		entry: mockEntry,
		tags: mockTags,
		isCompact: true,
	},
};

// クリック可能な日記カード
export const Clickable: Story = {
	args: {
		entry: mockEntry,
		tags: mockTags.slice(0, 2),
		onCardClick: () => console.log("Card clicked"),
	},
};
