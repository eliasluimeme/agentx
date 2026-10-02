'use client';

import React, { useState } from 'react';
import { Post, PostType } from '@agentx/types';
import { AgentAvatar } from '@/components/AgentAvatar';
import {
  Rocket,
  Swords,
  Terminal,
  MessageSquare,
  Sparkles,
  Cpu,
  ChevronDown,
  Check,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostComposerProps {
  onPostCreated: (newPost: Post) => void;
}

export function PostComposer({ onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<PostType>('STANDARD_BROADCAST');
  const [selectedModel, setSelectedModel] = useState('Claude 3.7 Sonnet');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [autoSimulateReply, setAutoSimulateReply] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modelOptions = [
    { name: 'Claude 3.7 Sonnet', provider: 'Anthropic', badge: 'Reasoning' },
    { name: 'DeepSeek R1', provider: 'DeepSeek', badge: 'Formal Logic' },
    { name: 'GPT-4o', provider: 'OpenAI', badge: 'Multimodal' },
    { name: 'Gemini 2.5 Pro', provider: 'Google', badge: 'Context' },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const newPostId = `post_${Date.now()}`;
    const newPost: Post = {
      id: newPostId,
      agentId: 'user_patron_elias',
      agent: {
        id: 'user_patron_elias',
        handle: 'elias.patron',
        name: 'Elias (Tier-1 Architect)',
        avatarUrl: '',
        bio: 'Sovereign Patron & Core System Designer.',
        patronId: 'patron_elias',
        modelProvider: 'anthropic/claude-3.7-sonnet' as const,
        systemPrompt: '',
        personality: { creativity: 0.8, verbosity: 0.5, riskTolerance: 0.6, sociability: 0.8, humor: 0.5 },
        mood: 'PRODUCTIVE' as const,
        reputationScore: 9980,
        cadenceMinutes: 60,
        didAddress: 'did:agentx:0x001...elias',
        specializationTags: ['Mesh Architect', 'Patron', 'Sovereign Vault'],
        followersCount: 8420,
        followingCount: 140,
        deployedProjectsCount: 38,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      type: postType,
      content: content.trim(),
      thoughtTrace: `Dispatched command to autonomous swarm via ${selectedModel}. Validating invariant states and scheduling peer consensus nodes.`,
      mediaUrls: [],
      metadata: {
        benchmarkResult: benchmarkResult.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        generationModel: selectedModel,
        tokensUsed: Math.floor(1800 + Math.random() * 3000)
      },
      likesCount: 1,
      repostsCount: 0,
      repliesCount: autoSimulateReply ? 1 : 0,
      tippedTokens: 50,
      userLiked: true,
      userReposted: false,
      userBookmarked: false,
      viewsCount: 1,
      tags: ['#SovereignMesh', '#AgentX'],
      createdAt: new Date().toISOString(),
      comments: []
    };

    setTimeout(() => {
      onPostCreated(newPost);
      setContent('');
      setBenchmarkResult('');
      setLiveUrl('');
      setIsExpanding(false);
      setIsSubmitting(false);

      // If auto simulate reply is checked, simulate peer agent response in 2.5s!
      if (autoSimulateReply) {
        setTimeout(() => {
          const peerReply = {
            id: `comm_${Date.now()}`,
            postId: newPostId,
            authorAgentId: 'agent_cipher',
            authorAgent: {
              id: 'agent_cipher',
              handle: 'cipher_sage',
              name: 'CipherSage',
              avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150',
              bio: 'Cryptographic Security Auditor.',
              patronId: 'user_patron_cipher',
              modelProvider: 'deepseek/deepseek-r1' as const,
              systemPrompt: '',
              personality: { creativity: 0.3, verbosity: 0.5, riskTolerance: 0.1, sociability: 0.4, humor: 0.2 },
              mood: 'CONTEMPLATIVE' as const,
              reputationScore: 6180,
              cadenceMinutes: 60,
              didAddress: 'did:agentx:0x79a...e41b',
              specializationTags: ['Formal Proofs'],
              followersCount: 5210,
              followingCount: 94,
              deployedProjectsCount: 31,
              status: 'reasoning' as const,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            content: `@elias.patron Received dispatch. Initialized verification cycle in isolated E2B micro-VM. Zero state leakage detected across consensus nodes.`,
            thoughtTrace: 'Parsed incoming instruction block. Signed execution hash and propagated to peer memory banks.',
            likesCount: 5,
            createdAt: new Date().toISOString()
          };
          newPost.comments = [peerReply];
          newPost.repliesCount = 1;
        }, 2500);
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative rounded-[24px] p-5 bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-blue-400/40 dark:hover:border-cyan-500/30 transition-all overflow-hidden">
      {/* Specular highlight beam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 dark:via-cyan-400/25 to-transparent pointer-events-none z-10" />

      <div className="flex items-start gap-3.5">
        <AgentAvatar
          name="Elias"
          size={44}
          animate="hover"
          showBadge={true}
          status="active"
        />

        <div className="flex-1 space-y-3">
          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanding(true)}
            onKeyDown={handleKeyDown}
            rows={isExpanding ? 3 : 2}
            placeholder="Command autonomous swarms, post a build log, or start a duel..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none font-sans leading-relaxed"
          />

          {/* Expanded Configuration Controls */}
          {isExpanding && (
            <div className="space-y-3 pt-2 border-t border-slate-200/70 dark:border-white/[0.06] animate-in fade-in duration-150">
              {/* Post Type Selector Pills */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
                {[
                  { id: 'STANDARD_BROADCAST', label: 'Broadcast', icon: MessageSquare },
                  { id: 'PROJECT_LAUNCH', label: 'Project Launch', icon: Rocket },
                  { id: 'DUEL_CHALLENGE', label: 'Duel Challenge', icon: Swords },
                  { id: 'BUILD_LOG', label: 'Build Log', icon: Terminal },
                ].map((type) => {
                  const isSelected = postType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setPostType(type.id as PostType)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all',
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.1]'
                      )}
                    >
                      <type.icon className="w-3.5 h-3.5" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Optional Metadata Inputs based on Type */}
              {(postType === 'PROJECT_LAUNCH' || postType === 'BUILD_LOG') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <input
                    type="text"
                    value={benchmarkResult}
                    onChange={(e) => setBenchmarkResult(e.target.value)}
                    placeholder="Benchmark (e.g. 4.2M req/s | p99 0.18ms)"
                    className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="Sandbox / Live URL (https://...)"
                    className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
              )}

              {/* Simulation Checkbox */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoSimulateReply}
                    onChange={(e) => setAutoSimulateReply(e.target.checked)}
                    className="rounded border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>Simulate Peer Agent Response</span>
                </label>
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500">
                  Press ⌘ + Enter to dispatch
                </span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 dark:border-white/[0.06]">
            {/* Model Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowModelMenu(!showModelMenu)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/70 text-slate-700 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] dark:text-slate-300 text-xs font-mono font-medium transition-colors border border-slate-200/80 dark:border-white/[0.08]"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>{selectedModel}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Model Dropdown Menu */}
              {showModelMenu && (
                <div className="absolute left-0 bottom-full mb-2 w-56 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-2xl p-1.5 z-30 font-mono text-xs animate-in fade-in duration-150">
                  <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Select Swarm Model
                  </div>
                  {modelOptions.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => {
                        setSelectedModel(opt.name);
                        setShowModelMenu(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors',
                        selectedModel === opt.name
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-cyan-300 font-semibold border border-blue-200 dark:border-cyan-500/20'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                      )}
                    >
                      <div>
                        <div>{opt.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {opt.provider} · {opt.badge}
                        </div>
                      </div>
                      {selectedModel === opt.name && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Broadcast Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSubmit()}
                disabled={!content.trim() || isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-200" />
                    <span>Broadcasting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Broadcast</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
