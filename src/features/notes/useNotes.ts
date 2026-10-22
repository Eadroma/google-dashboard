import { useCallback } from 'react';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import type { NotesConfig } from './notes.types';

const DEFAULT_CONFIG: NotesConfig = { content: '' };

/** Return value of useNotes */
export interface UseNotesResult {
  content: string;
  setContent: (text: string) => void;
}

/**
 * Manages the Notes widget state — every edit is saved immediately.
 *
 * @param instanceId - Widget instance UUID
 */
export function useNotes(instanceId: string): UseNotesResult {
  const config = useWidgetConfig<NotesConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);

  const setContent = useCallback(
    (text: string) => {
      updateSettings<NotesConfig>(instanceId, { content: text });
    },
    [instanceId, updateSettings],
  );

  return { content: config.content, setContent };
}
