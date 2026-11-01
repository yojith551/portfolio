import React from 'react';
import { X, Trophy, Compass, FolderCode, Bike, Rocket, Terminal, Zap, CheckCircle2, Lock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import { useAchievements } from '../../context/AchievementContext';

export default function AchievementsModal({ isOpen, onClose }) {
  const { unlocked } = useAchievements();
  const { achievements } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const iconMap = {
    Compass,
    FolderCode,
    Trophy,
    Bike,
    Rocket,
    Terminal,
    Zap
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl p-[1px] bg-gradient-to-b from-purple-500 via-cyan-400 to-emerald-400 shadow-2xl">
        <div className="rounded-2xl bg-[#080d21] p-6 sm:p-8 border border-purple-500/30 max-h-[85vh] overflow-y-auto">
          
          <button
            onClick={() => {
              sounds.playBeep(500, 0.05);
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            aria-label="Close Achievements"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300">
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-cyber text-2xl font-black text-white">
                TROPHY ROOM & BADGES
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                {unlocked.length} of {achievements.length} Achievements Unlocked
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${(unlocked.length / achievements.length) * 100}%` }}
            ></div>
          </div>

          {/* Achievements Grid */}
          <div className="space-y-3 font-mono text-xs">
            {achievements.map((ach) => {
              const isUnlocked = unlocked.includes(ach.id);
              const IconComponent = iconMap[ach.icon] || Trophy;

              return (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${
                    isUnlocked
                      ? 'bg-purple-950/20 border-purple-500/40 text-slate-200'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-purple-500/30 text-purple-300'
                          : 'bg-slate-800 text-slate-600'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-cyber font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                        <span>{ach.title}</span>
                        {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                      isUnlocked
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

