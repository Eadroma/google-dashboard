import { registerWidget } from '@widgets/registry';
import { QuickLinks } from './QuickLinks.widget';
import { QuickLinksSettings } from './QuickLinksSettings';

registerWidget({
  meta: {
    id: 'quick-links',
    name: 'Quick Links',
    description: 'Pinned URL shortcuts with favicons',
    icon: 'Link',
    category: 'core',
    defaultSize: '4x2',
    minSize: '2x1',
  },
  Component: QuickLinks,
  SettingsComponent: QuickLinksSettings,
});
