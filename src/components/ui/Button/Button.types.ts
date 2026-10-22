import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props for the Button component */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant (default "primary") */
  variant?: ButtonVariant;
  /** Size preset (default "md") */
  size?: ButtonSize;
  /** When true, replaces content with a loading spinner */
  isLoading?: boolean;
  /** Lucide icon name to show before the label */
  leftIcon?: string;
  /** Lucide icon name to show after the label */
  rightIcon?: string;
}
