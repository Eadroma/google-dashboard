import { registerWidget } from '@widgets/registry';
import { Clock } from './Clock.widget';
import { ClockSettings } from './ClockSettings';

/**
 * Self-registration for the Clock widget.
 * This file is imported by src/widgets/index.ts as a side effect.
 */
registerWidget({
  meta: {
    id: 'clock',
    name: 'Clock',
    description: 'Live time with configurable format, timezone, and date display',
    icon: 'Clock',
    category: 'core',
    defaultSize: '2x2',
    minSize: '1x1',
  },
  Component: Clock,
  SettingsComponent: ClockSettings,
});
