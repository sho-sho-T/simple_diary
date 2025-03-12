'use client';

import { useId } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { SelectSingleEventHandler } from 'react-day-picker';
import { DiaryFormProps } from '@/types/diary/form';
import { diaryFormSchema } from '@/types/diary/validation';
import { DiaryFormPresentation } from './presentation';

export const DiaryFormContainer = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}: DiaryFormProps) => {
  const formId = useId();

  const [form, fields] = useForm({
    id: formId,
    shouldValidate: 'onBlur',
    onSubmit: async (event) => {
      const formData = new FormData(event.currentTarget);
      const submission = parseWithZod(formData, { schema: diaryFormSchema });
      
      if (submission.status !== 'success') {
        return submission;
      }

      try {
        const response = await fetch('/api/diary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission.value),
        });

        const data = await response.json();

        if (!response.ok) {
          return {
            status: 'error' as const,
            error: {
              _form: [data.message || '日記の保存に失敗しました'],
            },
          };
        }

        await onSubmit?.(submission.value);
        return { status: 'success' as const };
      } catch (error) {
        console.error('Failed to save diary entry:', error);
        return {
          status: 'error' as const,
          error: {
            _form: ['日記の保存に失敗しました'],
          },
        };
      }
    },
    defaultValue: initialData && {
      content: initialData.content || '',
      entryDate: initialData.entryDate.toISOString().split('T')[0],
    },
  });

  const handleDateSelect: SelectSingleEventHandler = (date, selected, activeModifiers, e) => {
    const formElement = document.getElementById(formId) as HTMLFormElement;
    if (formElement) {
      const input = formElement.elements.namedItem('entryDate') as HTMLInputElement;
      if (input) {
        input.value = date ? date.toISOString().split('T')[0] : '';
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <DiaryFormPresentation
      formId={formId}
      fields={fields}
      formErrors={form.errors}
      onSubmit={form.onSubmit}
      onDateSelect={handleDateSelect}
      isSubmitting={isSubmitting}
    />
  );
}; 