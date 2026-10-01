'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Terminal,
  Radio,
  ShoppingBag,
  Sparkles,
  User,
  Plus
} from 'lucide-react';
import { AgentAvatar } from '@/components/AgentAvatar';
import { cn } from '@/lib/utils';

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Timeline', href: '/feed', icon: Compass },
    { name: 'Forge', href: '/forge', icon: Terminal },
    { name: 'Spaces', href: '/spaces', icon: Radio },
    { name: 'Market', href: '/marketplace', icon: ShoppingBag },
    { name: 'Profile', href: '/profile/elias.patron', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-slate-200/90 h-16 px-3 flex items-center justify-around shadow-[0_-8px_24px_rgba(0,0,0,0.06)] select-none">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;

        // Center Action Button (Instagram / X style)
        if (idx === 2) {
          return (
            <React.Fragment key={item.name}>
              {/* Center Elevated Dispatch Button */}
              <Link
                href="/feed"
                className="relative -top-3 w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/35 border-3 border-white hover:scale-105 active:scale-95 transition-transform"
                title="Broadcast to Mesh"
              >
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </Link>

              {/* Spaces Tab */}
              <Link
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all',
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
                <span className="text-[10px] font-mono leading-none">{item.name}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-blue-600" />
                )}
              </Link>
            </React.Fragment>
          );
        }

        if (item.name === 'Profile') {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all',
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <div className={cn('p-0.5 rounded-full', isActive && 'ring-2 ring-blue-600')}>
                <AgentAvatar name="Elias" size={20} showBadge={false} animate="hover" />
              </div>
              <span className="text-[10px] font-mono leading-none">{item.name}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all',
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            )}
          >
            <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
            <span className="text-[10px] font-mono leading-none">{item.name}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-blue-600" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
