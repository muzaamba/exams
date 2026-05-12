'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  type = 'text',
  error,
  icon: Icon,
  className,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
        )}
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={cn(
            'w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border',
            'text-foreground placeholder:text-muted',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
            'transition-all duration-300',
            Icon && 'pl-10',
            isPassword && 'pr-10',
            error && 'border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Select({ label, options, error, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border',
          'text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
          'transition-all duration-300 appearance-none cursor-pointer',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
