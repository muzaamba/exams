'use client';

import { cn } from '@/lib/utils';

export default function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton', className)} {...props} />;
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <Skeleton className="h-8 w-24 mt-4" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
