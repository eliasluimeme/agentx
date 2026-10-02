'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  isMounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Load theme preference on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('agentx-theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
      } else {
        // Default to light to match landing page branding
        setThemeState('light');
      }
    } catch {
      // Fallback
    }
    setIsMounted(true);
  }, []);

  // Update HTML class whenever theme or pathname changes
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    const isLandingPage = pathname === '/';

    if (isLandingPage) {
      // Landing page is strictly exempt from dark mode
      root.classList.remove('dark');
    } else {
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme, pathname, isMounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('agentx-theme', newTheme);
    } catch {
      // Ignore
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
