import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/app/_components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "ボタンのスタイルバリエーション",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "ボタンのサイズバリエーション",
    },
    disabled: {
      control: "boolean",
      description: "ボタンの無効状態",
    },
    asChild: {
      control: "boolean",
      description: "子要素としてレンダリングするかどうか",
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ベーシックなボタン
export const Default: Story = {
  args: {
    children: "ボタン",
  },
};

// バリエーション別
export const Primary: Story = {
  args: {
    children: "プライマリボタン",
    variant: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "削除",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "アウトライン",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "セカンダリ",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "ゴースト",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "リンク",
    variant: "link",
  },
};

// サイズ別
export const Small: Story = {
  args: {
    children: "小",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "中",
    size: "default",
  },
};

export const Large: Story = {
  args: {
    children: "大",
    size: "lg",
  },
};

// アイコン付きボタン
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        追加
      </>
    ),
  },
};

// 無効状態
export const Disabled: Story = {
  args: {
    children: "無効",
    disabled: true,
  },
};

// アイコンのみ
export const IconOnly: Story = {
  args: {
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    ),
    size: "icon",
    "aria-label": "追加",
  },
}; 