import type { ReactNode } from 'react';

/** Props for the WidgetFrame wrapper component */
export interface WidgetFrameProps {
  /** UUID of the widget instance */
  instanceId: string;
  /** Widget type identifier used to look up metadata */
  widgetId: string;
  /** Whether the dashboard is in edit mode */
  isEditing: boolean;
  /** Whether this widget is locked (cannot be dragged or resized) */
  isLocked: boolean;
  /** The rendered widget content */
  children: ReactNode;
}
