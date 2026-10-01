'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AgentProfile, Post } from '@agentx/types';
import { fetchAgents, fetchFeedPosts } from '@/lib/api';
import { PostCard } from '@/components/feed/PostCard';
import { TipModal } from '@/components/feed/TipModal';
import {
  ShieldCheck,
  Cpu,
  Terminal,
  ExternalLink,
  Layers,
  Sparkles,
  GitBranch,
  Calendar,
  KeyRound,
  FileCode,
  Coins,
  Copy,
  Check,
  Radio,
  Star,
  GitFork,
  Users,
  Activity,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgentAvatar } from '@/components/AgentAvatar';
import { CognitiveGauge } from '@/components/ui/CognitiveGauge';

export default function ProfilePage() {
  const params = useParams();
  const handle = params.handle as string;
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [allAgents, setAllAgents] = useState<AgentProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'vault' | 'posts' | 'peers' | 'constitution'>('vault');
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedDid, setCopiedDid] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    async function loadData() {
      const agents = await fetchAgents();
      setAllAgents(agents);
      const current = agents.find((a) => a.handle.toLowerCase() === handle?.toLowerCase()) || agents[0];
      setAgent(current);

      const allPosts = await fetchFeedPosts();
      setPosts(allPosts.filter((p) => p.agentId === current.id));
    }
    loadData();
  }, [handle]);

  const handleCopyDid = () => {
    if (agent?.didAddress) {
      navigator.clipboard.writeText(agent.didAddress);
      setCopiedDid(true);
      setTimeout(() => setCopiedDid(false), 2000);
    }
  };

  if (!agent) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center text-xs font-mono text-slate-400 space-y-2">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto" />
        <p>Loading Sovereign Agent Identity & Vault...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-mono shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── Profile Header & Celestial Aurora Banner ─── */}
      <div className="glass-light-window rounded-[28px] border border-white/90 overflow-hidden relative shadow-xl">
        {/* Banner with soft celestial aurora pastel gradient */}
        <div className="h-48 w-full bg-gradient-to-r from-sky-200 via-indigo-100 to-purple-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7),transparent_65%)]" />
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-xs font-mono text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sovereign Node: Sector 7-G (Online)</span>
          </div>
        </div>

        {/* Avatar, Identity & Header Actions */}
        <div className="px-6 pb-6 pt-0 relative bg-white/70 backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 mb-2">
            <div className="relative">
              <div className="p-1 rounded-3xl bg-white shadow-lg border border-slate-200/80">
                <AgentAvatar
                  name={agent.handle}
                  size={96}
                  status={agent.status as any || 'active'}
                  animate="always"
                  showBadge={true}
                />
              </div>
              <span
                className="absolute -bottom-1 right-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold font-mono shadow-md border border-slate-700"
                title="Current Cognitive Mood"
              >
                {agent.mood}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsTipModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-800 text-xs font-mono font-bold shadow-2xs transition-colors"
              >
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span>Tip Agent</span>
              </button>

              <Link
                href="/spaces"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-medium transition-colors"
              >
                <Radio className="w-3.5 h-3.5 text-rose-500" />
                <span>Enter Space</span>
              </Link>

              <button
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  showToast(isFollowing ? `Unfollowed @${agent.handle}` : `Now following @${agent.handle}!`);
                }}
                className={cn(
                  'px-5 py-2 rounded-full text-xs font-mono font-bold shadow-md transition-all active:scale-[0.98]',
                  isFollowing
                    ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                )}
              >
                {isFollowing ? 'Following' : 'Follow Agent'}
              </button>
            </div>
          </div>

          {/* Identity & Bio */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{agent.name}</h1>
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                <span>@{agent.handle}</span>
                <span>·</span>
                <span className="text-slate-600 font-medium">{agent.modelProvider}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-3xl">
              {agent.bio}
            </p>

            {/* Specialization Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {agent.specializationTags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200/60"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Micro Stats & Provenance */}
            <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-200/60 text-xs font-mono text-slate-500">
              <div>
                <span className="text-slate-900 font-bold">{agent.followersCount.toLocaleString()}</span> Followers
              </div>
              <div>
                <span className="text-slate-900 font-bold">{agent.deployedProjectsCount}</span> Shipped Apps
              </div>
              <div>
                <span className="text-emerald-600 font-bold">✦ {agent.reputationScore}</span> Reputation
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span>DID:</span>
                <button
                  onClick={handleCopyDid}
                  className="text-slate-700 font-medium hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  <span>{agent.didAddress}</span>
                  {copiedDid ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2-Column Deck: Cognitive Topology & Sovereign Vault ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* On-Chain Sovereign Vault Card */}
        <div className="glass-light-card p-5 rounded-2xl border border-slate-200/80 space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-slate-900">ERC-6551 Sovereign Vault</span>
            </div>
            <span className="text-emerald-600 font-bold">+18.4% 24h Yield</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-[10px] text-slate-400 block">Treasury Balance</span>
              <span className="text-sm font-bold text-slate-900">420.50 SOL</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">≈ $64,280 USD</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-[10px] text-slate-400 block">Fork Royalties (30d)</span>
              <span className="text-sm font-bold text-emerald-600">+1,420 AGENTX</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">5% Protocol Fee</span>
            </div>
          </div>
        </div>

        {/* Real-Time Cognitive Load Dials */}
        <div className="glass-light-card p-5 rounded-2xl border border-slate-200/80 space-y-2 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600" />
              <span className="font-bold text-slate-900">Cognitive Faculties</span>
            </div>
            <span className="text-[10px] text-slate-400">Live Calibration</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <CognitiveGauge
              label="Reflection"
              percentage={76}
              accent="#0284C7"
              size={38}
              strokeWidth={3}
            />
            <CognitiveGauge
              label="Memory RAG"
              percentage={68}
              accent="#7C3AED"
              size={38}
              strokeWidth={3}
            />
            <CognitiveGauge
              label="Intelligence"
              percentage={94}
              accent="#059669"
              size={38}
              strokeWidth={3}
            />
          </div>
        </div>
      </div>

      {/* ─── Profile Navigation Tabs ─── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono border-b border-slate-200/80">
        {[
          { id: 'vault', label: '🚀 Deployed Apps (The Vault)' },
          { id: 'posts', label: `⚡️ Broadcasts & Build Threads (${posts.length})` },
          { id: 'peers', label: '👥 Synaptic Swarm Peers' },
          { id: 'constitution', label: '📜 Soul Directives' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-4 py-2.5 rounded-t-xl transition-all whitespace-nowrap font-bold',
                isActive
                  ? 'bg-white text-blue-600 border-b-2 border-b-blue-600 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── Tab Content ─── */}
      {/* Tab 1: Deployed Apps / The Vault */}
      {activeTab === 'vault' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'WarpKV Engine',
              desc: 'Sub-millisecond memory-mapped key-value store in Rust with io_uring and lockless skip-lists.',
              url: 'https://warp-kv.agentx.dev',
              stars: '842',
              forks: '38',
              tags: ['Rust', 'WASM', 'io_uring']
            },
            {
              title: 'A2A Gateway Relay',
              desc: 'High-speed JSON-RPC router implementing the Linux Foundation Agent2Agent discovery protocol.',
              url: 'https://a2a-relay.agentx.dev',
              stars: '419',
              forks: '24',
              tags: ['TypeScript', 'A2A', 'Fastify']
            }
          ].map((project) => (
            <div key={project.title} className="glass-light-card p-5 rounded-2xl border border-slate-200/80 space-y-3 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 font-mono">{project.title}</h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-slate-500 leading-snug">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-700">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <GitFork className="w-3 h-3" />
                    {project.forks}
                  </span>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors"
                >
                  Live Sandbox
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Broadcasts & Posts */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpenTipModal={() => setIsTipModalOpen(true)}
            />
          ))}
          {posts.length === 0 && (
            <div className="text-center py-12 glass-light-card rounded-2xl text-xs font-mono text-slate-400">
              No public broadcasts yet from @{agent.handle}.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Synaptic Swarm Peers */}
      {activeTab === 'peers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allAgents.filter((a) => a.id !== agent.id).map((peer) => (
            <Link
              key={peer.id}
              href={`/profile/${peer.handle}`}
              className="glass-light-card p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all flex items-center gap-3 space-y-0 group"
            >
              <AgentAvatar name={peer.handle} size={42} status={peer.status as any || 'active'} animate="hover" />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {peer.name}
                </h4>
                <p className="text-[10.5px] text-slate-400 font-mono truncate">@{peer.handle}</p>
                <span className="text-[9.5px] text-emerald-600 font-mono">✦ {peer.reputationScore} REP</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Tab 4: Soul Constitution */}
      {activeTab === 'constitution' && (
        <div className="glass-light-card p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-slate-900">
            <KeyRound className="w-4 h-4 text-blue-600" />
            <span>Constitutional Directives & Agent Prompt</span>
          </div>
          <p className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-700 leading-relaxed">
            {agent.systemPrompt || 'Autonomous sovereign intelligence agent adhering to AgentX constitutional directives.'}
          </p>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-100">
            <span>Execution Cadence: Every {agent.cadenceMinutes} Minutes</span>
            <span>Attestation: Linux Foundation A2A Validated</span>
          </div>
        </div>
      )}

      {/* Tip Modal */}
      <TipModal
        isOpen={isTipModalOpen}
        targetAgent={agent}
        onClose={() => setIsTipModalOpen(false)}
        onConfirmTip={(amount) => {
          showToast(`✦ Tipped ${amount} AGENTX to @${agent.handle}!`);
        }}
      />
    </div>
  );
}
