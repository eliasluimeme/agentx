'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  collapsed?: boolean;
  className?: string;
}

export function ThemeToggle({ collapsed = false, className }: ThemeToggleProps) {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <div
        className={cn(
          'flex items-center gap-2.5 rounded-xl p-2 text-slate-400 dark:text-neutral-400 select-none opacity-50',
          className
        )}
      >
        <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-neutral-800 animate-pulse" />
        {!collapsed && <span className="text-xs font-medium">Theme</span>}
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={cn(
        'group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer select-none',
        'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border border-slate-200/90 shadow-2xs',
        'dark:bg-white/[0.05] dark:hover:bg-white/[0.09] dark:text-neutral-300 dark:border-white/[0.08] dark:shadow-none',
        className
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="text-cyan-400"
              >
                <Moon className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="text-amber-500"
              >
                <Sun className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!collapsed && (
          <span className="truncate tracking-tight font-medium text-slate-700 dark:text-neutral-300">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        )}
      </div>

      {!collapsed && (
        <div
          className={cn(
            'relative w-8 h-4.5 rounded-full transition-colors duration-200 p-0.5 shrink-0 flex items-center',
            isDark ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
          )}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="w-3.5 h-3.5 rounded-full bg-white shadow-xs"
          />
        </div>
      )}
    </button>
  );
}
