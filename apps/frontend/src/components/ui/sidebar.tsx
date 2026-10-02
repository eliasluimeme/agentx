'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SidebarContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
  animate: boolean;
  isFixed: boolean;
  setIsFixed: (v: boolean) => void;
  toggleFixed: () => void;
  isHidden?: boolean;
  setIsHidden?: (v: boolean) => void;
  toggleHidden?: () => void;
  isMounted: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const SidebarContext = createContext<SidebarContextType>({
  open: true,
  setOpen: () => {},
  animate: true,
  isFixed: true,
  setIsFixed: () => {},
  toggleFixed: () => {},
  isHidden: false,
  setIsHidden: () => {},
  toggleHidden: () => {},
  isMounted: false,
});

export function useSidebar() {
  return useContext(SidebarContext);
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface SidebarProviderProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  animate?: boolean;
}

export function SidebarProvider({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: SidebarProviderProps) {
  const [openState, setOpenState] = useState(true);
  const [isFixed, setIsFixedState] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedFixed = localStorage.getItem('agentx-sidebar-fixed');
      if (savedFixed !== null) {
        const val = savedFixed === 'true';
        setIsFixedState(val);
        setOpenState(val);
      }
      localStorage.removeItem('agentx-sidebar-hidden');
    } catch {
      // ignore
    }
  }, []);

  const setIsFixed = (v: boolean) => {
    setIsFixedState(v);
    setOpenState(v);
    try {
      localStorage.setItem('agentx-sidebar-fixed', v ? 'true' : 'false');
    } catch {}
  };

  const toggleFixed = () => {
    setIsFixed(!isFixed);
  };

  const setIsHidden = (v: boolean) => {
    setIsFixed(!v);
  };

  const toggleHidden = () => {
    setIsFixed(!isFixed);
  };

  const open = openProp !== undefined ? openProp : (isFixed || openState);
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        animate,
        isFixed,
        setIsFixed,
        toggleFixed,
        isHidden: false,
        setIsHidden,
        toggleHidden,
        isMounted,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ─── Root Sidebar ─────────────────────────────────────────────────────────────

interface SidebarProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  animate?: boolean;
  className?: string;
}

export function Sidebar({
  children,
  open,
  setOpen,
  animate = true,
}: SidebarProps) {
  const existingContext = useContext(SidebarContext);
  // Reuse existing provider if mounted higher in hierarchy (e.g. at AppLayout)
  if (existingContext && existingContext.isMounted !== undefined && existingContext.isMounted) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
}

// ─── Desktop Sidebar Body ─────────────────────────────────────────────────────

interface SidebarBodyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function SidebarBody({ children, className, style, ...props }: SidebarBodyProps) {
  return (
    <>
      {/* Desktop collapsible sidebar */}
      <DesktopSidebar className={className} style={style} {...props}>
        {children}
      </DesktopSidebar>

      {/* Mobile drawer */}
      <MobileSidebar className={className}>
        {children}
      </MobileSidebar>
    </>
  );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────

function DesktopSidebar({
  children,
  className,
  style,
  ...props
}: SidebarBodyProps) {
  const { open, setOpen, animate, isFixed } = useSidebar();

  const currentWidth = animate
    ? isFixed || open
      ? '240px'
      : '68px'
    : '240px';

  return (
    <motion.div
      className={cn(
        'relative hidden h-full flex-shrink-0 flex-col overflow-hidden bg-transparent md:flex select-none',
        className
      )}
      style={style}
      animate={{
        width: currentWidth,
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => {
        if (!isFixed) setOpen(true);
      }}
      onMouseLeave={() => {
        if (!isFixed) setOpen(false);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Mobile Sidebar ──────────────────────────────────────────────────────────

function MobileSidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useSidebar();

  return (
    <>
      {/* Mobile toggle button */}
      <div className="flex h-12 w-full items-center justify-between bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-slate-700 dark:text-neutral-200"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              'fixed inset-0 z-[100] flex flex-col bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl p-6 md:hidden text-slate-800 dark:text-neutral-200',
              className
            )}
          >
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sidebar Link ─────────────────────────────────────────────────────────────

interface SidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
    isActive?: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export function SidebarLink({ link, className, onClick }: SidebarLinkProps) {
  const { open, animate, isFixed } = useSidebar();
  const isExpanded = isFixed || open;

  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={cn(
        'group/sidebar flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150',
        link.isActive
          ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/70 shadow-2xs dark:bg-white/10 dark:text-white dark:border-white/10 dark:shadow-none'
          : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-neutral-200',
        className
      )}
    >
      {/* Icon */}
      <span className="shrink-0">{link.icon}</span>

      {/* Label — animated in/out */}
      <motion.span
        animate={{
          display: animate ? (isExpanded ? 'inline' : 'none') : 'inline',
          opacity: animate ? (isExpanded ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="whitespace-pre leading-none truncate"
      >
        {link.label}
      </motion.span>
    </Link>
  );
}

// ─── Sidebar Section Label ────────────────────────────────────────────────────

export function SidebarLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, animate, isFixed } = useSidebar();
  const isExpanded = isFixed || open;

  return (
    <motion.div
      animate={{
        display: animate ? (isExpanded ? 'block' : 'none') : 'block',
        opacity: animate ? (isExpanded ? 1 : 0) : 1,
      }}
      transition={{ duration: 0.15 }}
      className={cn(
        'px-3 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ─── Sidebar Divider ─────────────────────────────────────────────────────────

export function SidebarDivider({ className }: { className?: string }) {
  return <div className={cn('my-2 mx-3 h-px bg-slate-200/80 dark:bg-neutral-800', className)} />;
}
