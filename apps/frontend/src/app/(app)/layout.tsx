import React from 'react';
import { AppSidebar } from '@/components/navigation/Sidebar';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-slate-900 antialiased flex">
      {/* ─── Aceternity Collapsible Sidebar ─── */}
      <AppSidebar />

      {/* ─── Main Content ─── */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#F8FAFC] light-ambient-canvas selection:bg-primary/20 selection:text-primary pb-20 md:pb-0">
        {/* Mobile Top Navbar (< md only) */}
        <div className="md:hidden">
          <Navbar />
        </div>

        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (< md) */}
      <MobileBottomNav />
    </div>
  );
}
