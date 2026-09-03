import React, { useState } from 'react';
import { UserCheck, Shield, Clock, AlertCircle, Sparkles, Flame, Flower2 } from 'lucide-react';

export default function TeamSection() {
  const [genderFilter, setGenderFilter] = useState('ALL');

  const eventHeads = [
    {
      role: 'EVENT HEAD / COMMANDER 01',
      dept: 'DEPT. OF INFORMATION TECHNOLOGY',
      gender: 'MALE',
      code: 'HEAD-ITM-01'
    },
    {
      role: 'EVENT HEAD / COMMANDER 02',
      dept: 'DEPT. OF INFORMATION TECHNOLOGY',
      gender: 'FEMALE',
      code: 'HEAD-ITM-02'
    }
  ];

  // 20 Volunteers (10 Male, 10 Female)
  const volunteers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    code: `VOL-ITM-${String(i + 1).padStart(2, '0')}`,
    role: `VOLUNTEER POST ${String(i + 1).padStart(2, '0')}`,
    gender: i % 2 === 0 ? 'MALE' : 'FEMALE', // Alternating 10 Male, 10 Female
    assignedRound: i % 4 === 0 ? 'ROUND 1 (AWAKENING)' : i % 4 === 1 ? 'ROUND 2 (VERDICT)' : i % 4 === 2 ? 'ROUND 3 (FRAGMENTS)' : 'ROUND 4 (JUDGMENT)'
  }));

  const filteredVolunteers = genderFilter === 'ALL'
    ? volunteers
    : volunteers.filter(v => v.gender === genderFilter);

  return (
    <section id="team" className="py-24 relative border-t border-stone-800/40 bg-stone-950/90 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            ORGANIZATION & COMMAND
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            AKATSUKI EVENT TEAM
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* 2 Event Heads Section */}
        <div className="mb-20">
          <h3 className="text-xs font-bold tracking-[0.25em] text-stone-400 uppercase text-center mb-8">
            EVENT COMMANDERS (2)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {eventHeads.map((head, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-black border border-stone-800/90 border-glow-hover relative overflow-hidden backdrop-blur flex flex-col justify-between shadow-2xl"
              >
                <div className="flex items-start space-x-6 mb-6">
                  {/* Akatsuki Commander Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-stone-950 border border-crimson-800/80 p-1 shrink-0 relative flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    {head.gender === 'MALE' ? (
                      <div className="w-full h-full rounded-xl bg-gradient-to-b from-crimson-950 via-stone-900 to-black flex items-center justify-center relative overflow-hidden">
                        {/* Male Akatsuki Silhouette */}
                        <Flame className="w-8 h-8 text-crimson-500 animate-pulse" />
                        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-crimson-500 shadow-[0_0_8px_#dc2626]" />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-b from-stone-900 via-crimson-950 to-black flex items-center justify-center relative overflow-hidden">
                        {/* Female Akatsuki Origami Flower Motif */}
                        <Flower2 className="w-8 h-8 text-crimson-400 animate-pulse" />
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_#ef4444]" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold tracking-widest text-crimson-500 uppercase">
                        {head.role}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-xl text-white uppercase tracking-wide mt-1">
                      ASSIGNMENT PENDING
                    </h4>
                    <span className="text-xs text-stone-400 block mt-1 font-mono">
                      {head.code} • {head.dept}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center space-x-2 text-amber-500 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Data Pending — Profile details will be updated.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 20 Volunteers Section Header & Filter Tabs */}
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-800/80">
            <div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                VOLUNTEER TEAM (20)
              </h3>
              <p className="text-xs text-stone-400 font-light">
                10 Male & 10 Female Akatsuki Operations Personnel
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2">
              {[
                { id: 'ALL', label: 'ALL (20)' },
                { id: 'MALE', label: 'MALE (10)' },
                { id: 'FEMALE', label: 'FEMALE (10)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setGenderFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase border transition-all ${
                    genderFilter === tab.id
                      ? 'bg-crimson-600 border-crimson-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 20 Volunteers Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVolunteers.map((vol) => (
              <div 
                key={vol.id}
                className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur flex flex-col justify-between group ${
                  vol.gender === 'MALE'
                    ? 'bg-gradient-to-b from-stone-900/90 to-stone-950 border-stone-800/90 hover:border-crimson-700/80 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                    : 'bg-gradient-to-b from-stone-900/90 via-stone-950 to-crimson-950/30 border-stone-800/90 hover:border-red-600/80 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                }`}
              >
                <div>
                  {/* Card Avatar Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Avatar Emblem */}
                    <div className={`w-12 h-12 rounded-xl border p-1 shrink-0 flex items-center justify-center ${
                      vol.gender === 'MALE'
                        ? 'bg-stone-950 border-crimson-800/70 text-crimson-500'
                        : 'bg-stone-950 border-red-700/70 text-red-400'
                    }`}>
                      {vol.gender === 'MALE' ? (
                        /* Male Akatsuki Character Emblem */
                        <Flame className="w-6 h-6 animate-pulse" />
                      ) : (
                        /* Female Akatsuki Red Cloud & Origami Flower Emblem */
                        <Flower2 className="w-6 h-6 animate-pulse" />
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] font-mono font-bold text-stone-500 uppercase block">
                        {vol.code}
                      </span>
                      <span className={`text-[10px] font-bold tracking-wider uppercase block mt-0.5 ${
                        vol.gender === 'MALE' ? 'text-crimson-500' : 'text-red-400'
                      }`}>
                        {vol.gender === 'MALE' ? 'MALE AKATSUKI' : 'FEMALE AKATSUKI'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <h4 className="font-display font-bold text-sm text-white tracking-wide uppercase mb-1">
                    UNASSIGNED PROFILE
                  </h4>
                  <span className="text-[11px] text-stone-400 font-mono block mb-3">
                    {vol.assignedRound}
                  </span>
                </div>

                {/* Data Pending Badge */}
                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="data-pending-badge">
                    <Clock className="w-3 h-3" />
                    <span>DATA PENDING</span>
                  </span>
                  <div className={`w-2 h-2 rounded-full ${vol.gender === 'MALE' ? 'bg-crimson-600 shadow-[0_0_6px_#dc2626]' : 'bg-red-500 shadow-[0_0_6px_#ef4444]'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
