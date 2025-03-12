import { cn } from '@/lib/utils';
import { Tag } from '@/types';

interface TagBadgeProps {
  tag: Tag;
  className?: string;
  onClick?: () => void;
}

/**
 * タグバッジコンポーネント
 * 
 * @param {TagBadgeProps} props - タグバッジのプロパティ
 */
export function TagBadge({ tag, className, onClick }: TagBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
      style={{ 
        backgroundColor: `${tag.color}20`, // 20% opacity
        color: tag.color,
        borderColor: `${tag.color}40`,  // 40% opacity
        borderWidth: '1px',
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {tag.name}
    </div>
  );
} 