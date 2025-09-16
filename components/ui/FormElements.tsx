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
