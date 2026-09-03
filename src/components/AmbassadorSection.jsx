import React from 'react';
import { Sparkles, Star, ShieldCheck } from 'lucide-react';

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
            
            {/* Left: Ambassador Visual Frame / Silhouette */}
            <div className="relative aspect-[3/4] rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
              
              {/* Placeholder Graphic / Icon */}
              <div className="text-center space-y-4 p-6">
                <div className="w-20 h-20 rounded-full bg-crimson-950/80 border border-crimson-700/60 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(220,38,38,0.4)]">
                  <Star className="w-10 h-10 text-crimson-500 animate-pulse" />
                </div>
                <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase block">
                  FEATURED GUEST AMBASSADOR
                </span>
              </div>

              {/* Tag overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                <span className="px-3 py-1 rounded-full bg-stone-950/80 border border-crimson-800/50 text-[10px] font-bold text-crimson-400 tracking-widest uppercase">
                  SEMAPHORE FEST 2026
                </span>
              </div>
            </div>

            {/* Right: Ambassador Intro Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-crimson-500 uppercase block mb-1">
                  CHARACTER & ICON ANNOUNCEMENT
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-wide">
                  REVEALING SOON
                </h3>
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                The official Brand Ambassador for IT Manager: Leviathan’s Den will represent the summit of technical excellence and strategic vision. Official reveal details and keynote address scheduled prior to event inauguration.
              </p>

              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-300">
                  <ShieldCheck className="w-4 h-4 text-crimson-500" />
                  <span>KEYNOTE INAUGURAL ADDRESS</span>
                </div>
                <p className="text-xs text-stone-500">
                  Main Auditorium Stage — October 24, 2026 @ 09:30 AM
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
