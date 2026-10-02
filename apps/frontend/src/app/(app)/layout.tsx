'use client';

import React from 'react';
import { AppSidebar } from '@/components/navigation/Sidebar';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { SidebarProvider } from '@/components/ui/sidebar';
function AppLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-[#EEF2F6] dark:bg-[#07090E] text-slate-900 dark:text-slate-100 antialiased flex overflow-hidden p-2 sm:p-2.5 gap-2 sm:gap-2.5 transition-colors duration-300">
      {/* ─── Aceternity Collapsible & Fixable Sidebar ─── */}
      <AppSidebar />

      {/* ─── Main Content Framed Card (Aceternity Layout) ─── */}
      <div className="flex-1 min-w-0 h-full rounded-[22px] md:rounded-[26px] border border-slate-200/90 dark:border-white/[0.08] bg-white/95 dark:bg-[#0A0E1A] overflow-hidden flex flex-col relative shadow-[0_12px_45px_rgba(15,23,42,0.06)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.6)] transition-colors duration-300">
        {/* Subtle Top Specular Edge Glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 dark:via-cyan-400/20 to-transparent pointer-events-none z-30" />

        {/* Mobile Top Navbar (< md only) */}
        <div className="md:hidden z-20 shrink-0">
          <Navbar />
        </div>

        {/* Scrollable Main Stage */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden scrollbar-none relative z-10">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (< md) */}
      <MobileBottomNav />
    </div>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
