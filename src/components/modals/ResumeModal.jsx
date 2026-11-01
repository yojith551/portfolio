import React from 'react';
import { X, Download, Printer, ExternalLink, GraduationCap, Code, Trophy, Sparkles, UserCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';

export default function ResumeModal({ isOpen, onClose }) {
  const { profile, contact, projects } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playBeep(700, 0.05);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 shadow-2xl">
        <div className="rounded-2xl bg-[#080d21] p-6 sm:p-8 border border-cyan-500/30 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          {/* Action Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
              <Sparkles className="w-4 h-4" />
              <span>CANDIDATE DOSSIER: YOJITH THATI</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" /> Print / Save PDF
              </button>
              <button
                onClick={() => {
                  sounds.playBeep(500, 0.05);
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                aria-label="Close Resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div className="space-y-6 text-slate-200 font-sans">
            
            {/* Header info */}
            <div className="border-b border-slate-800 pb-5">
              <h2 className="font-cyber text-2xl sm:text-3xl font-black text-white">{profile.name}</h2>
              <p className="font-mono text-xs sm:text-sm text-cyan-400 mt-0.5">
                Aspiring Software Engineer | First-Year B.Tech Student @ NST Pune
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-3">
                <span>📍 Pune, India</span>
                <span>✉️ {contact.email}</span>
                <span>🔗 github.com/yojith551</span>
                <span>🔗 linkedin.com/in/yojith-thati</span>
              </div>
            </div>

            {/* Objective / Summary */}
            <div>
              <h3 className="font-cyber text-xs uppercase tracking-wider text-cyan-300 mb-1.5 font-bold">
                Professional Profile
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                First-year Computer Science student passionate about software engineering, clean Python programming, web development, and algorithms. Driven by hands-on building, curiosity, and disciplined consistency. Experienced in collaborative environments through open-source contributions and software projects.
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-cyber text-xs uppercase tracking-wider text-cyan-300 mb-2 font-bold flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" /> Education
              </h3>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex flex-wrap justify-between items-center text-xs font-mono font-bold text-white mb-1">
                  <span>Newton School of Technology, Pune</span>
                  <span className="text-cyan-400">2024 – 2028</span>
                </div>
                <div className="text-xs text-slate-300">
                  Bachelor of Technology (B.Tech) — Computer Science & Artificial Intelligence
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  Key coursework: Python Programming, Data Structures Foundations, Problem Solving, Computer Architecture
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="font-cyber text-xs uppercase tracking-wider text-cyan-300 mb-2 font-bold flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" /> Technical Skills & Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PROGRAMMING LANGUAGES:</span>
                  <span className="text-white font-semibold">Python (Primary), C++ (Learning), JavaScript</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">WEB & TOOLS:</span>
                  <span className="text-white font-semibold">React, Vite, HTML5, CSS3, Tailwind CSS, Git & GitHub, CLI</span>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h3 className="font-cyber text-xs uppercase tracking-wider text-cyan-300 mb-2 font-bold">
                Featured Projects
              </h3>
              <div className="space-y-3">
                {projects.slice(0, 3).map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="flex justify-between items-center font-bold text-white mb-1">
                      <span className="font-cyber">{p.title}</span>
                      <span className="font-mono text-[10px] text-cyan-400">{p.techStack.join(', ')}</span>
                    </div>
                    <p className="text-slate-300 text-xs mb-1.5">{p.description}</p>
                    <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
                      {p.highlights.slice(0, 2).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership & Discipline */}
            <div>
              <h3 className="font-cyber text-xs uppercase tracking-wider text-cyan-300 mb-2 font-bold flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cyan-400" /> Discipline & Mindset
              </h3>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p>
                  • <strong>Engineering Grit & Problem Solving:</strong> Relentless work ethic applied to debugging complex code, system architecture, and algorithmic optimization.
                </p>
                <p>
                  • <strong>Fitness & Progressive Overload:</strong> Committed to regular physical strength training with a focus on progressive overload, consistency, and resilience.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

