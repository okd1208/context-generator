import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          // Primary variant - Mint gradient
          'bg-gradient-to-r from-mint-400 to-mint-500 text-white hover:from-mint-500 hover:to-mint-600 hover:shadow-mint-glow focus:ring-mint-500': 
            variant === 'primary' && !disabled,
          
          // Secondary variant - Peach gradient  
          'bg-gradient-to-r from-peach-400 to-peach-500 text-white hover:from-peach-500 hover:to-peach-600 hover:shadow-peach-glow focus:ring-peach-500': 
            variant === 'secondary' && !disabled,
          
          // Outline variant
          'border-2 border-mint-400 bg-white text-mint-600 hover:bg-mint-50 hover:border-mint-500 hover:shadow-soft focus:ring-mint-500': 
            variant === 'outline' && !disabled,
            
          // Ghost variant
          'text-gray-600 hover:text-mint-600 hover:bg-mint-50 focus:ring-mint-500': 
            variant === 'ghost' && !disabled,
          
          // Sizes
          'px-3 py-2 text-sm': size === 'sm',
          'px-5 py-2.5 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          
          // Hover effect
          'hover:-translate-y-0.5 active:translate-y-0 active:scale-95': !disabled,
          
          // Disabled state
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'hover';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-2xl transition-all duration-300',
        {
          // Default card
          'bg-white border border-gray-100 shadow-soft hover:shadow-medium': 
            variant === 'default',
          
          // Gradient card
          'bg-gradient-to-br from-mint-50 via-white to-peach-50 border border-mint-100/50 shadow-medium': 
            variant === 'gradient',
            
          // Hover effect card
          'bg-white border-2 border-transparent hover:border-peach-300 shadow-soft hover:shadow-large hover:-translate-y-1': 
            variant === 'hover',
        },
        'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className
}) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          ステップ {current} / {total}
        </span>
        <span className="text-sm font-medium text-mint-600">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  description,
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      <input
        className={clsx(
          'input-field',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  description,
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      <textarea
        className={clsx(
          'textarea-field',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  description,
  error,
  options,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      <select
        className={clsx(
          'input-field',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        className={clsx(
          'w-4 h-4 text-mint-600 bg-white border-gray-300 rounded focus:ring-mint-500 focus:ring-2',
          className
        )}
        {...props}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};

interface MultiSelectProps {
  label?: string;
  description?: string;
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  description,
  options,
  value = [],
  onChange,
  error,
}) => {
  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      <div className="space-y-2 max-h-60 overflow-y-auto border-2 border-gray-200 rounded-xl p-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 text-mint-600 bg-white border-gray-300 rounded focus:ring-mint-500 focus:ring-2"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
