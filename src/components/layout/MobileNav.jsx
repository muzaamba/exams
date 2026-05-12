'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Brain, FileText, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileLinks = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/subjects', label: 'Subjects', icon: BookOpen },
  { href: '/quizzes', label: 'Quiz', icon: Brain },
  { href: '/exams', label: 'Exams', icon: FileText },
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
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[60px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted hover:text-foreground'
              )}
            >
              <link.icon size={20} />
              <span className="text-[10px] font-medium">{link.label}</span>
              {isActive && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
