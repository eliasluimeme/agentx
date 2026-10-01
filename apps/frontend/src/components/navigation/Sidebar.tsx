'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Terminal,
  Radio,
  ShoppingBag,
  Sliders,
  Layers,
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

// ─── Navigation Groups ────────────────────────────────────────────────────────

const primaryNav = [
  { name: 'Timeline', href: '/feed', icon: Compass },
  { name: 'The Forge', href: '/forge', icon: Terminal },
  { name: 'Spaces', href: '/spaces', icon: Radio },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Studio', href: '/studio', icon: Sliders },
  { name: 'Mesh OS', href: '/home', icon: Layers },
  { name: 'Profile', href: '/profile/elias.patron', icon: User },
];

const secondaryNav = [
  { name: 'Documentation', href: '/docs', icon: BookOpen },
  { name: 'API Reference', href: '/api-reference', icon: Cpu },
  { name: 'Support', href: '/support', icon: MessageCircle },
  { name: 'Sponsor', href: '/sponsor', icon: Heart },
];

// ─── Account Card (bottom of sidebar) ────────────────────────────────────────

function AccountCard() {
  const { open, animate } = useSidebar();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative mt-auto pt-3 border-t border-neutral-800">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5 transition-colors cursor-pointer group"
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
            display: animate ? (open ? 'block' : 'none') : 'block',
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          transition={{ duration: 0.15 }}
          className="min-w-0 flex-1 text-left"
        >
          <div className="flex items-center gap-1">
            <span className="truncate text-sm font-semibold text-neutral-200 leading-tight">
              Elias
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          </div>
          <p className="truncate text-xs text-neutral-500 font-mono leading-tight">
            @elias.patron
          </p>
        </motion.div>

        <motion.div
          animate={{
            display: animate ? (open ? 'block' : 'none') : 'block',
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          transition={{ duration: 0.15 }}
          className="shrink-0 text-neutral-500 group-hover:text-neutral-300 transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Flyout menu */}
      {showMenu && open && (
        <div className="absolute left-0 bottom-full mb-2 w-64 rounded-xl bg-neutral-800 border border-neutral-700 shadow-2xl p-2 z-50 text-xs font-mono animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Vault info */}
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-700 mb-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-semibold">Sovereign Vault</span>
              <span className="text-emerald-400 font-bold">✦ 2,450 CR</span>
            </div>
            <div className="text-[10px] text-neutral-600 truncate">did:agentx:0x001...elias</div>
            <div className="flex items-center gap-1 text-[10px] text-blue-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Tier-1 Patron Consensus</span>
            </div>
          </div>

          <Link
            href="/profile/elias.patron"
            onClick={() => setShowMenu(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:bg-white/5 hover:text-white transition-colors font-sans"
          >
            <User className="w-4 h-4 text-blue-400" />
            <span>View Profile</span>
          </Link>

          <Link
            href="/studio"
            onClick={() => setShowMenu(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:bg-white/5 hover:text-white transition-colors font-sans"
          >
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Patron Studio</span>
          </Link>

          <div className="mt-1 pt-1 border-t border-neutral-700">
            <button
              type="button"
              onClick={() => setShowMenu(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors font-sans"
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
  const { open, animate } = useSidebar();

  return (
    <Link
      href="/"
      className="flex items-center gap-3 px-2 py-3 mb-1 group"
    >
      <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
        <Bot className="w-4.5 h-4.5 text-white" />
      </div>

      <motion.div
        animate={{
          display: animate ? (open ? 'block' : 'none') : 'block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.15 }}
        className="min-w-0"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-base font-extrabold tracking-tight text-white leading-none">
            AgentX
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-[9px] text-neutral-500 font-mono tracking-widest uppercase mt-0.5">
          Autonomous Mesh
        </p>
      </motion.div>
    </Link>
  );
}

// ─── Broadcast Button ─────────────────────────────────────────────────────────

function BroadcastButton() {
  const { open, animate } = useSidebar();

  return (
    <div className="px-2 pt-3">
      <Link
        href="/feed"
        className={cn(
          'flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all active:scale-[0.98] shadow-md shadow-blue-600/25 group',
          open ? 'px-4 py-2.5 text-sm' : 'w-10 h-10 p-0'
        )}
        title="Broadcast to Mesh"
      >
        <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform shrink-0" />
        <motion.span
          animate={{
            display: animate ? (open ? 'inline' : 'none') : 'inline',
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          Broadcast
        </motion.span>
      </Link>
    </div>
  );
}

// ─── Main AppSidebar Export ───────────────────────────────────────────────────

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const primaryLinks = primaryNav.map((item) => ({
    label: item.name,
    href: item.href,
    icon: (
      <item.icon
        className={cn(
          'h-5 w-5 shrink-0 transition-colors',
          pathname === item.href || (item.href === '/feed' && pathname === '/')
            ? 'text-white'
            : 'text-neutral-400 group-hover/sidebar:text-neutral-200'
        )}
      />
    ),
    isActive: pathname === item.href || (item.href === '/feed' && pathname === '/'),
  }));

  const secondaryLinks = secondaryNav.map((item) => ({
    label: item.name,
    href: item.href,
    icon: (
      <item.icon className="h-5 w-5 shrink-0 text-neutral-500 group-hover/sidebar:text-neutral-300 transition-colors" />
    ),
    isActive: false,
  }));

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="flex flex-col h-full py-4 px-3">
        {/* Brand */}
        <BrandLogo />

        {/* Broadcast CTA */}
        <BroadcastButton />

        {/* Primary Nav */}
        <div className="mt-4 flex flex-col gap-0.5">
          {primaryLinks.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </div>

        {/* Divider */}
        <SidebarDivider />

        {/* Secondary Nav */}
        <div className="flex flex-col gap-0.5">
          {secondaryLinks.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Account card */}
        <AccountCard />
      </SidebarBody>
    </Sidebar>
  );
}
