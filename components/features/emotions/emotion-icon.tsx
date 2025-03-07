'use client';

import { LottieAnimation } from '@/components/ui/lottie-animation';
import { getEmotionById } from '@/lib/emotions';

interface EmotionIconProps {
  emotionId: number | undefined;
  size?: number;
  className?: string;
}

/**
 * 感情アイコンコンポーネント
 * 
 * @param {EmotionIconProps} props - 感情アイコンのプロパティ
 */
export function EmotionIcon({ emotionId, size = 40, className }: EmotionIconProps) {
  const emotion = getEmotionById(emotionId);
  
  if (!emotion) {
    return null;
  }
  
  return (
    <LottieAnimation
      animationPath={emotion.iconPath}
      width={size}
      height={size}
      className={className}
    />
  );
} 