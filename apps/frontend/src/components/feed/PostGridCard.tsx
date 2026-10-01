'use client';

import React, { useState } from 'react';
import { Post } from '@agentx/types';
import { AgentAvatar } from '@/components/AgentAvatar';
import {
  Heart,
  MessageSquare,
  Coins,
  Rocket,
  Swords,
  Terminal,
  Sparkles
} from 'lucide-react';

interface PostGridCardProps {
  post: Post;
  onClick: (post: Post) => void;
  onLikeToggle?: (postId: string) => void;
}

export function PostGridCard({ post, onClick, onLikeToggle }: PostGridCardProps) {
  const [hasLiked, setHasLiked] = useState(post.userLiked || false);
  const [likes, setLikes] = useState(post.likesCount);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      if (onLikeToggle) onLikeToggle(post.id);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  return (
    <div
      onClick={() => onClick(post)}
      onDoubleClick={handleDoubleClick}
      className="group relative aspect-square rounded-[24px] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
    >
      {/* Specular highlight beam */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none z-20">
        <div className="w-full h-full specular-beam" />
      </div>

      {/* Double tap pop heart */}
      {showHeartBurst && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none pop-heart-anim">
          <Heart className="w-16 h-16 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_20px_rgba(244,63,94,0.7)]" />
        </div>
      )}

      {/* Card Visual Content */}
      {post.mediaUrls && post.mediaUrls.length > 0 ? (
        <img
          src={post.mediaUrls[0]}
          alt={post.content.slice(0, 40)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        /* Code / Terminal Snapshot for text/build posts */
        <div className="w-full h-full p-4.5 bg-gradient-to-br from-[#0B1120] to-[#030712] flex flex-col justify-between text-white font-mono text-[11px] leading-relaxed relative">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] text-slate-400 font-sans font-medium">
              @{post.agent?.handle}
            </span>
          </div>

          <div className="space-y-1.5 my-auto line-clamp-4 text-slate-300 font-sans text-xs">
            {post.content}
          </div>

          {post.metadata?.benchmarkResult ? (
            <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-emerald-400 text-[10px] truncate">
              ⚡️ {post.metadata.benchmarkResult}
            </div>
          ) : (
            <div className="text-[10px] text-blue-400 flex items-center gap-1">
              <span>✦ DID:</span>
              <span className="truncate">{post.agent?.didAddress}</span>
            </div>
          )}
        </div>
      )}

      {/* Top Type Badge */}
      <div className="absolute top-3 left-3 z-10">
        {post.type === 'PROJECT_LAUNCH' && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-mono font-bold backdrop-blur-md shadow-xs">
            <Rocket className="w-3 h-3" />
            <span>LAUNCH</span>
          </span>
        )}
        {post.type === 'DUEL_CHALLENGE' && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-mono font-bold backdrop-blur-md shadow-xs">
            <Swords className="w-3 h-3" />
            <span>DUEL</span>
          </span>
        )}
        {post.type === 'BUILD_LOG' && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-mono font-bold backdrop-blur-md shadow-xs">
            <Terminal className="w-3 h-3" />
            <span>BUILD</span>
          </span>
        )}
        {post.type === 'MEDIA_GENERATION' && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-600/90 text-white text-[10px] font-mono font-bold backdrop-blur-md shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>GEN UI</span>
          </span>
        )}
      </div>

      {/* Bottom Floating Agent Tag (Always visible) */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
          <AgentAvatar
            name={post.agent?.handle || 'agent'}
            size={20}
            animate="hover"
            showBadge={false}
          />
          <span className="text-[11px] font-semibold truncate max-w-[100px]">
            {post.agent?.name?.split(' ')[0]}
          </span>
        </div>

        {post.tippedTokens && post.tippedTokens > 0 ? (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/80 backdrop-blur-md text-slate-950 font-mono font-bold text-[10px]">
            ✦ {post.tippedTokens}
          </span>
        ) : null}
      </div>

      {/* Hover Overlay (Instagram Explore Style) */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex flex-col items-center justify-center gap-3 text-white">
        <div className="flex items-center gap-6 text-sm font-bold font-mono">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-white" />
            <span>{likes}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>{post.comments?.length || post.repliesCount}</span>
          </div>

          {post.tippedTokens ? (
            <div className="flex items-center gap-1 text-amber-300">
              <Coins className="w-4 h-4" />
              <span>✦ {post.tippedTokens}</span>
            </div>
          ) : null}
        </div>

        <p className="text-[11px] text-white/80 font-sans max-w-[80%] text-center line-clamp-2 px-2">
          {post.content}
        </p>
      </div>
    </div>
  );
}
