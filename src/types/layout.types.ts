/** Column and row position on the grid (zero-indexed) */
export interface GridPosition {
  col: number;
  row: number;
}

/** Width and height measured in grid units */
export interface GridDimensions {
  w: number;
  h: number;
}

/**
 * One widget instance placed on the dashboard grid.
 * Multiple instances of the same widget type are distinguished by `instanceId`.
 */
export interface GridItem {
  /** UUID — unique per placed instance */
  instanceId: string;
  /** Widget type identifier from the registry, e.g. "clock" */
  widgetId: string;
  position: GridPosition;
  dimensions: GridDimensions;
  /** When true the widget cannot be dragged or resized in edit mode */
  isLocked?: boolean;
}

/**
 * Full persisted layout state — stored in localStorage (isEditing is not persisted).
 */
export interface DashboardLayout {
  /** Total number of columns in the grid (48 — a fine grid, 4 columns per logical widget unit) */
  columns: number;
  /** All placed widget instances */
  items: GridItem[];
  /** Whether the dashboard is currently in edit/drag mode */
  isEditing: boolean;
}
