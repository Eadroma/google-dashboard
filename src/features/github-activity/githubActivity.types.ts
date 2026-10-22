/** Config stored per GitHub Activity widget instance */
export interface GithubActivityConfig {
  /** GitHub username whose events to display */
  username: string;
  /** Number of events to display — stored as a string for Select<string> compatibility */
  showCount: '5' | '10' | '15' | '20';
}

/** Formatted event ready for display */
export interface GithubEvent {
  id: string;
  /** Lucide icon name representing the event type */
  icon: string;
  /** Human-readable description, e.g. "Pushed 2 commits to owner/repo" */
  text: string;
  /** ISO 8601 timestamp from the GitHub API */
  time: string;
}

/** Raw event shape returned by the GitHub Events API (fields we care about) */
export interface GithubRawEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    size?: number;
    commits?: Array<{ message: string }>;
    action?: string;
    merged?: boolean;
    pull_request?: { title: string; merged: boolean };
    issue?: { title: string };
    ref_type?: string;
    ref?: string;
  };
  created_at: string;
}
