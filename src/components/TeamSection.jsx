import React, { useState } from 'react';
import { UserCheck, Flame, Flower2, ShieldAlert, CheckCircle2, UserX } from 'lucide-react';
import { OFFICIAL_VOLUNTEERS } from '../api/client';

export default function TeamSection() {
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

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

  const filteredVolunteers = OFFICIAL_VOLUNTEERS.filter(v => {
    const matchesGender = genderFilter === 'ALL' || v.gender === genderFilter;
    const matchesStatus = statusFilter === 'ALL' || (statusFilter === 'ACTIVE' ? v.status === 'ACTIVE' : v.status !== 'ACTIVE');
    return matchesGender && matchesStatus;
  });

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
                        <Flame className="w-8 h-8 text-crimson-500 animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-b from-stone-900 via-crimson-950 to-black flex items-center justify-center relative overflow-hidden">
                        <Flower2 className="w-8 h-8 text-crimson-400 animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-crimson-500 uppercase block">
                      {head.role}
                    </span>
                    <h4 className="font-display font-bold text-xl text-white uppercase tracking-wide mt-1">
                      ASSIGNMENT PENDING
                    </h4>
                    <span className="text-xs text-stone-400 block mt-1 font-mono">
                      {head.code} • {head.dept}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center space-x-2 text-amber-500 text-xs font-semibold">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Data Pending — Profile details will be updated.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 20 Volunteers Official List Header & Filters */}
        <div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-800/80">
            <div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                OFFICIAL VOLUNTEER LIST (20)
              </h3>
              <p className="text-xs text-stone-400 font-light">
                Class roster, assigned roles, and Akatsuki division badges
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'ALL', label: 'ALL GENDERS' },
                { id: 'MALE', label: 'MALE (11)' },
                { id: 'FEMALE', label: 'FEMALE (9)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setGenderFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase border transition-all ${
                    genderFilter === tab.id
                      ? 'bg-crimson-600 border-crimson-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <div className="w-[1px] h-6 bg-stone-800 self-center mx-1" />

              {[
                { id: 'ALL', label: 'ALL STATUS' },
                { id: 'ACTIVE', label: 'ACTIVE IT MANAGER (15)' },
                { id: 'OTHER', label: 'OTHER COMMITTEES (5)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase border transition-all ${
                    statusFilter === tab.id
                      ? 'bg-stone-800 border-stone-700 text-white'
                      : 'bg-stone-900/60 border-stone-800 text-stone-500 hover:text-stone-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 20 Volunteers Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVolunteers.map((vol) => {
              const isActive = vol.status === 'ACTIVE';
              return (
                <div
                  key={vol.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur flex flex-col justify-between group ${
                    isActive
                      ? vol.gender === 'MALE'
                        ? 'bg-gradient-to-b from-stone-900/90 to-stone-950 border-stone-800/90 hover:border-crimson-700/80 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                        : 'bg-gradient-to-b from-stone-900/90 via-stone-950 to-crimson-950/30 border-stone-800/90 hover:border-red-600/80 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                      : 'bg-stone-950/80 border-stone-800/50 opacity-75'
                  }`}
                >
                  <div>
                    {/* Header Avatar & Status Indicator */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* Akatsuki Avatar Emblem */}
                        <div className={`w-11 h-11 rounded-xl border p-1 shrink-0 flex items-center justify-center ${
                          vol.gender === 'MALE'
                            ? 'bg-stone-950 border-crimson-800/70 text-crimson-500'
                            : 'bg-stone-950 border-red-700/70 text-red-400'
                        }`}>
                          {vol.gender === 'MALE' ? (
                            <Flame className="w-5 h-5 animate-pulse" />
                          ) : (
                            <Flower2 className="w-5 h-5 animate-pulse" />
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-mono font-bold text-stone-500 block">
                            #{String(vol.id).padStart(2, '0')} • {vol.usn}
                          </span>
                          <span className={`text-[9px] font-bold tracking-wider uppercase block mt-0.5 ${
                            vol.gender === 'MALE' ? 'text-crimson-500' : 'text-red-400'
                          }`}>
                            {vol.gender === 'MALE' ? 'AKATSUKI MALE' : 'AKATSUKI FEMALE'}
                          </span>
                        </div>
                      </div>

                      {/* Status Tag */}
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        isActive
                          ? 'bg-emerald-950 border border-emerald-700/60 text-emerald-400'
                          : 'bg-rose-950 border border-rose-800/60 text-rose-400'
                      }`}>
                        {isActive ? 'ACTIVE' : 'OTHER'}
                      </span>
                    </div>

                    {/* Volunteer Name & USN Details */}
                    <h4 className="font-display font-bold text-base text-white tracking-wide uppercase mb-1">
                      {vol.name}
                    </h4>

                    <div className="space-y-1 text-xs text-stone-400 font-mono mb-4">
                      <p>Class/Sec: <strong className="text-stone-200">{vol.sec}</strong></p>
                      <p>Role: <strong className={isActive ? 'text-crimson-400' : 'text-stone-400'}>{vol.role}</strong> ({vol.category})</p>
                    </div>
                  </div>

                  {/* Card Bottom Status */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className={isActive ? 'text-emerald-400' : 'text-rose-400'}>
                      {isActive ? '✓ IT MANAGER TEAM' : `• ${vol.role} (${vol.category})`}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 'bg-rose-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
