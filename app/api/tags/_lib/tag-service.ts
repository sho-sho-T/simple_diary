import "server-only";
import type { Tag } from "@prisma/client";
import { prisma } from "../../../../prisma";

/**
 * ユーザーのすべてのタグを取得する
 */
export async function getAllTags(userId: string): Promise<Tag[]> {
	return prisma.tag.findMany({
		where: {
			userId,
		},
		orderBy: {
			name: "asc",
		},
	});
}

/**
 * IDによるタグの取得
 */
export async function getTagById(
	userId: string,
	id: string,
): Promise<Tag | null> {
	return prisma.tag.findFirst({
		where: {
			id,
			userId,
		},
	});
}

/**
 * 新しいタグを作成する
 */
export async function createTag(
	userId: string,
	data: {
		name: string;
		color: string;
	},
): Promise<Tag> {
	try {
		return await prisma.tag.create({
			data: {
				...data,
				userId,
			},
		});
	} catch (error: unknown) {
		// Prismaのユニーク制約違反エラーをキャッチ
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			error.code === "P2002"
		) {
			throw new Error(`タグ名「${data.name}」は既に使用されています`);
		}
		throw error;
	}
}

/**
 * タグを更新する
 */
export async function updateTag(
	userId: string,
	id: string,
	data: {
		name?: string;
		color?: string;
	},
): Promise<Tag> {
	// タグの存在と所有権の確認
	const tag = await prisma.tag.findFirst({
		where: {
			id,
			userId,
		},
	});

	if (!tag) {
		throw new Error("更新対象のタグが見つかりません");
	}

	try {
		return await prisma.tag.update({
			where: {
				id,
			},
			data,
		});
	} catch (error: unknown) {
		// Prismaのユニーク制約違反エラーをキャッチ
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			error.code === "P2002"
		) {
			throw new Error(`タグ名「${data.name}」は既に使用されています`);
		}
		throw error;
	}
}

/**
 * タグの使用状況を確認する
 */
export async function isTagInUse(tagId: string): Promise<boolean> {
	const count = await prisma.diaryTag.count({
		where: {
			tagId,
		},
	});

	return count > 0;
}

/**
 * タグを削除する（使用中でない場合のみ）
 */
export async function deleteTag(userId: string, id: string): Promise<Tag> {
	// タグの存在と所有権の確認
	const tag = await prisma.tag.findFirst({
		where: {
			id,
			userId,
		},
	});

	if (!tag) {
		throw new Error("削除対象のタグが見つかりません");
	}

	// タグが使用中かチェック
	const inUse = await isTagInUse(id);
	if (inUse) {
		throw new Error(
			"このタグは日記エントリーで使用されているため削除できません",
		);
	}

	// 使用されていなければ削除
	return prisma.tag.delete({
		where: {
			id,
		},
	});
}
