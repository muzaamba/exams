'use client';

import { cn } from '@/lib/utils';

export default function Card({ children, className, hover = true, glow = false, ...props }) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        hover && 'hover:border-primary/50 hover:shadow-lg cursor-pointer',
        glow && 'glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h3 className={cn('text-lg font-bold text-foreground', className)}>{children}</h3>;
}

export function CardDescription({ children, className }) {
  return <p className={cn('text-sm text-secondary mt-1', className)}>{children}</p>;
}

export function CardContent({ children, className }) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={cn('mt-4 pt-4 border-t border-border flex items-center gap-3', className)}>{children}</div>;
}
