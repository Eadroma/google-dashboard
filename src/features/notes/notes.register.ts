import { registerWidget } from '@widgets/registry';
import { Notes } from './Notes.widget';

registerWidget({
  meta: {
    id: 'notes',
    name: 'Notes',
    description: 'Freeform text notes with autosave',
    icon: 'FileText',
    category: 'productivity',
    defaultSize: '2x3',
    minSize: '2x2',
  },
  Component: Notes,
});
