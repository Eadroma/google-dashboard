import type { FC } from 'react';
import { Switch } from '@components/ui/Switch';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetSettingsProps } from '@app-types/widget.types';
import type { DateDisplayConfig } from './dateDisplay.types';
import { DEFAULT_CONFIG } from './useDateDisplay';

/**
 * Settings panel for the Date Display widget.
 *
 * @param props.instanceId - The widget instance being configured
 */
export const DateDisplaySettings: FC<WidgetSettingsProps> = ({ instanceId }) => {
  const config = useWidgetConfig<DateDisplayConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);

  const update = (patch: Partial<DateDisplayConfig>) =>
    { updateSettings<DateDisplayConfig>(instanceId, patch); };
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <Switch label={t('dateShowWeekNumber')} checked={config.showWeekNumber} onChange={(v) => { update({ showWeekNumber: v }); }} />
      <Switch label={t('dateShowDayOfYear')} checked={config.showDayOfYear} onChange={(v) => { update({ showDayOfYear: v }); }} />
    </div>
  );
};
