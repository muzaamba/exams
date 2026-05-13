'use client';

import { cn } from '@/lib/utils';

const colorMap = {
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  red: 'bg-red-500/15 text-red-400 border-red-500/20',
  indigo: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
  pink: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  teal: 'bg-teal-500/15 text-teal-400 border-teal-500/20',
  primary: 'bg-primary/15 text-primary border-primary/20',
};

export default function Badge({ children, color = 'green', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border',
        colorMap[color] || colorMap.green,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }) {
  const colors = { easy: 'green', medium: 'yellow', hard: 'red' };
  return <Badge color={colors[difficulty] || 'green'}>{difficulty}</Badge>;
}
