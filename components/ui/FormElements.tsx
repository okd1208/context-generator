import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500': variant === 'outline',
          'px-2.5 py-1.5 text-xs': size === 'sm',
          'px-3 py-2 text-sm': size === 'md',
          'px-4 py-2.5 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((
  { label, description, error, className, id, ...props },
  ref
) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          'form-input',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {description && <p className="field-description">{description}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((
  { label, description, error, className, id, ...props },
  ref
) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={4}
        className={clsx(
          'form-input resize-vertical',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {description && <p className="field-description">{description}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});
TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((
  { label, description, error, options, className, id, ...props },
  ref
) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        className={clsx(
          'form-select',
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
      {description && <p className="field-description">{description}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((
  { label, description, className, id, ...props },
  ref
) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1">
      <div className="flex items-start">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={clsx('form-checkbox mt-0.5', className)}
          {...props}
        />
        <label htmlFor={inputId} className="ml-2 field-label">
          {label}
        </label>
      </div>
      {description && <p className="field-description ml-6">{description}</p>}
    </div>
  );
});
Checkbox.displayName = 'Checkbox';

interface MultiSelectProps {
  label?: string;
  description?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  description,
  error,
  options,
  value,
  onChange,
  placeholder = '選択してください'
}) => {
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-1">
      {label && <label className="field-label">{label}</label>}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2.5">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                className="form-checkbox"
              />
              <span className="text-xs text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {value.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {value.map((selectedValue) => {
              const option = options.find(opt => opt.value === selectedValue);
              return option ? (
                <span
                  key={selectedValue}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={() => toggleOption(selectedValue)}
                    className="ml-1 text-primary-600 hover:text-primary-800 text-xs"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
      {description && <p className="field-description">{description}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div className={clsx('card', className)} onClick={onClick}>
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
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={clsx('w-full', className)}>
      <div className="flex justify-between text-xs text-gray-600 mb-0.5">
        <span>進捗</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
