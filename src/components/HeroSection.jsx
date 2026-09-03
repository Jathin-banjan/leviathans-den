import React from 'react';
import { Flame, Calendar, Award, Users, ChevronRight, Play } from 'lucide-react';

export default function HeroSection({ onReplayIntro }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grain">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-stone-800/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Fest Pill */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-stone-900/80 border border-crimson-900/60 text-crimson-400 text-xs font-bold tracking-[0.25em] uppercase mb-8 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
          <Flame className="w-3.5 h-3.5 text-crimson-500 animate-pulse" />
          <span>SEMAPHORE FEST FLAGSHIP</span>
        </div>

        {/* Display Title */}
        <h1 className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-tight text-white uppercase mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          IT MANAGER
        </h1>

        {/* Tagline */}
        <p className="font-cinematic font-bold text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-stone-300 via-crimson-400 to-stone-400 tracking-[0.3em] uppercase mb-8">
          WELCOME TO LEVIATHAN'S DEN
        </p>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-stone-400 text-sm sm:text-base leading-relaxed mb-12 font-light">
          Step into the dark, strategic arena where technical brilliance meets high-stakes corporate execution. Prove your dominance in the flagship event of Semaphore Fest.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-extrabold text-xs uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(220,38,38,0.5)] hover:scale-105 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
          >
            <span>ENTER THE DEN</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="#rounds"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300 font-bold text-xs uppercase tracking-[0.2em] hover:border-crimson-700 hover:text-white transition-all flex items-center justify-center space-x-2"
          >
            <span>EXPLORE EVENT</span>
          </a>

          <button
            onClick={onReplayIntro}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-stone-950/80 border border-stone-800/80 text-stone-400 font-semibold text-xs uppercase tracking-widest hover:text-stone-200 hover:border-stone-700 transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 text-crimson-500 fill-crimson-500" />
            <span>REPLAY INTRO</span>
          </button>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 backdrop-blur border-glow-hover text-left">
            <Calendar className="w-4 h-4 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">EVENT DATES</span>
            <span className="text-sm font-bold text-white tracking-wide">OCTOBER 24-25</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 backdrop-blur border-glow-hover text-left">
            <Award className="w-4 h-4 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">GRAND PRIZE</span>
            <span className="text-sm font-bold text-white tracking-wide">₹50,000 + TROPHY</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 backdrop-blur border-glow-hover text-left">
            <Users className="w-4 h-4 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">FORMAT</span>
            <span className="text-sm font-bold text-white tracking-wide">INDIVIDUAL / DUO</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 backdrop-blur border-glow-hover text-left">
            <Flame className="w-4 h-4 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">THEME</span>
            <span className="text-sm font-bold text-white tracking-wide">LEVIATHAN'S DEN</span>
          </div>
        </div>

      </div>
    </section>
  );
}
