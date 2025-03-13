import { Pagination } from "@/app/_components/ui/pagination";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Pagination> = {
	title: "UI/Pagination",
	component: Pagination,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
	args: {
		totalPages: 5,
		currentPage: 1,
		onPageChange: action("onPageChange"),
	},
};

export const CurrentPageInMiddle: Story = {
	args: {
		totalPages: 10,
		currentPage: 5,
		onPageChange: action("onPageChange"),
	},
};

export const LastPage: Story = {
	args: {
		totalPages: 5,
		currentPage: 5,
		onPageChange: action("onPageChange"),
	},
};

export const SinglePage: Story = {
	args: {
		totalPages: 1,
		currentPage: 1,
		onPageChange: action("onPageChange"),
	},
};
