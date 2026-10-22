import { type FC, useState } from 'react';
import { Input } from '@components/ui/Input';
import { Select } from '@components/ui/Select';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetSettingsProps } from '@app-types/widget.types';
import type { GithubActivityConfig } from './githubActivity.types';
import { DEFAULT_CONFIG } from './useGithubActivity';

const COUNT_OPTIONS: { value: GithubActivityConfig['showCount']; label: string }[] = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
];

/**
 * Settings panel for the GitHub Activity widget.
 * Allows configuring the GitHub username and event count.
 *
 * @param props.instanceId - Widget instance being configured
 */
export const GithubActivitySettings: FC<WidgetSettingsProps> = ({ instanceId }) => {
  const config = useWidgetConfig<GithubActivityConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);
  const { t } = useTranslation();

  const [draft, setDraft] = useState(config.username);

  const commitUsername = () => {
    const trimmed = draft.trim();
    if (trimmed !== config.username) {
      updateSettings<GithubActivityConfig>(instanceId, { username: trimmed });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-white/60 uppercase tracking-wide">
          {t('githubUsername')}
        </label>
        <Input
          placeholder={t('githubUsernamePlaceholder')}
          value={draft}
          onChange={(e) => { setDraft(e.target.value); }}
          onBlur={commitUsername}
          onKeyDown={(e) => { if (e.key === 'Enter') commitUsername(); }}
        />
      </div>

      <Select<GithubActivityConfig['showCount']>
        label={t('githubShowCount')}
        value={config.showCount}
        options={COUNT_OPTIONS}
        onChange={(v) => { updateSettings<GithubActivityConfig>(instanceId, { showCount: v }); }}
      />
    </div>
  );
};
