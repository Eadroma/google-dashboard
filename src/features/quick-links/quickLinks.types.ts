/** A single bookmarked link */
export interface QuickLink {
  id: string;
  label: string;
  url: string;
}

/** Persisted configuration for the Quick Links widget */
export interface QuickLinksConfig {
  links: QuickLink[];
  /** Whether to show the text label below each favicon */
  showLabels: boolean;
}
