import React from 'react';
import { Trophy, Sparkles, X } from 'lucide-react';
import { useAchievements } from '../../context/AchievementContext';

export default function AchievementToast() {
  const { activeToast, setActiveToast } = useAchievements();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl bg-[#080d21] p-4 border border-purple-500/40 flex items-start gap-3 backdrop-blur-xl">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shrink-0 shadow-lg shadow-purple-500/30">
          <Trophy className="w-5 h-5 text-purple-400 animate-bounce" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 uppercase font-bold tracking-wider">
              ACHIEVEMENT UNLOCKED!
            </span>
            <button
              onClick={() => setActiveToast(null)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4 className="font-cyber text-sm font-bold text-white mt-1 truncate">
            {activeToast.title}
          </h4>
          <p className="text-xs text-slate-300 font-sans mt-0.5 line-clamp-2">
            {activeToast.description}
          </p>
        </div>
      </div>
    </div>
  );
}

