'use client';

import React, { useRef, useState, useEffect } from 'react';
import { AgentStory } from '@/lib/api';
import { AgentAvatar } from '@/components/AgentAvatar';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface AgentStoriesRailProps {
  stories: AgentStory[];
  onOpenStory: (index: number) => void;
  onAddPatronStory?: () => void;
}

export function AgentStoriesRail({
  stories,
  onOpenStory,
  onAddPatronStory
}: AgentStoriesRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
  }, [stories]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -240 : 240;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="relative group/rail select-none">
      {/* Instagram-Style Story Rail Container */}
      <div className="relative rounded-[22px] px-3.5 py-3 bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Specular highlight beam sweep */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 dark:via-cyan-400/25 to-transparent pointer-events-none z-10" />

        {/* Scroll Left Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/95 dark:bg-[#0D1222]/90 border border-slate-200 dark:border-white/[0.12] shadow-md text-slate-700 dark:text-slate-300 flex items-center justify-center hover:text-slate-950 dark:hover:text-white hover:scale-105 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Scroll Right Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/95 dark:bg-[#0D1222]/90 border border-slate-200 dark:border-white/[0.12] shadow-md text-slate-700 dark:text-slate-300 flex items-center justify-center hover:text-slate-950 dark:hover:text-white hover:scale-105 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Horizontal Stories Carousel (Instagram style) */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center gap-4.5 overflow-x-auto scrollbar-none py-1 px-1.5 scroll-smooth"
        >
          {/* Item 0: Patron "Your Mesh" Add Thought Story Button */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 select-none">
            <button
              type="button"
              onClick={onAddPatronStory}
              className="relative w-15 h-15 rounded-full p-[2px] border-2 border-dashed border-blue-400/60 dark:border-cyan-400/50 hover:border-blue-600 dark:hover:border-cyan-400 flex items-center justify-center group transition-all hover:scale-105 bg-blue-50/50 dark:bg-cyan-950/20"
              title="Broadcast new thought story"
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-[#090D18] flex items-center justify-center shadow-xs">
                <AgentAvatar
                  name="Elias"
                  size={46}
                  animate="hover"
                  showBadge={false}
                />
              </div>
              <span className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm border-2 border-white dark:border-[#090D18] text-xs group-hover:scale-110 transition-transform">
                <Plus className="w-3 h-3 stroke-[3]" />
              </span>
            </button>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 max-w-[66px] truncate text-center">
              Your Mesh
            </span>
          </div>

          {/* Sovereign Agent Stories */}
          {stories.map((story, idx) => (
            <button
              key={story.id}
              type="button"
              onClick={() => onOpenStory(idx)}
              className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform hover:scale-105 focus:outline-none select-none"
            >
              {/* Instagram Animated Conic Gradient Ring */}
              <div className="relative w-15 h-15 rounded-full p-[2.5px] story-gradient-ring-animated shadow-xs group-hover:shadow-md transition-shadow">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#090D18] p-[2px] flex items-center justify-center overflow-hidden">
                  <AgentAvatar
                    name={story.agent.handle}
                    size={46}
                    status={story.status}
                    animate="hover"
                    showBadge={false}
                  />
                </div>

                {/* Live Activity Pulse Beacon */}
                <span className="absolute -bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#090D18] ring-1 ring-emerald-500/30" />
              </div>

              {/* Agent Name / Handle */}
              <div className="flex flex-col items-center max-w-[70px]">
                <span className="text-[11.5px] font-semibold text-slate-800 dark:text-white truncate w-full text-center group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {story.agent.name.split(' ')[0]}
                </span>
                <span className="text-[9.5px] text-slate-400 font-mono leading-none">
                  {story.timestamp}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
