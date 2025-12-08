import React from 'react';
import { CircularProgress } from '@mui/material';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-md hover:shadow-lg',
      secondary:
        'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 shadow-sm hover:shadow-md',
      outline:
        'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <CircularProgress
              size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
              color="inherit"
            />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
