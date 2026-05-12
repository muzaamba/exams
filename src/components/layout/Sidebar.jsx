'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Brain, FileText, Target, Trophy,
  ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

const iconMap = {
  LayoutDashboard, BookOpen, Brain, FileText, Target, Trophy,
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-16 bottom-0 z-40 bg-[var(--bg-secondary)] border-r border-border transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[240px]'
      )}
    >
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV_LINKS.map((link) => {
          const Icon = iconMap[link.icon] || BookOpen;
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted hover:text-foreground hover:bg-surface'
              )}
              title={collapsed ? link.label : undefined}
            >
              <Icon size={20} className={cn(isActive && 'text-primary')} />
              {!collapsed && <span className="text-sm">{link.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>

      {/* AI Assistant Promo */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-indigo-500/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary" />
            <span className="text-xs font-semibold text-primary">AI Assistant</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">Get personalized study recommendations powered by AI</p>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-3 border-t border-border text-muted hover:text-foreground hover:bg-surface transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
