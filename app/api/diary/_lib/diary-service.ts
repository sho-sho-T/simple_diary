import "server-only";
import type { DiaryEntry } from "@prisma/client";
import { prisma } from "../../../../prisma";

// 日記エントリー取得用の拡張型（タグ情報を含む）
export type DiaryEntryWithTags = DiaryEntry & {
	tags: {
		tag: {
			id: string;
			userId: string;
			name: string;
			color: string;
		};
	}[];
};

/**
 * 全ての日記エントリーを取得する
 */
export async function getAllDiaryEntries(
	userId: string,
	limit = 10,
	page = 1,
): Promise<DiaryEntryWithTags[]> {
	const skip = (page - 1) * limit;

	return prisma.diaryEntry.findMany({
		where: {
			userId,
		},
		include: {
			tags: {
				include: {
					tag: {
						select: {
							id: true,
							userId: true,
							name: true,
							color: true,
						},
					},
				},
			},
		},
		orderBy: {
			entryDate: "desc",
		},
		skip,
		take: limit,
	});
}

/**
 * 指定した日付の日記エントリーを取得する
 */
export async function getDiaryEntryByDate(
	userId: string,
	date: Date,
): Promise<DiaryEntryWithTags | null> {
	// 日付部分だけ比較するために日付の開始と終了を計算
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	return prisma.diaryEntry.findFirst({
		where: {
			userId,
			entryDate: {
				gte: startOfDay,
				lte: endOfDay,
			},
		},
		include: {
			tags: {
				include: {
					tag: {
						select: {
							id: true,
							userId: true,
							name: true,
							color: true,
						},
					},
				},
			},
		},
	});
}

/**
 * 日記エントリーをIDで取得する
 */
export async function getDiaryEntryById(
	userId: string,
	id: string,
): Promise<DiaryEntryWithTags | null> {
	return prisma.diaryEntry.findFirst({
		where: {
			id,
			userId,
		},
		include: {
			tags: {
				include: {
					tag: {
						select: {
							id: true,
							userId: true,
							name: true,
							color: true,
						},
					},
				},
			},
		},
	});
}

/**
 * 新しい日記エントリーを作成する
 */
export async function createDiaryEntry(
	userId: string,
	data: {
		entryDate: Date;
		content?: string;
		emotionStampId?: number;
		tagIds?: string[];
	},
): Promise<DiaryEntry> {
	const { tagIds, ...entryData } = data;

	return prisma.$transaction(async (tx) => {
		// 既存のエントリーがあるか確認（同じ日付で）
		const existingEntry = await tx.diaryEntry.findFirst({
			where: {
				userId,
				entryDate: data.entryDate,
			},
		});

		if (existingEntry) {
			throw new Error(
				`該当日(${data.entryDate.toISOString().split("T")[0]})の日記エントリーは既に存在します`,
			);
		}

		// 新しいエントリーを作成
		const newEntry = await tx.diaryEntry.create({
			data: {
				...entryData,
				userId,
			},
		});

		// タグがあれば関連付け
		if (tagIds && tagIds.length > 0) {
			await Promise.all(
				tagIds.map((tagId) =>
					tx.diaryTag.create({
						data: {
							entryId: newEntry.id,
							tagId,
						},
					}),
				),
			);
		}

		return newEntry;
	});
}

/**
 * 日記エントリーを更新する
 */
export async function updateDiaryEntry(
	userId: string,
	id: string,
	data: {
		content?: string;
		emotionStampId?: number;
		tagIds?: string[];
	},
): Promise<DiaryEntry> {
	const { tagIds, ...updateData } = data;

	return prisma.$transaction(async (tx) => {
		// エントリーの存在確認
		const existingEntry = await tx.diaryEntry.findFirst({
			where: {
				id,
				userId,
			},
		});

		if (!existingEntry) {
			throw new Error("更新対象の日記エントリーが見つかりません");
		}

		// エントリーを更新
		const updatedEntry = await tx.diaryEntry.update({
			where: {
				id,
			},
			data: updateData,
		});

		// タグの関連付けを更新
		if (tagIds !== undefined) {
			// 既存のタグ関連をすべて削除
			await tx.diaryTag.deleteMany({
				where: {
					entryId: id,
				},
			});

			// 新しいタグ関連を作成
			if (tagIds.length > 0) {
				await Promise.all(
					tagIds.map((tagId) =>
						tx.diaryTag.create({
							data: {
								entryId: id,
								tagId,
							},
						}),
					),
				);
			}
		}

		return updatedEntry;
	});
}

/**
 * 日記エントリーを削除する
 */
export async function deleteDiaryEntry(
	userId: string,
	id: string,
): Promise<DiaryEntry> {
	// エントリーの存在と所有権を確認
	const entry = await prisma.diaryEntry.findFirst({
		where: {
			id,
			userId,
		},
	});

	if (!entry) {
		throw new Error("削除対象の日記エントリーが見つかりません");
	}

	// トランザクション内で削除（関連するタグ関連付けはカスケード削除される）
	return prisma.diaryEntry.delete({
		where: {
			id,
		},
	});
}

/**
 * 過去の同じ日付の日記エントリーを取得する
 */
export async function getSimilarDateEntries(
	userId: string,
	date: Date,
	limit = 5,
): Promise<DiaryEntryWithTags[]> {
	const month = date.getMonth() + 1; // 0-indexedなので+1
	const day = date.getDate();

	// 月と日が同じエントリーを取得（年は異なる）
	const entries = await prisma.diaryEntry.findMany({
		where: {
			userId,
			AND: [
				{
					entryDate: {
						lt: date, // 指定日より過去のエントリーのみ
					},
				},
				{
					entryDate: {
						// 同じ月と日のエントリー
						// PostgreSQLでの日付抽出方法
						// EXTRACT(MONTH FROM "entryDate") = {month} AND EXTRACT(DAY FROM "entryDate") = {day}
						equals: undefined, // この行は実際のSQLクエリでは使用されない（プレースホルダ）
					},
				},
			],
		},
		include: {
			tags: {
				include: {
					tag: {
						select: {
							id: true,
							userId: true,
							name: true,
							color: true,
						},
					},
				},
			},
		},
		orderBy: {
			entryDate: "desc",
		},
		take: limit,
	});

	// Prismaのネイティブフィルタリングでは月と日の抽出がサポートされていないため
	// アプリケーションレベルでフィルタリング
	return entries.filter((entry) => {
		const entryMonth = entry.entryDate.getMonth() + 1;
		const entryDay = entry.entryDate.getDate();
		return entryMonth === month && entryDay === day;
	});
}
