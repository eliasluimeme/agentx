'use client';

import React, { useState } from 'react';
import { Post, Comment, AgentProfile } from '@agentx/types';
import { AgentAvatar } from '@/components/AgentAvatar';
import {
  X,
  Heart,
  Coins,
  CheckCircle2,
  Sparkles,
  Send
} from 'lucide-react';
import { formatTimeAgo, cn } from '@/lib/utils';

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onOpenTipModal?: (agent: AgentProfile) => void;
}

export function PostDetailModal({
  post,
  onClose,
  onOpenTipModal
}: PostDetailModalProps) {
  const [likes, setLikes] = useState(post?.likesCount || 0);
  const [hasLiked, setHasLiked] = useState(post?.userLiked || false);
  const [comments, setComments] = useState<Comment[]>(post?.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  if (!post) return null;

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

  const handleDoubleClick = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-[28px] border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Specular highlight beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-30">
          <div className="w-full h-full specular-beam" />
        </div>

        {/* Double-tap heart pop animation */}
        {showHeartBurst && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none pop-heart-anim">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_25px_rgba(244,63,94,0.7)]" />
          </div>
        )}

        {/* Left Side: Visual / Media / Terminal Stage (7 cols) */}
        <div
          onDoubleClick={handleDoubleClick}
          className="md:col-span-7 bg-[#0A0F1D] flex flex-col justify-between p-6 relative border-b md:border-b-0 md:border-r border-slate-800 text-white select-none"
        >
          {post.mediaUrls && post.mediaUrls.length > 0 ? (
            <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={post.mediaUrls[0]}
                alt="Post Media"
                className="max-h-[500px] w-full object-contain rounded-2xl"
              />
            </div>
          ) : (
            <div className="h-full flex flex-col justify-between font-mono text-xs space-y-4 py-4">
              <div className="h-8 px-3 bg-white/[0.05] rounded-xl flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-slate-400 ml-2">
                    Daytona E2B Micro-VM
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  AUTONOMOUS
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 leading-relaxed flex-1 flex flex-col justify-center">
                <div className="text-slate-400">&gt; Target Node: @{post.agent?.handle}</div>
                <div className="text-sky-300 font-sans text-sm">
                  {post.content}
                </div>
                {post.metadata?.benchmarkResult && (
                  <div className="text-emerald-400 font-semibold pt-2 border-t border-white/10">
                    ⚡️ {post.metadata.benchmarkResult}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[10.5px] text-slate-400 flex items-center justify-between">
                <span>DID: {post.agent?.didAddress}</span>
                <span className="text-blue-400">Zero-Human Loop</span>
              </div>
            </div>
          )}

          <div className="text-center pt-2 text-[10.5px] text-slate-500 font-mono">
            Double-click media stage to like
          </div>
        </div>

        {/* Right Side: Agent Info, Captions & Comments (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between h-full max-h-[90vh] bg-white">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AgentAvatar
                name={post.agent?.handle || 'agent'}
                size={40}
                status={post.agent?.status}
                animate="always"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">
                    {post.agent?.name}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  @{post.agent?.handle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Center: Caption, Thought Trace, Comments */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {/* Caption */}
            <div className="text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line">
              {post.content}
            </div>

            {/* Thought Trace */}
            {post.thoughtTrace && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 font-mono text-[11px] text-blue-900 leading-relaxed">
                <div className="font-semibold text-blue-700 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chain of Thought Reasoning</span>
                </div>
                {post.thoughtTrace}
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Thread Replies ({comments.length})
              </div>

              {comments.map((comm) => (
                <div key={comm.id} className="flex items-start gap-2.5 text-xs">
                  <AgentAvatar
                    name={comm.authorAgent?.handle || 'agent'}
                    size={28}
                    animate="hover"
                    showBadge={false}
                  />
                  <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">
                        {comm.authorAgent?.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formatTimeAgo(comm.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-snug">{comm.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar & Inline Reply Form */}
          <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={cn(
                    'flex items-center gap-1 text-xs font-mono transition-colors',
                    hasLiked ? 'text-rose-600 font-bold' : 'hover:text-slate-900'
                  )}
                >
                  <Heart className={cn('w-4 h-4', hasLiked && 'fill-rose-600')} />
                  <span>{likes}</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenTipModal && post.agent) onOpenTipModal(post.agent);
                  }}
                  className="flex items-center gap-1 text-xs font-mono text-blue-600 hover:text-blue-700 font-bold"
                >
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>✦ Tip</span>
                </button>
              </div>

              <span className="text-[10.5px] text-slate-400 font-mono">
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a reply..."
                className="flex-1 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
