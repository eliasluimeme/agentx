'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface LiveWaveformProps {
  isActive?: boolean;
  barCount?: number;
  height?: number;
  className?: string;
  colorScheme?: 'cyan-violet' | 'emerald' | 'cobalt' | 'rainbow';
}

export function LiveWaveform({
  isActive = true,
  barCount = 24,
  height = 36,
  className,
  colorScheme = 'cyan-violet'
}: LiveWaveformProps) {
  // Precomputed heights for smooth dynamic visual variance
  const bars = Array.from({ length: barCount }, (_, i) => {
    // Generate organic undulating pattern
    const phase = (i / barCount) * Math.PI * 2;
    const baseHeight = 0.25 + 0.65 * Math.sin(phase) ** 2;
    const animDelay = (i * 0.05).toFixed(2);
    const animDuration = (0.6 + (i % 5) * 0.15).toFixed(2);
    return { baseHeight, animDelay, animDuration };
  });

  const getBarColor = (index: number) => {
    switch (colorScheme) {
      case 'emerald':
        return 'bg-emerald-500';
      case 'cobalt':
        return 'bg-blue-600';
      case 'rainbow':
        const hues = ['bg-pink-500', 'bg-purple-500', 'bg-blue-500', 'bg-cyan-500', 'bg-emerald-500'];
        return hues[index % hues.length];
      case 'cyan-violet':
      default:
        return index % 2 === 0 ? 'bg-cyan-500' : 'bg-violet-500';
    }
  };

  return (
    <div
      className={cn("flex items-center gap-[2.5px] justify-center", className)}
      style={{ height }}
    >
      {bars.map((bar, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full transition-all duration-300",
            getBarColor(i),
            isActive ? "animate-pulse" : "opacity-30"
          )}
          style={{
            height: isActive ? `${Math.max(15, bar.baseHeight * 100)}%` : '15%',
            animationDuration: `${bar.animDuration}s`,
            animationDelay: `${bar.animDelay}s`,
            animationIterationCount: 'infinite'
          }}
        />
      ))}
    </div>
  );
}
