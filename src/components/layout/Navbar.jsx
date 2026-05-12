'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, X, LogOut, User, Settings } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border" style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(20px)' }}>
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20">
              Z
            </div>
            <span className="text-xl font-black tracking-tighter font-heading">
              <span className="gradient-text">ZEWENO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isHome ? (
              <>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#subjects">Subjects</NavLink>
                <NavLink href="#stats">Stats</NavLink>
              </>
            ) : null}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl hover:bg-surface transition-colors text-muted hover:text-foreground"
            >
              <Search size={20} />
            </button>

            <ThemeToggle />

            {user ? (
              <>
                <button className="relative p-2.5 rounded-xl hover:bg-surface transition-colors text-muted hover:text-foreground">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center text-white font-bold text-sm">
                      {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>

                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                      <div className="absolute right-0 top-12 w-56 rounded-xl bg-[var(--bg-secondary)] border border-border shadow-xl z-50 animate-scale-in overflow-hidden">
                        <div className="p-3 border-b border-border">
                          <p className="font-semibold text-sm">{profile?.full_name || 'Student'}</p>
                          <p className="text-xs text-muted truncate">{user.email}</p>
                        </div>
                        <div className="p-1">
                          <DropdownItem href="/dashboard" icon={User}>Dashboard</DropdownItem>
                          {profile?.role === 'admin' && (
                            <DropdownItem href="/admin" icon={Settings}>Admin Panel</DropdownItem>
                          )}
                          <DropdownItem href="/profile" icon={Settings}>Profile</DropdownItem>
                          <button
                            onClick={signOut}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-xl hover:bg-surface transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-emerald-400 text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 p-4 bg-[var(--bg-secondary)] border-b border-border animate-slide-up">
          <div className="container-main">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                autoFocus
                type="text"
                placeholder="Search subjects, quizzes, questions..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-surface-hover text-muted"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
    >
      {children}
    </a>
  );
}

function DropdownItem({ href, icon: Icon, children }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-surface transition-colors"
    >
      <Icon size={16} className="text-muted" />
      {children}
    </Link>
  );
}
