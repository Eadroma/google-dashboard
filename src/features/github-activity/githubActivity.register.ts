import { registerWidget } from '@widgets/registry';
import { GithubActivity } from './GithubActivity.widget';
import { GithubActivitySettings } from './GithubActivitySettings';

registerWidget({
  meta: {
    id: 'github-activity',
    name: 'GitHub Activity',
    description: "Recent commits, PRs and issues for any GitHub user — no API key required",
    icon: 'Github',
    category: 'info',
    defaultSize: '2x3',
    minSize: '2x2',
  },
  Component: GithubActivity,
  SettingsComponent: GithubActivitySettings,
});
