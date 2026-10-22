import { useId } from 'react';
import { cn } from '@utils/classnames.utils';
import type { SwitchProps } from './Switch.types';

/**
 * An accessible toggle switch.
 *
 * @param props.checked - Whether the switch is on
 * @param props.onChange - Callback with the new boolean value
 * @param props.label - Accessible label text (also rendered if present)
 * @param props.disabled - Prevents interaction when true
 */
export function Switch({ checked, onChange, label, disabled = false, className }: SwitchProps) {
  const id = useId();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => { onChange(!checked); }}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full',
          'border-2 border-transparent transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-blue-600' : 'bg-white/20',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow',
            'ring-0 transition-transform duration-200',
            checked ? 'translate-x-4' : 'translate-x-0',
          )}
        />
      </button>
      {label && (
        <label htmlFor={id} className="text-sm text-white/70 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}
