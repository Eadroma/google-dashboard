import { useCallback } from 'react';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import type { TodoConfig, TodoItem, TodoPriority } from './todo.types';

/** Defaults for a new Todo instance — also used by TodoSettings */
export const DEFAULT_CONFIG: TodoConfig = { items: [], showCompleted: true };

/** Return value of useTodo */
export interface UseTodoResult {
  config: TodoConfig;
  visibleItems: TodoItem[];
  /** Completed tasks, counted over all items (hidden ones included) */
  doneCount: number;
  addItem: (text: string, priority?: TodoPriority) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
}

/**
 * Manages the Todo widget's task list.
 *
 * @param instanceId - Widget instance UUID
 */
export function useTodo(instanceId: string): UseTodoResult {
  const config = useWidgetConfig<TodoConfig>(instanceId, DEFAULT_CONFIG);
  const updateSettings = useWidgetSettingsStore((s) => s.updateSettings);

  const addItem = useCallback(
    (text: string, priority: TodoPriority = 'medium') => {
      const newItem: TodoItem = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      updateSettings<TodoConfig>(instanceId, { items: [...config.items, newItem] });
    },
    [instanceId, config.items, updateSettings],
  );

  const toggleItem = useCallback(
    (id: string) => {
      updateSettings<TodoConfig>(instanceId, {
        items: config.items.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item,
        ),
      });
    },
    [instanceId, config.items, updateSettings],
  );

  const removeItem = useCallback(
    (id: string) => {
      updateSettings<TodoConfig>(instanceId, {
        items: config.items.filter((item) => item.id !== id),
      });
    },
    [instanceId, config.items, updateSettings],
  );

  const visibleItems = config.showCompleted
    ? config.items
    : config.items.filter((i) => !i.completed);

  const doneCount = config.items.filter((i) => i.completed).length;

  return { config, visibleItems, doneCount, addItem, toggleItem, removeItem };
}
