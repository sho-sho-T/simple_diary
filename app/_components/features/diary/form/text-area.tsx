'use client';

import { useCallback, useRef } from 'react';
import { Textarea } from '@/app/_components/ui/textarea';
import { cn } from '@/lib/utils';
import { DIARY_CONTENT_LIMITS } from '@/types/diary/validation';
import { DiaryTextAreaProps } from '@/types/diary/form';

export const DiaryTextArea = ({
  currentLength,
  maxLength = DIARY_CONTENT_LIMITS.MAX_LENGTH,
  error,
  disabled,
  ...props
}: DiaryTextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 入力時に文字数制限を超えないようにする
  const handleBeforeInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      const currentValue = textareaRef.current.value;
      // InputEventのデータプロパティを使用して、追加される文字列を取得
      const inputEvent = e.nativeEvent as InputEvent;
      const newValue = currentValue + (inputEvent.data || '');
      
      if (newValue.length > maxLength) {
        e.preventDefault();
      }
    }
  }, [maxLength]);

  // ペースト時に文字数制限を超えないようにする
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      const currentValue = textareaRef.current.value;
      const pastedText = e.clipboardData.getData('text');
      const newValue = currentValue + pastedText;
      
      if (newValue.length > maxLength) {
        e.preventDefault();
      }
    }
  }, [maxLength]);

  return (
    <Textarea
      ref={textareaRef}
      className={cn(
        'min-h-[120px] resize-none',
        error && 'border-red-500 focus-visible:ring-red-500',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onBeforeInput={handleBeforeInput}
      onPaste={handlePaste}
      aria-invalid={!!error}
      aria-errormessage={error}
      disabled={disabled}
      {...props}
    />
  );
}; 