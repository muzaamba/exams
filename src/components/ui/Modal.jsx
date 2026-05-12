'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Modal({ isOpen, onClose, title, children, className, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          'relative w-full rounded-2xl bg-[var(--bg-secondary)] border border-border',
          'shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto',
          sizes[size],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface transition-colors text-muted hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
