import { cn } from '@utils/classnames.utils';
import type { BadgeProps } from './Badge.types';

const variantClasses = {
  default: 'bg-white/15 text-white/80',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  danger: 'bg-red-500/20 text-red-400',
  info: 'bg-blue-500/20 text-blue-400',
} as const;

/**
 * A small inline label badge for status indicators and counts.
 *
 * @param props.variant - Color variant (default "default")
 */
export function Badge({ variant = 'default', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
