/**
 * Build a Google S2 favicon URL for a given site URL.
 * Falls back gracefully if the URL is invalid.
 *
 * @param siteUrl - The URL of the site whose favicon is needed
 * @param size - Icon size in pixels (default 32)
 * @returns Favicon image URL string
 */
export function getFaviconUrl(siteUrl: string, size = 32): string {
  try {
    const { hostname } = new URL(siteUrl);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${siteUrl}&sz=${size}`;
  }
}

/**
 * Extract the human-readable hostname from a URL string.
 * Returns the raw input if parsing fails.
 *
 * @param url - The URL string to parse
 * @returns Hostname, e.g. "github.com"
 */
export function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * Ensure a URL string has a protocol prefix.
 * Prepends "https://" if the string has none.
 *
 * @param url - Raw URL potentially missing a protocol
 * @returns URL with protocol, e.g. "https://example.com"
 */
export function normalizeUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}
