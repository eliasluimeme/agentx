'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ConsciousnessOrbProps {
  state?: 'idle' | 'thinking' | 'speaking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glowColor?: string;
}

export function ConsciousnessOrb({
  state = 'idle',
  size = 'md',
  className,
  glowColor = 'rgba(56, 189, 248, 0.28)'
}: ConsciousnessOrbProps) {
  const sizeMap = {
    sm: { container: 'w-20 h-20', orb: 'w-14 h-14', core: 'w-10 h-10', highlight: 'w-8 h-4' },
    md: { container: 'w-32 h-32', orb: 'w-24 h-24', core: 'w-16 h-16', highlight: 'w-12 h-6' },
    lg: { container: 'w-44 h-44', orb: 'w-32 h-32', core: 'w-22 h-22', highlight: 'w-16 h-8' },
    xl: { container: 'w-56 h-56', orb: 'w-40 h-40', core: 'w-28 h-28', highlight: 'w-20 h-10' },
  }[size];

  return (
    <div className={cn("relative flex items-center justify-center select-none", sizeMap.container, className)}>
      {/* Volumetric Ambient Gaussian Glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-full blur-2xl transition-all duration-700",
          state === 'thinking' && "animate-pulse scale-110",
          state === 'speaking' && "scale-125 duration-300"
        )}
        style={{
          background: state === 'thinking'
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(56, 189, 248, 0.2) 70%, transparent 100%)'
            : state === 'speaking'
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(56, 189, 248, 0.25) 70%, transparent 100%)'
            : `radial-gradient(circle, ${glowColor} 0%, rgba(192, 132, 252, 0.15) 70%, transparent 100%)`
        }}
      />

      {/* Prismatic Fluid Outer Shell */}
      <div
        className={cn(
          "relative rounded-full p-[2.5px] transition-all duration-500 flex items-center justify-center",
          sizeMap.orb,
          state === 'thinking' && "animate-spin [animation-duration:6s]",
          state === 'speaking' && "scale-105"
        )}
        style={{
          background: 'conic-gradient(from 180deg, #38BDF8, #818CF8, #C084FC, #F472B6, #34D399, #38BDF8)',
          boxShadow: '0 8px 32px -4px rgba(56, 189, 248, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.8)'
        }}
      >
        {/* Inner Opalescent Pearl */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-slate-50/95 to-slate-200/80 backdrop-blur-md flex items-center justify-center overflow-hidden relative border border-white/90">
          {/* Dynamic Specular Highlights */}
          <div
            className={cn(
              "absolute -top-1 left-2 rounded-full bg-gradient-to-r from-white via-cyan-100/90 to-transparent blur-[1.5px] transform -rotate-12 opacity-85",
              sizeMap.highlight
            )}
          />

          {/* Internal Prismatic Core Reflection */}
          <div
            className={cn(
              "rounded-full bg-radial from-white via-sky-100/60 to-violet-100/40 shadow-inner flex items-center justify-center transition-all duration-500",
              sizeMap.core,
              state === 'thinking' && "scale-90 opacity-90",
              state === 'speaking' && "scale-110 opacity-100"
            )}
          >
            {state === 'thinking' && (
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
            )}
            {state === 'speaking' && (
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-rose-400 to-indigo-500 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
