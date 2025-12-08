import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error = false,
      errorMessage,
      leftIcon,
      rightIcon,
      helperText,
      fullWidth = true,
      className = '',
      type = 'text',
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <div className={`space-y-1.5 ${fullWidth ? 'w-full' : ''}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-(--color-text)">
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {hasLeftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span
                className={`text-(--color-body) ${disabled ? 'opacity-50' : ''}`}
              >
                {leftIcon}
              </span>
            </div>
          )}

          {/* Native Input */}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={`
              block w-full rounded-xl border bg-(--color-surface)
              px-4 py-3.5 text-(--color-text) placeholder:text-(--color-inactive)
              transition-all duration-200 outline-none
              focus:ring-4 focus:ring-(--color-primary)/20
              disabled:bg-(--color-elevation-1) disabled:cursor-not-allowed
              ${hasLeftIcon ? 'pl-12' : 'pl-4'}
              ${hasRightIcon ? 'pr-12' : 'pr-4'}
              ${
                error
                  ? 'border-(--color-error) focus:border-(--color-error)'
                  : 'border-(--color-border) focus:border-(--color-primary)'
              }
              ${className}
            `}
            {...props}
          />

          {/* Right Icon */}
          {hasRightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <span
                className={`text-(--color-body) ${disabled ? 'opacity-50' : ''}`}
              >
                {rightIcon}
              </span>
            </div>
          )}
        </div>

        {/* Helper / Error Text */}
        {(helperText || errorMessage) && (
          <p
            className={`text-sm ${error ? 'text-(--color-error)' : 'text-(--color-body)'}`}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
