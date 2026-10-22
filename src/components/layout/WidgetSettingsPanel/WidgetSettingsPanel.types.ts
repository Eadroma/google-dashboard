import type { ComponentType } from 'react';
import type { WidgetSettingsProps } from '@app-types/widget.types';

/** Props for the WidgetSettingsPanel slide-over */
export interface WidgetSettingsPanelProps {
  /** Whether the panel is visible */
  isOpen: boolean;
  /** Callback to close the panel */
  onClose: () => void;
  /** The widget instance whose settings are being edited */
  instanceId: string;
  /** The widget-specific settings form component */
  SettingsComponent: ComponentType<WidgetSettingsProps>;
}
