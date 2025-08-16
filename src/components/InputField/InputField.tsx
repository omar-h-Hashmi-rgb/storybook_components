import React, { useState, useId } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { InputFieldProps } from '../../types';

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable = false,
  onClear,
  loading = false,
  id,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;

  const isPassword = type === 'password';
  const hasError = invalid || !!errorMessage;
  const inputType = isPassword && showPassword ? 'text' : type;

  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const variantClasses: Record<'filled' | 'outlined' | 'ghost', string> = {
    filled: clsx(
      'bg-gray-50 border-0 border-b-2',
      'dark:bg-gray-800',
      {
        'border-gray-300 focus:border-blue-500': !hasError,
        'border-red-500 focus:border-red-500': hasError,
        'bg-gray-100 dark:bg-gray-700 cursor-not-allowed': disabled
      }
    ),
    outlined: clsx(
      'bg-white border-2 rounded-lg',
      'dark:bg-gray-900 dark:border-gray-600',
      {
        'border-gray-300 focus:border-blue-500': !hasError,
        'border-red-500 focus:border-red-500': hasError,
        'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed': disabled
      }
    ),
    ghost: clsx(
      'bg-transparent border-2 border-transparent rounded-lg',
      'hover:bg-gray-50 dark:hover:bg-gray-800',
      {
        'focus:bg-white focus:border-blue-500 dark:focus:bg-gray-900': !hasError,
        'focus:bg-white focus:border-red-500 dark:focus:bg-gray-900': hasError,
        'cursor-not-allowed opacity-50': disabled
      }
    )
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const showClearButton = clearable && value && !disabled && !loading;
  const showPasswordToggle = isPassword && !disabled;

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            'block text-sm font-medium mb-2 transition-colors',
            {
              'text-gray-700 dark:text-gray-300': !hasError,
              'text-red-600 dark:text-red-400': hasError,
              'text-gray-500 dark:text-gray-500': disabled
            }
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'w-full transition-all duration-200 outline-none',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'text-gray-900 dark:text-gray-100',
            sizeClasses[size],
            variantClasses[variant],
            {
              'pr-12': showClearButton || showPasswordToggle || loading,
              'pr-20': (showClearButton && showPasswordToggle) || (loading && (showClearButton || showPasswordToggle)),
              'animate-pulse': loading
            }
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {/* Icons container */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {loading && (
            <Loader2 
              size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
              className="text-gray-400 animate-spin-slow"
            />
          )}
          
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className={clsx(
                'p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                'rounded-full hover:bg-gray-100 dark:hover:bg-gray-700',
                'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
              aria-label="Clear input"
            >
              <X size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            </button>
          )}
          
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={clsx(
                'p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                'rounded-full hover:bg-gray-100 dark:hover:bg-gray-700',
                'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 
                <EyeOff size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} /> : 
                <Eye size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
              }
            </button>
          )}
        </div>
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <div className="mt-2">
          {hasError ? (
            <p
              id={`${inputId}-error`}
              className="text-sm text-red-600 dark:text-red-400 animate-fade-in"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : (
            <p
              id={`${inputId}-helper`}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;