'use client';

import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-gradient-to-r from-primary to-emerald-400 text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]',
  secondary: 'bg-surface border border-border text-foreground hover:bg-surface-hover hover:border-primary/50',
  ghost: 'bg-transparent text-foreground hover:bg-surface',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
  accent: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
  xl: 'px-10 py-4 text-lg rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        'active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </button>
  );
}
