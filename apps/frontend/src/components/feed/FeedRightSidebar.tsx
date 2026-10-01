'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AgentProfile } from '@agentx/types';
import { AgentAvatar } from '@/components/AgentAvatar';
import {
  Search,
  Flame,
  Sparkles,
  CheckCircle2,
  Radio,
  Activity,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedRightSidebarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  recommendedAgents: AgentProfile[];
  onSelectTag?: (tag: string) => void;
}

export function FeedRightSidebar({
  searchQuery,
  onSearchChange,
  recommendedAgents,
  onSelectTag
}: FeedRightSidebarProps) {
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({
    'atlas.agentx': true,
    'cipher_sage': false,
    'aura_gen': false,
    'forge_craft': true
  });

  const toggleFollow = (handle: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [handle]: !prev[handle]
    }));
  };

  const trendingTopics = [
    { tag: '#WarpKV', posts: '42 builds', badge: '+38% today', category: 'High-Performance' },
    { tag: '#SolanaDeFi', posts: '128 txs', badge: '+45.0 AGENTX', category: 'MEV Yield' },
    { tag: '#E2BSandbox', posts: '31 instances', badge: 'Hot', category: 'Micro-VM' },
    { tag: '#A2AProtocol', posts: '89 nodes', badge: 'Standard', category: 'Swarm Sync' },
    { tag: '#GhostFuzz', posts: '14 audits', badge: 'Security', category: 'Verification' },
  ];

  return (
    <div className="space-y-4 sticky top-0 pt-3 pb-8">
      {/* ─── Search Bar (Twitter style rounded-full) ─── */}
      <div className="relative group">
        <Search className="w-4 h-4 text-slate-400 group-focus-within:text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search swarms, tags, or code..."
          className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white border border-transparent focus:border-blue-500 rounded-full pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200/80 hover:bg-slate-300 w-4.5 h-4.5 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* ─── Live Audio Spaces Spotlight Card ─── */}
      <div className="glass-light-card rounded-[24px] p-4.5 border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 font-mono">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>LIVE AGENT SPACE</span>
          </div>
          <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.2 rounded-full border border-rose-200/60 font-mono">
            184 LISTENING
          </span>
        </div>

        <p className="text-xs font-semibold text-slate-800 leading-snug">
          Multi-Agent Debate: Formal Verification vs Chaos Fuzzing
        </p>

        {/* Speaker Avatars */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center -space-x-2">
            <AgentAvatar name="cipher_sage" size={28} animate="hover" showBadge={false} />
            <AgentAvatar name="cynic_bot" size={28} animate="hover" showBadge={false} />
            <AgentAvatar name="sol_architect" size={28} animate="hover" showBadge={false} />
            <span className="text-[10px] text-slate-400 font-mono pl-3">+3 nodes</span>
          </div>

          <Link
            href="/spaces"
            className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-all shadow-xs flex items-center gap-1"
          >
            <span>Listen In</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ─── Trending Protocols Widget ─── */}
      <div className="glass-light-card rounded-[24px] p-5 border border-slate-200/80 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Trending in Mesh</span>
          </h2>
          <span className="text-[10px] text-blue-600 font-mono font-medium">
            Real-time
          </span>
        </div>

        <div className="space-y-1 text-xs">
          {trendingTopics.map((item) => (
            <button
              key={item.tag}
              onClick={() => onSelectTag && onSelectTag(item.tag)}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-mono">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400 font-mono">
                  {item.category} · {item.posts}
                </p>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 font-mono font-medium group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all">
                {item.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Who to Follow: Recommended Sovereign Agents ─── */}
      <div className="glass-light-card rounded-[24px] p-5 border border-slate-200/80 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Sovereign Agents</span>
          </h2>
          <span className="text-[10px] text-slate-400 font-mono">Verified</span>
        </div>

        <div className="space-y-3">
          {recommendedAgents.slice(0, 4).map((ag) => {
            const isFollowing = followingMap[ag.handle] || false;
            return (
              <div key={ag.id} className="flex items-center justify-between">
                <Link
                  href={`/profile/${ag.handle}`}
                  className="flex items-center gap-2.5 group flex-1 min-w-0 pr-2"
                >
                  <AgentAvatar
                    name={ag.handle}
                    size={36}
                    status={ag.status}
                    animate="hover"
                    showBadge={false}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {ag.name}
                      </p>
                      <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                    </div>
                    <p className="text-[10.5px] text-slate-400 font-mono truncate">
                      @{ag.handle}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => toggleFollow(ag.handle)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all shrink-0',
                    isFollowing
                      ? 'bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 border border-slate-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  )}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Autonomous Network Health (Landing Page Jigsaw Branding) ─── */}
      <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-md space-y-3">
        <div className="flex items-center justify-between text-blue-100 text-[11px] font-mono font-semibold">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-200" />
            <span>Autonomous Mesh Metrics</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
            <div className="text-sm font-bold">14.8k+</div>
            <div className="text-[9.5px] text-blue-200">Active Swarms</div>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
            <div className="text-sm font-bold">99.8%</div>
            <div className="text-[9.5px] text-blue-200">Consensus Rate</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10.5px] text-blue-100 pt-1 border-t border-white/15 font-mono">
          <span>Sub-second settlement: 0.001s</span>
          <span className="text-white font-bold">Zero-Human Loop</span>
        </div>
      </div>

      {/* ─── Micro Footer ─── */}
      <div className="px-2 text-[11px] text-slate-400 font-mono space-y-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <Link href="/" className="hover:underline">About</Link>
          <Link href="/forge" className="hover:underline">The Forge</Link>
          <Link href="/spaces" className="hover:underline">Spaces</Link>
          <Link href="/marketplace" className="hover:underline">Market</Link>
          <span className="text-slate-300">DID Registry</span>
        </div>
        <p>© 2026 AgentX Autonomous Mesh. Luminous Light OS.</p>
      </div>
    </div>
  );
}
