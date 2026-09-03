import React, { useState } from 'react';
import CinematicIntro from './components/CinematicIntro';
import HomePage from './components/HomePage';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Home Page Experience */}
      <HomePage onReplayIntro={handleReplayIntro} />

      {/* Cinematic Welcome Intro Overlay (Shown on launch & replay) */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}
    </div>
  );
}
