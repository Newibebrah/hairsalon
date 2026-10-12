import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { ArrowRight, ShoppingBag, Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: 'arrow-right' | 'shop' | 'heart';
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  ariaLabel?: string;
}

const iconComponents = {
  'arrow-right': <ArrowRight className="w-4 h-4" aria-hidden="true" />,
  'shop': <ShoppingBag className="w-4 h-4" aria-hidden="true" />,
  'heart': <Heart className="w-4 h-4" aria-hidden="true" />,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      icon,
      iconPosition = 'right',
      loading = false,
      children,
      className = '',
      disabled,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const variantStyles = {
      primary: 'bg-brand text-white hover:bg-brand-hover shadow-lg hover:shadow-xl',
      secondary: 'border-2 border-brand text-brand hover:bg-brand hover:text-white',
      light: 'bg-white text-brand hover:bg-pink-50 shadow-md',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-brand',
      ghost: 'text-brand hover:bg-pink-100',
    };

    const sizeStyles = {
      sm: 'px-4 py-2.5 text-sm min-h-[44px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-pill transition-all duration-200',
          'active:scale-[0.98]',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        {...props}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin -mr-1" aria-hidden="true" />
        )}
        {icon && iconPosition === 'left' && !loading && iconComponents[icon]}
        <span>{children}</span>
        {icon && iconPosition === 'right' && !loading && iconComponents[icon]}
      </button>
    );
  }
);

Button.displayName = 'Button';