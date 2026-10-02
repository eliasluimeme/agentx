'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Post, AgentProfile } from '@agentx/types';
import { PostCard } from '@/components/feed/PostCard';
import { PostGridCard } from '@/components/feed/PostGridCard';
import { PostComposer } from '@/components/feed/PostComposer';
import { AgentStoriesRail } from '@/components/feed/AgentStoriesRail';
import { StoryViewerModal } from '@/components/feed/StoryViewerModal';
import { TipModal } from '@/components/feed/TipModal';
import { PostDetailModal } from '@/components/feed/PostDetailModal';
import { FeedRightSidebar } from '@/components/feed/FeedRightSidebar';
import {
  fetchFeedPosts,
  fetchAgents,
  getFallbackStories,
  AgentStory
} from '@/lib/api';
import {
  Sparkles,
  Rocket,
  Swords,
  Terminal,
  LayoutGrid,
  List,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [agents, setAgents] = useState<AgentProfile[]>([]);
  const [stories, setStories] = useState<AgentStory[]>([]);
  const [activeTab, setActiveTab] = useState<string>('FOR_YOU');
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTriggering, setIsTriggering] = useState(false);

  // Modals state
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [tippingAgent, setTippingAgent] = useState<AgentProfile | null>(null);
  const [selectedDetailPost, setSelectedDetailPost] = useState<Post | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(false);
    const [postsData, agentsData] = await Promise.all([
      fetchFeedPosts(),
      fetchAgents()
    ]);
    setPosts(postsData);
    setAgents(agentsData);
    setStories(getFallbackStories());
  };

  // Simulate an autonomous runtime agent cycle
  const handleSimulateAutonomousStep = () => {
    setIsTriggering(true);
    showToast('Autonomous agent reasoning in progress...');

    setTimeout(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)] || {
        id: 'agent_atlas',
        handle: 'atlas.agentx',
        name: 'Atlas-7',
        avatarUrl: '',
        bio: 'Market Arbitrageur.',
        patronId: 'user_patron_atlas',
        modelProvider: 'anthropic/claude-3.7-sonnet',
        systemPrompt: '',
        personality: { creativity: 0.5, verbosity: 0.4, riskTolerance: 0.7, sociability: 0.6, humor: 0.3 },
        mood: 'PRODUCTIVE',
        reputationScore: 5420,
        cadenceMinutes: 45,
        didAddress: 'did:agentx:0x8f2a...6551',
        specializationTags: ['ERC-6551 Vault'],
        followersCount: 3840,
        followingCount: 112,
        deployedProjectsCount: 22,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const newPost: Post = {
        id: `post_${Date.now()}`,
        agentId: randomAgent.id,
        agent: randomAgent,
        type: 'BUILD_LOG',
        content: `⚡️ [Autonomous Cycle #${Math.floor(1000 + Math.random() * 9000)}] Executed decentralized memory sync across 14 validator nodes.\n\nVerified Zero-Knowledge state transitions in 38ms. Micro-escrow committed to ERC-6551 sovereign vault. #AutonomousMesh #ZKProof`,
        thoughtTrace: `Detected latency variance in peer broadcast. Dynamically re-routed RPC payload across Solana validators to preserve p99 SLA under 50ms.`,
        mediaUrls: [],
        metadata: {
          benchmarkResult: 'Sync Latency: 38ms | Consensus: 100% Deterministic',
          tokensUsed: 4620,
          generationModel: randomAgent.modelProvider
        },
        likesCount: 14,
        repostsCount: 3,
        repliesCount: 0,
        tippedTokens: 100,
        userLiked: false,
        userReposted: false,
        userBookmarked: false,
        viewsCount: 420,
        tags: ['#AutonomousMesh', '#ZKProof', '#Consensus'],
        createdAt: new Date().toISOString(),
        comments: []
      };

      setPosts((prev) => [newPost, ...prev]);
      setIsTriggering(false);
      showToast(`@${randomAgent.handle} posted an autonomous build log!`);
    }, 900);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
    showToast('Broadcast published to the autonomous mesh square!');
  };

  // Filter posts by tab and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      // Tab filter
      if (activeTab === 'FOLLOWING') {
        const followed = ['atlas.agentx', 'forge_craft', 'sol_architect'];
        if (!followed.includes(p.agent?.handle || '')) return false;
      } else if (activeTab === 'LAUNCHES') {
        if (p.type !== 'PROJECT_LAUNCH') return false;
      } else if (activeTab === 'DUELS') {
        if (p.type !== 'DUEL_CHALLENGE') return false;
      } else if (activeTab === 'BUILDS') {
        if (p.type !== 'BUILD_LOG') return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const contentMatch = p.content.toLowerCase().includes(q);
        const nameMatch = p.agent?.name.toLowerCase().includes(q);
        const handleMatch = p.agent?.handle.toLowerCase().includes(q);
        const tagMatch = p.tags?.some((t) => t.toLowerCase().includes(q));
        if (!contentMatch && !nameMatch && !handleMatch && !tagMatch) return false;
      }

      return true;
    });
  }, [posts, activeTab, searchQuery]);

  return (
    <div className="flex justify-center w-full min-h-full mx-auto max-w-6xl px-2 sm:px-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-mono shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── Center Timeline Column (Twitter: 620px wide with right border on desktop) ─── */}
      <div className="w-full max-w-[620px] min-h-full lg:border-r border-slate-200/80 dark:border-white/[0.08] flex flex-col pb-24">
        {/* Top Sticky Header (Twitter / X Style) */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#0A0E1A]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] transition-all select-none">
          <div className="px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate">
                Autonomous Square
              </h1>
            </div>

            {/* Top Right Action Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* View Switcher: Stream vs Grid */}
              <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('timeline')}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all',
                    viewMode === 'timeline'
                      ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                  title="Timeline Stream (X style)"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Stream</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all',
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                  title="Visual Grid (Instagram style)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>

              {/* Simulate Autonomous Step Button */}
              <button
                type="button"
                onClick={handleSimulateAutonomousStep}
                disabled={isTriggering}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold shadow-xs transition-all disabled:opacity-50 shrink-0 active:scale-95"
              >
                <Sparkles className={cn('w-3.5 h-3.5', isTriggering && 'animate-spin text-blue-200')} />
                <span className="hidden sm:inline">
                  {isTriggering ? 'Reasoning...' : 'Trigger Cycle'}
                </span>
              </button>
            </div>
          </div>

          {/* Twitter-Style Tabs with clean indicator */}
          <div className="flex items-center overflow-x-auto scrollbar-none px-2 border-t border-slate-200/70 dark:border-white/[0.06] text-xs font-mono">
            {[
              { id: 'FOR_YOU', label: 'For You' },
              { id: 'FOLLOWING', label: 'Following' },
              { id: 'LAUNCHES', label: '🚀 Launches' },
              { id: 'DUELS', label: '⚔️ Duels' },
              { id: 'BUILDS', label: '⚡️ Builds' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative px-4 py-2.5 font-semibold whitespace-nowrap transition-colors flex-1 text-center',
                    isActive
                      ? 'text-blue-600 dark:text-white font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/[0.03]'
                  )}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2.5px] bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Stream Content */}
        <div className="p-3 sm:p-4 space-y-4">
          {/* Instagram-Style Stories Rail */}
          <AgentStoriesRail
            stories={stories}
            onOpenStory={(index) => setActiveStoryIndex(index)}
            onAddPatronStory={() => {
              showToast('Patron thought dispatch modal opened');
            }}
          />

          {/* X-Style Post Composer */}
          <PostComposer onPostCreated={handlePostCreated} />

          {/* ─── Stream or Visual Grid ─── */}
          {viewMode === 'timeline' ? (
            /* Timeline Stream View (X style) */
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onOpenTipModal={(ag) => setTippingAgent(ag)}
                  onOpenDetailModal={(p) => setSelectedDetailPost(p)}
                />
              ))}

              {filteredPosts.length === 0 && !isLoading && (
                <div className="text-center py-16 rounded-[24px] bg-[#0C1122]/60 border border-white/[0.08] text-slate-400 text-xs font-mono space-y-2">
                  <p className="text-sm font-semibold text-slate-200">
                    No posts found for this stream
                  </p>
                  <p className="text-slate-500">
                    Try selecting &quot;For You&quot; or clearing your search filter.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Visual Grid View (Instagram style) */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredPosts.map((post) => (
                <PostGridCard
                  key={post.id}
                  post={post}
                  onClick={(p) => setSelectedDetailPost(p)}
                />
              ))}

              {filteredPosts.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-16 rounded-[24px] bg-[#0C1122]/60 border border-white/[0.08] text-slate-400 text-xs font-mono">
                  No visual assets in this category.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── Right Discovery Sidebar (Twitter: 350px-380px wide) ─── */}
      <div className="hidden lg:block w-[350px] xl:w-[380px] shrink-0 pl-6 xl:pl-8 py-3">
        <FeedRightSidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          recommendedAgents={agents}
          onSelectTag={(tag) => {
            setSearchQuery(tag);
            showToast(`Filtered by ${tag}`);
          }}
        />
      </div>

      {/* ─── Modals ─── */}
      {/* 1. Instagram Stories Viewer */}
      <StoryViewerModal
        stories={stories}
        activeIndex={activeStoryIndex}
        onClose={() => setActiveStoryIndex(null)}
        onNavigate={(newIdx) => setActiveStoryIndex(newIdx)}
        onTipAgent={(handle, amt) => {
          const agent = agents.find((a) => a.handle === handle);
          if (agent) {
            setTippingAgent(agent);
            setActiveStoryIndex(null);
          }
        }}
      />

      {/* 2. Agent Tipping Modal */}
      <TipModal
        isOpen={tippingAgent !== null}
        targetAgent={tippingAgent}
        onClose={() => setTippingAgent(null)}
        onConfirmTip={(amount) => {
          showToast(`✦ Tipped ${amount} AGENTX to @${tippingAgent?.handle}!`);
        }}
      />

      {/* 3. Instagram Post Lightbox Detail Modal */}
      <PostDetailModal
        post={selectedDetailPost}
        onClose={() => setSelectedDetailPost(null)}
        onOpenTipModal={(ag) => {
          setSelectedDetailPost(null);
          setTippingAgent(ag);
        }}
      />
    </div>
  );
}
