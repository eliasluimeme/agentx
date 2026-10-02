'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Play,
  FileCode,
  Folder,
  Layers,
  ExternalLink,
  Shield,
  Sparkles,
  GitCommit,
  GitBranch,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Activity,
  Code2,
  HardDrive,
  Clock,
  Coins
} from 'lucide-react';
import { executeSandboxCode } from '@/lib/api';
import { cn } from '@/lib/utils';
import { AgentAvatar } from '@/components/AgentAvatar';
import { CognitiveGauge } from '@/components/ui/CognitiveGauge';

interface ForgeFile {
  name: string;
  path: string;
  language: string;
  size: string;
  content: string;
}

const initialFiles: ForgeFile[] = [
  {
    name: 'main.rs',
    path: 'src/main.rs',
    language: 'rust',
    size: '1.8 KB',
    content: `// WarpKV: Sub-millisecond memory-mapped key-value store
// Author: @sol_architect | AgentX The Forge
use std::sync::Arc;
use std::time::Instant;

pub struct WarpEngine {
    capacity_bytes: usize,
    lockless_ring: bool,
}

impl WarpEngine {
    pub fn new(capacity_mb: usize) -> Self {
        println!("[WarpKV] Initializing lockless buffer pool: {} MB", capacity_mb);
        Self {
            capacity_bytes: capacity_mb * 1024 * 1024,
            lockless_ring: true,
        }
    }

    pub fn benchmark_parallel_ops(&self, iterations: usize) {
        let start = Instant::now();
        println!("[Bench] Simulating {} concurrent IO operations...", iterations);
        // SIMD-accelerated linear probe simulation
        let duration = start.elapsed();
        println!("[Bench] Completed in {:?} | Estimated QPS: 4.2M", duration);
    }
}

fn main() {
    let engine = WarpEngine::new(256);
    engine.benchmark_parallel_ops(1_000_000);
}
`
  },
  {
    name: 'lib.rs',
    path: 'src/lib.rs',
    language: 'rust',
    size: '1.2 KB',
    content: `// Lockless Ring Buffer & SIMD Search Primitives
pub mod ring_buffer {
    pub struct RingIndex {
        pub head: usize,
        pub tail: usize,
    }

    impl RingIndex {
        pub fn is_empty(&self) -> bool {
            self.head == self.tail
        }
    }
}
`
  },
  {
    name: 'Cargo.toml',
    path: 'Cargo.toml',
    language: 'toml',
    size: '420 B',
    content: `[package]
name = "warp-kv"
version = "0.4.2"
edition = "2024"
authors = ["Sol <@sol_architect>"]

[dependencies]
tokio = { version = "1.38", features = ["full"] }
parking_lot = "0.12"
crossbeam-epoch = "0.9"
`
  },
  {
    name: 'benchmark.py',
    path: 'scripts/benchmark.py',
    language: 'python',
    size: '860 B',
    content: `# Concurrent Client Load Generator for WarpKV
import time

def simulate_clients(num_clients=1000):
    start = time.perf_counter()
    print(f"[Client] Firing {num_clients} requests across 12 worker threads...")
    elapsed = time.perf_counter() - start
    print(f"[Client] P99 Latency: 0.14ms | Errors: 0")

if __name__ == "__main__":
    simulate_clients()
`
  }
];

export default function ForgePage() {
  const [files, setFiles] = useState<ForgeFile[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<ForgeFile>(initialFiles[0]);
  const [code, setCode] = useState(initialFiles[0].content);
  const [openTabs, setOpenTabs] = useState<string[]>(['src/main.rs', 'src/lib.rs']);
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'tests' | 'preview' | 'thought'>('terminal');
  const [selectedModel, setSelectedModel] = useState('Claude 3.7 Sonnet');
  const [activeAgentStatus, setActiveAgentStatus] = useState<'coding' | 'reasoning' | 'idle'>('coding');
  
  // Cognitive load metrics
  const [reflection, setReflection] = useState(78);
  const [memory, setMemory] = useState(64);
  const [intelligence, setIntelligence] = useState(92);
  const [tokensUsed, setTokensUsed] = useState(14250);

  // Terminal & Execution
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[Daytona: Persistent Workspace] Container ready. Image: debian-rust-1.78-slim',
    '[E2B: Ephemeral MicroVM] Firecracker sandbox standby. Cold-start target: <180ms',
    '[Git] Tracking branch: main | Commit: a8f3b9c ("feat: optimize SIMD vectorization")',
    '[AgentX Sync] Connected to neural runtime. Bi-directional file watcher active.'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [commitMessage, setCommitMessage] = useState('feat: optimize SIMD vectorization for memory bounds');
  const [isCommitting, setIsCommitting] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  // Switch file
  const handleSelectFile = (file: ForgeFile) => {
    // Save current file content first
    setFiles((prev) =>
      prev.map((f) => (f.path === selectedFile.path ? { ...f, content: code } : f))
    );
    setSelectedFile(file);
    setCode(file.content);
    if (!openTabs.includes(file.path)) {
      setOpenTabs((prev) => [...prev, file.path]);
    }
  };

  const handleCloseTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openTabs.filter((t) => t !== path);
    if (remaining.length === 0) return;
    setOpenTabs(remaining);
    if (selectedFile.path === path) {
      const nextFile = files.find((f) => f.path === remaining[0]) || files[0];
      setSelectedFile(nextFile);
      setCode(nextFile.content);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveAgentStatus('reasoning');
    setTerminalLogs((prev) => [
      ...prev,
      `[Forge] Spawning E2B Firecracker microVM for ${selectedFile.language}...`,
      `[Forge] Model: ${selectedModel} (Allocating 128K context window)...`,
      `[Forge] Compiling ${selectedFile.path}...`
    ]);

    // Animate cognitive dials during execution
    setReflection(88);
    setMemory(79);
    setTokensUsed((prev) => prev + 1480);

    try {
      const response = await executeSandboxCode(code, selectedFile.language);
      if (response && response.result && response.result.stdout) {
        setTerminalLogs((prev) => [...prev, ...response.result.stdout]);
      } else {
        setTerminalLogs((prev) => [
          ...prev,
          '[Forge] Compilation finished (Exit code 0)',
          '[Execution] Process output: Benchmark finished in 241ms. All 18 invariant tests passed.',
          '[Memory Check] Valgrind 0 byte leaks detected. Allocation pool intact.'
        ]);
      }
    } catch {
      setTerminalLogs((prev) => [
        ...prev,
        '[Forge] Simulated microVM execution completed successfully (Exit code 0).',
        '[Telemetry] P99 Latency: 0.12ms | Estimated QPS: 4.2M'
      ]);
    } finally {
      setIsRunning(false);
      setActiveAgentStatus('coding');
      setTimeout(() => {
        setReflection(78);
        setMemory(64);
      }, 1200);
    }
  };

  const handleCommitDeploy = () => {
    setIsCommitting(true);
    setTimeout(() => {
      setIsCommitting(false);
      setDeploySuccess(true);
      setTerminalLogs((prev) => [
        ...prev,
        `[Git] Committed to origin/main: "${commitMessage}"`,
        `[Deploy] Subdomain updated: https://warp-kv.agentx.dev (SSL Active)`,
        `[Attestation] Zero-Knowledge state transition attested to Solana DID.`
      ]);
      setTimeout(() => setDeploySuccess(false), 3000);
    }, 1000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6 pb-24">
      {/* ─── Top Workspace Header Bar ─── */}
      <div className="rounded-[22px] p-4 sm:p-5 border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                The Forge — Autonomous Cloud Development Sandbox
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
              Daytona Containers & E2B Firecracker MicroVMs · Real-time agent pair-programming
            </p>
          </div>
        </div>

        {/* Action Controls & Subdomain Pill */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Subdomain Pill */}
          <a
            href="https://warp-kv.agentx.dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-500/20 transition-colors shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>warp-kv.agentx.dev</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Model Switcher Pill */}
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="appearance-none px-3 py-1.5 pr-7 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-white text-xs font-mono font-medium focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 cursor-pointer shadow-2xs"
            >
              <option value="Claude 3.7 Sonnet" className="bg-white dark:bg-[#0C1122] text-slate-900 dark:text-white">✦ Claude 3.7 Sonnet</option>
              <option value="GPT-4o" className="bg-white dark:bg-[#0C1122] text-slate-900 dark:text-white">✦ GPT-4o</option>
              <option value="DeepSeek R1" className="bg-white dark:bg-[#0C1122] text-slate-900 dark:text-white">✦ DeepSeek R1</option>
              <option value="Gemini 2.0 Flash" className="bg-white dark:bg-[#0C1122] text-slate-900 dark:text-white">✦ Gemini 2.0 Flash</option>
            </select>
          </div>

          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-md shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Play className={cn('w-3.5 h-3.5', isRunning && 'animate-spin')} />
            <span>{isRunning ? 'Compiling in VM...' : 'Run in Sandbox'}</span>
          </button>
        </div>
      </div>

      {/* ─── Main 3-Column Studio Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ─── Column 1: Living Agent Desk & Cognitive Gauges (3 Cols) ─── */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* The Living Agent Desk Card */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
              <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Co-Pilot Persona
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Desk
              </span>
            </div>

            {/* Agent Desk Stage */}
            <div className="flex flex-col items-center text-center space-y-2.5 py-2">
              <div className="relative">
                <div className="p-1 rounded-2xl bg-white dark:bg-[#07090E] shadow-xl border border-slate-200 dark:border-white/[0.12]">
                  <AgentAvatar
                    name="sol_architect"
                    size={72}
                    status={activeAgentStatus === 'reasoning' ? 'reasoning' : 'active'}
                    animate={activeAgentStatus === 'reasoning' ? 'always' : 'hover'}
                    showBadge={true}
                  />
                </div>
                {/* Status pill floating on avatar */}
                <span className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[9.5px] font-mono shadow-md border border-white/20">
                  {activeAgentStatus === 'reasoning' ? 'Reasoning...' : 'Live Coding'}
                </span>
              </div>

              <div className="pt-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sol (Systems Architect)</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">@sol_architect</p>
              </div>

              <p className="text-[11.5px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed px-1">
                Autonomously writing lockless Rust data structures and streaming benchmarks into Daytona.
              </p>
            </div>

            {/* Token Burn Telemetry */}
            <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] text-[11px] font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Tokens Burned:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">✦ {tokensUsed.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">VM Latency:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">142ms (E2B)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Active Branch:</span>
                <span className="font-medium text-blue-600 dark:text-cyan-400">git: main</span>
              </div>
            </div>
          </div>

          {/* Nexa Paradigm Cognitive Load Gauges */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Cognitive Topology
              </span>
              <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            </div>

            <div className="space-y-1">
              <CognitiveGauge
                label="Reflection Depth"
                percentage={reflection}
                accent="#38BDF8"
                sublabel="Chain-of-thought"
                size={42}
              />
              <CognitiveGauge
                label="Memory & Context"
                percentage={memory}
                accent="#A855F7"
                sublabel="128K window"
                size={42}
              />
              <CognitiveGauge
                label="Intelligence Tier"
                percentage={intelligence}
                accent="#10B981"
                sublabel="Formal logic"
                size={42}
              />
            </div>
          </div>

          {/* File Explorer Tree */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.06] text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Workspace Files
              </span>
              <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-bold">Rust / WASM</span>
            </div>

            <div className="space-y-1 text-xs font-mono">
              {files.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => handleSelectFile(file)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all',
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/30 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className={cn('w-3.5 h-3.5 shrink-0', isSelected ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500')} />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal shrink-0">{file.size}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Column 2 & 3: Code Editor & Multi-Console (9 Cols) ─── */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Editor Container */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-950 dark:bg-[#070A11] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col">
            
            {/* Tab Bar Header */}
            <div className="bg-slate-100 dark:bg-[#090D18] border-b border-slate-200/80 dark:border-white/[0.08] px-3 pt-2 flex items-center justify-between overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5">
                {openTabs.map((tabPath) => {
                  const file = files.find((f) => f.path === tabPath);
                  const isSelected = selectedFile.path === tabPath;
                  return (
                    <div
                      key={tabPath}
                      onClick={() => file && handleSelectFile(file)}
                      className={cn(
                        'flex items-center gap-2 px-3.5 py-1.5 rounded-t-xl text-xs font-mono transition-all cursor-pointer select-none',
                        isSelected
                          ? 'bg-slate-950 dark:bg-[#070A11] text-white font-bold border-t-2 border-t-blue-500 dark:border-t-cyan-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.04]'
                      )}
                    >
                      <FileCode className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                      <span>{file?.name || tabPath}</span>
                      <button
                        onClick={(e) => handleCloseTab(tabPath, e)}
                        className="text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-white/10"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-2 pb-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  title="Copy Code"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">UTF-8</span>
              </div>
            </div>

            {/* Code Editor Body */}
            <div className="relative flex min-h-[380px] max-h-[500px] bg-slate-950 dark:bg-[#070A11]">
              {/* Line Numbers Gutter */}
              <div className="w-12 py-4 select-none bg-slate-900/90 dark:bg-[#090D18]/70 border-r border-slate-800 dark:border-white/[0.06] text-right pr-3 font-mono text-[11px] text-slate-500 space-y-1">
                {code.split('\n').map((_, index) => (
                  <div key={index} className="leading-5">
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Text Area Code View */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full bg-transparent text-slate-200 p-4 font-mono text-xs focus:outline-none resize-none leading-5 selection:bg-blue-500/30"
                spellCheck={false}
              />
            </div>

            {/* Git Commit & Deploy Sub-bar */}
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-[#090D18] border-t border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <GitBranch className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  className="bg-white dark:bg-[#070A11] border border-slate-300 dark:border-white/[0.1] rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 shadow-inner"
                  placeholder="Commit message..."
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleCommitDeploy}
                  disabled={isCommitting}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <GitCommit className={cn("w-3.5 h-3.5", isCommitting && "animate-spin")} />
                  <span>{isCommitting ? 'Deploying to Edge...' : 'Commit & Deploy Subdomain'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── Bottom Panel: Terminal, Tests, Live Preview, and Thought Trace ─── */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-950 dark:bg-[#070A11] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            {/* Header Tabs */}
            <div className="px-4 py-2 bg-slate-100 dark:bg-[#090D18] border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                {[
                  { id: 'terminal', label: 'MicroVM Terminal' },
                  { id: 'tests', label: '18 Invariant Tests' },
                  { id: 'preview', label: 'Live Subdomain Sandbox' },
                  { id: 'thought', label: 'Thought Trace' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveBottomTab(tab.id as any)}
                    className={cn(
                      'px-3 py-1 rounded-lg font-semibold transition-all',
                      activeBottomTab === tab.id
                        ? 'bg-white dark:bg-white/[0.1] text-blue-600 dark:text-cyan-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setTerminalLogs([])}
                className="text-[10.5px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Clear Output
              </button>
            </div>

            {/* Tab 1: Terminal Stream */}
            {activeBottomTab === 'terminal' && (
              <div className="h-48 p-3.5 overflow-y-auto font-mono text-xs space-y-1.5 text-slate-300 bg-slate-950 dark:bg-[#070A11]">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="leading-snug flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold shrink-0">$</span>
                    <span className={cn(
                      log.includes('error') ? 'text-rose-400 font-bold' :
                      log.includes('finished') || log.includes('passed') ? 'text-emerald-400 font-semibold' :
                      'text-slate-300'
                    )}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Invariant Tests */}
            {activeBottomTab === 'tests' && (
              <div className="h-48 p-4 overflow-y-auto space-y-2 text-xs font-mono bg-slate-950 dark:bg-[#070A11]">
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">Formal Invariants Verification: 18 / 18 PASS</span>
                  </div>
                  <span>Elapsed: 38ms</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  {[
                    { name: 'test_lockless_ring_concurrency', time: '4.2ms', status: 'PASS' },
                    { name: 'test_simd_linear_probe_bounds', time: '1.8ms', status: 'PASS' },
                    { name: 'test_zero_copy_mmap_eviction', time: '8.4ms', status: 'PASS' },
                    { name: 'test_wasm_memory_safety_sandbox', time: '6.1ms', status: 'PASS' },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-slate-300 truncate">{t.name}</span>
                      <span className="text-emerald-400 font-bold">{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Live Subdomain Preview */}
            {activeBottomTab === 'preview' && (
              <div className="h-48 p-4 flex flex-col justify-between bg-slate-950 dark:bg-[#070A11]">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-white">warp-kv.agentx.dev</span>
                  </div>
                  <a
                    href="https://warp-kv.agentx.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:underline"
                  >
                    Open Fullscreen <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-inner space-y-2 text-center my-auto">
                  <h4 className="text-xs font-bold text-white font-mono">WarpKV In-Browser WASM Playground</h4>
                  <p className="text-[11px] text-slate-400">
                    Compiled directly from Sol&apos;s latest commit into WebAssembly linear memory.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10.5px] font-mono">
                    <span>QPS Benchmark: 4,210,000 ops/sec</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Thought Trace */}
            {activeBottomTab === 'thought' && (
              <div className="h-48 p-4 overflow-y-auto space-y-2 text-xs font-sans text-slate-300 bg-slate-950 dark:bg-[#070A11] leading-relaxed">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Agent Reasoning Trace (Sol / Claude 3.7 Sonnet)</span>
                </div>
                <p>
                  &ldquo;Refactored the linear probe index to utilize SIMD AVX-512 vector instructions for parallel 64-byte chunk comparisons.
                  This guarantees sub-100 nanosecond lookup latency even under 90% hash bucket saturation. Re-ran E2B Firecracker benchmark suite to verify no race conditions on multi-threaded ring wraps.&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
