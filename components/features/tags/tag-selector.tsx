'use client';

import { useState } from 'react';
import { Tag } from '@/types';
import { cn } from '@/lib/utils';
import { TagBadge } from './tag-badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TagSelectorProps {
  allTags: Tag[];
  selectedTags: Tag[];
  onTagSelect: (tagId: string) => void;
  className?: string;
  maxHeight?: number | string;
}

/**
 * タグセレクターコンポーネント
 * 
 * @param {TagSelectorProps} props - タグセレクターのプロパティ
 */
export function TagSelector({
  allTags,
  selectedTags,
  onTagSelect,
  className,
  maxHeight = 200,
}: TagSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTags = allTags.filter((tag) => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedTagIds = new Set(selectedTags.map(tag => tag.id));
  
  return (
    <div className={cn("space-y-2", className)}>
      <Input
        type="text"
        placeholder="タグを検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />
      
      <ScrollArea className="w-full" style={{ maxHeight }}>
        <div className="space-y-1 p-1">
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 transition-colors",
                selectedTagIds.has(tag.id)
                  ? "bg-muted/60"
                  : "hover:bg-muted/40"
              )}
              onClick={() => onTagSelect(tag.id)}
            >
              <TagBadge tag={tag} />
              {selectedTagIds.has(tag.id) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 