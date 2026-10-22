import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

/** Props for the Badge component */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color variant (default "default") */
  variant?: BadgeVariant;
}
