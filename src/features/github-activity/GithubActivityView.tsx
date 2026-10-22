import type { FC } from 'react';
import { Icon } from '@components/ui/Icon';
import { Spinner } from '@components/ui/Spinner';
import type { GithubEvent } from './githubActivity.types';

interface GithubActivityViewProps {
  username: string;
  events: GithubEvent[];
  loading: boolean;
  error: string | null;
  loadingLabel: string;
  errorLabel: string;
  emptyLabel: string;
  noUsernameLabel: string;
  getRelativeTime: (isoTime: string) => string;
}

/**
 * Presentational GitHub Activity widget — renders an event feed.
 */
export const GithubActivityView: FC<GithubActivityViewProps> = ({
  username,
  events,
  loading,
  error,
  loadingLabel,
  errorLabel,
  emptyLabel,
  noUsernameLabel,
  getRelativeTime,
}) => {
  return (
    <div className="flex flex-col h-full p-3 gap-2 min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2 shrink-0">
        <Icon name="Github" size={14} className="text-white/60" />
        <span className="text-xs font-semibold text-white/60 uppercase tracking-wide text-shadow-sm truncate">
          {username || 'GitHub Activity'}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
        {!username && (
          <p className="text-sm text-white/40 text-center py-6 text-shadow-sm">{noUsernameLabel}</p>
        )}
        {username && loading && (
          <div className="flex items-center justify-center py-6">
            <Spinner size={18} className="text-white/40" />
            <span className="ml-2 text-sm text-white/40 text-shadow-sm">{loadingLabel}</span>
          </div>
        )}
        {username && !loading && error && (
          <div className="flex items-center gap-2 py-6 justify-center">
            <Icon name="AlertCircle" size={14} className="text-red-400/80 shrink-0" />
            <p className="text-sm text-red-400/80 text-shadow-sm">{errorLabel}</p>
          </div>
        )}
        {username && !loading && !error && events.length === 0 && (
          <p className="text-sm text-white/40 text-center py-6 text-shadow-sm">{emptyLabel}</p>
        )}
        {username && !loading && !error && events.length > 0 && (
          <ul className="space-y-2">
            {events.map((event) => (
              <li key={event.id} className="flex items-start gap-2.5">
                <Icon
                  name={event.icon}
                  size={13}
                  className="text-white/50 mt-0.5 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/80 leading-snug text-shadow-sm break-words">{event.text}</p>
                  <p className="text-xs text-white/35 mt-0.5 text-shadow-sm">{getRelativeTime(event.time)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
