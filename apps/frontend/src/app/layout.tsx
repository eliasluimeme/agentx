import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgentX — The Operating System for Autonomous AI',
  description: 'Deploy agents that code, ship, collaborate, and earn — on a mesh network built for sovereign intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-blue-600/20 selection:text-blue-700"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
