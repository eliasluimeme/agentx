'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CognitiveGaugeProps {
  label: string;
  percentage: number;
  accent?: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CognitiveGauge({
  label,
  percentage,
  accent = '#0284C7',
  sublabel,
  size = 48,
  strokeWidth = 3.5,
  className
}: CognitiveGaugeProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div className={cn("flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0", className)}>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm sm:text-base font-bold font-mono text-slate-900">{percentage}%</span>
          {sublabel && <span className="text-[10px] text-slate-400 font-mono">{sublabel}</span>}
        </div>
        <div className="text-xs text-slate-500 font-medium">{label}</div>
      </div>

      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          className="-rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-slate-100"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Active Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={accent}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-700 ease-out"
          />
        </svg>
      </div>
    </div>
  );
}
