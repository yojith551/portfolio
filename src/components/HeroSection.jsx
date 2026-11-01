import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowDown, ChevronRight, Download, FolderGit2, Sparkles, Code2, Play, Flame, Shield, Trophy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { useAchievements } from '../context/AchievementContext';

export default function HeroSection({ onOpenResume, onOpenCricketModal, onOpenFutureModal }) {
  const { unlockAchievement } = useAchievements();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  // Terminal state
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'sys', text: 'YOJITH.exe [Version 1.0.4 - B.Tech NST Pune Node]' },
    { type: 'sys', text: 'Identity verified: Yojith Thati. All subsystems green.' },
    { type: 'sys', text: 'Type "help" for a list of available command directives.' }
  ]);
  const terminalEndRef = useRef(null);

  // Typewriter effect for Roles
  useEffect(() => {
    const roles = PORTFOLIO_DATA.profile.roles;
    const current = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 45 : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  // Terminal Command Executor
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    sounds.playKeyClick();
    unlockAchievement('terminal_hacker');

    const newHistory = [...terminalHistory, { type: 'user', text: `$ ${commandInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  about     - Origin story, college, and developer level
  skills    - View technical capabilities and leveling progress
  projects  - Inspect inventory items and FirstPR
  hobbies   - Passions: Code City, AI Nexus, Fitness, Cinema
  game      - Launch the 3D Road to the Future motorcycle game
  future    - Transmit vision & long-term mission objectives
  konami    - Secret cheat code directive
  stats     - Query player attributes and XP matrix
  clear     - Clear terminal buffer`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `PLAYER: Yojith Thati
CLASS: First-Year Developer
ACADEMY: Newton School of Technology, Pune (B.Tech CSE/AI)
GITHUB: https://github.com/yojith551
PHILOSOPHY: "The best way to learn technology is by building things."
STATUS: Relentlessly coding, exploring open-source, and leveling up.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `SKILLS ARSENAL:
[UNLOCKED]: Python Core, Problem Solving, Loops & Functions, Lists & DS, Git & GitHub (@yojith551), CLI
[LEARNING]: C++, JavaScript, Modern CSS/HTML, React, DSA
[ROADMAP]: Full-Stack, AI Agent Systems, Machine Learning, Scalable Software`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `FEATURED INVENTORY:
1. FirstPR (React, Vite, CSS, GitHub API) - https://github.com/yojith551/FirstPR
2. Road to the Future 3D (Canvas, Web Audio) - 3D Cyber Traffic Rider Runner
3. AlgoQuest CLI (Python) - https://github.com/yojith551/algoquest-cli
4. DevPulse (React) - https://github.com/yojith551/devpulse`
        });
        break;

      case 'hobbies':
        newHistory.push({
          type: 'response',
          text: `OFF-GRID PASSIONS:
💻 Code City: Algorithmic engineering & building real-world software.
⚡ AI Nexus: Deep curiosity for neural architectures & intelligent agents.
🏋️ Fitness & Gym: Consistency beats motivation. Daily iron discipline.
🎬 Cinema: Deep fascination with sci-fi storytelling, narrative, and worldbuilding.`
        });
        break;

      case 'game':
        newHistory.push({
          type: 'response',
          text: `INITIATING "ROAD TO THE FUTURE 3D"... Navigating to highway coordinates.`
        });
        setTimeout(() => {
          document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
        break;

      case 'future':
        newHistory.push({
          type: 'response',
          text: `FUTURE VISION PACKET:
"Building technology that makes a difference. Newton School of Technology to the global stage."`
        });
        unlockAchievement('future_builder');
        onOpenFutureModal?.();
        break;

      case 'konami':
        newHistory.push({
          type: 'response',
          text: `GOD MODE HINT:
Try pressing the arrow keys on your keyboard:
[UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A]`
        });
        break;

      case 'stats':
        newHistory.push({
          type: 'response',
          text: `PLAYER STATS MATRIX:
• Python Mastery: 85/100
• Problem Solving: 80/100
• Consistency & Grit: 95/100
• System Architecture: 75/100
• Curiosity & Innovation: 98/100
• Level: 1 (1,850 / 3,000 XP)`
        });
        break;

      case 'clear':
        setTerminalHistory([
          { type: 'sys', text: 'YOJITH.exe Terminal Cleared. System Ready.' }
        ]);
        setCommandInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for valid directives.`
        });
    }

    setTerminalHistory(newHistory);
    setCommandInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const scrollToSection = (id) => {
    sounds.playBeep(700, 0.05);
    unlockAchievement('first_explorer');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Cyber Grid & Glow Orbs */}
      <div className="absolute inset-0 cyber-grid-bg opacity-70 pointer-events-none"></div>
      
      {/* Neon Atmospheric Light Cones */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-[140px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none"></div>

      {/* Floating Cyber Code Snippets */}
      <div className="absolute top-20 left-10 hidden xl:block opacity-40 font-mono text-xs text-cyan-300 pointer-events-none select-none animate-float">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm">
          <code>def build_future(passion, grit):<br />&nbsp;&nbsp;&nbsp;&nbsp;return impact_technology</code>
        </div>
      </div>
      <div className="absolute bottom-32 right-12 hidden xl:block opacity-40 font-mono text-xs text-purple-300 pointer-events-none select-none animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="p-3 rounded-lg bg-slate-900/60 border border-purple-500/20 backdrop-blur-sm">
          <code>git commit -m "Level 1: Unlocked"<br />git push origin main</code>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: IDENTITY & HERO BRIEF */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* System Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>DEV_ID: YT-2026-PUNE</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400">NST FIRST-YEAR NODE</span>
            </div>

            {/* Main Greeting & Name */}
            <div>
              <p className="text-cyan-400 font-cyber tracking-widest text-sm uppercase mb-1">
                // SYSTEM IDENTIFIER: YOJITH.exe
              </p>
              <h1 className="font-cyber text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight">
                Hey, I’m <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent neon-text-blue">Yojith</span>.
              </h1>
            </div>

            {/* Dynamic Animated Typing Roles */}
            <div className="h-8 flex items-center justify-center lg:justify-start font-mono text-base sm:text-xl text-slate-300">
              <span className="text-cyan-400 mr-2 font-bold">&gt;</span>
              <span>{displayText}</span>
              <span className="w-2 h-5 bg-cyan-400 ml-1 animate-pulse"></span>
            </div>

            {/* Hero Philosophical Quote */}
            <blockquote className="p-4 rounded-xl bg-slate-900/40 border-l-4 border-cyan-400 backdrop-blur-sm text-slate-300 text-sm sm:text-base italic leading-relaxed max-w-2xl mx-auto lg:mx-0">
              “Every great journey starts with a single step. Mine starts with a single line of code.”
            </blockquote>

            {/* 3 Prominent CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Start My Journey */}
              <button
                onClick={() => scrollToSection('profile')}
                className="px-6 py-3.5 rounded-xl font-cyber text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 hover:text-white shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2 group"
              >
                <span>START MY JOURNEY</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              {/* View My Projects */}
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3.5 rounded-xl font-cyber text-sm font-bold bg-[#0d1428] border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-400 shadow-md hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>VIEW MY PROJECTS</span>
              </button>

              {/* Download Resume */}
              <button
                onClick={() => {
                  sounds.playBeep(750, 0.05);
                  onOpenResume();
                }}
                className="px-5 py-3.5 rounded-xl font-cyber text-sm font-bold bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-purple-400 shadow-sm hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>RESUME</span>
              </button>
            </div>

            {/* Key Quick Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Python & Systems
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Open Source (@yojith551)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> 1,850 XP Earned
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE HUD TERMINAL */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-emerald-500/40 shadow-2xl">
              <div className="rounded-2xl overflow-hidden bg-[#070b1a]/95 border border-cyan-500/30 backdrop-blur-xl">
                
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f24] border-b border-cyan-500/20">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="font-mono text-xs text-slate-400 ml-2 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" /> bash // yojith@system:~
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    INTERACTIVE
                  </span>
                </div>

                {/* Terminal Body */}
                <div className="p-4 h-72 sm:h-80 overflow-y-auto font-mono text-xs space-y-2 select-text custom-scrollbar">
                  {terminalHistory.map((item, index) => (
                    <div key={index} className="leading-relaxed">
                      {item.type === 'sys' && (
                        <p className="text-slate-400">{item.text}</p>
                      )}
                      {item.type === 'user' && (
                        <p className="text-cyan-300 font-bold">{item.text}</p>
                      )}
                      {item.type === 'response' && (
                        <pre className="text-emerald-300 whitespace-pre-wrap font-mono mt-1 pl-2 border-l border-emerald-500/40">
                          {item.text}
                        </pre>
                      )}
                      {item.type === 'error' && (
                        <p className="text-red-400 pl-2 border-l border-red-500/40">{item.text}</p>
                      )}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Terminal Quick Command Chips */}
                <div className="px-3 py-2 bg-[#050814] border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-slate-500 font-mono mr-1">CHIPS:</span>
                  {['help', 'about', 'skills', 'projects', 'hobbies', 'game', 'stats', 'future'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setCommandInput(chip);
                        // Trigger submit programmatically
                        const syntheticEvent = { preventDefault: () => {} };
                        setCommandInput('');
                        const newHist = [...terminalHistory, { type: 'user', text: `$ ${chip}` }];
                        // simulate command
                        setTimeout(() => {
                          const inputEvent = { preventDefault: () => {} };
                          // invoke logic
                          setCommandInput(chip);
                        }, 50);
                      }}
                      className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-[10px] font-mono transition cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Command Input Field */}
                <form onSubmit={handleCommandSubmit} className="flex items-center px-4 py-2.5 bg-[#090e21] border-t border-cyan-500/20">
                  <span className="text-cyan-400 font-mono text-xs mr-2 font-bold">yojith@system:~$</span>
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Type 'help', 'about', 'skills', 'game'..."
                    className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
                  />
                  <button
                    type="submit"
                    className="ml-2 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 text-xs font-mono border border-cyan-500/40 cursor-pointer"
                  >
                    ENTER
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition" onClick={() => scrollToSection('profile')}>
          <span className="text-xs font-cyber tracking-widest text-cyan-400 mb-1">ENTER PLAYER PROFILE</span>
          <ArrowDown className="w-4 h-4 text-cyan-400" />
        </div>

      </div>
    </section>
  );
}

