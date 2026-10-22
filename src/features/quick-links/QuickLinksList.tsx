import type { FC } from 'react';
import { QuickLinkItem } from './QuickLinkItem';
import type { QuickLink } from './quickLinks.types';

interface QuickLinksListProps {
  links: QuickLink[];
  showLabels: boolean;
}

/**
 * Presentational grid of QuickLinkItem tiles.
 *
 * @param props.links - Array of link entries to render
 * @param props.showLabels - Passed down to each tile
 */
export const QuickLinksList: FC<QuickLinksListProps> = ({ links, showLabels }) => {
  if (links.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-white/30 p-4">
        No links yet. Open settings to add some.
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-4 gap-1 p-3 h-full content-start overflow-auto"
    >
      {links.map((link) => (
        <QuickLinkItem
          key={link.id}
          label={link.label}
          url={link.url}
          showLabel={showLabels}
        />
      ))}
    </div>
  );
};
