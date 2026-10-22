import type { ComponentType } from 'react';

/** Predefined grid size presets (columns x rows) */
export type WidgetSize =
  | '1x1' | '2x1' | '2x2' | '3x1' | '3x2' | '4x1' | '4x2' | '4x4'
  | '2x3' | '3x3' | '4x3';

/** Category grouping shown in the widget picker sidebar */
export type WidgetCategory = 'core' | 'productivity' | 'google' | 'info';

/**
 * Static metadata every widget must declare.
 * Registered once at app boot via `*.register.ts` side-effect imports.
 */
export interface WidgetMeta {
  /** Unique stable identifier — kebab-case, e.g. "clock" */
  id: string;
  /** Human-readable display name shown in the widget picker */
  name: string;
  /** Short description of what the widget does */
  description: string;
  /** Lucide icon name, e.g. "Clock"; must be listed in ui/Icon/Icon.tsx */
  icon: string;
  /** Category used to group widgets in the picker sidebar */
  category: WidgetCategory;
  /** Default grid size when first dropped onto the dashboard */
  defaultSize: WidgetSize;
  /** Minimum allowed size — prevents over-shrinking */
  minSize: WidgetSize;
}

/**
 * Props injected into every widget container component by WidgetFrame.
 */
export interface WidgetProps {
  /** Unique instance id (UUID) — one user can have two Clock widgets */
  instanceId: string;
  /** Whether the dashboard is in edit mode */
  isEditing: boolean;
}

/**
 * Props for widget-specific settings panels rendered inside WidgetSettingsPanel.
 */
export interface WidgetSettingsProps {
  /** The instance whose settings are being edited */
  instanceId: string;
  /** Callback to close the settings panel */
  onClose: () => void;
}

/**
 * Full registry entry: static metadata plus the component references.
 */
export interface RegistryEntry {
  meta: WidgetMeta;
  Component: ComponentType<WidgetProps>;
  SettingsComponent?: ComponentType<WidgetSettingsProps>;
}
