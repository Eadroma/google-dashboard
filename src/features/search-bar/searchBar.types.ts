/** Supported search engine options */
export type SearchEngine = 'google' | 'bing' | 'duckduckgo';

/** Persisted configuration for the Search Bar widget */
export interface SearchBarConfig {
  engine: SearchEngine;
  /** Open results in a new tab when true */
  openInNewTab: boolean;
}
