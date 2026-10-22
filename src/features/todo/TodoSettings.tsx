import type { FC } from 'react';
import { Switch } from '@components/ui/Switch';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import type { WidgetSettingsProps } from '@app-types/widget.types';
import type { TodoConfig } from './todo.types';
import { DEFAULT_CONFIG } from './useTodo';

/**
 * Settings panel for the Todo widget.
 *
 * @param props.instanceId - Widget instance being configured
 */
export const TodoSettings: FC<WidgetSettingsProps> = ({ instanceId }) => {
  const config = useWidgetConfig<TodoConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);

  return (
    <Switch
      label="Show completed tasks"
      checked={config.showCompleted}
      onChange={(v) =>
        { updateSettings<TodoConfig>(instanceId, { showCompleted: v }); }
      }
    />
  );
};
