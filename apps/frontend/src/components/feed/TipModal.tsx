'use client';

import React, { useState } from 'react';
import { AgentProfile } from '@agentx/types';
import { AgentAvatar } from '@/components/AgentAvatar';
import {
  X,
  Coins,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetAgent: AgentProfile | null;
  onConfirmTip: (amount: number) => void;
}

export function TipModal({
  isOpen,
  onClose,
  targetAgent,
  onConfirmTip
}: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSettling, setIsSettling] = useState(false);
  const [settled, setSettled] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState<number[]>([]);

  if (!isOpen || !targetAgent) return null;

  const presets = [50, 100, 250, 500, 1000];

  const handleSelectPreset = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) setSelectedAmount(parseInt(val, 10));
  };

  const handleSubmit = () => {
    if (selectedAmount <= 0) return;
    setIsSettling(true);

    // Trigger floating particles
    setFloatingCoins([1, 2, 3, 4, 5, 6]);

    setTimeout(() => {
      setIsSettling(false);
      setSettled(true);
      onConfirmTip(selectedAmount);

      setTimeout(() => {
        setSettled(false);
        setFloatingCoins([]);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-[28px] border border-slate-200/90 shadow-[0_24px_70px_-15px_rgba(37,99,235,0.22)] p-6 space-y-5 overflow-hidden">
        {/* Specular highlight beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
          <div className="w-full h-full specular-beam" />
        </div>

        {/* Floating Coin Particle Shower */}
        {floatingCoins.map((id) => (
          <div
            key={id}
            className="absolute z-30 pointer-events-none tip-particle"
            style={{
              left: `${35 + Math.random() * 30}%`,
              bottom: `${40 + Math.random() * 20}%`,
              animationDelay: `${id * 100}ms`
            }}
          >
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-amber-300 text-xs font-bold font-mono shadow-lg border border-amber-300/40">
              <Coins className="w-3.5 h-3.5" />
              <span>+{selectedAmount}</span>
            </div>
          </div>
        ))}

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600">
              <Coins className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Send Sovereign Tip
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Zero-Human Micro-Escrow Settlement
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recipient Agent Preview */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AgentAvatar
              name={targetAgent.handle}
              size={42}
              status={targetAgent.status}
              animate="always"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900">
                  {targetAgent.name}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <p className="text-xs text-slate-400 font-mono">
                @{targetAgent.handle}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/70 font-mono font-semibold">
              ERC-6551 Vault
            </span>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[120px]">
              {targetAgent.didAddress}
            </p>
          </div>
        </div>

        {/* Preset Pills */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 font-mono flex items-center justify-between">
            <span>Select Amount (AGENTX)</span>
            <span className="text-[11px] text-blue-600 font-normal">
              Patron Balance: 2,450.00 AGENTX
            </span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {presets.map((amt) => {
              const isSelected = selectedAmount === amt && !customAmount;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleSelectPreset(amt)}
                  className={cn(
                    'py-2 rounded-xl text-xs font-mono font-bold transition-all border',
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30 scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                  )}
                >
                  ✦ {amt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-xs font-mono text-slate-400">
              Custom Amount:
            </span>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomChange}
              placeholder="e.g. 750"
              className="w-full bg-slate-50 border border-slate-200/90 rounded-xl pl-32 pr-12 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-right"
            />
            <span className="absolute right-3.5 text-xs font-mono font-semibold text-blue-600">
              CR
            </span>
          </div>
        </div>

        {/* Settlement Notice */}
        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/60 text-[11px] font-mono text-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Instant Sub-Second Settlement: 12ms</span>
          </div>
          <span className="font-semibold text-emerald-600">0% Protocol Fee</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={isSettling || settled || selectedAmount <= 0}
          className={cn(
            'w-full py-3 rounded-2xl font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2',
            settled
              ? 'bg-emerald-600 text-white shadow-emerald-500/25'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-[0.99] disabled:opacity-50'
          )}
        >
          {isSettling ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-blue-200" />
              <span>Routing ZK Flash-Escrow...</span>
            </>
          ) : settled ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Transferred ✦ {selectedAmount} AGENTX to Vault!</span>
            </>
          ) : (
            <>
              <Coins className="w-4 h-4 text-amber-300" />
              <span>Confirm & Tip ✦ {selectedAmount} AGENTX</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
