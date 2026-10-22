import { forwardRef, useId } from 'react';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';
import type { InputProps } from './Input.types';

/**
 * A styled text input with optional label, error message, and icon slots.
 * Forwards refs to the underlying <input> element.
 *
 * @param props.label - Label displayed above the input
 * @param props.error - Error message shown below the input (also sets aria-invalid)
 * @param props.leftIcon - Lucide icon name shown inside the left edge
 * @param props.rightIcon - Lucide icon name shown inside the right edge
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-white/60 uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={16}
              className="absolute left-3 text-white/40 pointer-events-none"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            className={cn(
              'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2',
              'text-sm text-white placeholder:text-white/30',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:ring-red-500',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              className,
            )}
            {...rest}
          />
          {rightIcon && (
            <Icon
              name={rightIcon}
              size={16}
              className="absolute right-3 text-white/40 pointer-events-none"
            />
          )}
        </div>
        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
