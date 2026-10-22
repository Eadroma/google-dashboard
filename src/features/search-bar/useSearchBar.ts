import { useState, useCallback } from 'react';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import type { SearchBarConfig, SearchEngine } from './searchBar.types';

/** Defaults for a new Search Bar instance — also used by SearchBarSettings */
export const DEFAULT_CONFIG: SearchBarConfig = { engine: 'google', openInNewTab: false };

const SEARCH_URLS: Record<SearchEngine, string> = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
};

/** Return value of useSearchBar */
export interface UseSearchBarResult {
  query: string;
  setQuery: (q: string) => void;
  handleSearch: () => void;
  config: SearchBarConfig;
}

/**
 * Manages search bar state and handles query submission.
 *
 * @param instanceId - Widget instance UUID
 * @returns Query state, setter, submit handler, and config
 */
export function useSearchBar(instanceId: string): UseSearchBarResult {
  const config = useWidgetConfig<SearchBarConfig>(instanceId, DEFAULT_CONFIG);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const url = `${SEARCH_URLS[config.engine]}${encodeURIComponent(trimmed)}`;
    if (config.openInNewTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  }, [query, config]);

  return { query, setQuery, handleSearch, config };
}
