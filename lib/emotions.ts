import type { EmotionInfo } from "@/app/_types";

export const emotions: EmotionInfo[] = [
	{
		id: 1,
		name: "喜び",
		iconPath: "/emoji-icons/joy.json",
		description: "嬉しい、楽しい",
	},
	{
		id: 2,
		name: "悲しみ",
		iconPath: "/emoji-icons/sad.json",
		description: "悲しい、落ち込み",
	},
	{
		id: 4,
		name: "驚き",
		iconPath: "/emoji-icons/surprised.json",
		description: "驚き、ショック",
	},
];

export function getEmotionById(
	id: number | undefined,
): EmotionInfo | undefined {
	if (!id) return undefined;
	return emotions.find((emotion) => emotion.id === id);
}

export function getAllEmotions(): EmotionInfo[] {
	return emotions;
}
