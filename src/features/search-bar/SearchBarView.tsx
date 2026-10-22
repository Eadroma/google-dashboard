import type { FC, KeyboardEvent } from 'react';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';

interface SearchBarViewProps {
  query: string;
  placeholder: string;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
}

/**
 * Presentational search bar — styled input with submit on Enter.
 *
 * @param props.query - Current input value
 * @param props.onQueryChange - Called with each keystroke
 * @param props.onSearch - Called when the user submits
 */
export const SearchBarView: FC<SearchBarViewProps> = ({
  query,
  placeholder,
  onQueryChange,
  onSearch,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex items-center h-full px-4 py-3">
      <div className="relative flex-1">
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => { onQueryChange(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          className={cn(
            'w-full rounded-xl border border-white/25 bg-black/30 pl-10 pr-4 py-2.5',
            'text-base text-white placeholder:text-white/60',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-colors duration-150',
          )}
        />
      </div>
    </div>
  );
};
