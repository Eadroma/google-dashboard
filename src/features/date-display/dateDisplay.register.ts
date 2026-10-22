import { registerWidget } from '@widgets/registry';
import { DateDisplay } from './DateDisplay.widget';
import { DateDisplaySettings } from './DateDisplaySettings';

registerWidget({
  meta: {
    id: 'date-display',
    name: 'Date',
    description: 'Shows today\'s full date with optional week number and day-of-year',
    icon: 'Calendar',
    category: 'core',
    defaultSize: '2x1',
    minSize: '1x1',
  },
  Component: DateDisplay,
  SettingsComponent: DateDisplaySettings,
});
