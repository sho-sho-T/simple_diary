'use client';

import { DiaryFormProps } from '@/types/diary/form';
import { SelectSingleEventHandler } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { DiaryTextArea } from './text-area';
import { CharacterCounter } from './character-counter';
import { DatePicker } from './date-picker';

type DiaryFormPresentationProps = {
  formId: string;
  fields: {
    content: {
      value?: string;
      errors?: string[];
    };
    entryDate: {
      value?: string;
      errors?: string[];
    };
  };
  formErrors?: string[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDateSelect: SelectSingleEventHandler;
  isSubmitting: boolean;
};

export const DiaryFormPresentation = ({
  formId,
  fields,
  formErrors,
  onSubmit,
  onDateSelect,
  isSubmitting,
}: DiaryFormPresentationProps) => {
  return (
    <form
      id={formId}
      className="space-y-4"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="space-y-2">
        <DatePicker
          selected={fields.entryDate.value ? new Date(fields.entryDate.value) : undefined}
          onSelect={onDateSelect}
          error={fields.entryDate.errors?.join(', ')}
          disabled={isSubmitting}
        />
        {fields.entryDate.errors && fields.entryDate.errors.length > 0 && (
          <p className="text-sm text-red-500" role="alert">
            {fields.entryDate.errors.join(', ')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <DiaryTextArea
          name="content"
          value={fields.content.value}
          maxLength={2000}
          currentLength={fields.content.value?.length || 0}
          error={fields.content.errors?.join(', ')}
          disabled={isSubmitting}
          placeholder="今日の出来事を書いてみましょう"
        />
        <div className="flex justify-between items-center">
          <CharacterCounter
            current={fields.content.value?.length || 0}
            max={2000}
          />
          {fields.content.errors && fields.content.errors.length > 0 && (
            <p className="text-sm text-red-500" role="alert">
              {fields.content.errors.join(', ')}
            </p>
          )}
        </div>
      </div>

      {formErrors && formErrors.length > 0 && (
        <p className="text-sm text-red-500" role="alert">
          {formErrors.join(', ')}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? '保存中...' : '保存する'}
      </Button>
    </form>
  );
}; 