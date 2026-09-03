import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, Menu, X } from 'lucide-react';

export default function Navigation({ onReplayIntro }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'ROUNDS', href: '#rounds' },
    { name: 'TEAM', href: '#team' },
    { name: 'AMBASSADOR', href: '#ambassador' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-stone-800/80 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#home" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-crimson-600 via-crimson-800 to-stone-950 p-[1px] shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all">
            <div className="w-full h-full bg-stone-950 rounded-lg flex items-center justify-center font-display font-black text-crimson-500 text-lg">
              L
            </div>
          </div>
          <div>
            <span className="font-display font-black tracking-wider text-lg text-white block leading-none group-hover:text-crimson-400 transition-colors">
              IT MANAGER
            </span>
            <span className="text-[9px] tracking-[0.25em] text-crimson-500 font-bold uppercase block mt-1">
              SEMAPHORE FEST
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-[0.2em]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-crimson-600 hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (Replay Intro + Register CTA) */}
        <div className="hidden sm:flex items-center space-x-4">
          <button
            onClick={onReplayIntro}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-white hover:border-crimson-700 hover:bg-crimson-950/40 transition-all text-xs font-semibold tracking-wider group"
            title="Replay Cinematic Welcome Experience"
          >
            <Play className="w-3.5 h-3.5 text-crimson-500 fill-crimson-500 group-hover:scale-110 transition-transform" />
            <span>REPLAY INTRO</span>
          </button>

          <a
            href="#register"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-bold text-xs uppercase tracking-widest hover:brightness-125 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center space-x-1.5"
          >
            <span>ENTER DEN</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/95 border-b border-stone-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-widest text-stone-300 hover:text-crimson-500 py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-stone-800 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="w-full py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 flex items-center justify-center space-x-2 text-xs font-bold tracking-wider"
            >
              <Play className="w-3.5 h-3.5 text-crimson-500 fill-crimson-500" />
              <span>REPLAY INTRO</span>
            </button>
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-crimson-600 text-white font-bold text-xs tracking-widest uppercase"
            >
              ENTER DEN
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
