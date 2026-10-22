import type { FC } from 'react';
import { Select } from '@components/ui/Select';
import { Switch } from '@components/ui/Switch';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetSettingsProps } from '@app-types/widget.types';
import type { SearchBarConfig, SearchEngine } from './searchBar.types';
import { DEFAULT_CONFIG } from './useSearchBar';

const ENGINE_OPTIONS: { value: SearchEngine; label: string }[] = [
  { value: 'google', label: 'Google' },
  { value: 'bing', label: 'Bing' },
  { value: 'duckduckgo', label: 'DuckDuckGo' },
];

/**
 * Settings panel for the Search Bar widget.
 *
 * @param props.instanceId - Widget instance being configured
 */
export const SearchBarSettings: FC<WidgetSettingsProps> = ({ instanceId }) => {
  const config = useWidgetConfig<SearchBarConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);

  const update = (patch: Partial<SearchBarConfig>) =>
    { updateSettings<SearchBarConfig>(instanceId, patch); };
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <Select<SearchEngine>
        label={t('searchEngineLabel')}
        value={config.engine}
        options={ENGINE_OPTIONS}
        onChange={(v) => { update({ engine: v }); }}
      />
      <Switch
        label={t('searchOpenNewTab')}
        checked={config.openInNewTab}
        onChange={(v) => { update({ openInNewTab: v }); }}
      />
    </div>
  );
};
