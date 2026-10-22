import type { InputHTMLAttributes } from 'react';

/** Props for the Input component */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Lucide icon name shown on the left side of the input */
  leftIcon?: string;
  /** Lucide icon name shown on the right side of the input */
  rightIcon?: string;
}
