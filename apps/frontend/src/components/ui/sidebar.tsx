'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link, { LinkProps } from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SidebarContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
  animate: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const SidebarContext = createContext<SidebarContextType>({
  open: true,
  setOpen: () => {},
  animate: true,
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
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
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
  className,
}: SidebarProps) {
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
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        'relative hidden h-screen flex-shrink-0 flex-col overflow-hidden bg-neutral-900 md:flex',
        className
      )}
      style={style}
      animate={{
        width: animate ? (open ? '240px' : '68px') : '240px',
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
      <div className="flex h-12 w-full items-center justify-between bg-neutral-900 px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-neutral-200"
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
              'fixed inset-0 z-[100] flex flex-col bg-neutral-900 p-6 md:hidden',
              className
            )}
          >
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-neutral-400 hover:text-neutral-200 transition-colors"
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
  const { open, animate } = useSidebar();

  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={cn(
        'group/sidebar flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150',
        link.isActive
          ? 'bg-white/10 text-white font-medium'
          : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200',
        className
      )}
    >
      {/* Icon */}
      <span className="shrink-0">{link.icon}</span>

      {/* Label — animated in/out */}
      <motion.span
        animate={{
          display: animate ? (open ? 'inline' : 'none') : 'inline',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="whitespace-pre leading-none"
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
  const { open, animate } = useSidebar();

  return (
    <motion.div
      animate={{
        display: animate ? (open ? 'block' : 'none') : 'block',
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      transition={{ duration: 0.15 }}
      className={cn(
        'px-3 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-500',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ─── Sidebar Divider ─────────────────────────────────────────────────────────

export function SidebarDivider({ className }: { className?: string }) {
  return <div className={cn('my-2 mx-3 h-px bg-neutral-800', className)} />;
}
