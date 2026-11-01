import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      const saved = localStorage.getItem('yojith_achievements');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeToast, setActiveToast] = useState(null);
  const [easterEggModal, setEasterEggModal] = useState(null); // 'cricket', 'future', 'konami'
  const [konamiProgress, setKonamiProgress] = useState(0);

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
  ];

  const unlockAchievement = (id) => {
    if (unlocked.includes(id)) return;

    const ach = PORTFOLIO_DATA.achievements.find(a => a.id === id);
    if (!ach) return;

    const updated = [...unlocked, id];
    setUnlocked(updated);
    try {
      localStorage.setItem('yojith_achievements', JSON.stringify(updated));
    } catch {}

    sounds.playAchievement();
    setActiveToast(ach);

    // Confetti burst for exciting unlock
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f0ff', '#8b5cf6', '#00ff9d', '#ec4899']
      });
    } catch {}

    setTimeout(() => {
      setActiveToast(prev => (prev?.id === id ? null : prev));
    }, 4500);
  };

  // Konami Code Global Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (key.toLowerCase() === konamiCode[konamiProgress].toLowerCase()) {
        const next = konamiProgress + 1;
        if (next === konamiCode.length) {
          unlockAchievement('konami_master');
          setEasterEggModal('konami');
          setKonamiProgress(0);
        } else {
          setKonamiProgress(next);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, unlocked]);

  return (
    <AchievementContext.Provider
      value={{
        unlocked,
        unlockAchievement,
        activeToast,
        setActiveToast,
        easterEggModal,
        setEasterEggModal
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementContext);

