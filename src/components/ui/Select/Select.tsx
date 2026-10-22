import { useId } from 'react';
import { cn } from '@utils/classnames.utils';
import type { SelectProps } from './Select.types';

/**
 * A styled native <select> element with label support.
 *
 * @param props.value - Currently selected value
 * @param props.onChange - Callback with the new value
 * @param props.options - Array of {value, label} options
 * @param props.label - Label displayed above the select
 * @param props.disabled - Prevents interaction when true
 */
export function Select<T extends string>({
  value,
  onChange,
  options,
  label,
  disabled = false,
  className,
}: SelectProps<T>) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-white/60 uppercase tracking-wide"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => { onChange(e.target.value as T); }}
        className={cn(
          'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2',
          'text-sm text-white',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'appearance-none cursor-pointer',
          className,
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-800 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
