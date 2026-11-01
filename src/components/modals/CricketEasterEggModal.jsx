import React, { useState } from 'react';
import { X, Award, Trophy, Play, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function CricketEasterEggModal({ isOpen, onClose }) {
  const [battingState, setBattingState] = useState('idle'); // 'idle' | 'swung'
  const [runsScored, setRunsScored] = useState(27);
  const [catches, setCatches] = useState(2);

  if (!isOpen) return null;

  const handleSwing = () => {
    sounds.playBatHit();
    setBattingState('swung');
    setRunsScored(prev => prev + 4);
    setTimeout(() => {
      setBattingState('idle');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-b from-emerald-400 to-cyan-500 shadow-2xl">
        <div className="rounded-2xl bg-[#071318] p-6 text-center border border-emerald-500/40 relative overflow-hidden">
          
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

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/30">
            <Trophy className="w-7 h-7" />
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase">
            EASTER EGG UNLOCKED: CRICKET PROTOCOL
          </span>

          <h3 className="font-cyber text-2xl font-bold text-white mt-2 mb-1">
            "CLUTCH KNOCK: 27 RUNS & 2 CATCHES"
          </h3>

          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-5">
            On the cricket pitch, talent is nothing without mental poise. That memorable match taught me how to stay focused under chasing pressure, trust my teammates, and execute under the floodlights.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 mb-5 flex justify-around font-mono text-center">
            <div>
              <div className="text-[10px] text-slate-400">INNINGS RUNS</div>
              <div className="text-2xl font-bold text-emerald-400 font-cyber">{runsScored}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">OUTFIELD CATCHES</div>
              <div className="text-2xl font-bold text-cyan-400 font-cyber">{catches}</div>
            </div>
          </div>

          <button
            onClick={handleSwing}
            className="w-full py-3 rounded-xl font-cyber text-xs font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/30 cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{battingState === 'swung' ? 'CRACK! BOUNDARY!' : 'CRACK ANOTHER COVER DRIVE!'}</span>
          </button>

        </div>
      </div>
    </div>
  );
}

