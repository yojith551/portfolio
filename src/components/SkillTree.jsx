import React, { useState } from 'react';
import { GitBranch, Lock, Unlock, Zap, Sparkles, Check, ChevronRight, X, Layers, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { useAchievements } from '../context/AchievementContext';

export default function SkillTree() {
  const { skillTree } = PORTFOLIO_DATA;
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'unlocked' | 'learning' | 'locked'
  const { unlockAchievement } = useAchievements();

  const handleSelectSkill = (skill) => {
    sounds.playBeep(700, 0.05);
    setSelectedSkill(skill);
    unlockAchievement('code_collector');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'unlocked':
        return {
          label: 'UNLOCKED',
          color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
          dot: 'bg-emerald-400'
        };
      case 'learning':
        return {
          label: 'LEARNING',
          color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40',
          dot: 'bg-cyan-400 animate-pulse'
        };
      case 'locked':
      default:
        return {
          label: 'LOCKED // FUTURE',
          color: 'text-purple-400 bg-purple-950/60 border-purple-500/40',
          dot: 'bg-purple-500'
        };
    }
  };

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          <span>RPG TALENT TREE</span>
        </div>
        <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-wide">
          SKILL TREE: <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">LEVELING UP</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-mono">
          Honest skill progression map. From first-year Python mastery to ongoing algorithms and future AI frontiers.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'ALL SKILLS' },
            { id: 'unlocked', label: 'UNLOCKED (CURRENT)' },
            { id: 'learning', label: 'LEARNING (LEVELING UP)' },
            { id: 'locked', label: 'FUTURE UNLOCKS' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                sounds.playBeep(600, 0.04);
                setActiveFilter(f.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid (Tree Nodes) */}
      <div className="space-y-12">
        {skillTree.categories.map((category) => {
          // Filter check
          const filteredSkills = category.skills.filter(s => {
            if (activeFilter === 'all') return true;
            return s.status === activeFilter;
          });

          if (filteredSkills.length === 0) return null;

          return (
            <div key={category.id} className="relative">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${category.color}`}>
                  {category.title}
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-700 via-slate-800 to-transparent"></div>
              </div>

              {/* Connected Skill Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map((skill) => {
                  const badge = getStatusBadge(skill.status);
                  const isSelected = selectedSkill?.id === skill.id;

                  return (
                    <div
                      key={skill.id}
                      onClick={() => handleSelectSkill(skill)}
                      className={`group relative p-4 rounded-xl transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                          : skill.status === 'unlocked'
                          ? 'bg-[#080d21] border-emerald-500/30 hover:border-emerald-400/80 hover:bg-slate-900/90'
                          : skill.status === 'learning'
                          ? 'bg-[#080d21] border-cyan-500/30 hover:border-cyan-400/80 hover:bg-slate-900/90'
                          : 'bg-[#060a17] border-purple-500/20 hover:border-purple-400/60 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {/* Top Node Meta */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1.5 ${badge.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                          {badge.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {skill.xpValue}
                        </span>
                      </div>

                      {/* Skill Name */}
                      <h4 className="font-cyber text-base font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                        <span>{skill.name}</span>
                        {skill.status === 'locked' ? (
                          <Lock className="w-3.5 h-3.5 text-purple-400" />
                        ) : skill.status === 'learning' ? (
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </h4>

                      {/* Proficiency Level subtitle */}
                      <p className="text-xs font-mono text-slate-400 mt-1 mb-3">{skill.level}</p>

                      {/* Description preview */}
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                        {skill.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {skill.tags.map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800">
                            #{t}
                          </span>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* SKILL INSPECTOR DRAWER / MODAL */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400 to-purple-500 shadow-2xl">
            <div className="rounded-2xl bg-[#080d21] p-6 border border-cyan-500/30">
              
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                aria-label="Close Skill Inspector"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded border ${getStatusBadge(selectedSkill.status).color}`}>
                  {getStatusBadge(selectedSkill.status).label}
                </span>
                <h3 className="font-cyber text-2xl font-bold text-white mt-2">
                  {selectedSkill.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400">{selectedSkill.level}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-5">
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedSkill.description}
                </p>
              </div>

              <div className="mb-5">
                <div className="text-xs font-mono text-slate-400 mb-2">ASSOCIATED TOPICS:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-mono text-xs border border-cyan-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-3 border-t border-slate-800">
                <span>XP REWARD: <strong className="text-emerald-400">{selectedSkill.xpValue}</strong></span>
                <span>NODE ID: {selectedSkill.id}</span>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

