import React, { useState } from 'react';
import { Shield, Sparkles, Trophy, Award, Cpu, Code, Flame, User, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export default function PlayerProfile() {
  const { profile } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'stats' | 'quests' | 'perks'
  const [bonusXP, setBonusXP] = useState(0);

  const xpPercentage = Math.min(100, Math.round(((profile.currentXP + bonusXP) / profile.nextLevelXP) * 100));

  const handleInspectXP = () => {
    sounds.playBeep(850, 0.08);
    setBonusXP(prev => (prev < 300 ? prev + 50 : prev));
  };

  return (
    <section id="profile" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>RPG CHARACTER DOSSIER</span>
        </div>
        <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-wide">
          PLAYER PROFILE: <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">YOJITH</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-mono">
          First-Year Developer // Newton School of Technology Node // Class: Explorer
        </p>
      </div>

      {/* Main RPG Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Character Avatar & Core Attributes Sheet */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-emerald-500/30">
            <div className="rounded-2xl bg-[#080d21] p-6 border border-cyan-500/20 relative overflow-hidden backdrop-blur-xl">
              
              {/* Scanline texture */}
              <div className="absolute inset-0 scanline pointer-events-none opacity-40"></div>

              {/* Avatar Hologram Card */}
              <div className="relative mx-auto w-44 h-44 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-purple-600/30 to-emerald-500/20 p-1 mb-5 flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl bg-[#050814] flex flex-col items-center justify-center border border-cyan-400/40 shadow-inner group">
                  
                  {/* Holographic glowing crest */}
                  <div className="w-24 h-24 rounded-full bg-cyan-500/10 border-2 border-cyan-400/60 flex items-center justify-center relative mb-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <span className="font-cyber text-4xl font-extrabold text-cyan-300">YT</span>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border border-purple-400/50 animate-ping opacity-25"></div>
                  </div>

                  {/* Character Title */}
                  <span className="font-cyber text-xs font-bold text-white tracking-wider">YOJITH THATI</span>
                  <span className="text-[10px] font-mono text-cyan-400">LEVEL 1 DEVELOPER</span>

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> XP PROGRESSION:
                  </span>
                  <span className="text-cyan-300 font-bold">
                    {profile.currentXP + bonusXP} / {profile.nextLevelXP} XP ({xpPercentage}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-700 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500 relative"
                    style={{ width: `${xpPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] font-mono text-slate-500">LEVEL 1: ROOKIE BUILDER</span>
                  <button
                    onClick={handleInspectXP}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    + Tap to Stimulate XP
                  </button>
                </div>
              </div>

              {/* Character Attributes Spec Sheet */}
              <div className="space-y-2.5 font-mono text-xs border-t border-slate-800/80 pt-4">
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">EDUCATION:</span>
                  <span className="text-white text-right font-medium">B.Tech, NST Pune</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">PRIMARY CODE:</span>
                  <span className="text-cyan-300 font-bold">Python</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">LEARNING ARC:</span>
                  <span className="text-purple-300 text-right">C++, JS, React, DSA</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">DISCIPLINE:</span>
                  <span className="text-emerald-400">Gym & Strength Training</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">GITHUB NODE:</span>
                  <a href="https://github.com/yojith551" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">@yojith551</a>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">MISSION:</span>
                  <span className="text-amber-300 text-right">Build Impactful Tech</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Tabs (Story, Stats, Quests, Perks) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-[#080d21] border border-cyan-500/20 p-6 sm:p-8 backdrop-blur-xl">
            
            {/* Tabs Bar */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-6">
              {[
                { id: 'story', label: 'ORIGIN STORY', icon: Compass },
                { id: 'stats', label: 'STATS MATRIX', icon: Cpu },
                { id: 'quests', label: 'ACTIVE MISSIONS', icon: Shield },
                { id: 'perks', label: 'UNLOCKED PERKS', icon: Award },
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sounds.playBeep(600, 0.05);
                      setActiveTab(tab.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl font-cyber text-xs flex items-center gap-2 transition cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: ORIGIN STORY */}
            {activeTab === 'story' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="border-l-2 border-cyan-400 pl-4 py-1">
                  <h3 className="font-cyber text-lg font-bold text-white">THE JOURNEY BEGINS</h3>
                  <p className="text-xs font-mono text-cyan-400">Origin Node: Pune, India</p>
                </div>
                <div className="space-y-3.5 text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
                  {profile.originStory.map((paragraph, index) => (
                    <p key={index} className="text-slate-300/90">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    STATUS: <span className="text-emerald-400 font-bold">Actively Seeking Collaborations & Open Source Contributions</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: STATS MATRIX */}
            {activeTab === 'stats' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-cyber text-lg font-bold text-white">CORE ATTRIBUTE MATRIX</h3>
                    <p className="text-xs font-mono text-slate-400">Live baseline scores (editable in portfolioData.js)</p>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-950/60 border border-cyan-500/30">
                    CALIBRATED 2026
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.stats.map(stat => (
                    <div key={stat.name} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="flex justify-between items-center text-xs font-mono mb-2">
                        <span className="text-slate-300 font-medium">{stat.name}</span>
                        <span className="text-cyan-300 font-bold">{stat.value}/100</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-700`}
                          style={{ width: `${stat.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ACTIVE MISSIONS / QUESTS */}
            {activeTab === 'quests' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h3 className="font-cyber text-lg font-bold text-white">ACTIVE QUEST LOG</h3>
                  <p className="text-xs font-mono text-slate-400">Current semester milestones and development objectives</p>
                </div>

                <div className="space-y-3">
                  {profile.activeQuests.map((quest, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-sm font-semibold text-slate-200 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          {quest.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {quest.status}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                          style={{ width: `${quest.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: UNLOCKED PERKS */}
            {activeTab === 'perks' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h3 className="font-cyber text-lg font-bold text-white">CHARACTER PERKS & TRAITS</h3>
                  <p className="text-xs font-mono text-slate-400">Passive advantages honed through coding, athletics, and habits</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {profile.perks.map(perk => (
                    <div key={perk.id} className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/20 hover:border-purple-400/50 transition">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Award className="w-4 h-4 text-purple-400" />
                        <h4 className="font-cyber text-xs font-bold text-white">{perk.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{perk.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

