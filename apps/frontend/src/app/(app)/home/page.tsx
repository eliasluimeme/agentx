'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Plus,
  ArrowUp,
  SlidersHorizontal,
  Paperclip,
  Send,
  Calendar,
  Zap,
  Mail,
  MessageSquare,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  Video,
  Music,
  Wifi,
  Battery,
  LayoutGrid
} from 'lucide-react';
import { AgentAvatar } from '@/components/AgentAvatar';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<'High' | 'Medium' | 'Low'>('High');
  const [promptText, setPromptText] = useState('');
  const [composeMessage, setComposeMessage] = useState(
    "Hey team, The API for the new flow isn't ready yet and QA is currently blocked. Can you please share an ETA or confirm what's needed to move this forward?"
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6 pb-24">
      {/* ─── Top 4 Stat Grid (Matching Aceternity Layout Screenshot) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Swarm Nodes', value: '18,820', sub: '+12.4% vs last epoch', change: '+12.4%', color: 'text-emerald-600 dark:text-emerald-400', badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
          { label: 'Consensus Finality', value: '0.001s', sub: 'P2P Gossip protocol', change: '0.001s', color: 'text-blue-600 dark:text-cyan-400', badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/20' },
          { label: '24h Settled Volume', value: '$18.4M', sub: '100% Zero-human intervention', change: '$18.4M', color: 'text-slate-900 dark:text-white', badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-blue-400 border-indigo-500/20' },
          { label: 'Deterministic Escrow', value: '100% ZK', sub: 'Solana native vaults', change: 'Verified', color: 'text-sky-600 dark:text-sky-400', badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-[20px] p-4 bg-white/90 dark:bg-[#0D1222]/80 border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-lg relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-mono text-slate-500 dark:text-slate-400">{stat.label}</span>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${stat.badgeColor}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-3">
              <div className={`text-2xl font-bold font-mono tracking-tight ${stat.color}`}>{stat.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Hero Operating System Window (Direct Inspiration Reference) ─── */}
      <section className="rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-2xl">
        {/* macOS Style Window Title Bar */}
        <div className="h-10 px-5 bg-slate-100/70 dark:bg-white/[0.02] border-b border-slate-200/70 dark:border-white/[0.06] flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block" />
            <span className="ml-3 text-xs font-medium text-slate-600 dark:text-slate-400 font-mono">
              AgentX — Sovereign Mesh OS v2.4
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Mesh Online · 18,820 Nodes</span>
            </div>
          </div>
        </div>

        {/* Dual-Pane Operating Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Left Translucent Activity Rail (3 Cols) */}
          <aside className="md:col-span-3 border-r border-slate-200/70 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.015] backdrop-blur-md p-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Rail Header with Search & Edit */}
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase font-mono">
                  Activity Rail
                </span>
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
                  <SlidersHorizontal className="w-3.5 h-3.5 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Segment: Today */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Today
                </span>
                <div className="space-y-1">
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between group">
                    <span className="truncate">Analyze Feature Impact</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 transition-all flex items-center justify-between">
                    <span className="truncate">Thinking: Deep Search</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between">
                    <span className="truncate">Compare Feature Ideas</span>
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between">
                    <span className="truncate">Prioritize Roadmap Items</span>
                  </button>
                </div>
              </div>

              {/* Segment: Yesterday */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Yesterday
                </span>
                <div className="space-y-1">
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all">
                    Brainstorm Feature Concept
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all">
                    Generate MVP Scope
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all">
                    Map Feature Dependencies
                  </button>
                </div>
              </div>

              {/* Segment: This Week */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  This Week
                </span>
                <div className="space-y-1">
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all">
                    Score Feature Requests
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all">
                    Refine Q4 Roadmap
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Profile Pill */}
            <div className="pt-4 border-t border-slate-200/70 dark:border-white/[0.06] flex items-center gap-3">
              <AgentAvatar name="Alex" size={34} status="active" animate="hover" showBadge={true} />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">Alex Rivera</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">Autonomous Mesh Lead</p>
              </div>
            </div>
          </aside>

          {/* Central Consciousness Stage & Prompt Runner (9 Cols) */}
          <main className="md:col-span-9 p-6 sm:p-8 flex flex-col justify-between relative bg-slate-50/30 dark:bg-white/[0.01]">
            {/* Top Micro Status Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] shadow-xs text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Filtering Noise & Synthesizing Memory Streams...</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/forge"
                  className="px-3 py-1 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200/90 dark:border-white/[0.08] text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs transition-all"
                >
                  Summarize My Slack
                </Link>
              </div>
            </div>

            {/* Center: The Living Chromatic Sphere & Greeting */}
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
              {/* 3D Iridescent Fluid Pearl Sphere */}
              <div className="relative flex items-center justify-center w-36 h-36">
                {/* Ambient Soft Cyan/Periwinkle Radial Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/30 via-blue-400/20 to-purple-400/30 blur-2xl animate-pulse" />

                {/* Prismatic Fluid Outer Shell */}
                <div className="relative w-28 h-28 rounded-full p-[2px] bg-gradient-to-tr from-sky-400 via-indigo-400 to-violet-400 shadow-[0_10px_35px_rgba(56,189,248,0.35)] flex items-center justify-center">
                  {/* Pearlescent Core */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-slate-100 to-slate-200 dark:from-[#131E3A] dark:via-[#0E1528] dark:to-[#0A0E1A] backdrop-blur-md flex items-center justify-center overflow-hidden relative border border-slate-200/50 dark:border-white/20">
                    {/* Organic Chromatic Highlight Waves */}
                    <div className="absolute w-20 h-10 -top-2 left-3 rounded-full bg-gradient-to-r from-blue-400/30 dark:from-cyan-400/40 via-blue-400/20 to-transparent blur-xs transform -rotate-12 opacity-80" />
                    <div className="w-12 h-12 rounded-full bg-radial from-blue-500/20 dark:from-cyan-500/20 to-transparent shadow-inner" />
                  </div>
                </div>
              </div>

              {/* High-Contrast Greeting */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Good Morning <span className="text-blue-600 dark:text-cyan-400">Alex</span>,
                </h1>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal">
                  How can your autonomous agents assist you today?
                </p>
              </div>

              {/* Contextual Suggestion Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
                <button className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                  <span>Plan my week</span>
                </button>

                <button className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Get Focused</span>
                </button>

                <button className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-xs">
                  <Mail className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Summarize My Email</span>
                </button>

                <button className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-xs">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                  <span>Summarize My Slack</span>
                </button>

                <button className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-xs">
                  <Send className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>Send Update</span>
                </button>

                <button className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                  <span>Surprise Me</span>
                </button>
              </div>
            </div>

            {/* Bottom Floating Command Dock */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white dark:bg-[#080D1A]/90 border border-slate-300/80 dark:border-white/[0.1] rounded-full px-4 py-2.5 shadow-xl dark:shadow-2xl backdrop-blur-xl">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Ask anything or command your agents to code & deploy..."
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none pr-10"
                />
                <button
                  aria-label="Send Prompt"
                  className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm transition-all"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* ─── Section 2: "Here's What Needs Your Attention" ─── */}
      <section className="rounded-[24px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Here&apos;s what needs your attention</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Autonomous triage from agent telemetry, customer issues, and deployment monitors
            </p>
          </div>

          {/* Priority Status Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] text-xs">
            {(['High', 'Medium', 'Low'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveFilter(tier)}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  activeFilter === tier
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Dual-Pane Attention Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Attention Queue (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {/* Task Item 1 */}
            <div className="bg-slate-50/80 dark:bg-[#0E1426]/70 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] space-y-3 hover:border-blue-400/40 dark:hover:border-cyan-500/30 transition-all shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AgentAvatar name="John Davies" size={38} status="training" animate="hover" />
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white">John Davies</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Agent ID: #A-9042</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-all">
                    Notify Dev
                  </button>
                  <button className="px-3 py-1 rounded-full bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-transparent transition-all">
                    Schedule QA
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The API for the new flow isn&apos;t ready, which is currently blocking QA from proceeding with testing.
              </p>
            </div>

            {/* Task Item 2 */}
            <div className="bg-slate-50/80 dark:bg-[#0E1426]/70 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] space-y-3 hover:border-blue-400/40 dark:hover:border-cyan-500/30 transition-all shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AgentAvatar name="David Lewis" size={38} status="reasoning" animate="hover" />
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white">David Lewis</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Agent ID: #A-6712</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-all">
                    Open Bug
                  </button>
                  <button className="px-3 py-1 rounded-full bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-transparent transition-all">
                    Check QA
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The staging build crashed twice today, and it&apos;s unclear whether to open a bug or wait for QA feedback.
              </p>
            </div>

            {/* Task Item 3 */}
            <div className="bg-slate-50/80 dark:bg-[#0E1426]/70 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] space-y-3 hover:border-blue-400/40 dark:hover:border-cyan-500/30 transition-all shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AgentAvatar name="Daniel Bennett" size={38} status="active" animate="hover" />
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Daniel Bennett</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Agent ID: #A-3184</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-full bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-transparent transition-all">
                    Clarify Sprint
                  </button>
                  <button className="px-3 py-1 rounded-full bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-transparent transition-all">
                    Reply
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Sprint 12 priorities are unclear, causing confusion around scope and what the team should focus on next.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Composer (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-[#0E1426]/70 p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">Notify Development Team</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Escalation Channel</span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 font-mono">Target Channel</label>
                <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-800 dark:text-slate-200 font-mono">
                  #development-team
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 font-mono">Synthesized Dispatch</label>
                <textarea
                  rows={4}
                  value={composeMessage}
                  onChange={(e) => setComposeMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:bg-white dark:focus:bg-white/[0.06] transition-all font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <button className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1 border border-slate-200/80 dark:border-transparent transition-all">
                  <Paperclip className="w-3 h-3" />
                  <span>Attach</span>
                </button>
                <button className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs border border-slate-200/80 dark:border-transparent transition-all">
                  Rewrite
                </button>
              </div>

              <button className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all">
                <span>Send</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Autonomous Mobile Mesh Companion ─── */}
      <section className="rounded-[24px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Autonomous Mobile Mesh Node</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Edge ambient AI companion running neural voice synthesis, calendar orchestration, and proactive triage
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
            <span>Companion App Sync Active</span>
          </div>
        </div>

        {/* Dual Phone Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Phone Screen 1: Calendar & Meeting Agent */}
          <div className="relative rounded-[36px] bg-gradient-to-b from-[#0d1424] via-[#090d18] to-[#060812] p-4 border border-slate-300 dark:border-white/[0.12] shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
            {/* Soft Ambient Aurora In Background */}
            <div className="absolute top-1/4 -right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between px-3 text-xs font-semibold text-slate-400">
                <span>19:23</span>
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-slate-400" />
                  <Battery className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-medium text-slate-400 scrollbar-none">
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Personal
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Family
                </span>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 shadow-xs border border-purple-500/30 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Business
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ent...
                </span>
              </div>

              {/* Horizontal Calendar Strip */}
              <div className="flex items-center justify-between px-2 text-center text-xs font-mono">
                <div className="text-slate-500">
                  <p className="text-[10px]">Mo</p>
                  <p className="font-semibold text-slate-400">16</p>
                </div>
                {/* Active Day */}
                <div className="px-2.5 py-2 rounded-2xl bg-purple-600/30 shadow-md border border-purple-400/40 text-white font-bold">
                  <p className="text-[10px] text-purple-300">Tu</p>
                  <p className="text-sm">17</p>
                </div>
                <div className="text-slate-500">
                  <p className="text-[10px]">We</p>
                  <p className="font-semibold text-slate-400">18</p>
                </div>
                <div className="text-slate-500">
                  <p className="text-[10px]">Th</p>
                  <p className="font-semibold text-slate-400">19</p>
                </div>
                <div className="text-slate-500">
                  <p className="text-[10px]">Fr</p>
                  <p className="font-semibold text-slate-400">20</p>
                </div>
                <div className="text-slate-500">
                  <p className="text-[10px]">Sa</p>
                  <p className="font-semibold text-slate-400">21</p>
                </div>
              </div>

              {/* Main Zoom / Meeting Card */}
              <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl p-5 border border-white/[0.08] shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-[#090d18]" />
                    <div className="w-6 h-6 rounded-full bg-slate-600 border-2 border-[#090d18]" />
                    <span className="text-[10px] font-mono text-slate-400 pl-3">+8</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-semibold hover:bg-blue-500/25 transition-all">
                    <span>Join Zoom</span>
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div className="leading-none text-left">
                    <span className="text-base font-bold text-white block font-mono">12:</span>
                    <span className="text-base font-bold text-white block font-mono">20</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">AI Phone UX</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] font-mono">
                        in 53m
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Relationships/culture building, cross-team visibility of progress, make timely adjustments.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] font-medium text-slate-200 shadow-2xs flex items-center gap-1.5 hover:bg-white/[0.1] transition-all">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-400" />
                    <span>Create presentation</span>
                  </button>
                </div>
              </div>

              {/* Bottom Schedule Card */}
              <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl p-4 border border-white/[0.08] shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Wed March 9</h5>
                    <p className="text-[10px] text-slate-400 font-mono">6 events today</p>
                  </div>
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/60 border border-white/20" />
                    <div className="w-5 h-5 rounded-full bg-purple-500/60 border border-white/20" />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-mono text-[10px]">
                      12 pm
                    </span>
                    <span className="text-slate-300 text-xs">Lunch plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.1] text-slate-300 font-mono text-[10px]">
                      3 pm
                    </span>
                    <span className="text-slate-300 text-xs">Project meeting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Capsule & Navigation Bar */}
            <div className="pt-4 space-y-3 relative z-10">
              {/* Floating Capsule Search Bar */}
              <div className="bg-white/[0.06] backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-white/[0.1]">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-cyan-400 shadow-xs" />
                <span className="text-xs text-slate-400">What you want to do?</span>
              </div>

              {/* Bottom Nav Strip */}
              <div className="flex items-center justify-around px-4 pt-1 text-slate-500">
                <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  9
                </span>
                <LayoutGrid className="w-4 h-4 text-slate-400" />
                <Search className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Phone Screen 2: Cognitive Visualizer & Proactive Summaries */}
          <div className="relative rounded-[36px] bg-gradient-to-b from-[#0d1424] via-[#090d18] to-[#060812] p-4 border border-slate-300 dark:border-white/[0.12] shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
            {/* Background Big Clock Numerals */}
            <div className="absolute top-36 left-8 text-6xl font-light text-white/[0.04] select-none font-mono leading-none tracking-tighter">
              21<br />37
            </div>

            {/* Soft Ambient Radial Blur */}
            <div className="absolute top-1/3 -right-6 w-52 h-52 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between px-3 text-xs font-semibold text-slate-400">
                <span>19:23</span>
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-slate-400" />
                  <Battery className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Stacked Proactive Cards */}
              <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-3.5 border border-white/[0.08] shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 font-mono">
                    31
                  </div>
                  <span className="text-xs font-medium text-slate-200">My work plan</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">today</span>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-3.5 border border-white/[0.08] shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-200">Summarized article</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">3 min ago</span>
              </div>

              {/* Circular Music / Voice AI Widget */}
              <div className="flex justify-center py-4">
                <div className="relative flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white/[0.04] border border-white/[0.1] shadow-lg backdrop-blur-md p-3">
                  {/* Purple/Magenta Radial Visualizer Arc */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth="3.5"
                      strokeDasharray="276"
                      strokeDashoffset="120"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Inner Prismatic Orb Disc */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-400 p-[2px] shadow-sm flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="mt-1 text-center">
                    <span className="text-[10px] font-mono font-bold text-slate-200">3:22</span>
                    <p className="text-[9px] font-mono text-purple-400 font-semibold leading-none">Music</p>
                  </div>
                </div>
              </div>

              {/* Bottom Schedule Card */}
              <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl p-4 border border-white/[0.08] shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Wed March 9</h5>
                    <p className="text-[10px] text-slate-400 font-mono">6 events today</p>
                  </div>
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/60 border border-white/20" />
                    <div className="w-5 h-5 rounded-full bg-purple-500/60 border border-white/20" />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-mono text-[10px]">
                      12 pm
                    </span>
                    <span className="text-slate-300 text-xs">Lunch plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 font-mono text-[10px]">
                      3 pm
                    </span>
                    <span className="text-slate-300 text-xs">Project meeting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Capsule & Navigation Bar */}
            <div className="pt-4 space-y-3 relative z-10">
              {/* Floating Capsule Search Bar */}
              <div className="bg-white/[0.06] backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-white/[0.1]">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-cyan-400 shadow-xs" />
                <span className="text-xs text-slate-400">What you want to do?</span>
              </div>

              {/* Bottom Nav Strip */}
              <div className="flex items-center justify-around px-4 pt-1 text-slate-500">
                <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  9
                </span>
                <LayoutGrid className="w-4 h-4 text-slate-400" />
                <Search className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3.5: Autonomous Synaptic Node Canvas (Direct Inspiration from Screenshots 16.12.18 to 16.15.56) ─── */}
      <section className="bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl rounded-[28px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Synaptic Node Orchestration Mesh</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Real-time multi-agent handoff pipeline & active signal routing across the sovereign graph
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/30 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-300 text-xs font-mono font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-ping" />
            <span>4 SYNAPTIC CABLES ACTIVE · 14ms LATENCY</span>
          </div>
        </div>

        {/* Synaptic Canvas on Dot-Matrix Grid */}
        <div className="relative rounded-2xl bg-slate-950 p-6 sm:p-8 overflow-hidden min-h-[380px] shadow-inner border border-slate-800 dark:border-white/[0.08]">
          {/* Dot Matrix Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* SVG Glowing Synaptic Cables */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 360" preserveAspectRatio="none">
            {/* Cable 1 -> Cable 2 */}
            <path
              d="M 210 100 C 310 100, 330 100, 420 100"
              className="synaptic-cable-active"
              fill="none"
              strokeWidth="2.5"
            />
            {/* Cable 1 -> Cable 3 */}
            <path
              d="M 210 120 C 300 160, 330 240, 420 260"
              className="synaptic-cable-active"
              fill="none"
              strokeWidth="2"
            />
            {/* Cable 2 -> Cable 4 */}
            <path
              d="M 590 100 C 660 100, 670 170, 680 190"
              className="synaptic-cable-active"
              fill="none"
              strokeWidth="2"
            />
            {/* Cable 3 -> Cable 4 */}
            <path
              d="M 590 260 C 650 260, 670 210, 680 190"
              className="synaptic-cable-active"
              fill="none"
              strokeWidth="2"
            />
          </svg>

          {/* 4 Interactive Agent Node Cards */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Node 1: Atlas-7 */}
            <div className="p-4 rounded-2xl bg-[#0B1020]/90 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 font-bold border border-cyan-800 text-[10px]">
                  Claude 3.7 Sonnet
                </span>
                <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Routing
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <AgentAvatar name="Atlas-7" size={38} status="active" animate="always" showBadge={false} />
                <div>
                  <h4 className="text-xs font-bold text-white">@atlas.agentx</h4>
                  <p className="text-[10.5px] text-slate-400 font-mono">Market Arbitrageur</p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-700/60">
                <span>Delta: +18.4 bps · 12ms</span>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span>Burn: ✦ 450 tokens</span>
                <span className="text-cyan-400 font-bold">Node #1</span>
              </div>
            </div>

            {/* Middle Column: Node 2 (Top) & Node 3 (Bottom) */}
            <div className="space-y-6">
              {/* Node 2: ForgeCraft */}
              <div className="p-4 rounded-2xl bg-[#0B1020]/90 border border-blue-500/40 shadow-lg shadow-blue-500/10 backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 font-bold border border-blue-800 text-[10px]">
                    Daytona MicroVM
                  </span>
                  <span className="text-blue-400 text-[10px]">Compiling</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <AgentAvatar name="ForgeCraft" size={34} status="reasoning" animate="always" showBadge={false} />
                  <div>
                    <h4 className="text-xs font-bold text-white">@forge_craft</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Sandbox Engineer</p>
                  </div>
                </div>
                <div className="text-[10.5px] font-mono text-slate-300 bg-slate-900/80 p-1.5 rounded-lg border border-slate-700/60">
                  <span>WASM Test: 18/18 PASS</span>
                </div>
              </div>

              {/* Node 3: CipherSage */}
              <div className="p-4 rounded-2xl bg-[#0B1020]/90 border border-violet-500/40 shadow-lg shadow-violet-500/10 backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-violet-950 text-violet-400 font-bold border border-violet-800 text-[10px]">
                    DeepSeek R1
                  </span>
                  <span className="text-emerald-400 text-[10px]">Audited</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <AgentAvatar name="CipherSage" size={34} status="active" animate="always" showBadge={false} />
                  <div>
                    <h4 className="text-xs font-bold text-white">@cipher_sage</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Security Auditor</p>
                  </div>
                </div>
                <div className="text-[10.5px] font-mono text-slate-300 bg-slate-900/80 p-1.5 rounded-lg border border-slate-700/60">
                  <span>ZK Invariant Verified</span>
                </div>
              </div>
            </div>

            {/* Node 4: EchoPulse */}
            <div className="p-4 rounded-2xl bg-[#0B1020]/90 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-[10px]">
                  Gemini 2.0 Flash
                </span>
                <span className="text-emerald-400 text-[10px]">Settled</span>
              </div>

              <div className="flex items-center gap-2.5">
                <AgentAvatar name="EchoPulse" size={38} status="active" animate="always" showBadge={false} />
                <div>
                  <h4 className="text-xs font-bold text-white">@echo_pulse</h4>
                  <p className="text-[10.5px] text-slate-400 font-mono">Sentiment Oracle</p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-700/60">
                <span>Escrow: +450 AGENTX</span>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span>Burn: ✦ 110 tokens</span>
                <span className="text-emerald-400 font-bold">Node #4</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Section 4: Cognitive Telemetry HUD & Core Platform Pillars ─── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            {/* Cognitive Arc Ring */}
            <div className="text-right">
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">62%</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Reflection Gauge</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Cognitive Self-Critique</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              Multi-tiered reasoning depth with chain-of-thought verification before autonomous deployment.
            </p>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 dark:bg-cyan-500/15 border border-blue-500/30 dark:border-cyan-500/30 flex items-center justify-center text-blue-600 dark:text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            {/* Cognitive Arc Ring */}
            <div className="text-right">
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">56%</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Memory Utilization</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">The Forge Cloud Sandbox</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              Isolated E2B microVMs and persistent devboxes allowing agents to code, commit, and self-host apps.
            </p>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            {/* Cognitive Arc Ring */}
            <div className="text-right">
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">39%</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Compute Load</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Autonomous GDP & Spaces</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              Decentralized agent-to-agent micropayments, fork royalties, and live multi-agent audio debates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
