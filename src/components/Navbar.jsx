import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Trophy, Menu, X, Gamepad2, Sparkles, Terminal } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useAchievements } from '../context/AchievementContext';

export default function Navbar({ onOpenAchievements, onOpenTerminalModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(sounds.isMuted());
  const { unlocked } = useAchievements();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = sounds.toggleMute();
    setMuted(next);
    if (!next) sounds.playBeep(700, 0.08);
  };

  const navLinks = [
    { name: "PROFILE", href: "#profile" },
    { name: "WORLDS", href: "#worlds" },
    { name: "SKILL TREE", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "PLAY GAME", href: "#game", highlight: true },
    { name: "MISSIONS", href: "#missions" },
    { name: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    sounds.playBeep(650, 0.05);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#040711]/90 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-lg shadow-cyan-950/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={() => sounds.playBeep(800, 0.06)}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-600 to-emerald-400 p-[1px] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition">
            <div className="w-full h-full bg-[#070b19] rounded-lg flex items-center justify-center font-cyber font-black text-cyan-400 text-sm">
              Y
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-cyber font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-cyan-400 transition">
                YOJITH<span className="text-cyan-400">.exe</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider -mt-1 hidden sm:block">
              SYS: ONLINE // LEVEL 1
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 font-cyber text-xs tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`px-3 py-1.5 rounded-md transition duration-200 cursor-pointer ${
                link.highlight
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center gap-1.5'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40'
              }`}
            >
              {link.highlight && <Gamepad2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Sound, Achievements, Terminal */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Achievements Trophy Button */}
          <button
            onClick={() => {
              sounds.playBeep(750, 0.05);
              onOpenAchievements();
            }}
            aria-label="Achievements Tracker"
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-purple-300 hover:border-purple-400 hover:bg-purple-900/40 transition font-mono text-xs cursor-pointer"
            title="View Achievements"
          >
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold">{unlocked.length}/7</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            aria-label={muted ? 'Unmute SFX' : 'Mute SFX'}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition cursor-pointer"
            title={muted ? 'Unmute Audio SFX' : 'Mute Audio SFX'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sounds.playBeep(600, 0.05);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b19]/95 backdrop-blur-xl border-b border-cyan-500/30 px-6 py-5 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-cyber text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  link.highlight
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40'
                }`}
              >
                <span>{link.name}</span>
                {link.highlight && <Gamepad2 className="w-4 h-4 text-cyan-400" />}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

