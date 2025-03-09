import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components/layout/header";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background">
        <Story />
        <div className="container p-4">
          <div className="h-[200px] rounded-lg border-2 border-dashed border-muted p-6 text-center">
            <p className="text-muted-foreground">ページコンテンツ</p>
          </div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なヘッダー
export const Default: Story = {
  args: {},
};

// カスタムクラス付きヘッダー
export const WithCustomClass: Story = {
  args: {
    className: "bg-primary/5 border-primary/20",
  },
}; 