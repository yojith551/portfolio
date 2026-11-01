import React, { useState } from 'react';
import { Globe, Terminal, Cpu, Dumbbell, Film, ChevronRight, X, Sparkles, Check, Play, RefreshCw, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export default function WorldMap() {
  const { worlds } = PORTFOLIO_DATA;
  const [selectedWorld, setSelectedWorld] = useState(worlds[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWorldClick = (world) => {
    sounds.playBeep(650, 0.06);
    setSelectedWorld(world);
    setIsModalOpen(true);
  };

  return (
    <section id="worlds" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>PASSIONS & REALMS</span>
        </div>
        <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-wide">
          MY WORLD <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">MAP</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-mono">
          Explore the 4 floating dimensions that shape my engineering focus, physical discipline, and creative vision.
        </p>
      </div>

      {/* Floating Worlds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {worlds.map((world, idx) => {
          return (
            <div
              key={world.id}
              onClick={() => handleWorldClick(world)}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-slate-800 to-slate-900 hover:from-cyan-500/60 hover:to-purple-500/60 transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="h-full rounded-2xl bg-[#070b1a] p-6 border border-slate-800/80 group-hover:border-cyan-500/40 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
                
                {/* Glow backdrop on hover */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition pointer-events-none"
                  style={{ backgroundColor: world.accent }}
                ></div>

                {/* Top Badge & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      SECTOR 0{idx + 1}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded font-bold"
                      style={{ color: world.accent, backgroundColor: `${world.accent}15` }}
                    >
                      {world.tag}
                    </span>
                  </div>

                  {/* World Title */}
                  <h3 className="font-cyber text-xl font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                    <span>{world.name}</span>
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">{world.subtitle}</p>

                  {/* Quote */}
                  <blockquote className="text-xs italic text-slate-300 border-l-2 pl-3 py-1 mb-5 leading-relaxed" style={{ borderColor: world.accent }}>
                    "{world.quote}"
                  </blockquote>

                  {/* Highlights list preview */}
                  <ul className="space-y-1.5 text-xs text-slate-400 mb-6 font-mono">
                    {world.highlights.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: world.accent }}></span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Pill */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-cyber text-cyan-400 group-hover:translate-x-1 transition">
                  <span>ENTER WORLD</span>
                  <ChevronRight className="w-4 h-4" />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* EXPANDED MODAL / POPUP DOSSIER */}
      {isModalOpen && selectedWorld && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 shadow-2xl">
            <div className="rounded-2xl bg-[#080d21] p-6 sm:p-8 border border-cyan-500/30 max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={() => {
                  sounds.playBeep(500, 0.05);
                  setIsModalOpen(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                aria-label="Close World Dossier"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded"
                  style={{ color: selectedWorld.accent, backgroundColor: `${selectedWorld.accent}20` }}
                >
                  {selectedWorld.tag} // EXPANDED DOSSIER
                </span>
                <h3 className="font-cyber text-2xl sm:text-3xl font-black text-white mt-2">
                  {selectedWorld.name}
                </h3>
                <p className="text-xs font-mono text-slate-400">{selectedWorld.subtitle}</p>
              </div>

              {/* Quote */}
              <blockquote className="p-3.5 rounded-xl bg-slate-900/80 border-l-4 text-slate-200 text-sm italic mb-6" style={{ borderColor: selectedWorld.accent }}>
                "{selectedWorld.quote}"
              </blockquote>

              {/* Detailed Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {selectedWorld.description}
              </p>

              {/* Highlights Full List */}
              <div className="mb-6">
                <h4 className="font-cyber text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Core Dimensions & Insights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedWorld.highlights.map((h, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: selectedWorld.accent }}></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Footer */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-center font-mono">
                {Object.entries(selectedWorld.stats).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[10px] text-slate-400">{k.toUpperCase()}</div>
                    <div className="text-base font-bold" style={{ color: selectedWorld.accent }}>{v}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
