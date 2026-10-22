import { registerWidget } from '@widgets/registry';
import { Todo } from './Todo.widget';
import { TodoSettings } from './TodoSettings';

registerWidget({
  meta: {
    id: 'todo',
    name: 'Todo',
    description: 'Local task list with priorities and completion tracking',
    icon: 'CheckSquare',
    category: 'productivity',
    defaultSize: '2x3',
    minSize: '2x2',
  },
  Component: Todo,
  SettingsComponent: TodoSettings,
});
