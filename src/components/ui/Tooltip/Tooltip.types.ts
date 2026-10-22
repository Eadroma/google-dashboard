import type { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/** Props for the Tooltip component */
export interface TooltipProps {
  /** The tooltip text to display */
  content: string;
  /** The element that triggers the tooltip */
  children: ReactNode;
  /** Placement relative to the trigger element (default "top") */
  placement?: TooltipPlacement;
  /** Additional Tailwind classes for the tooltip bubble */
  className?: string;
}
