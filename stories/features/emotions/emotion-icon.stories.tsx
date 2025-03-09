import type { Meta, StoryObj } from "@storybook/react";
import { EmotionIcon } from "@/components/features/emotions/emotion-icon";
import { getAllEmotions } from "@/lib/emotions";

const emotions = getAllEmotions();

const meta = {
  title: "Features/Emotions/EmotionIcon",
  component: EmotionIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    emotionId: {
      control: "select",
      options: emotions.map(e => e.id),
      description: "感情ID",
      mapping: emotions.reduce((acc, emotion) => {
        acc[emotion.name] = emotion.id;
        return acc;
      }, {} as Record<string, number>),
    },
    size: {
      control: { type: "range", min: 16, max: 128, step: 8 },
      description: "アイコンサイズ",
    },
  },
} satisfies Meta<typeof EmotionIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な感情アイコン
export const Default: Story = {
  args: {
    emotionId: 1, // 喜び
    size: 48,
  },
};

// サイズバリエーション
export const Sizes: Story = {
  args: {
    emotionId: 1,
  },
  render: (args) => (
    <div className="flex items-end gap-4">
      <EmotionIcon {...args} size={24} />
      <EmotionIcon {...args} size={32} />
      <EmotionIcon {...args} size={48} />
      <EmotionIcon {...args} size={64} />
      <EmotionIcon {...args} size={96} />
    </div>
  ),
};

// 全ての感情アイコン
export const AllEmotions: Story = {
  args: {
    emotionId: 1, // ダミー値（実際にはrenderで上書きされる）
    size: 48,
  },
  render: (args) => (
    <div className="flex flex-wrap gap-8">
      {emotions.map((emotion) => (
        <div key={emotion.id} className="flex flex-col items-center gap-2">
          <EmotionIcon {...args} emotionId={emotion.id} />
          <span className="text-sm font-medium">{emotion.name}</span>
        </div>
      ))}
    </div>
  ),
}; 