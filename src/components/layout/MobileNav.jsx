'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Brain, FileText, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileLinks = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/subjects', label: 'Subjects', icon: BookOpen },
  { href: '/quizzes', label: 'Quiz', icon: Brain },
  { href: '/leaderboard', label: 'Ranks', icon: Trophy },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border" style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center justify-around py-2 px-1">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center gap-1 px-1 py-1 rounded-2xl transition-all duration-300 min-w-[64px]',
                isActive
                  ? 'text-primary scale-110'
                  : 'text-muted hover:text-foreground'
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-colors",
                isActive ? "bg-primary/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]" : ""
              )}>
                <link.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest transition-all",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
