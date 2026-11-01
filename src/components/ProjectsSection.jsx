import React, { useState } from 'react';
import { Package, ExternalLink, Play, Sparkles, CheckCircle2, Code2, Tag, Layers, ArrowUpRight } from 'lucide-react';
import { IconGithub } from './common/Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;

  const handleActionClick = (url) => {
    sounds.playBeep(750, 0.05);
    if (url.startsWith('#')) {
      const el = document.querySelector(url);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
          <Package className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYBERNETIC ARTIFACTS</span>
        </div>
        <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-wide">
          PROJECTS: <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">MY INVENTORY</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-mono">
          Curated showcase of high-impact open-source systems and the flagship 3D Traffic Rider game simulation.
        </p>
      </div>

      {/* Projects Inventory Cards with 3D Depth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => {
          const isGame = project.id === 'road-to-future';

          return (
            <div
              key={project.id}
              className="card-3d group relative rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400/50 via-purple-500/40 to-emerald-400/50 shadow-2xl transition-all duration-300"
            >
              <div className="h-full rounded-2xl bg-[#080d21]/95 p-6 sm:p-8 border border-cyan-500/20 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden">
                
                {/* 3D Floating Glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-cyan-500/15 blur-3xl group-hover:bg-cyan-500/30 transition pointer-events-none"></div>

                <div>
                  {/* Item ID & Rarity Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      ITEM ID: {project.codename}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40 font-bold">
                        {project.rarity}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <h3 className="font-cyber text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                    <span>{project.title}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      ⭐ VERIFIED
                    </span>
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm font-mono text-cyan-400 mt-1 mb-4">
                    "{project.tagline}"
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="mb-6 space-y-2">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Technical Highlights & Architecture:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-cyan-300 group-hover:border-cyan-500/40 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-3">
                    {/* Launch / Play button */}
                    <button
                      onClick={() => handleActionClick(project.liveUrl)}
                      className="px-5 py-2.5 rounded-xl font-cyber text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/40 transition cursor-pointer flex items-center gap-2"
                    >
                      {isGame ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" /> PLAY IN BROWSER
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-3.5 h-3.5" /> REPOSITORY & DOCS
                        </>
                      )}
                    </button>

                    {/* GitHub Repo button */}
                    <button
                      onClick={() => handleActionClick(project.githubUrl)}
                      className="px-4 py-2.5 rounded-xl font-cyber text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/40 transition cursor-pointer flex items-center gap-2"
                    >
                      <IconGithub className="w-3.5 h-3.5" /> GITHUB SOURCE
                    </button>
                  </div>

                  <a
                    href="https://github.com/yojith551"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>@yojith551</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
