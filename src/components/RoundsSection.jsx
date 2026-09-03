import React, { useState } from 'react';
import { Eye, ShieldAlert, Target, Crown, ChevronRight, Clock, Award } from 'lucide-react';

export default function RoundsSection() {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: '01',
      title: 'THE AWAKENING',
      subtitle: 'STAGE 1 — TECHNICAL APTITUDE & STRATEGY SIEGE',
      icon: Eye,
      duration: '45 MINUTES',
      format: 'ONLINE SPEED SIEGE',
      elimination: 'TOP 50% ADVANCE',
      description: 'The gates of the Den open. Candidates are subjected to a rapid-fire assessment testing core IT infrastructure principles, network security protocols, system architecture optimization, and financial budget allocation.',
      details: [
        'Rapid technical & architectural quiz battery',
        'Corporate IT resource allocation matrix',
        'System bottleneck diagnosis challenge'
      ]
    },
    {
      id: '02',
      title: 'THE ABYSS',
      subtitle: 'STAGE 2 — LIVE CRISIS MANAGEMENT & SIMULATION',
      icon: ShieldAlert,
      duration: '90 MINUTES',
      format: 'LIVE DISRUPTIVE LAB',
      elimination: 'TOP 8 TEAMS ADVANCE',
      description: 'Plunged into darkness. A simulated multi-national enterprise experiences a simultaneous ransomware attack and core cloud infrastructure blackout. You must restore operations under live chaos injections.',
      details: [
        'Real-time incident response & threat containment',
        'Media communication & stakeholder management',
        'Disaster recovery execution under live time decay'
      ]
    },
    {
      id: '03',
      title: 'THE HUNT',
      subtitle: 'STAGE 3 — CORPORATE TAKEOVER & ROADMAP DEFENSE',
      icon: Target,
      duration: '60 MINUTES',
      format: 'EXECUTIVE STRATEGY CASE',
      elimination: 'FINAL 4 TEAMS ADVANCE',
      description: 'The hunt begins. Remaining candidates receive a complex corporate merger case study. You must reconstruct the combined IT technology stack, resolve conflicting legacy systems, and present a 3-year digital transformation plan.',
      details: [
        'Legacy stack consolidation strategy',
        'Cybersecurity governance & compliance roadmap',
        'ROI projection and executive summary pitch'
      ]
    },
    {
      id: '04',
      title: 'THE CONFRONTATION',
      subtitle: 'STAGE 4 — THE LEVIATHAN FINALE & BOARDROOM GRILLING',
      icon: Crown,
      duration: '40 MINUTES PER TEAM',
      format: 'GRAND FINALE AUDITORIUM',
      elimination: '1 CROWNED LEVIATHAN',
      description: 'The final confrontation on the main stage. Defend your executive vision before an unyielding jury of senior IT Directors, CIOs, and industry veterans in an intense boardroom defense.',
      details: [
        'Live stage defense & keynote presentation',
        'Jury cross-examination & crisis stress testing',
        'Crowning of the Semaphore Fest IT Manager Champion'
      ]
    }
  ];

  return (
    <section id="rounds" className="py-24 relative border-t border-stone-800/40 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            CHAPTERS OF COMPETITION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            THE FOUR DEN TRIALS
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Chapter Selection Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {chapters.map((chap, idx) => {
            const IconComponent = chap.icon;
            const isActive = activeChapter === idx;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapter(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? 'bg-stone-900 border-crimson-600 shadow-[0_0_20px_rgba(220,38,38,0.25)]'
                    : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black tracking-wider ${isActive ? 'text-crimson-500' : 'text-stone-500'}`}>
                    CHAPTER {chap.id}
                  </span>
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-crimson-500' : 'text-stone-600'}`} />
                </div>
                <h3 className={`font-display font-bold text-xs sm:text-sm tracking-wide uppercase ${isActive ? 'text-white' : 'text-stone-400'}`}>
                  {chap.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details Card */}
        {chapters[activeChapter] && (
          <div className="p-8 sm:p-12 rounded-3xl bg-stone-900/60 border border-stone-800/90 relative overflow-hidden backdrop-blur animate-in fade-in zoom-in-95 duration-500">
            {/* Background Crimson Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
              
              {/* Left Column: Chapter Title & Meta */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-[0.25em] text-crimson-500 uppercase block mb-1">
                    {chapters[activeChapter].subtitle}
                  </span>
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wide">
                    {chapters[activeChapter].title}
                  </h3>
                </div>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                  {chapters[activeChapter].description}
                </p>

                {/* Specific Chapter Details */}
                <div className="space-y-3 pt-4 border-t border-stone-800/80">
                  <h4 className="text-xs font-bold tracking-widest text-stone-400 uppercase">
                    STAGE OBJECTIVES & DELIVERABLES:
                  </h4>
                  <ul className="space-y-2">
                    {chapters[activeChapter].details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-stone-300">
                        <ChevronRight className="w-4 h-4 text-crimson-500 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Stage Requirements Badge */}
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-5">
                <h4 className="font-display font-bold text-xs tracking-widest text-stone-300 uppercase pb-3 border-b border-stone-800">
                  STAGE SPECIFICATIONS
                </h4>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-crimson-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">DURATION</span>
                    <span className="text-xs font-bold text-white">{chapters[activeChapter].duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-crimson-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">FORMAT</span>
                    <span className="text-xs font-bold text-white">{chapters[activeChapter].format}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-crimson-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">QUALIFICATION</span>
                    <span className="text-xs font-bold text-white">{chapters[activeChapter].elimination}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
