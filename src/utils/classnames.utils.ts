import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind CSS conflict resolution.
 * Accepts any mix of strings, arrays, and conditional objects.
 *
 * @param inputs - Class name inputs (same API as clsx)
 * @returns A single deduplicated, conflict-resolved class string
 *
 * @example
 * cn('px-4 py-2', condition && 'bg-blue-500', 'py-3')
 * // "px-4 bg-blue-500 py-3" — py-2 is overridden by py-3
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
