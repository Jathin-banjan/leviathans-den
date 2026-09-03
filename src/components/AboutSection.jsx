import React from 'react';
import { Shield, Cpu, Target, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative border-t border-stone-800/40 bg-stone-950/60 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            OVERVIEW
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            THE ARCHITECTURE OF DOMINANCE
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full mb-6" />
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-light">
            In Leviathan’s Den, standard IT management is pushed beyond theoretical bounds. Participants step into realistic high-pressure executive scenarios testing technical mastery, strategic crisis command, and relentless leadership.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 border-glow-hover relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-3 uppercase tracking-wide">
              SYSTEM ARCHITECTURE
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Design scalable corporate IT infrastructure, allocate capital budgets, and resolve complex technical debt under real-time constraints.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 border-glow-hover relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-3 uppercase tracking-wide">
              CRISIS DISINTEGRATION
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Navigate active ransomware breaches, server grid blackouts, and unannounced live disruptions without losing operational composure.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 border-glow-hover relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-3 uppercase tracking-wide">
              EXECUTIVE DEFENSE
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Pitch your technology roadmap and strategic vision before a panel of veteran IT Directors and industry titans.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
