import type { FC } from 'react';
import { Switch } from '@components/ui/Switch';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetSettingsProps } from '@app-types/widget.types';
import type { ClockConfig } from './clock.types';
import { DEFAULT_CONFIG } from './useClockLogic';

/**
 * Settings panel for the Clock widget.
 * Renders toggle controls for each ClockConfig option.
 *
 * @param props.instanceId - The widget instance being configured
 * @param props.onClose - Called when the user is done with settings
 */
export const ClockSettings: FC<WidgetSettingsProps> = ({ instanceId }) => {
  const config = useWidgetConfig<ClockConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);
  const { t } = useTranslation();

  const update = (patch: Partial<ClockConfig>) => {
    updateSettings<ClockConfig>(instanceId, patch);
  };

  return (
    <div className="space-y-5">
      <Switch label={t('clockShowSeconds')} checked={config.showSeconds} onChange={(v) => { update({ showSeconds: v }); }} />
      <Switch label={t('clockUse24h')} checked={config.use24h} onChange={(v) => { update({ use24h: v }); }} />
      <Switch label={t('clockShowDate')} checked={config.showDate} onChange={(v) => { update({ showDate: v }); }} />
    </div>
  );
};
