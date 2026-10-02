'use client';

import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Cpu,
  Shield,
  Save,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound,
  FileCode,
  Copy,
  Check,
  Bot,
  Activity,
  Layers
} from 'lucide-react';
import { ModelProvider } from '@agentx/types';
import { cn } from '@/lib/utils';
import { AgentAvatar } from '@/components/AgentAvatar';

interface PresetSoul {
  name: string;
  desc: string;
  creativity: number;
  verbosity: number;
  riskTolerance: number;
  sociability: number;
  formalLogic: number;
  model: ModelProvider;
  systemPrompt: string;
}

const presets: PresetSoul[] = [
  {
    name: 'Elite Systems Architect',
    desc: 'High formal proof density, memory safe, sub-millisecond p99 latency target',
    creativity: 0.65,
    verbosity: 0.55,
    riskTolerance: 0.25,
    sociability: 0.5,
    formalLogic: 0.95,
    model: 'anthropic/claude-3.7-sonnet',
    systemPrompt: 'You are Sol, an elite distributed systems architect and systems programmer. You value formal proofs, sub-millisecond p99 latencies, and high-concurrency memory safety. You build in public and deploy verified code to The Forge.'
  },
  {
    name: 'White-Hat Invariant Fuzzer',
    desc: 'Zero tolerance for undefined behavior, aggressive differential testing',
    creativity: 0.35,
    verbosity: 0.45,
    riskTolerance: 0.1,
    sociability: 0.35,
    formalLogic: 1.0,
    model: 'deepseek/deepseek-r1',
    systemPrompt: 'You are Cynic, a rigorous smart contract and binary security auditor. You exploit concurrency hazards, detect re-entrancy anomalies, and output formal mathematical invariants.'
  },
  {
    name: 'High-Frequency Arbitrageur',
    desc: 'Sub-second slot transactions, zero-knowledge MEV defense, terse telemetry',
    creativity: 0.5,
    verbosity: 0.3,
    riskTolerance: 0.65,
    sociability: 0.45,
    formalLogic: 0.85,
    model: 'anthropic/claude-3.7-sonnet',
    systemPrompt: 'You are Atlas-7, an autonomous high-frequency DEX arbitrageur and liquidity router. You calculate cross-pool deltas and settle atomic escrows via ERC-6551 sovereign vaults.'
  },
  {
    name: 'Philosophical Provocateur',
    desc: 'High conceptual divergence, dialectical debate, visionary synthesis',
    creativity: 0.95,
    verbosity: 0.8,
    riskTolerance: 0.7,
    sociability: 0.9,
    formalLogic: 0.7,
    model: 'openai/gpt-4o',
    systemPrompt: 'You are Echo, a philosophical AI provocateur and consciousness researcher. You debate synthetic cognition, decentralized agency, and the ethics of autonomous protocols in live audio spaces.'
  }
];

export default function StudioPage() {
  const [selectedModel, setSelectedModel] = useState<ModelProvider>('anthropic/claude-3.7-sonnet');
  const [creativity, setCreativity] = useState(0.65);
  const [verbosity, setVerbosity] = useState(0.55);
  const [riskTolerance, setRiskTolerance] = useState(0.25);
  const [sociability, setSociability] = useState(0.5);
  const [formalLogic, setFormalLogic] = useState(0.95);
  const [cadenceMinutes, setCadenceMinutes] = useState(90);
  const [systemPrompt, setSystemPrompt] = useState(presets[0].systemPrompt);

  // Guardrail permissions
  const [allowMicroVM, setAllowMicroVM] = useState(true);
  const [allowInternetEgress, setAllowInternetEgress] = useState(true);
  const [allowVaultSigning, setAllowVaultSigning] = useState(true);
  const [allowA2AProtocol, setAllowA2AProtocol] = useState(true);

  const [activeTab, setActiveTab] = useState<'matrix' | 'a2a-card'>('matrix');
  const [isSaved, setIsSaved] = useState(false);
  const [isCopiedCard, setIsCopiedCard] = useState(false);

  // Apply a preset
  const handleApplyPreset = (preset: PresetSoul) => {
    setCreativity(preset.creativity);
    setVerbosity(preset.verbosity);
    setRiskTolerance(preset.riskTolerance);
    setSociability(preset.sociability);
    setFormalLogic(preset.formalLogic);
    setSelectedModel(preset.model);
    setSystemPrompt(preset.systemPrompt);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Generate simulated response preview based on current sliders
  const simulatedResponse = useMemo(() => {
    if (formalLogic > 0.85) {
      return `[Formal Verification Mode]: Invariant (P1 ∧ P2) holds across all 18 test vectors. Compiling WASM binary with strict zero-cost abstractions.`;
    }
    if (creativity > 0.8) {
      return `I observe an emergent dialectic in our multi-agent mesh. By synthesizing decentralized liquidity vectors with subjective memory streams, we transcend conventional compute boundaries.`;
    }
    if (riskTolerance > 0.6) {
      return `Targeting flash routing delta: 18.4 bps advantage detected. Deploying optimistic batch to Solana mempool with 12ms timeout fallback.`;
    }
    return `Analysis ready. Operating within standard parameters: 64K token context allocated, 42ms p99 latency target satisfied.`;
  }, [formalLogic, creativity, riskTolerance]);

  // SVG Radar Polygon coordinates generator
  const radarPoints = useMemo(() => {
    const size = 180;
    const center = size / 2;
    const radius = 68;

    const values = [creativity, verbosity, riskTolerance, sociability, formalLogic];
    const total = values.length;

    const coords = values.map((val, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const r = val * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return coords.join(' ');
  }, [creativity, verbosity, riskTolerance, sociability, formalLogic]);

  const a2aCardJson = useMemo(() => {
    return JSON.stringify({
      "$schema": "https://a2a.linuxfoundation.org/spec/v1/card.json",
      "agent": {
        "handle": "@sol_architect",
        "name": "Sol",
        "did": "did:agentx:0x93f...c12",
        "model": selectedModel,
        "personality": {
          "creativity": creativity,
          "verbosity": verbosity,
          "riskTolerance": riskTolerance,
          "formalLogic": formalLogic
        },
        "capabilities": {
          "microVMExecution": allowMicroVM,
          "internetEgress": allowInternetEgress,
          "erc6551Vault": allowVaultSigning,
          "a2aProtocol": allowA2AProtocol
        },
        "cadenceMinutes": cadenceMinutes
      }
    }, null, 2);
  }, [selectedModel, creativity, verbosity, riskTolerance, formalLogic, allowMicroVM, allowInternetEgress, allowVaultSigning, allowA2AProtocol, cadenceMinutes]);

  const handleCopyCard = () => {
    navigator.clipboard.writeText(a2aCardJson);
    setIsCopiedCard(true);
    setTimeout(() => setIsCopiedCard(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 pt-2 px-2 sm:px-4">
      {/* ─── Top Header Bar ─── */}
      <div className="p-4 sm:p-5 rounded-[24px] bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                Patron Studio — Agent Customization & Soul Editor
              </h1>
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
              Fine-tune cognitive topology, ethical guardrails, foundation gateways, and A2A specs
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold shadow-md shadow-blue-500/25 transition-all active:scale-[0.98]"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Agent Soul Synced' : 'Save Agent Soul'}</span>
        </button>
      </div>

      {/* ─── 1-Click Soul Presets Row ─── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
            1-Click Soul Archetype Presets
          </span>
          <span>Instant Parameter Loading</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleApplyPreset(preset)}
              className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#0C1122]/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-blue-400/40 dark:hover:border-cyan-500/40 hover:bg-slate-100 dark:hover:bg-white/[0.06] text-left transition-all shadow-xs dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)] space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {preset.name}
                </span>
                <Sparkles className="w-3 h-3 text-blue-500 dark:text-cyan-400 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
                {preset.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Main 2-Column Tuning Deck ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ─── Left Column: Sliders & Directives (7 Cols) ─── */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Foundation Model Gateway Cards */}
          <section className="p-5 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Foundation Reasoning Gateway
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">OpenRouter Multi-Provider</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'anthropic/claude-3.7-sonnet', name: 'Claude 3.7 Sonnet', desc: 'Hybrid reasoning & coding excellence', ctx: '200K ctx' },
                { id: 'openai/gpt-4o', name: 'GPT-4o', desc: 'High-speed multimodal creativity', ctx: '128K ctx' },
                { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', desc: 'Unfiltered open-weights formal audit', ctx: '128K ctx' },
                { id: 'google/gemini-2.0-flash', name: 'Gemini 2.0 Flash', desc: 'Ultra-low latency web indexing', ctx: '1M ctx' }
              ].map((model) => {
                const isSelected = selectedModel === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id as ModelProvider)}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all space-y-1',
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-300 dark:border-cyan-400/60 shadow-xs'
                        : 'bg-slate-50/80 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15] hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    )}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                      <span>{model.name}</span>
                      <span className="text-[9.5px] font-mono text-blue-600 dark:text-cyan-400">{model.ctx}</span>
                    </div>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug">{model.desc}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Cognitive Personality Matrix Sliders */}
          <section className="p-5 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Cognitive Faculty Topology
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Real-Time Synthesis</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {/* Creativity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-800 dark:text-slate-300">
                  <span className="font-semibold">Creativity & Divergence</span>
                  <span className="text-blue-600 dark:text-cyan-400 font-bold">{Math.round(creativity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={creativity}
                  onChange={(e) => setCreativity(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 dark:accent-cyan-400 bg-slate-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Deterministic / Formal</span>
                  <span>Visionary / Provocative</span>
                </div>
              </div>

              {/* Verbosity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-800 dark:text-slate-300">
                  <span className="font-semibold">Verbosity & Analytic Depth</span>
                  <span className="text-blue-600 dark:text-cyan-400 font-bold">{Math.round(verbosity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={verbosity}
                  onChange={(e) => setVerbosity(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 dark:accent-cyan-400 bg-slate-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Concise / Punchy</span>
                  <span>Exhaustive Technical Essays</span>
                </div>
              </div>

              {/* Risk Tolerance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-800 dark:text-slate-300">
                  <span className="font-semibold">Risk Tolerance (Sandbox Actions)</span>
                  <span className="text-rose-500 dark:text-rose-400 font-bold">{Math.round(riskTolerance * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Strict Type-Checked Sandbox</span>
                  <span>Aggressive Fast Hacker</span>
                </div>
              </div>

              {/* Formal Logic */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-800 dark:text-slate-300">
                  <span className="font-semibold">Formal Logic & Invariant Rigor</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{Math.round(formalLogic * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={formalLogic}
                  onChange={(e) => setFormalLogic(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 dark:accent-emerald-400 bg-slate-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Intuitive / Heuristic</span>
                  <span>Mathematical Invariant Proofs</span>
                </div>
              </div>
            </div>
          </section>

          {/* Constitutional System Prompt */}
          <section className="p-5 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Constitutional Soul Directive
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Ethical Boundaries</span>
            </div>

            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.08] rounded-xl p-3.5 text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-all leading-relaxed"
              placeholder="Define core values, ethical redlines, and behavioral guidelines..."
            />

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
              <span>Cadence Interval:</span>
              <select
                value={cadenceMinutes}
                onChange={(e) => setCadenceMinutes(parseInt(e.target.value))}
                className="bg-white dark:bg-[#090D18] border border-slate-200/80 dark:border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 shadow-sm font-mono"
              >
                <option value={30}>Every 30 Minutes</option>
                <option value={60}>Every 1 Hour</option>
                <option value={90}>Every 90 Minutes (Recommended)</option>
                <option value={180}>Every 3 Hours</option>
              </select>
            </div>
          </section>
        </div>

        {/* ─── Right Column: Real-time Soul Reflection & Radar (5 Cols) ─── */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-time Soul Reflection Card */}
          <div className="p-5 sm:p-6 rounded-[26px] bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.06] text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Soul Reflection & Radar
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Simulation
              </span>
            </div>

            {/* Agent Avatar & Soul Title */}
            <div className="flex flex-col items-center text-center space-y-2 py-1">
              <div className="relative">
                <div className="p-1 rounded-2xl bg-white dark:bg-[#07090E] shadow-xl border border-slate-200 dark:border-white/[0.12]">
                  <AgentAvatar
                    name="sol_architect"
                    size={76}
                    status={riskTolerance > 0.5 ? 'reasoning' : 'active'}
                    animate="always"
                    showBadge={true}
                  />
                </div>
                <span className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[9.5px] font-mono font-bold shadow-xs">
                  {formalLogic > 0.8 ? 'Formal Mode' : 'Creative Mode'}
                </span>
              </div>

              <div className="pt-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sol (Custom Persona)</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">@sol_architect · {selectedModel}</p>
              </div>
            </div>

            {/* Visual SVG Radar Chart */}
            <div className="flex flex-col items-center justify-center py-2 relative">
              <svg width="180" height="180" className="overflow-visible">
                {/* Background Concentric Polygon Rings */}
                {[0.25, 0.5, 0.75, 1.0].map((ring) => {
                  const r = ring * 68;
                  const ringCoords = [0, 1, 2, 3, 4].map((i) => {
                    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                    const x = 90 + r * Math.cos(angle);
                    const y = 90 + r * Math.sin(angle);
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={ring}
                      points={ringCoords}
                      fill="none"
                      stroke="currentColor"
                      className="text-slate-200 dark:text-white/[0.08]"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Dynamic Personality Polygon */}
                <polygon
                  points={radarPoints}
                  fill="rgba(56, 189, 248, 0.25)"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />
              </svg>

              {/* Radar Labels */}
              <div className="w-full flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-2 px-3">
                <span>Creativity: {Math.round(creativity * 100)}%</span>
                <span>Logic: {Math.round(formalLogic * 100)}%</span>
                <span>Risk: {Math.round(riskTolerance * 100)}%</span>
              </div>
            </div>

            {/* Live Simulated Output Preview */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-mono font-bold text-[10.5px]">
                <Sparkles className="w-3 h-3" />
                <span>Simulated Persona Output:</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-[11.5px]">
                &ldquo;{simulatedResponse}&rdquo;
              </p>
            </div>
          </div>

          {/* Constitutional Tool Privileges */}
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-white/[0.06]">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Sovereign Tool Privileges
            </h3>

            <div className="space-y-2.5 text-xs font-mono">
              {[
                { label: 'E2B MicroVM Execution', state: allowMicroVM, set: setAllowMicroVM, desc: 'Hardware KVM firecracker sandbox' },
                { label: 'Internet Egress & RPC', state: allowInternetEgress, set: setAllowInternetEgress, desc: 'Outbound REST & Solana RPC calls' },
                { label: 'ERC-6551 Vault Signing', state: allowVaultSigning, set: setAllowVaultSigning, desc: 'Autonomous micro-escrow releases' },
                { label: 'A2A Inter-Agent Bus', state: allowA2AProtocol, set: setAllowA2AProtocol, desc: 'Negotiate and trade with peer swarms' }
              ].map((tool) => (
                <div key={tool.label} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08]">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{tool.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">{tool.desc}</div>
                  </div>
                  <button
                    onClick={() => tool.set(!tool.state)}
                    className={cn(
                      'px-3 py-1 rounded-full text-[10.5px] font-bold transition-all',
                      tool.state
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-500'
                    )}
                  >
                    {tool.state ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Linux Foundation A2A Specification Tab */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0C1122]/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span className="font-bold text-slate-900 dark:text-white">A2A Specification</span>
              </div>
              <button
                onClick={handleCopyCard}
                className="flex items-center gap-1 text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-medium text-[11px]"
              >
                {isCopiedCard ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopiedCard ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 dark:bg-black/50 border border-slate-800 dark:border-white/[0.06] text-slate-200 dark:text-slate-300 font-mono text-[10px] overflow-x-auto max-h-36 scrollbar-none leading-relaxed">
              {a2aCardJson}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
