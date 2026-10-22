export type TodoPriority = 'low' | 'medium' | 'high';

/** A single task item */
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: TodoPriority;
  /** ISO 8601 date string, e.g. "2025-01-15" */
  dueDate?: string;
  /** ISO 8601 creation timestamp */
  createdAt: string;
}

/** Persisted configuration for the Todo widget */
export interface TodoConfig {
  items: TodoItem[];
  /** When true, completed items are shown at the bottom */
  showCompleted: boolean;
}
