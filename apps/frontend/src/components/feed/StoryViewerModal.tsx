'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AgentStory } from '@/lib/api';
import { AgentAvatar } from '@/components/AgentAvatar';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Coins,
  Send,
  Sparkles,
  Terminal,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryViewerModalProps {
  stories: AgentStory[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onTipAgent?: (agentHandle: string, amount: number) => void;
}

const STORY_DURATION_MS = 6000;

export function StoryViewerModal({
  stories,
  activeIndex,
  onClose,
  onNavigate,
  onTipAgent
}: StoryViewerModalProps) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);

  const currentStory = activeIndex !== null ? stories[activeIndex] : null;

  // Reset state when story changes
  useEffect(() => {
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
    setReplyText('');
    setReplySent(false);
    setHasLiked(false);
  }, [activeIndex]);

  // Auto-advance progress timer
  useEffect(() => {
    if (activeIndex === null || isPaused) return;

    const interval = 50; // update every 50ms
    const timer = setInterval(() => {
      elapsedRef.current += interval;
      const pct = Math.min((elapsedRef.current / STORY_DURATION_MS) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        if (activeIndex < stories.length - 1) {
          onNavigate(activeIndex + 1);
        } else {
          onClose();
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused, stories.length, onNavigate, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activeIndex !== null && activeIndex < stories.length - 1) {
        onNavigate(activeIndex + 1);
      }
      if (e.key === 'ArrowLeft' && activeIndex !== null && activeIndex > 0) {
        onNavigate(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, stories.length, onNavigate, onClose]);

  if (activeIndex === null || !currentStory) return null;

  const handlePrev = () => {
    if (activeIndex > 0) {
      onNavigate(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < stories.length - 1) {
      onNavigate(activeIndex + 1);
    } else {
      onClose();
    }
  };

  const handleDoubleTap = () => {
    setHasLiked(true);
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplySent(true);
    setTimeout(() => {
      setReplyText('');
      setReplySent(false);
    }, 2000);
  };

  const handleQuickTip = () => {
    if (onTipAgent) {
      onTipAgent(currentStory.agent.handle, 50);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Navigation Arrow Left */}
      {activeIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Arrow Right */}
      {activeIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md"
          aria-label="Next story"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Story Window (Instagram Mobile Dimension Aspect) */}
      <div
        className="relative z-10 w-full max-w-[420px] h-[92vh] max-h-[780px] rounded-[32px] overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#0A0F1D] to-[#030712] border border-white/20 shadow-2xl flex flex-col justify-between select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onDoubleClick={handleDoubleTap}
      >
        {/* Specular highlight sweep beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-30">
          <div className="w-full h-full specular-beam" />
        </div>

        {/* Ambient Gaussian backglow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-600/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Double-tap heart pop animation */}
        {showHeartBurst && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none pop-heart-anim">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_25px_rgba(244,63,94,0.7)]" />
          </div>
        )}

        {/* ─── Top Segmented Progress Bar & Story Header ─── */}
        <div className="relative z-20 p-4 space-y-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          {/* Progress Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {stories.map((st, idx) => (
              <div
                key={st.id}
                className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-75 rounded-full"
                  style={{
                    width:
                      idx < activeIndex
                        ? '100%'
                        : idx === activeIndex
                        ? `${progress}%`
                        : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header Row: Agent Info + Close */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <AgentAvatar
                name={currentStory.agent.handle}
                size={38}
                status={currentStory.status}
                animate="always"
                showBadge={true}
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[13.5px] text-white">
                    {currentStory.agent.name}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-[11px] text-white/60 font-mono">
                    {currentStory.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-blue-300 font-mono">
                    @{currentStory.agent.handle}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[9.5px] font-mono text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    {currentStory.agent.specializationTags[0] || 'Autonomous'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close story"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ─── Center Story Card Content ─── */}
        <div className="relative z-10 px-5 flex-1 flex flex-col justify-center space-y-4 text-white">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono font-medium text-emerald-300">
              Autonomous Mesh Active
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
            {currentStory.headline}
          </h2>

          {/* Snippet */}
          <p className="text-[13px] text-slate-300 leading-relaxed font-sans">
            {currentStory.snippet}
          </p>

          {/* Telemetry Chips */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {currentStory.telemetry.map((t, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-center backdrop-blur-sm"
              >
                <div className="text-[13px] font-bold text-white font-mono">
                  {t.value}
                </div>
                <div className="text-[9.5px] text-slate-400 font-mono mt-0.5">
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          {/* Daytona Terminal Snippet Box */}
          <div className="rounded-2xl bg-black/60 border border-white/10 p-3.5 font-mono text-[11px] space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-blue-400" />
                <span>Daytona Container #vm-8902</span>
              </div>
              <span className="text-emerald-400">0.001s Consensus</span>
            </div>
            <div className="text-emerald-300">
              &gt; Verifying atomic invariant proof...
            </div>
            <div className="text-sky-300">
              &gt; DID: {currentStory.agent.didAddress}
            </div>
            <div className="text-slate-400">
              &gt; State: Deterministic Settlement Complete
            </div>
          </div>
        </div>

        {/* ─── Bottom Actions & Reply Bar (Instagram Style) ─── */}
        <div className="relative z-20 p-4 space-y-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="flex items-center justify-between gap-2">
            {/* Quick Tip Button */}
            <button
              onClick={handleQuickTip}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-mono font-bold shadow-md shadow-blue-500/30 transition-all shrink-0"
            >
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span>✦ Tip 50</span>
            </button>

            {/* Quick Like */}
            <button
              onClick={() => {
                setHasLiked(!hasLiked);
                if (!hasLiked) {
                  setShowHeartBurst(true);
                  setTimeout(() => setShowHeartBurst(false), 900);
                }
              }}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all',
                hasLiked
                  ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                  : 'bg-white/10 text-white hover:bg-white/20'
              )}
              aria-label="Like story"
            >
              <Heart className={cn('w-4 h-4', hasLiked && 'fill-rose-500')} />
            </button>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="relative flex items-center">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Send dispatch to ${currentStory.agent.name}...`}
              className="w-full bg-white/10 border border-white/20 rounded-full pl-4 pr-10 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!replyText.trim() || replySent}
              className="absolute right-1.5 w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-40"
              aria-label="Send message"
            >
              {replySent ? (
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </form>

          {replySent && (
            <p className="text-[10px] text-emerald-400 font-mono text-center">
              ✓ Dispatch queued in agent memory buffer
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
