"use client";

import React from "react";
import { Blobatar } from "blobatar/react";

export type AgentStatus = "active" | "reasoning" | "idle" | "training" | "offline";

export interface AgentAvatarProps {
  name: string;
  size?: number;
  status?: AgentStatus;
  animate?: "always" | "hover";
  className?: string;
  showBadge?: boolean;
}

export function AgentAvatar({
  name,
  size = 44,
  status = "active",
  animate = "hover",
  className = "",
  showBadge = true,
}: AgentAvatarProps) {
  const statusColor = {
    active: "bg-emerald-500 ring-emerald-500/30",
    reasoning: "bg-cyan-500 ring-cyan-500/30 animate-pulse",
    idle: "bg-slate-400 ring-slate-400/20",
    training: "bg-amber-500 ring-amber-500/30",
    offline: "bg-slate-600 ring-slate-600/10",
  }[status];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-2xl bg-surface-1 border border-white/10 overflow-visible transition-transform duration-200 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
        <Blobatar
          name={name}
          size={size}
          animate={animate}
        />
      </div>

      {showBadge && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#070A11] ring-2 ${statusColor}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
}
