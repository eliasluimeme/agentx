import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#07090E] dark:text-slate-100 antialiased selection:bg-blue-600/20 selection:text-blue-700 transition-colors duration-300"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif' }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
