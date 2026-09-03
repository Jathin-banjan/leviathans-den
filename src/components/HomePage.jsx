import React, { useState } from 'react';
import Navigation from './Navigation';
import SpotlightCursor from './SpotlightCursor';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import RoundsSection from './RoundsSection';
import ScheduleSection from './ScheduleSection';
import VenuesSection from './VenuesSection';
import TeamSection from './TeamSection';
import AmbassadorSection from './AmbassadorSection';
import AnnouncementsSection from './AnnouncementsSection';
import VolunteerDashboard from './VolunteerDashboard';
import EventHeadDashboard from './EventHeadDashboard';
import ContactSection from './ContactSection';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

export default function HomePage({ onReplayIntro }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-stone-200 font-sans relative selection:bg-crimson-900 selection:text-white">
      {/* Micro-interaction Spotlight Cursor Glow */}
      <SpotlightCursor />

      {/* Persistent Navigation Bar */}
      <Navigation
        onReplayIntro={onReplayIntro}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Main Continuous Operations Portal Sections */}
      <main className="relative z-10">
        <HeroSection onReplayIntro={onReplayIntro} />
        <AboutSection />
        <RoundsSection />

        {/* Role-Based Command Dashboards when logged in */}
        {user?.role === 'ROLE_EVENT_HEAD' && <EventHeadDashboard />}
        {user?.role === 'ROLE_VOLUNTEER' && <VolunteerDashboard />}
        {!user && <VolunteerDashboard />}

        <ScheduleSection />
        <VenuesSection />
        <TeamSection />
        <AmbassadorSection />
        <AnnouncementsSection />
        <ContactSection />
      </main>

      {/* Login Authentication Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </div>
  );
}
