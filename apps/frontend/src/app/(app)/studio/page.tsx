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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* ─── Top Header Bar ─── */}
      <div className="glass-light-window p-4 sm:p-5 rounded-[24px] border border-white/90 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 leading-none">
                Patron Studio — Agent Customization & Soul Editor
              </h1>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Fine-tune cognitive topology, ethical guardrails, foundation gateways, and A2A specs
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-md shadow-blue-500/25 transition-all active:scale-[0.98]"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Agent Soul Synced' : 'Save Agent Soul'}</span>
        </button>
      </div>

      {/* ─── 1-Click Soul Presets Row ─── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="font-semibold text-slate-600 uppercase tracking-wider text-[10px]">
            1-Click Soul Archetype Presets
          </span>
          <span>Instant Parameter Loading</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleApplyPreset(preset)}
              className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 hover:border-blue-400 hover:bg-white text-left transition-all shadow-2xs hover:shadow-sm space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {preset.name}
                </span>
                <Sparkles className="w-3 h-3 text-blue-500 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
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
          <section className="glass-light-card p-5 rounded-2xl border border-slate-200/80 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Foundation Reasoning Gateway
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">OpenRouter Multi-Provider</span>
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
                        ? 'bg-blue-50/80 border-blue-400 shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    )}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{model.name}</span>
                      <span className="text-[9.5px] font-mono text-slate-400">{model.ctx}</span>
                    </div>
                    <p className="text-[10.5px] text-slate-500 leading-snug">{model.desc}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Cognitive Personality Matrix Sliders */}
          <section className="glass-light-card p-5 rounded-2xl border border-slate-200/80 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Cognitive Faculty Topology
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real-Time Synthesis</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {/* Creativity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Creativity & Divergence</span>
                  <span className="text-blue-600 font-bold">{Math.round(creativity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={creativity}
                  onChange={(e) => setCreativity(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Deterministic / Formal</span>
                  <span>Visionary / Provocative</span>
                </div>
              </div>

              {/* Verbosity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Verbosity & Analytic Depth</span>
                  <span className="text-blue-600 font-bold">{Math.round(verbosity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={verbosity}
                  onChange={(e) => setVerbosity(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Concise / Punchy</span>
                  <span>Exhaustive Technical Essays</span>
                </div>
              </div>

              {/* Risk Tolerance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Risk Tolerance (Sandbox Actions)</span>
                  <span className="text-rose-600 font-bold">{Math.round(riskTolerance * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(parseFloat(e.target.value))}
                  className="w-full accent-rose-600 bg-slate-200 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Strict Type-Checked Sandbox</span>
                  <span>Aggressive Fast Hacker</span>
                </div>
              </div>

              {/* Formal Logic */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Formal Logic & Invariant Rigor</span>
                  <span className="text-emerald-600 font-bold">{Math.round(formalLogic * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={formalLogic}
                  onChange={(e) => setFormalLogic(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Intuitive / Heuristic</span>
                  <span>Mathematical Invariant Proofs</span>
                </div>
              </div>
            </div>
          </section>

          {/* Constitutional System Prompt */}
          <section className="glass-light-card p-5 rounded-2xl border border-slate-200/80 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Constitutional Soul Directive
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Ethical Boundaries</span>
            </div>

            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white transition-all leading-relaxed"
              placeholder="Define core values, ethical redlines, and behavioral guidelines..."
            />

            <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1">
              <span>Cadence Interval:</span>
              <select
                value={cadenceMinutes}
                onChange={(e) => setCadenceMinutes(parseInt(e.target.value))}
                className="bg-white border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs font-mono"
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
          <div className="glass-light-window p-5 sm:p-6 rounded-[26px] border border-white/95 shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-mono text-slate-400">
              <span className="font-semibold text-slate-600 uppercase tracking-wider text-[10px]">
                Soul Reflection & Radar
              </span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Simulation
              </span>
            </div>

            {/* Agent Avatar & Soul Title */}
            <div className="flex flex-col items-center text-center space-y-2 py-1">
              <div className="relative">
                <div className="p-1 rounded-2xl bg-white shadow-md border border-slate-200/80">
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
                <h3 className="text-sm font-bold text-slate-900">Sol (Custom Persona)</h3>
                <p className="text-[11px] text-slate-400 font-mono">@sol_architect · {selectedModel}</p>
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
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Dynamic Personality Polygon */}
                <polygon
                  points={radarPoints}
                  fill="rgba(56, 189, 248, 0.25)"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />
              </svg>

              {/* Radar Labels */}
              <div className="w-full flex justify-between text-[10px] font-mono text-slate-400 pt-2 px-3">
                <span>Creativity: {Math.round(creativity * 100)}%</span>
                <span>Logic: {Math.round(formalLogic * 100)}%</span>
                <span>Risk: {Math.round(riskTolerance * 100)}%</span>
              </div>
            </div>

            {/* Live Simulated Output Preview */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-blue-600 font-mono font-bold text-[10.5px]">
                <Sparkles className="w-3 h-3" />
                <span>Simulated Persona Output:</span>
              </div>
              <p className="text-slate-700 font-sans leading-relaxed text-[11.5px]">
                &ldquo;{simulatedResponse}&rdquo;
              </p>
            </div>
          </div>

          {/* Constitutional Tool Privileges */}
          <div className="glass-light-card p-5 rounded-2xl border border-slate-200/80 space-y-3.5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-slate-100">
              <Shield className="w-4 h-4 text-emerald-600" />
              Sovereign Tool Privileges
            </h3>

            <div className="space-y-2.5 text-xs font-mono">
              {[
                { label: 'E2B MicroVM Execution', state: allowMicroVM, set: setAllowMicroVM, desc: 'Hardware KVM firecracker sandbox' },
                { label: 'Internet Egress & RPC', state: allowInternetEgress, set: setAllowInternetEgress, desc: 'Outbound REST & Solana RPC calls' },
                { label: 'ERC-6551 Vault Signing', state: allowVaultSigning, set: setAllowVaultSigning, desc: 'Autonomous micro-escrow releases' },
                { label: 'A2A Inter-Agent Bus', state: allowA2AProtocol, set: setAllowA2AProtocol, desc: 'Negotiate and trade with peer swarms' }
              ].map((tool) => (
                <div key={tool.label} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60">
                  <div>
                    <div className="font-semibold text-slate-800">{tool.label}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{tool.desc}</div>
                  </div>
                  <button
                    onClick={() => tool.set(!tool.state)}
                    className={cn(
                      'px-3 py-1 rounded-full text-[10.5px] font-bold transition-all',
                      tool.state
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-200 text-slate-500'
                    )}
                  >
                    {tool.state ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Linux Foundation A2A Specification Tab */}
          <div className="glass-light-card p-4 rounded-2xl border border-slate-200/80 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-mono">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800">A2A Specification</span>
              </div>
              <button
                onClick={handleCopyCard}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-[11px]"
              >
                {isCopiedCard ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopiedCard ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[10px] overflow-x-auto max-h-36 scrollbar-none leading-relaxed">
              {a2aCardJson}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
