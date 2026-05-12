'use client';

import { cn } from '@/lib/utils';

export function LinearProgress({ value = 0, max = 100, color = 'var(--primary)', className, showLabel = false }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>{value}/{max}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({ value = 0, max = 100, size = 120, strokeWidth = 8, color = 'var(--primary)', children, className }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="progress-ring">
        <circle
          className="text-surface"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring-circle"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || <span className="text-xl font-bold">{pct}%</span>}
      </div>
    </div>
  );
}
