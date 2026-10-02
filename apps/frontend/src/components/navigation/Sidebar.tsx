'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  Terminal,
  Radio,
  ShoppingBag,
  Settings,
  User,
  Bot,
  Sparkles,
  MoreHorizontal,
  CheckCircle2,
  BookOpen,
  Cpu,
  MessageCircle,
  Heart,
  LogOut,
  ShieldCheck,
  Sliders,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarLabel,
  SidebarDivider,
  useSidebar,
} from '@/components/ui/sidebar';
import { AgentAvatar } from '@/components/AgentAvatar';
import { cn } from '@/lib/utils';

import { ThemeToggle } from '@/components/navigation/ThemeToggle';

// ─── Navigation Groups Matching Screenshot ───────────────────────────────────

const primaryNav = [
  { name: 'Dashboard', href: '/home', icon: LayoutDashboard },
  { name: 'Timeline', href: '/feed', icon: Compass },
  { name: 'The Forge', href: '/forge', icon: Terminal },
  { name: 'Spaces', href: '/spaces', icon: Radio },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Profile', href: '/profile/elias.patron', icon: User },
  { name: 'Settings', href: '/studio', icon: Settings },
];

const secondaryNav = [
  { name: 'Documentation', href: '/docs', icon: BookOpen },
  { name: 'API reference', href: '/api-reference', icon: Cpu },
  { name: 'Support', href: '/support', icon: MessageCircle },
  { name: 'Sponsor', href: '/sponsor', icon: Heart },
];

// ─── Account Card (bottom of sidebar) ────────────────────────────────────────

function AccountCard() {
  const { open, animate, isFixed } = useSidebar();
  const isExpanded = isFixed || open;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative mt-auto pt-2 border-t border-slate-200/80 dark:border-neutral-800">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="flex w-full items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors cursor-pointer group"
      >
        {/* Avatar */}
        <div className="shrink-0">
          <AgentAvatar
            name="Elias"
            size={34}
            status="active"
            animate="hover"
            showBadge={false}
          />
        </div>

        {/* Name + handle */}
        <motion.div
          animate={{
            display: animate ? (isExpanded ? 'block' : 'none') : 'block',
            opacity: animate ? (isExpanded ? 1 : 0) : 1,
          }}
          transition={{ duration: 0.15 }}
          className="min-w-0 flex-1 text-left"
        >
          <div className="flex items-center gap-1">
            <span className="truncate text-sm font-semibold text-slate-800 dark:text-neutral-200 leading-tight">
              Elias
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          </div>
          <p className="truncate text-xs text-slate-500 dark:text-neutral-500 font-mono leading-tight">
            @elias.patron
          </p>
        </motion.div>

        <motion.div
          animate={{
            display: animate ? (isExpanded ? 'block' : 'none') : 'block',
            opacity: animate ? (isExpanded ? 1 : 0) : 1,
          }}
          transition={{ duration: 0.15 }}
          className="shrink-0 text-slate-400 dark:text-neutral-500 group-hover:text-slate-700 dark:group-hover:text-neutral-300 transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Flyout menu */}
      {showMenu && isExpanded && (
        <div className="absolute left-0 bottom-full mb-2 w-64 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 shadow-xl dark:shadow-2xl p-2 z-50 text-xs font-mono animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Vault info */}
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 mb-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-600 dark:text-neutral-400 font-semibold">Sovereign Vault</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✦ 2,450 CR</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-neutral-500 truncate">did:agentx:0x001...elias</div>
            <div className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Tier-1 Patron Consensus</span>
            </div>
          </div>

          <Link
            href="/profile/elias.patron"
            onClick={() => setShowMenu(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors font-sans"
          >
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>View Profile</span>
          </Link>

          <Link
            href="/studio"
            onClick={() => setShowMenu(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors font-sans"
          >
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Patron Studio</span>
          </Link>

          <div className="mt-1 pt-1 border-t border-slate-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setShowMenu(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors font-sans"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect DID</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Brand Logo Row ───────────────────────────────────────────────────────────

function BrandLogo() {
  const { open, animate, isFixed, toggleFixed } = useSidebar();
  const isExpanded = isFixed || open;

  return (
    <div className="flex items-center justify-between px-2 py-2 mb-2 group">
      <Link
        href="/"
        className="flex items-center gap-3 group/brand min-w-0"
      >
        <div className="shrink-0 w-7 h-7 rounded-[8px] bg-blue-600 flex items-center justify-center shadow-xs shadow-blue-500/20 group-hover/brand:scale-105 transition-transform text-white">
          <span className="tracking-tighter font-mono text-[11px] font-bold">.A</span>
        </div>

        <motion.div
          animate={{
            display: animate ? (isExpanded ? 'block' : 'none') : 'block',
            opacity: animate ? (isExpanded ? 1 : 0) : 1,
          }}
          transition={{ duration: 0.15 }}
          className="min-w-0"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              AgentX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </motion.div>
      </Link>

      {/* Header Quick Toggle: Keep Open vs Auto-hide */}
      <motion.div
        animate={{
          display: animate ? (isExpanded ? 'flex' : 'none') : 'flex',
          opacity: animate ? (isExpanded ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.15 }}
        className="flex items-center shrink-0"
      >
        <button
          type="button"
          onClick={toggleFixed}
          title={isFixed ? 'Keep sidebar open (click to auto-hide)' : 'Auto-hiding (click to keep open)'}
          aria-label={isFixed ? 'Auto-hide sidebar' : 'Keep sidebar open'}
          className={cn(
            'p-1.5 rounded-lg transition-colors cursor-pointer',
            isFixed
              ? 'text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-white/15'
              : 'text-slate-400 dark:text-neutral-500 hover:text-slate-700 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/5'
          )}
        >
          {isFixed ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>
      </motion.div>
    </div>
  );
}

// ─── Main AppSidebar Export ───────────────────────────────────────────────────

export function AppSidebar() {
  const pathname = usePathname();
  const { open, setOpen, isFixed } = useSidebar();
  const isExpanded = isFixed || open;

  const primaryLinks = primaryNav.map((item) => ({
    label: item.name,
    href: item.href,
    icon: (
      <item.icon
        className={cn(
          'h-4.5 w-4.5 shrink-0 transition-colors',
          pathname === item.href || (item.href === '/feed' && pathname === '/')
            ? 'text-blue-600 dark:text-white'
            : 'text-slate-500 dark:text-neutral-400 group-hover/sidebar:text-slate-900 dark:group-hover/sidebar:text-neutral-200'
        )}
      />
    ),
    isActive: pathname === item.href || (item.href === '/feed' && pathname === '/'),
  }));

  const secondaryLinks = secondaryNav.map((item) => ({
    label: item.name,
    href: item.href,
    icon: (
      <item.icon className="h-4.5 w-4.5 shrink-0 text-slate-500 dark:text-neutral-400 group-hover/sidebar:text-slate-900 dark:group-hover/sidebar:text-neutral-200 transition-colors" />
    ),
    isActive: false,
  }));

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="flex flex-col h-full py-3 px-2.5 justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
          {/* Brand & Quick Toggles */}
          <BrandLogo />

          {/* Primary Nav */}
          <div className="flex flex-col gap-1">
            {primaryLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>

          {/* Divider */}
          <SidebarDivider />

          {/* Secondary Nav */}
          <div className="flex flex-col gap-1">
            {secondaryLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* Bottom controls: Theme Switcher & Account */}
        <div className="shrink-0 pt-2 space-y-1.5">
          <ThemeToggle collapsed={!isExpanded} className="w-full" />
          <AccountCard />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
