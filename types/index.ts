// 日記エントリーの型定義
export interface DiaryEntry {
  id: string;
  userId: string;
  entryDate: Date;
  content?: string;
  contentMarkdown?: string;
  emotionStampId?: number;
  createdAt: Date;
  updatedAt: Date;
}

// タグの型定義
export interface Tag {
  id: string;
  userId: string;
  name: string;
  color: string;
  createdAt: Date;
}

// 日記とタグの関連付け
export interface DiaryTag {
  entryId: string;
  tagId: string;
}

// 感情スタンプの型定義
export interface EmotionInfo {
  id: number;
  name: string;
  iconPath: string;
  description?: string;
} 