import { useGithubActivity } from './useGithubActivity';
import { GithubActivityView } from './GithubActivityView';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetProps } from '@app-types/widget.types';

/**
 * GitHub Activity widget container.
 * Delegates data fetching to useGithubActivity and rendering to GithubActivityView.
 *
 * @param props.instanceId - Widget instance UUID
 */
export function GithubActivity({ instanceId }: WidgetProps) {
  const { events, loading, error, config, getRelativeTime } = useGithubActivity(instanceId);
  const { t } = useTranslation();

  return (
    <GithubActivityView
      username={config.username}
      events={events}
      loading={loading}
      error={error}
      loadingLabel={t('githubLoading')}
      errorLabel={t('githubError')}
      emptyLabel={t('githubEmpty')}
      noUsernameLabel={t('githubNoUsername')}
      getRelativeTime={getRelativeTime}
    />
  );
}
