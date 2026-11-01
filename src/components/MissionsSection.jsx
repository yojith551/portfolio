import React, { useState } from 'react';
import { Target, Flag, Rocket, CheckCircle2, Star, Shield, ArrowRight, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export default function MissionsSection() {
  const { missions } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState('shortTerm'); // 'shortTerm' | 'longTerm'

  return (
    <section id="missions" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          <span>TACTICAL CAMPAIGN</span>
        </div>
        <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-wide">
          MISSION: <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">BUILD SOMETHING THAT MATTERS</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-mono">
          Strategic progression directives from first-year foundation milestones to global tech impact.
        </p>

        {/* Tab Toggle */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => {
              sounds.playBeep(650, 0.04);
              setActiveTab('shortTerm');
            }}
            className={`px-5 py-2 rounded-xl font-cyber text-xs tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'shortTerm'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Flag className="w-4 h-4 text-cyan-300" />
            <span>SHORT-TERM OBJECTIVES</span>
          </button>
          <button
            onClick={() => {
              sounds.playBeep(650, 0.04);
              setActiveTab('longTerm');
            }}
            className={`px-5 py-2 rounded-xl font-cyber text-xs tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'longTerm'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/25'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4 text-purple-300" />
            <span>LONG-TERM CAMPAIGN (NORTH STAR)</span>
          </button>
        </div>
      </div>

      {/* MISSIONS CONTAINER */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'shortTerm' ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            {missions.shortTerm.map((m, idx) => (
              <div
                key={m.id}
                className="group relative rounded-xl p-5 bg-[#080d21] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400 flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h3 className="font-cyber text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition">
                      {m.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-400">{m.targetDate}</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {m.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-3.5 pl-10 font-sans leading-relaxed">
                  {m.desc}
                </p>

                {/* Progress bar */}
                <div className="pl-10">
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            {missions.longTerm.map((m, idx) => (
              <div
                key={m.id}
                className="group relative rounded-xl p-5 bg-[#090b1c] border border-purple-500/20 hover:border-purple-400/60 transition-all duration-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-500/30 font-mono text-xs font-bold text-purple-400 flex items-center justify-center">
                      ★
                    </span>
                    <h3 className="font-cyber text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition">
                      {m.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">
                    {m.milestone}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 pl-10 font-sans leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

