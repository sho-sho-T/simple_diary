'use client';

import { emotions } from '@/lib/emotions';
import { EmotionIcon } from './emotion-icon';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface EmotionSelectorProps {
  selectedEmotionId?: number;
  onSelect: (emotionId: number) => void;
  className?: string;
}

/**
 * 感情セレクターコンポーネント
 * 
 * @param {EmotionSelectorProps} props - 感情セレクターのプロパティ
 */
export function EmotionSelector({ selectedEmotionId, onSelect, className }: EmotionSelectorProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-3", className)}>
      <TooltipProvider>
        {emotions.map((emotion) => (
          <Tooltip key={emotion.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-12 w-12 rounded-full",
                  selectedEmotionId === emotion.id && "ring-2 ring-primary"
                )}
                onClick={() => onSelect(emotion.id)}
              >
                <EmotionIcon emotionId={emotion.id} size={30} />
                <span className="sr-only">{emotion.name}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{emotion.name}</p>
              {emotion.description && (
                <p className="text-xs text-muted-foreground">{emotion.description}</p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
} 