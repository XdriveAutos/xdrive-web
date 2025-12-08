import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  helperText?: string;
  muiSize?: 'small' | 'medium';
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error = false,
      errorMessage,
      icon,
      iconPosition = 'start',
      helperText,
      muiSize = 'medium',
      fullWidth = true,
      type = 'text',
      className,
      ...props
    },
    ref,
  ) => {
    const startAdornment =
      icon && iconPosition === 'start' ? (
        <InputAdornment position="start" className="text-gray-500">
          {icon}
        </InputAdornment>
      ) : null;

    const endAdornment =
      icon && iconPosition === 'end' ? (
        <InputAdornment position="end" className="text-gray-500">
          {icon}
        </InputAdornment>
      ) : null;

    return (
      <div className="w-full">
        <TextField
          inputRef={ref}
          label={label}
          type={type}
          error={error || !!errorMessage}
          fullWidth={fullWidth}
          size={muiSize}
          InputProps={{
            startAdornment,
            endAdornment,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.5rem',
              fontSize: '1rem',
              '&:hover fieldset': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
                borderWidth: '2px',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: muiSize === 'small' ? '8px 14px' : '10px 14px',
            },
            '& .MuiInputBase-input::placeholder': {
              opacity: 0.7,
            },
          }}
          helperText={errorMessage || helperText}
          className={className}
          {...(props as any)}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
