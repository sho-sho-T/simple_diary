import { TagBadge } from "@/app/_components/features/tags/tag-badge";
import type { Tag } from "@/types";
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
	{
		id: "5",
		userId: "user1",
		name: "健康",
		color: "#dc2626",
		createdAt: new Date(),
	},
];

const meta = {
	title: "Features/Tags/TagBadge",
	component: TagBadge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		onClick: {
			action: "clicked",
			description: "タグクリック時のコールバック",
		},
	},
} satisfies Meta<typeof TagBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なタグバッジ
export const Default: Story = {
	args: {
		tag: mockTags[0],
	},
};

// クリック可能なタグバッジ
export const Clickable: Story = {
	args: {
		tag: mockTags[0],
		onClick: () => console.log("Tag clicked"),
	},
};

// 色違いのタグバッジ
export const ColorVariants: Story = {
	args: {
		tag: mockTags[0], // ダミーのタグ（実際にはrenderで上書きされる）
	},
	render: () => (
		<div className="flex flex-wrap gap-2">
			{mockTags.map((tag) => (
				<TagBadge key={tag.id} tag={tag} />
			))}
		</div>
	),
};

// 長いテキストのタグバッジ
export const LongText: Story = {
	args: {
		tag: {
			id: "6",
			userId: "user1",
			name: "とても長いタグ名のサンプルです",
			color: "#8b5cf6",
			createdAt: new Date(),
		},
	},
};
