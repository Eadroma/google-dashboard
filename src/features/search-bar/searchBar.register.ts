import { registerWidget } from '@widgets/registry';
import { SearchBar } from './SearchBar.widget';
import { SearchBarSettings } from './SearchBarSettings';

registerWidget({
  meta: {
    id: 'search-bar',
    name: 'Search Bar',
    description: 'Google, Bing, or DuckDuckGo search with configurable engine',
    icon: 'Search',
    category: 'core',
    defaultSize: '4x1',
    minSize: '2x1',
  },
  Component: SearchBar,
  SettingsComponent: SearchBarSettings,
});
