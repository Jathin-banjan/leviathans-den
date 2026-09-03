import React from 'react';
import { Star, ShieldCheck, Flame, Sparkles } from 'lucide-react';

export default function AmbassadorSection() {
  return (
    <section id="ambassador" className="py-24 relative border-t border-stone-800/40 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            OFFICIAL REPRESENTATION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            BRAND AMBASSADOR
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Featured Ambassador Card Container */}
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-stone-900/80 via-stone-950 to-black border border-stone-800/90 relative overflow-hidden backdrop-blur shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Crimson Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-crimson-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            
            {/* Left: Ambassador Character Image */}
            <div className="relative aspect-[4/5] rounded-2xl bg-stone-900 border border-crimson-900/60 overflow-hidden group shadow-2xl">
              <img 
                src="/assets/character.jpg" 
                alt="Brand Ambassador Dhanush G Gowda"
                className="w-full h-full object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />

              {/* Tag overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                <span className="px-3.5 py-1 rounded-full bg-stone-950/90 border border-crimson-700 text-[10px] font-bold text-white tracking-widest uppercase shadow-[0_0_15px_#dc2626]">
                  AURA FARMER 99999+
                </span>
              </div>
            </div>

            {/* Right: Ambassador Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-crimson-500 uppercase block mb-1">
                  OFFICIAL BRAND AMBASSADOR
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wide">
                  DHANUSH G GOWDA
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-crimson-950/30 border border-crimson-900/60 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-crimson-400 uppercase">
                  <Flame className="w-4 h-4 text-crimson-500 animate-pulse" />
                  <span>SUPREME HANDSOME ICON & AURA LEADER</span>
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  "Nitte's most handsome male, Aura Farmer 99999+."
                </p>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Representing the supreme technical mastery, dark strategic dominance, and unmatched aura of Leviathan's Den. As the official Brand Ambassador for IT Manager at Semaphore Fest 2026, Dhanush G Gowda sets the pinnacle standard for leadership.
              </p>

              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">KEYNOTE INAUGURAL VENUE:</span>
                <p className="font-bold text-white font-mono">
                  Sambhram Auditorium (Ramanujan Block) — September 17, 2026 @ 09:00 AM IST
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
