import { type FC, useState, type KeyboardEvent } from 'react';
import { Icon } from '@components/ui/Icon';
import { TodoItemComponent } from './TodoItem';
import type { TodoItem } from './todo.types';

interface TodoListProps {
  items: TodoItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: (text: string) => void;
  addPlaceholder: string;
  emptyText: string;
  /** Footer text, e.g. "2/5 done"; empty string hides the footer */
  countLabel: string;
}

/**
 * Presentational todo list with an inline add input.
 *
 * @param props.items - Visible task items to render
 * @param props.onToggle - Toggle completion callback
 * @param props.onRemove - Remove task callback
 * @param props.onAdd - Add new task callback
 */
export const TodoList: FC<TodoListProps> = ({ items, onToggle, onRemove, onAdd, addPlaceholder, emptyText, countLabel }) => {
  const [draft, setDraft] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && draft.trim()) {
      onAdd(draft.trim());
      setDraft('');
    }
  };

  return (
    <div className="flex flex-col h-full p-3 gap-2">
      {/* Add input */}
      <div className="relative flex items-center">
        <Icon name="Plus" size={14} className="absolute left-2.5 text-white/30 pointer-events-none" />
        <input
          type="text"
          value={draft}
          onChange={(e) => { setDraft(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder={addPlaceholder}
          className="w-full rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 py-1.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* List */}
      <ul className="flex-1 overflow-y-auto space-y-0.5 min-h-0">
        {items.length === 0 && (
          <li className="text-sm text-white/50 text-center py-6 text-shadow-sm">{emptyText}</li>
        )}
        {items.map((item) => (
          <TodoItemComponent
            key={item.id}
            item={item}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>

      {/* Footer count */}
      {countLabel && (
        <p className="text-xs text-white/50 text-right shrink-0 text-shadow-sm">
          {countLabel}
        </p>
      )}
    </div>
  );
};
