import React, { useState } from 'react';
import { AchievementProvider, useAchievements } from './context/AchievementContext';
import Cyber3DBackground from './components/Cyber3DBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlayerProfile from './components/PlayerProfile';
import WorldMap from './components/WorldMap';
import SkillTree from './components/SkillTree';
import ProjectsSection from './components/ProjectsSection';
import RoadToTheFutureGame from './components/game/RoadToTheFutureGame';
import MissionsSection from './components/MissionsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Modals
import AchievementsModal from './components/modals/AchievementsModal';
import ResumeModal from './components/modals/ResumeModal';
import FutureEasterEggModal from './components/modals/FutureEasterEggModal';
import KonamiModal from './components/modals/KonamiModal';
import AchievementToast from './components/modals/AchievementToast';

function PortfolioApp() {
  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [futureModalOpen, setFutureModalOpen] = useState(false);

  const { easterEggModal, setEasterEggModal } = useAchievements();

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* 3D Global Cyber Matrix Background */}
      <Cyber3DBackground />

      {/* Top Navbar */}
      <Navbar
        onOpenAchievements={() => setAchievementsModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Landing & Cyber Terminal */}
        <HeroSection
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenFutureModal={() => setFutureModalOpen(true)}
        />

        {/* 2. Player Profile: Origin Story & RPG Sheet */}
        <PlayerProfile />

        {/* 3. My World Map (Passions: Code City, AI Nexus, Fitness, Cinema) */}
        <WorldMap />

        {/* 4. Skill Tree (RPG Leveling Up: Unlocked, Learning, Locked) */}
        <SkillTree />

        {/* 5. Projects: My Inventory (FirstPR, AlgoQuest, DevPulse) */}
        <ProjectsSection />

        {/* 6. Playable Feature Game: Road to the Future 3D (Traffic Rider Runner) */}
        <RoadToTheFutureGame />

        {/* 7. Mission: Build Something That Matters (Short & Long Term Goals) */}
        <MissionsSection />

        {/* 8. Mission Control (Contact Form & Encrypted Dispatch) */}
        <ContactSection
          onOpenResume={() => setResumeModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAchievements={() => setAchievementsModalOpen(true)}
      />

      {/* Floating Achievement Toast Notification */}
      <AchievementToast />

      {/* Modals & Dialogs */}
      <AchievementsModal
        isOpen={achievementsModalOpen}
        onClose={() => setAchievementsModalOpen(false)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <FutureEasterEggModal
        isOpen={futureModalOpen || easterEggModal === 'future'}
        onClose={() => {
          setFutureModalOpen(false);
          setEasterEggModal(null);
        }}
      />

      <KonamiModal
        isOpen={easterEggModal === 'konami'}
        onClose={() => setEasterEggModal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AchievementProvider>
      <PortfolioApp />
    </AchievementProvider>
  );
}
