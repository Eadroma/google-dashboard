import type { FC } from 'react';
import { useTodo } from './useTodo';
import { TodoList } from './TodoList';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetProps } from '@app-types/widget.types';

/**
 * Todo widget container.
 *
 * @param props.instanceId - Widget instance UUID
 */
export const Todo: FC<WidgetProps> = ({ instanceId }) => {
  const { config, visibleItems, doneCount, addItem, toggleItem, removeItem } = useTodo(instanceId);
  const { t } = useTranslation();
  return (
    <TodoList
      items={visibleItems}
      onToggle={toggleItem}
      onRemove={removeItem}
      onAdd={addItem}
      addPlaceholder={t('todoAddPlaceholder')}
      emptyText={t('todoEmpty')}
      countLabel={config.items.length > 0 ? t('todoDoneCount', { done: doneCount, total: config.items.length }) : ''}
    />
  );
};
