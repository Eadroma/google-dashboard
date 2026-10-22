import { cn } from '@utils/classnames.utils';
import type { TooltipProps } from './Tooltip.types';

const placementClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
} as const;

/**
 * A CSS-only tooltip that appears on hover via group-hover utility.
 * Wrap the trigger element: <Tooltip content="Save"><button>...</button></Tooltip>
 *
 * @param props.content - Tooltip text
 * @param props.placement - Placement relative to trigger (default "top")
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  className,
}: TooltipProps) {
  return (
    <div className="relative group inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          'absolute z-50 pointer-events-none whitespace-nowrap',
          'rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-lg',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
          placementClasses[placement],
          className,
        )}
      >
        {content}
      </span>
    </div>
  );
}
