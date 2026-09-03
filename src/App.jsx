import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
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
    <AuthProvider>
      <div className="min-h-screen bg-black text-white relative">
        {/* Event Operations Portal */}
        <HomePage onReplayIntro={handleReplayIntro} />

        {/* Cinematic Welcome Intro Sequence Overlay */}
        {showIntro && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </div>
    </AuthProvider>
  );
}
