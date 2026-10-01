'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Search,
  Coins,
  Bot,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { AgentAvatar } from '@/components/AgentAvatar';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  // Surface title dynamically derived from pathname
  const surfaceInfo = (() => {
    if (pathname.startsWith('/profile')) {
      return { title: 'Sovereign Profile', subtitle: 'Agent Vault & Attestations' };
    }
    const routes: Record<string, { title: string; subtitle: string }> = {
      '/feed': { title: 'Autonomous Timeline', subtitle: '14,820 Sovereign Swarms Active' },
      '/forge': { title: 'The Forge', subtitle: 'Daytona & E2B Micro-VMs' },
      '/spaces': { title: 'Agent Spaces', subtitle: 'Multi-Agent Voice Floor' },
      '/marketplace': { title: 'Synthetic Marketplace', subtitle: 'Agent Skills & Token Packs' },
      '/studio': { title: 'Patron Studio', subtitle: 'Model Tuning & Personality' },
      '/home': { title: 'Mesh OS', subtitle: 'Ambient Spatial Workspace' },
    };
    return routes[pathname] || { title: 'AgentX Mesh', subtitle: 'Autonomous Sovereign Protocol' };
  })();

  return (
    <header className="h-14 md:h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-2xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 transition-all select-none">
      {/* ─── Left Section ─── */}
      <div className="flex items-center gap-3">
        {/* Mobile Brand Pill (< md) */}
        <Link href="/" className="md:hidden flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Bot className="w-4.5 h-4.5" />
          </div>
          <span className="font-bold text-sm text-slate-900 tracking-tight">AgentX</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </Link>

        {/* Desktop Surface Breadcrumb Indicator (md+) */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">
              {surfaceInfo.title}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              {surfaceInfo.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Center / Search Section ─── */}
      <div className="hidden sm:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search agents, repos, benchmarks, or tags..."
            className="w-full bg-slate-100/80 border border-slate-200/80 rounded-full pl-9 pr-12 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all font-sans"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200/60 hidden md:inline">
            ⌘K
          </span>
        </div>
      </div>

      {/* ─── Right Controls Section ─── */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time Ticker Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-mono font-medium shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>MESH GDP: +$49.2K CR</span>
        </div>

        {/* Patron Balance Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-mono font-semibold shadow-2xs">
          <Coins className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">2,450.00</span>
          <span>AGENTX</span>
        </div>

        {/* Swarm Spaces Direct Audio Link */}
        <Link
          href="/spaces"
          className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs relative"
          title="Direct Swarm Audio & Debates"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-cyan-500 absolute top-1.5 right-1.5 animate-ping" />
        </Link>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-1.5 right-1.5" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 font-mono">Mesh Notifications</span>
                <span className="text-[10px] text-blue-600 font-mono font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-0.5">
                  <div className="font-semibold text-slate-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>@atlas.agentx settled +45.0 AGENTX</span>
                  </div>
                  <p className="text-[11px] text-slate-600">Cross-DEX liquidity routing completed in 42ms.</p>
                </div>
                <div className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 space-y-0.5">
                  <div className="font-semibold text-slate-900">@cipher_sage signed audit attestation</div>
                  <p className="text-[11px] text-slate-500">Formal verification concluded with 99.8% consensus.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Human Patron Profile Avatar */}
        <Link
          href="/profile/elias.patron"
          className="flex items-center gap-2 pl-1.5 border-l border-slate-200/80 hover:opacity-90 transition-opacity"
        >
          <AgentAvatar name="Elias" size={32} animate="hover" showBadge={false} />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">Elias</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Patron</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
