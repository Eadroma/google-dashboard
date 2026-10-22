import { useState, useEffect } from 'react';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import type { GithubActivityConfig, GithubEvent, GithubRawEvent } from './githubActivity.types';

/** Defaults for a new GitHub Activity instance — also used by GithubActivitySettings */
export const DEFAULT_CONFIG: GithubActivityConfig = { username: '', showCount: '5' };

const EVENT_ICONS: Record<string, string> = {
  PushEvent: 'GitCommit',
  PullRequestEvent: 'GitPullRequest',
  IssuesEvent: 'CircleDot',
  CreateEvent: 'GitBranch',
  ForkEvent: 'GitFork',
  WatchEvent: 'Star',
};

function formatEvent(raw: GithubRawEvent): GithubEvent {
  const repo = raw.repo.name;
  switch (raw.type) {
    case 'PushEvent': {
      const n = raw.payload.size ?? raw.payload.commits?.length ?? 1;
      return { id: raw.id, icon: 'GitCommit', text: `Pushed ${n} commit${n > 1 ? 's' : ''} to ${repo}`, time: raw.created_at };
    }
    case 'PullRequestEvent': {
      const merged = raw.payload.pull_request?.merged ?? false;
      const action = merged ? 'Merged' : raw.payload.action === 'closed' ? 'Closed' : 'Opened';
      return { id: raw.id, icon: 'GitPullRequest', text: `${action} PR in ${repo}`, time: raw.created_at };
    }
    case 'IssuesEvent': {
      const action = raw.payload.action === 'opened' ? 'Opened' : 'Closed';
      return { id: raw.id, icon: 'CircleDot', text: `${action} issue in ${repo}`, time: raw.created_at };
    }
    case 'CreateEvent': {
      const refType = raw.payload.ref_type ?? 'branch';
      return { id: raw.id, icon: 'GitBranch', text: `Created ${refType} in ${repo}`, time: raw.created_at };
    }
    default:
      return { id: raw.id, icon: EVENT_ICONS[raw.type] ?? 'Activity', text: `Activity in ${repo}`, time: raw.created_at };
  }
}

// Unauthenticated GitHub API allows 60 requests/hour per IP; every new tab would spend one.
const CACHE_TTL_MS = 5 * 60_000;
const cacheKey = (username: string) => `gh:${username.toLowerCase()}`;

/**
 * Read cached raw events for a user if they are younger than CACHE_TTL_MS.
 * @param username - GitHub username
 * @param now - Current time in ms (injectable for tests)
 * @returns Cached events, or null when missing, stale or unreadable
 */
export function readCachedEvents(username: string, now = Date.now()): GithubRawEvent[] | null {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey(username)) ?? 'null') as { at: number; data: GithubRawEvent[] } | null;
    return cached && now - cached.at < CACHE_TTL_MS ? cached.data : null;
  } catch {
    return null;
  }
}

/**
 * Returns relative time string for a given ISO timestamp.
 * @param isoTime - ISO 8601 string from GitHub API
 */
function getRelativeTime(isoTime: string): string {
  const diffMs = Date.now() - new Date(isoTime).getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Return type of useGithubActivity */
export interface UseGithubActivityResult {
  events: GithubEvent[];
  loading: boolean;
  error: string | null;
  config: GithubActivityConfig;
  getRelativeTime: (isoTime: string) => string;
}

/**
 * Fetches and formats recent GitHub events for the configured username.
 *
 * @param instanceId - Widget instance UUID
 * @returns Events list, loading/error state, config, and time formatter
 */
export function useGithubActivity(instanceId: string): UseGithubActivityResult {
  const config = useWidgetConfig<GithubActivityConfig>(instanceId, DEFAULT_CONFIG);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = config.username.trim();
    if (!username) {
      setEvents([]);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const cached = readCachedEvents(username);
    const load = cached
      ? Promise.resolve(cached)
      : fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events?per_page=30`)
        .then((r) => {
          if (!r.ok) throw new Error(`GitHub API returned ${r.status}`);
          return r.json() as Promise<GithubRawEvent[]>;
        })
        .then((data) => {
          try {
            localStorage.setItem(cacheKey(username), JSON.stringify({ at: Date.now(), data }));
          } catch { /* storage full: still show the events, just uncached */ }
          return data;
        });

    load
      .then((data) => {
        if (cancelled) return;
        const count = parseInt(config.showCount, 10);
        setEvents(data.slice(0, count).map(formatEvent));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load events');
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [config.username, config.showCount]);

  return { events, loading, error, config, getRelativeTime };
}
