import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なカード
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文がここに入ります。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>カードのコンテンツ部分です。ここに主要な情報を表示します。</p>
      </CardContent>
      <CardFooter>
        <Button>アクション</Button>
      </CardFooter>
    </Card>
  ),
};

// 画像付きカード
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
        alt="カードの画像"
        className="h-[200px] w-full object-cover"
      />
      <CardHeader>
        <CardTitle>画像付きカード</CardTitle>
        <CardDescription>
          美しい画像と共に情報を表示するカードデザイン
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>カードのコンテンツ部分です。画像と組み合わせて使用できます。</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">キャンセル</Button>
        <Button>確認</Button>
      </CardFooter>
    </Card>
  ),
};

// 複数ボタン付きカード
export const WithMultipleActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>アクション選択</CardTitle>
        <CardDescription>以下のオプションから選択してください</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          このカードには複数のアクションボタンがあります。ユーザーが選択できるオプションを提供します。
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">主要アクション</Button>
        <Button variant="outline" className="w-full">
          二次アクション
        </Button>
        <Button variant="ghost" className="w-full">
          キャンセル
        </Button>
      </CardFooter>
    </Card>
  ),
};

// カスタムスタイルのカード
export const CustomStyled: Story = {
  render: () => (
    <Card className="w-[350px] border-primary bg-primary/5">
      <CardHeader className="pb-0">
        <CardTitle className="text-primary text-xl">カスタムカード</CardTitle>
        <CardDescription className="text-primary/80">
          カスタムスタイルが適用されたカード
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-medium">
          カードのデザインはカスタマイズ可能です。ブランドカラーや特別なスタイルを適用できます。
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="default">詳細を見る</Button>
      </CardFooter>
    </Card>
  ),
}; 