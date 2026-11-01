import React from 'react';
import { X, Zap, ShieldAlert, Terminal, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function KonamiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg rounded-2xl p-[1px] bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
        <div className="rounded-2xl bg-[#09090b] p-6 sm:p-8 text-center border border-yellow-500/50 relative overflow-hidden">
          
          <button
            onClick={() => {
              sounds.playBeep(500, 0.05);
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-yellow-400 shadow-lg shadow-yellow-500/30">
            <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>

          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-yellow-950 text-yellow-300 border border-yellow-500/40 uppercase font-bold tracking-widest">
            SECRET UNLOCKED: DEVELOPER GOD MODE
          </span>

          <h3 className="font-cyber text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
            KONAMI CODE VERIFIED!
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed mb-6">
            You discovered the legendary sequence: <br />
            <span className="text-yellow-400 font-bold">↑ ↑ ↓ ↓ ← → ← → B A</span>
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-yellow-500/30 text-left font-mono text-xs text-yellow-300 space-y-1.5 mb-6">
            <div>&gt; Access clearance granted: OVERLORD_DEV</div>
            <div>&gt; Game turbo multiplier boosted to 5X</div>
            <div>&gt; All secret easter egg nodes synchronized</div>
            <div>&gt; Welcome to the inner circle of YOJITH.exe</div>
          </div>

          <button
            onClick={() => {
              sounds.playBeep(700, 0.05);
              onClose();
            }}
            className="px-8 py-3 rounded-xl font-cyber text-xs font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 hover:brightness-110 active:scale-95 transition shadow-lg shadow-yellow-500/30 cursor-pointer"
          >
            CONFIRM PRIVILEGES
          </button>

        </div>
      </div>
    </div>
  );
}

