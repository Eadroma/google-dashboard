import { useCallback } from 'react';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import type { QuickLink, QuickLinksConfig } from './quickLinks.types';

const DEFAULT_CONFIG: QuickLinksConfig = {
  links: [
    { id: '1', label: 'Gmail', url: 'https://mail.google.com' },
    { id: '2', label: 'Drive', url: 'https://drive.google.com' },
    { id: '3', label: 'Calendar', url: 'https://calendar.google.com' },
    { id: '4', label: 'GitHub', url: 'https://github.com' },
  ],
  showLabels: true,
};

/** Return value of useQuickLinks */
export interface UseQuickLinksResult {
  config: QuickLinksConfig;
  addLink: (link: Omit<QuickLink, 'id'>) => void;
  removeLink: (id: string) => void;
  /** Toggle whether text labels are shown below favicons */
  setShowLabels: (show: boolean) => void;
}

/**
 * Manages the Quick Links widget's bookmarks list.
 *
 * @param instanceId - Widget instance UUID
 */
export function useQuickLinks(instanceId: string): UseQuickLinksResult {
  const config = useWidgetConfig<QuickLinksConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);

  const addLink = useCallback(
    (link: Omit<QuickLink, 'id'>) => {
      updateSettings<QuickLinksConfig>(instanceId, {
        links: [...config.links, { ...link, id: crypto.randomUUID() }],
      });
    },
    [instanceId, config.links, updateSettings],
  );

  const removeLink = useCallback(
    (id: string) => {
      updateSettings<QuickLinksConfig>(instanceId, {
        links: config.links.filter((l) => l.id !== id),
      });
    },
    [instanceId, config.links, updateSettings],
  );

  const setShowLabels = useCallback(
    (show: boolean) => {
      updateSettings<QuickLinksConfig>(instanceId, { showLabels: show });
    },
    [instanceId, updateSettings],
  );

  return { config, addLink, removeLink, setShowLabels };
}
