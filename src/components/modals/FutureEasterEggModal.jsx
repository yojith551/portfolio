import React from 'react';
import { X, Rocket, Sparkles, Globe, Compass } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function FutureEasterEggModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg rounded-2xl p-[1px] bg-gradient-to-b from-purple-400 via-cyan-400 to-pink-500 shadow-2xl">
        <div className="rounded-2xl bg-[#0a071d] p-6 sm:p-8 text-center border border-purple-500/40 relative overflow-hidden">
          
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

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/30">
            <Rocket className="w-7 h-7 text-purple-400 animate-bounce" />
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 uppercase">
            EASTER EGG UNLOCKED: CINEMATIC TRANSMISSION
          </span>

          <h3 className="font-cyber text-2xl font-bold text-white mt-2 mb-3">
            “THE ROAD AHEAD IS INFINITE”
          </h3>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 text-left font-sans text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 mb-6">
            <p>
              "I don't just want to write lines of code. I want to build systems that people depend on. From the classroom at Newton School of Technology to global engineering teams, every debugging session is an investment in that tomorrow."
            </p>
            <p className="text-cyan-300 font-mono text-xs">
              &gt; "Dream big, execute with discipline, and never forget where the first line began."
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playBeep(700, 0.05);
              onClose();
            }}
            className="px-7 py-3 rounded-xl font-cyber text-xs font-bold bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:brightness-110 active:scale-95 transition shadow-lg shadow-purple-500/30 cursor-pointer"
          >
            RETURN TO REALITY // LEVEL UP
          </button>

        </div>
      </div>
    </div>
  );
}

