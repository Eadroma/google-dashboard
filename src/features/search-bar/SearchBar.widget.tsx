import type { FC } from 'react';
import { useSearchBar } from './useSearchBar';
import { SearchBarView } from './SearchBarView';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetProps } from '@app-types/widget.types';

/**
 * Search Bar widget container.
 *
 * @param props.instanceId - Widget instance UUID
 */
export const SearchBar: FC<WidgetProps> = ({ instanceId }) => {
  const { query, setQuery, handleSearch, config } = useSearchBar(instanceId);
  const { t } = useTranslation();
  const engineLabel = config.engine.charAt(0).toUpperCase() + config.engine.slice(1);
  return (
    <SearchBarView
      query={query}
      placeholder={t('searchPlaceholder', { engine: engineLabel })}
      onQueryChange={setQuery}
      onSearch={handleSearch}
    />
  );
};
