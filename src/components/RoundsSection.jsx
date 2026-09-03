import React, { useState, useEffect } from 'react';
import { Eye, ShieldAlert, Target, Crown, ChevronRight, Clock, Award, MapPin } from 'lucide-react';
import { fetchRounds } from '../api/client';

export default function RoundsSection() {
  const [rounds, setRounds] = useState([]);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    fetchRounds().then(data => setRounds(data));
  }, []);

  const icons = [Eye, ShieldAlert, Target, Crown];

  return (
    <section id="rounds" className="py-24 relative border-t border-stone-800/40 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            CHAPTERS OF COMPETITION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            THE FOUR TRIALS
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Chapter Selection Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {rounds.map((round, idx) => {
            const IconComponent = icons[idx % icons.length];
            const isActive = activeChapter === idx;
            return (
              <button
                key={round.id || idx}
                onClick={() => setActiveChapter(idx)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? 'bg-stone-900 border-crimson-600 shadow-[0_0_25px_rgba(220,38,38,0.3)]'
                    : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold tracking-wider ${isActive ? 'text-crimson-500' : 'text-stone-500'}`}>
                    ROUND 0{round.roundNumber}
                  </span>
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-crimson-500' : 'text-stone-600'}`} />
                </div>

                <h3 className={`font-display font-bold text-xs sm:text-sm tracking-wide uppercase block ${isActive ? 'text-white' : 'text-stone-300'}`}>
                  {round.themeName}
                </h3>

                <span className="text-[10px] font-semibold text-crimson-500 tracking-wider uppercase block mt-1">
                  {round.activityName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details Card */}
        {rounds[activeChapter] && (
          <div className="p-8 sm:p-12 rounded-3xl bg-stone-900/70 border border-stone-800/90 relative overflow-hidden backdrop-blur animate-in fade-in zoom-in-95 duration-500">
            {/* Background Crimson Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
              
              {/* Left Column: Chapter Title & Activity */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-[0.25em] text-crimson-500 uppercase block mb-1">
                    ROUND 0{rounds[activeChapter].roundNumber} — {rounds[activeChapter].activityName}
                  </span>
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wide">
                    {rounds[activeChapter].themeName}
                  </h3>
                </div>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                  {rounds[activeChapter].description}
                </p>

                {/* Specific Objectives & Rules */}
                <div className="space-y-4 pt-4 border-t border-stone-800/80">
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-crimson-400 uppercase mb-1">
                      OBJECTIVE:
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 font-light">
                      {rounds[activeChapter].objective}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-crimson-400 uppercase mb-1">
                      TRIAL RULES & FORMAT:
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 font-light">
                      {rounds[activeChapter].rules}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Stage Specifications */}
              <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-5">
                <h4 className="font-display font-bold text-xs tracking-widest text-white uppercase pb-3 border-b border-stone-800">
                  TRIAL SPECIFICATIONS
                </h4>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-crimson-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">TIME SLOT</span>
                    <span className="text-xs font-bold text-white">{rounds[activeChapter].date} ({rounds[activeChapter].startTime} - {rounds[activeChapter].endTime})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-crimson-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">VENUE</span>
                    <span className="text-xs font-bold text-white">{rounds[activeChapter].venueName}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-crimson-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">STATUS</span>
                    <span className="text-xs font-bold text-crimson-400">OFFICIAL EVENT TRIAL</span>
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
