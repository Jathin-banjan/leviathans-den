import React from 'react';
import { Play, Volume2, ShieldAlert, Award, Calendar, Users, ChevronRight, Terminal, Flame } from 'lucide-react';

export default function HomePage({ onReplayIntro }) {
  return (
    <div className="min-h-screen bg-charcoal-950 text-stone-200 font-sans relative selection:bg-crimson-900 selection:text-white">
      {/* Dark Ambient Grid & Smoke Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-charcoal-900 via-charcoal-950 to-black pointer-events-none opacity-90" />
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#dc2626 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Navigation Bar */}
      <header className="relative z-30 border-b border-stone-800/60 bg-black/60 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Event Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-crimson-600 to-black p-[1px] shadow-[0_0_15px_#dc2626]">
              <div className="w-full h-full bg-black rounded flex items-center justify-center font-display font-black text-crimson-500 text-lg">
                L
              </div>
            </div>
            <div>
              <span className="font-display font-black tracking-wider text-xl text-white block leading-none">
                IT MANAGER
              </span>
              <span className="text-[10px] tracking-widest text-crimson-500 font-semibold uppercase">
                SEMAPHORE FEST
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a href="#about" className="hover:text-crimson-500 transition-colors">OVERVIEW</a>
            <a href="#trials" className="hover:text-crimson-500 transition-colors">THE TRIALS</a>
            <a href="#prizes" className="hover:text-crimson-500 transition-colors">PRIZE POOL</a>
            <a href="#rules" className="hover:text-crimson-500 transition-colors">DEN RULES</a>
          </nav>

          {/* Action Controls & Replay Intro */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onReplayIntro}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-stone-900 border border-crimson-900/50 text-stone-300 hover:text-white hover:bg-crimson-950/50 hover:border-crimson-600 transition-all text-xs font-semibold tracking-wider group shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              title="Replay Cinematic Welcome Animation"
            >
              <Play className="w-3.5 h-3.5 text-crimson-500 fill-crimson-500 group-hover:scale-110 transition-transform" />
              <span>REPLAY INTRO</span>
            </button>

            <a
              href="#register"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-700 text-white font-bold text-xs uppercase tracking-widest hover:brightness-115 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center space-x-2"
            >
              <span>ENTER DEN</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-24 overflow-hidden border-b border-stone-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-crimson-950/80 border border-crimson-800/60 text-crimson-400 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <Flame className="w-4 h-4 text-crimson-500 animate-pulse" />
              <span>SEMAPHORE FEST PRESENTATION</span>
            </div>

            {/* Main Title */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-6 uppercase">
              IT MANAGER
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 via-red-600 to-stone-400 text-4xl sm:text-6xl mt-2 tracking-widest">
                LEVIATHAN'S DEN
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-stone-400 text-base sm:text-lg leading-relaxed mb-10 font-light">
              Step onto the stone throne of digital strategy. Prove your tech leadership, rapid crisis resolution, and executive decision making under extreme pressure.
            </p>

            {/* Event Meta Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
                <Calendar className="w-5 h-5 text-crimson-500 mx-auto mb-2" />
                <span className="text-xs text-stone-500 block uppercase tracking-wider">EVENT DATE</span>
                <span className="text-sm font-bold text-white">OCTOBER 24-25</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
                <Award className="w-5 h-5 text-crimson-500 mx-auto mb-2" />
                <span className="text-xs text-stone-500 block uppercase tracking-wider">PRIZE POOL</span>
                <span className="text-sm font-bold text-white">₹50,000 + TROPHY</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
                <Users className="w-5 h-5 text-crimson-500 mx-auto mb-2" />
                <span className="text-xs text-stone-500 block uppercase tracking-wider">FORMAT</span>
                <span className="text-sm font-bold text-white">INDIVIDUAL / DUO</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
                <Terminal className="w-5 h-5 text-crimson-500 mx-auto mb-2" />
                <span className="text-xs text-stone-500 block uppercase tracking-wider">VENUE</span>
                <span className="text-sm font-bold text-white">MAIN AUDITORIUM</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-extrabold text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 transition-all"
              >
                CLAIM YOUR THRONE
              </a>
              <button
                onClick={onReplayIntro}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-200 font-bold text-sm uppercase tracking-widest hover:border-crimson-500 hover:text-white transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-crimson-500 fill-crimson-500" />
                <span>WATCH INTRO SEQUENCE</span>
              </button>
            </div>

          </div>
        </section>

        {/* THE TRIALS (ROUNDS) SECTION */}
        <section id="trials" className="py-20 border-b border-stone-800/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wider uppercase mb-3">
                THE THREE DEN TRIALS
              </h2>
              <div className="w-20 h-1 bg-crimson-600 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Round 1 */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-800 hover:border-crimson-700/60 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center font-display font-black text-crimson-500 text-xl mb-6 group-hover:scale-110 transition-transform">
                  01
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3 uppercase tracking-wide">
                  CODE SIEGE & STRATEGY
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  Fast-paced online tech aptitude quiz, budget allocation puzzles, and system architecture design challenges.
                </p>
                <span className="text-xs font-semibold text-crimson-500 uppercase tracking-widest">
                  ELIMINATION ROUND
                </span>
              </div>

              {/* Round 2 */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-800 hover:border-crimson-700/60 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center font-display font-black text-crimson-500 text-xl mb-6 group-hover:scale-110 transition-transform">
                  02
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3 uppercase tracking-wide">
                  CRISIS ARCHITECTURE
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  Live corporate breach scenario! Navigate cyber threats, server outages, and resource strain in real-time.
                </p>
                <span className="text-xs font-semibold text-crimson-500 uppercase tracking-widest">
                  SEMI-FINALS
                </span>
              </div>

              {/* Round 3 */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-800 hover:border-crimson-700/60 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center font-display font-black text-crimson-500 text-xl mb-6 group-hover:scale-110 transition-transform">
                  03
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3 uppercase tracking-wide">
                  THE LEVIATHAN SUMMIT
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  Finalists defend their corporate IT roadmap before a jury of senior IT directors and industry titans.
                </p>
                <span className="text-xs font-semibold text-crimson-500 uppercase tracking-widest">
                  GRAND FINALE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RULES & REGISTRATION SECTION */}
        <section id="rules" className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="p-8 sm:p-12 rounded-3xl bg-stone-900/80 border border-stone-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-crimson-600/10 rounded-full blur-3xl" />
              
              <ShieldAlert className="w-10 h-10 text-crimson-500 mx-auto mb-4" />
              <h2 className="font-display font-black text-3xl text-white tracking-wide uppercase mb-4">
                LAWS OF THE LEVIATHAN
              </h2>
              <p className="text-stone-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
                Participants must arrive 30 minutes prior to round inauguration. Plagiarism, unpermitted external AI generation, or breach of event protocols will result in immediate disqualification.
              </p>

              <div id="register" className="pt-4">
                <button
                  onClick={() => alert("Registration opened! Welcome to Leviathan's Den.")}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-700 text-white font-extrabold text-base uppercase tracking-widest shadow-[0_0_35px_rgba(220,38,38,0.6)] hover:brightness-125 transition-all"
                >
                  REGISTER NOW FOR IT MANAGER
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-stone-800/60 py-8 bg-black text-center text-xs text-stone-500">
        <p>© 2026 SEMAPHORE FEST | DEPARTMENT OF INFORMATION TECHNOLOGY. ALL RIGHTS RESERVED.</p>
        <p className="mt-1 text-crimson-500/80 font-semibold tracking-wider uppercase">IT MANAGER — LEVIATHAN'S DEN</p>
      </footer>
    </div>
  );
}
