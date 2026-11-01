import React from 'react';
import { ArrowUp, Terminal, Heart, Sparkles, Trophy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export default function Footer({ onOpenAchievements }) {
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    sounds.playBeep(700, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#03060f] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="font-cyber font-black text-lg text-white">
              YOJITH<span className="text-cyan-400">.exe</span>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              v1.0.4
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            “{profile.tagline}”
          </p>
          <div className="text-[11px] text-slate-500 font-mono">
            Designed & Engineered by Yojith Thati • Newton School of Technology, Pune • GitHub: <a href="https://github.com/yojith551" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">@yojith551</a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <a
            href="https://github.com/yojith551"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition cursor-pointer flex items-center gap-1.5"
          >
            ⚡ GitHub: @yojith551
          </a>

          <button
            onClick={onOpenAchievements}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-purple-500/30 text-purple-300 hover:border-purple-400 transition cursor-pointer flex items-center gap-1.5"
            title="View Trophies"
          >
            <Trophy className="w-3.5 h-3.5 text-purple-400" /> Trophies
          </button>
        </div>

        {/* Back to Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 transition cursor-pointer flex items-center gap-2 font-mono text-xs"
            aria-label="Back to Top"
          >
            <span>TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

