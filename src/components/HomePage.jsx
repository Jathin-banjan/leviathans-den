import React from 'react';
import Navigation from './Navigation';
import SpotlightCursor from './SpotlightCursor';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import RoundsSection from './RoundsSection';
import TeamSection from './TeamSection';
import AmbassadorSection from './AmbassadorSection';
import ContactSection from './ContactSection';

export default function HomePage({ onReplayIntro }) {
  return (
    <div className="min-h-screen bg-black text-stone-200 font-sans relative selection:bg-crimson-900 selection:text-white">
      {/* Micro-interaction Spotlight Cursor Glow */}
      <SpotlightCursor />

      {/* Persistent Navigation Bar */}
      <Navigation onReplayIntro={onReplayIntro} />

      {/* Main Continuous Cinematic Sections */}
      <main className="relative z-10">
        <HeroSection onReplayIntro={onReplayIntro} />
        <AboutSection />
        <RoundsSection />
        <TeamSection />
        <AmbassadorSection />
        <ContactSection />
      </main>
    </div>
  );
}
