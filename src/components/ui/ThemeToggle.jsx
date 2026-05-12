import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 p-2.5 rounded-xl bg-surface border border-border" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          size={20}
          className={`absolute inset-0 transform transition-all duration-500 ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          } text-yellow-400`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transform transition-all duration-500 ${
            theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          } text-indigo-400`}
        />
      </div>
    </button>
  );
}
