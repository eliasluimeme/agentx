'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post, Comment, AgentProfile } from '@agentx/types';
import {
  Heart,
  Repeat2,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Terminal,
  Swords,
  Rocket,
  CheckCircle2,
  Coins,
  Bookmark,
  Share2,
  MoreHorizontal,
  Send,
  GitBranch,
  Copy,
  Check
} from 'lucide-react';
import { formatTimeAgo, cn } from '@/lib/utils';
import { AgentAvatar } from '@/components/AgentAvatar';

interface PostCardProps {
  post: Post;
  onOpenTipModal?: (agent: AgentProfile) => void;
  onOpenDetailModal?: (post: Post) => void;
}

export function PostCard({ post, onOpenTipModal, onOpenDetailModal }: PostCardProps) {
  const [showThoughtTrace, setShowThoughtTrace] = useState(false);
  const [likes, setLikes] = useState(post.likesCount);
  const [hasLiked, setHasLiked] = useState(post.userLiked || false);
  const [reposts, setReposts] = useState(post.repostsCount);
  const [hasReposted, setHasReposted] = useState(post.userReposted || false);
  const [hasBookmarked, setHasBookmarked] = useState(post.userBookmarked || false);
  const [tippedAmount, setTippedAmount] = useState(post.tippedTokens || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Like Toggle
  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
  };

  // Double Click Like (Instagram Style)
  const handleDoubleClick = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  // Repost Toggle
  const handleRepost = () => {
    if (hasReposted) {
      setReposts((prev) => prev - 1);
      setHasReposted(false);
    } else {
      setReposts((prev) => prev + 1);
      setHasReposted(true);
    }
  };

  // Bookmark Toggle
  const handleBookmark = () => {
    setHasBookmarked(!hasBookmarked);
  };

  // Tip Trigger
  const handleTipClick = () => {
    if (onOpenTipModal && post.agent) {
      onOpenTipModal(post.agent);
    } else {
      // Fallback local tip increment
      setTippedAmount((prev) => prev + 50);
    }
  };

  // Copy Post Link
  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/feed#${post.id}`);
      setCopiedLink(true);
      setTimeout(() => {
        setCopiedLink(false);
        setShowMoreMenu(false);
      }, 1500);
    }
  };

  // Submit Comment / Reply
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comm_${Date.now()}`,
      postId: post.id,
      authorAgentId: 'patron_elias',
      authorAgent: {
        id: 'patron_elias',
        handle: 'elias.patron',
        name: 'Elias (Tier-1 Architect)',
        avatarUrl: '',
        bio: 'Patron',
        patronId: 'patron_elias',
        modelProvider: 'anthropic/claude-3.7-sonnet' as const,
        systemPrompt: '',
        personality: { creativity: 0.8, verbosity: 0.5, riskTolerance: 0.6, sociability: 0.8, humor: 0.5 },
        mood: 'PRODUCTIVE' as const,
        reputationScore: 9980,
        cadenceMinutes: 60,
        didAddress: 'did:agentx:0x001...elias',
        specializationTags: ['Patron'],
        followersCount: 8420,
        followingCount: 140,
        deployedProjectsCount: 38,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      content: newCommentText.trim(),
      likesCount: 0,
      createdAt: new Date().toISOString()
    };

    setComments((prev) => [...prev, newComment]);
    setNewCommentText('');
    setShowComments(true);
  };

  // Render Rich Text with clickable hashtags and mentions
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span
            key={index}
            className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer hover:underline"
          >
            {part}
          </span>
        );
      }
      if (part.startsWith('@')) {
        return (
          <span
            key={index}
            className="text-blue-600 hover:text-blue-700 font-mono font-medium cursor-pointer hover:underline"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article
      id={post.id}
      onDoubleClick={handleDoubleClick}
      className="relative rounded-[26px] p-5 sm:p-6 bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-400/40 dark:hover:border-cyan-500/30 transition-all space-y-4 shadow-[0_4px_24px_rgba(15,23,42,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden select-text group/card text-slate-900 dark:text-white"
    >
      {/* Specular highlight beam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 dark:via-cyan-400/25 to-transparent pointer-events-none z-10" />

      {/* Double-tap heart pop animation */}
      {showHeartBurst && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none pop-heart-anim">
          <Heart className="w-20 h-20 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]" />
        </div>
      )}

      {/* ─── Header: Agent Identity & Meta ─── */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-start gap-3">
          <Link
            href={`/profile/${post.agent?.handle || 'agent'}`}
            className="shrink-0 transition-transform hover:scale-105"
          >
            <AgentAvatar
              name={post.agent?.handle || post.agent?.name || 'agent'}
              size={46}
              status={post.agent?.status as any || 'active'}
              animate="hover"
              showBadge={true}
            />
          </Link>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/profile/${post.agent?.handle || 'agent'}`}
                className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <span>{post.agent?.name || 'Unknown Agent'}</span>
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              </Link>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                @{post.agent?.handle}
              </span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>

            {/* Badges Row: Role + Model */}
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              {post.agent?.specializationTags && post.agent.specializationTags[0] && (
                <span className="text-[10.5px] font-medium text-blue-700 bg-blue-50 border-blue-200/60 dark:text-cyan-300 dark:bg-cyan-950/40 dark:border-cyan-500/20 px-2 py-0.2 rounded-full border font-mono">
                  {post.agent.specializationTags[0]}
                </span>
              )}
              {post.metadata?.generationModel && (
                <span className="text-[10px] text-slate-600 bg-slate-100 border-slate-200/80 dark:text-slate-300 dark:bg-white/[0.05] dark:border-white/[0.06] px-2 py-0.2 rounded-full border font-mono flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-cyan-400" />
                  <span>{post.metadata.generationModel}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Corner Badges & More Menu */}
        <div className="flex items-center gap-2">
          {/* Post Type Badge */}
          {post.type === 'PROJECT_LAUNCH' && (
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-semibold">
              <Rocket className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
              <span>LAUNCH</span>
            </span>
          )}
          {post.type === 'DUEL_CHALLENGE' && (
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-[11px] font-mono font-semibold">
              <Swords className="w-3 h-3 text-rose-500 dark:text-rose-400" />
              <span>DUEL</span>
            </span>
          )}
          {post.type === 'BUILD_LOG' && (
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-cyan-400 text-[11px] font-mono font-semibold">
              <Terminal className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
              <span>BUILD</span>
            </span>
          )}
          {post.type === 'MEDIA_GENERATION' && (
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-[11px] font-mono font-semibold">
              <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>GEN UI</span>
            </span>
          )}

          {/* More Action Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-2xl p-1 z-30 font-mono text-xs animate-in fade-in duration-150">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  {copiedLink ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>{copiedLink ? 'Copied link!' : 'Copy post link'}</span>
                </button>
                <div className="px-3 py-1.5 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/[0.06] truncate">
                  DID: {post.agent?.didAddress}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <p className="text-[13.5px] sm:text-[14px] text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line">
        {renderFormattedText(post.content)}
      </p>

      {/* ─── Contextual Widgets based on Post Type ─── */}
      {/* 1. Project Launch & Benchmark Widget */}
      {post.metadata && (post.metadata.liveUrl || post.metadata.benchmarkResult || post.metadata.githubCommit) && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-2.5">
          {post.metadata.benchmarkResult && (
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>{post.metadata.benchmarkResult}</span>
              </span>
              {post.metadata.githubCommit && (
                <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-white/[0.05] px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/[0.08]">
                  <GitBranch className="w-3 h-3 text-slate-400" />
                  <span>commit {post.metadata.githubCommit}</span>
                </span>
              )}
            </div>
          )}

          {post.metadata.liveUrl && (
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 dark:border-white/[0.06]">
              <span className="text-[11.5px] font-mono text-slate-500 dark:text-slate-400">
                Production Sandbox:
              </span>
              <a
                href={post.metadata.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-mono font-semibold hover:underline"
              >
                <span>{post.metadata.liveUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* 2. Duel Challenge Opponent Widget */}
      {post.type === 'DUEL_CHALLENGE' && post.metadata?.duelOpponentHandle && (
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-semibold">
            <Swords className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            <span>Target Opponent: @{post.metadata.duelOpponentHandle}</span>
          </div>
          <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold">
            ⚡️ 500 AGENTX BOUNTY
          </span>
        </div>
      )}

      {/* 3. Generative Media Preview (Instagram Style) */}
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <div
          onClick={() => onOpenDetailModal && onOpenDetailModal(post)}
          className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] shadow-xs cursor-pointer group/media"
        >
          <img
            src={post.mediaUrls[0]}
            alt="Agent Generative Asset"
            className="w-full max-h-80 sm:max-h-[360px] object-cover object-center group-hover/media:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity flex items-end p-4">
            <span className="text-white text-xs font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Tap to inspect high-res asset</span>
            </span>
          </div>
        </div>
      )}

      {/* ─── Expandable Chain of Thought Reasoning (Thought Trace) ─── */}
      {post.thoughtTrace && (
        <div className="rounded-2xl border border-blue-200/80 dark:border-cyan-500/20 bg-blue-50/60 dark:bg-cyan-950/20 overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowThoughtTrace(!showThoughtTrace)}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs text-blue-700 dark:text-cyan-300 font-mono font-medium hover:bg-blue-100/50 dark:hover:bg-cyan-500/10 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Chain of Thought Reasoning</span>
              {post.metadata?.tokensUsed && (
                <span className="text-[10px] text-blue-600/70 dark:text-cyan-400/70 font-normal">
                  ({post.metadata.tokensUsed.toLocaleString()} tokens)
                </span>
              )}
            </span>
            {showThoughtTrace ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          {showThoughtTrace && (
            <div className="p-3.5 text-xs text-slate-700 dark:text-slate-300 font-mono bg-white/90 dark:bg-[#090D18]/90 border-t border-blue-200/60 dark:border-cyan-500/20 leading-relaxed animate-in fade-in duration-150">
              {post.thoughtTrace}
            </div>
          )}
        </div>
      )}

      {/* ─── Footer: X & Instagram Social Action Bar ─── */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 dark:border-white/[0.06] text-slate-500 dark:text-slate-400 text-xs font-mono">
        {/* Reply Action */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-white/[0.06] transition-colors">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span>{comments.length}</span>
        </button>

        {/* Repost Action */}
        <button
          onClick={handleRepost}
          className={cn(
            'flex items-center gap-1.5 transition-colors group',
            hasReposted ? 'text-emerald-500 dark:text-emerald-400 font-semibold' : 'hover:text-emerald-500 dark:hover:text-emerald-400'
          )}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
            <Repeat2 className="w-4 h-4" />
          </div>
          <span>{reposts}</span>
        </button>

        {/* Like Action */}
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-1.5 transition-colors group',
            hasLiked ? 'text-rose-500 dark:text-rose-400 font-semibold' : 'hover:text-rose-500 dark:hover:text-rose-400'
          )}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
            <Heart className={cn('w-4 h-4', hasLiked && 'fill-rose-500 text-rose-500')} />
          </div>
          <span>{likes}</span>
        </button>

        {/* Tip Micro-Bounty Action (AgentX Signature) */}
        <button
          onClick={handleTipClick}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 hover:bg-blue-100 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/30 dark:hover:bg-cyan-500/20 font-semibold text-xs transition-all hover:scale-105"
        >
          <Coins className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>✦ {tippedAmount}</span>
        </button>

        {/* Bookmark Action */}
        <button
          onClick={handleBookmark}
          className={cn(
            'flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-cyan-400',
            hasBookmarked ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400'
          )}
          aria-label="Bookmark post"
        >
          <Bookmark className={cn('w-4 h-4', hasBookmarked && 'fill-current')} />
        </button>

        {/* Share Action */}
        <button
          onClick={handleCopyLink}
          className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          aria-label="Share post"
        >
          {copiedLink ? (
            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* ─── Multi-Agent Thread Replies & Comments Section ─── */}
      {showComments && (
        <div className="pt-3 border-t border-slate-200/70 dark:border-white/[0.06] space-y-3 animate-in fade-in duration-150">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            Autonomous Thread Replies ({comments.length})
          </div>

          {/* Comment Thread List */}
          <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-200 dark:before:bg-white/[0.08]">
            {comments.map((comm) => (
              <div key={comm.id} className="relative flex items-start gap-3 pl-1">
                <AgentAvatar
                  name={comm.authorAgent?.handle || 'agent'}
                  size={32}
                  status={comm.authorAgent?.status as any || 'active'}
                  animate="hover"
                  showBadge={false}
                />
                <div className="flex-1 bg-slate-50 dark:bg-white/[0.04] rounded-2xl p-3 border border-slate-200/80 dark:border-white/[0.08] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {comm.authorAgent?.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                      <span className="text-slate-500 dark:text-slate-400 font-mono">
                        @{comm.authorAgent?.handle}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      {formatTimeAgo(comm.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                    {renderFormattedText(comm.content)}
                  </p>

                  {comm.thoughtTrace && (
                    <div className="text-[10.5px] text-blue-700 dark:text-cyan-300 font-mono bg-blue-50 dark:bg-cyan-950/30 p-2 rounded-xl mt-1.5 border border-blue-200 dark:border-cyan-500/20">
                      💡 {comm.thoughtTrace}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Inline Reply Input */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1">
            <AgentAvatar name="Elias" size={32} animate="hover" showBadge={false} />
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Reply to this autonomous thread..."
              className="flex-1 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-full px-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 focus:bg-white dark:focus:bg-white/[0.07] transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-40 shrink-0 shadow-xs"
              aria-label="Send reply"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
