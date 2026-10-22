import { forwardRef } from 'react';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';
import { Spinner } from '@components/ui/Spinner';
import type { ButtonProps } from './Button.types';

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-white/10 text-white hover:bg-white/20 active:bg-white/30',
  ghost: 'text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
} as const;

const sizeClasses = {
  sm: 'h-7 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2.5',
} as const;

const iconSizes = { sm: 14, md: 16, lg: 18 } as const;

/**
 * A polymorphic button with variant, size, loading, and icon support.
 * Forwards refs to the underlying <button> element.
 *
 * @param props.variant - Visual style variant (default "primary")
 * @param props.size - Size preset (default "md")
 * @param props.isLoading - Replaces content with a spinner when true
 * @param props.leftIcon - Lucide icon name shown before the label
 * @param props.rightIcon - Lucide icon name shown after the label
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => {
    const iconSize = iconSizes[size];

    return (
      <button
        ref={ref}
        disabled={disabled ?? isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-colors duration-150 focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...rest}
      >
        {isLoading ? (
          <Spinner size={iconSize} />
        ) : (
          <>
            {leftIcon && <Icon name={leftIcon} size={iconSize} />}
            {children}
            {rightIcon && <Icon name={rightIcon} size={iconSize} />}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
