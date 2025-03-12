import { cn } from '@/lib/utils';

interface DiaryContentPreviewProps {
  content?: string;
  maxLength?: number;
  className?: string;
}

/**
 * 日記コンテンツプレビューコンポーネント
 * 
 * @param {DiaryContentPreviewProps} props - 日記コンテンツプレビューのプロパティ
 */
export function DiaryContentPreview({ 
  content, 
  maxLength = 150, 
  className 
}: DiaryContentPreviewProps) {
  if (!content) {
    return (
      <p className={cn("text-muted-foreground italic", className)}>
        内容がありません
      </p>
    );
  }

  // 改行やマークダウン記号を除去して純粋なテキストにする
  const plainText = content
    .replace(/#+\s/g, '') // 見出し記号を除去
    .replace(/\*\*/g, '') // 太字記号を除去
    .replace(/\*/g, '')   // 斜体記号を除去
    .replace(/~~~/g, '')  // コードブロック記号を除去
    .replace(/`/g, '')    // インラインコード記号を除去
    .replace(/\n/g, ' '); // 改行を空白に置換

  // 長さを制限して省略記号を追加
  const shouldTruncate = plainText.length > maxLength;
  const truncatedText = shouldTruncate 
    ? plainText.substring(0, maxLength).trim() + '...'
    : plainText;

  return (
    <p className={cn("text-sm text-foreground/90", className)}>
      {truncatedText}
    </p>
  );
} 