import { DiaryForm } from "@/app/_components/containers/diary/form";
import { DiaryFormPresentation } from "@/app/_components/containers/diary/form/presentation";
import type { DiaryFormData } from "@/app/_types/diary/form";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * 日記フォームのコンテナコンポーネント
 */
const meta = {
	title: "Features/Diary/Form",
	component: DiaryForm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DiaryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: DiaryFormData = {
	content: "今日は良い天気でした。",
	entryDate: new Date("2024-03-20"),
};

/**
 * デフォルトの表示
 */
export const Default: Story = {
	args: {
		onSubmit: async (data) => {
			console.log("Form submitted:", data);
		},
	},
};

/**
 * 初期データがある場合
 */
export const WithInitialData: Story = {
	args: {
		initialData: sampleData,
		onSubmit: async (data) => {
			console.log("Form submitted:", data);
		},
	},
};

/**
 * 送信中の表示
 */
export const Submitting: Story = {
	args: {
		onSubmit: async (data) => {
			console.log("Form submitted:", data);
		},
		isSubmitting: true,
	},
};

/**
 * プレゼンテーショナルコンポーネント
 */
const presentationMeta = {
	title: "Features/Diary/Form/Presentation",
	component: DiaryFormPresentation,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DiaryFormPresentation>;

type PresentationStory = StoryObj<typeof presentationMeta>;

/**
 * プレゼンテーショナルコンポーネントのデフォルト表示
 */
export const Presentation: PresentationStory = {
	args: {
		formId: "diary-form",
		fields: {
			content: {
				value: "今日は良い天気でした。",
				errors: undefined,
			},
			entryDate: {
				value: "2024-03-20",
				errors: undefined,
			},
		},
		formErrors: undefined,
		onSubmit: (e) => {
			e.preventDefault();
			console.log("Form submitted");
		},
		onDateSelect: (date) => {
			console.log("Date selected:", date);
		},
		isSubmitting: false,
	},
};

/**
 * エラー表示
 */
export const WithErrors: PresentationStory = {
	args: {
		formId: "diary-form",
		fields: {
			content: {
				value: "",
				errors: ["コンテンツを入力してください"],
			},
			entryDate: {
				value: "",
				errors: ["日付を選択してください"],
			},
		},
		formErrors: ["フォームの送信に失敗しました"],
		onSubmit: (e) => {
			e.preventDefault();
			console.log("Form submitted");
		},
		onDateSelect: (date) => {
			console.log("Date selected:", date);
		},
		isSubmitting: false,
	},
};

/**
 * 送信中の表示（プレゼンテーショナル）
 */
export const PresentationSubmitting: PresentationStory = {
	args: {
		formId: "diary-form",
		fields: {
			content: {
				value: "今日は良い天気でした。",
				errors: undefined,
			},
			entryDate: {
				value: "2024-03-20",
				errors: undefined,
			},
		},
		formErrors: undefined,
		onSubmit: (e) => {
			e.preventDefault();
			console.log("Form submitted");
		},
		onDateSelect: (date) => {
			console.log("Date selected:", date);
		},
		isSubmitting: true,
	},
};
