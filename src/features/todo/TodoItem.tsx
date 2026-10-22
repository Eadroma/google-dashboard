import type { FC } from 'react';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';
import type { TodoItem as TodoItemType, TodoPriority } from './todo.types';

const priorityDot: Record<TodoPriority, string> = {
  low: 'bg-slate-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
};

interface TodoItemProps {
  item: TodoItemType;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

/**
 * Presentational single task row — checkbox, label, priority dot, remove button.
 *
 * @param props.item - The task data to render
 * @param props.onToggle - Called with the item id when the checkbox is clicked
 * @param props.onRemove - Called with the item id when the remove button is clicked
 */
export const TodoItemComponent: FC<TodoItemProps> = ({ item, onToggle, onRemove }) => {
  return (
    <li className="flex items-center gap-2.5 py-1.5 group">
      <button
        type="button"
        onClick={() => { onToggle(item.id); }}
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded',
          'border transition-colors duration-150',
          item.completed
            ? 'border-blue-500 bg-blue-500'
            : 'border-white/30 hover:border-white/60',
        )}
        aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {item.completed && <Icon name="Check" size={10} className="text-white" />}
      </button>

      <span
        className={cn(
          'flex-1 text-sm text-white leading-snug transition-opacity text-shadow-sm',
          item.completed && 'line-through opacity-40',
        )}
      >
        {item.text}
      </span>

      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', priorityDot[item.priority])} />

      <button
        type="button"
        onClick={() => { onRemove(item.id); }}
        className="opacity-0 group-hover:opacity-100 flex h-5 w-5 items-center justify-center rounded hover:bg-white/10 transition-all"
        aria-label="Remove task"
      >
        <Icon name="X" size={10} className="text-white/50" />
      </button>
    </li>
  );
};
