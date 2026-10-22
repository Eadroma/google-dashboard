import { cn } from '@utils/classnames.utils';
import type { SpinnerProps } from './Spinner.types';

/**
 * An animated loading spinner SVG.
 *
 * @param props.size - Diameter in pixels (default 20)
 * @param props.className - Additional Tailwind classes
 */
export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin text-current', className)}
      aria-label="Loading"
      role="status"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="47"
        strokeDashoffset="12"
        opacity="0.25"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="47"
        strokeDashoffset="35"
      />
    </svg>
  );
}
