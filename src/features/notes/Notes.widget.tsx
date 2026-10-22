import type { FC } from 'react';
import { useNotes } from './useNotes';
import { NotesEditor } from './NotesEditor';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetProps } from '@app-types/widget.types';

/**
 * Notes widget container.
 *
 * @param props.instanceId - Widget instance UUID
 */
export const Notes: FC<WidgetProps> = ({ instanceId }) => {
  const { content, setContent } = useNotes(instanceId);
  const { t } = useTranslation();
  return <NotesEditor content={content} placeholder={t('notesPlaceholder')} onChange={setContent} />;
};
