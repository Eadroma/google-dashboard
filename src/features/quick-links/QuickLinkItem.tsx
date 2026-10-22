import type { FC } from 'react';
import { getFaviconUrl, getHostname, normalizeUrl } from '@utils/url.utils';

interface QuickLinkItemProps {
  label: string;
  url: string;
  showLabel: boolean;
}

/**
 * Presentational single bookmark tile — favicon + label.
 *
 * @param props.label - User-defined display label
 * @param props.url - The URL to open on click
 * @param props.showLabel - Whether to render the text label
 */
export const QuickLinkItem: FC<QuickLinkItemProps> = ({ label, url, showLabel }) => {
  const normalized = normalizeUrl(url);
  const hostname = getHostname(normalized);
  const favicon = getFaviconUrl(normalized, 32);

  return (
    <a
      href={normalized}
      target="_blank"
      rel="noopener noreferrer"
      title={`${label} — ${hostname}`}
      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors group"
    >
      <div className="h-8 w-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
        <img
          src={favicon}
          alt=""
          width={20}
          height={20}
          className="object-contain"
          onError={(e) => {
            (e.currentTarget).style.display = 'none';
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-white/70 group-hover:text-white/90 truncate max-w-[60px] text-center transition-colors text-shadow-sm">
          {label}
        </span>
      )}
    </a>
  );
};
