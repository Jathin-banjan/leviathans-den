import React, { useState, useEffect } from 'react';
import { Play, LogIn, LogOut, Menu, X, MessageSquareCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/LkVZPSPNUUDGJjRORgBsPe?mode=gi_t";

export default function Navigation({ onReplayIntro, onOpenLogin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

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
    { name: 'SCHEDULE', href: '#schedule' },
    { name: 'VENUES', href: '#venues' },
    { name: 'TEAM', href: '#team' },
    { name: 'MY ROLE', href: '#my-role' },
    { name: 'ANNOUNCEMENTS', href: '#announcements' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-stone-800/80 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#home" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-crimson-600 via-crimson-800 to-stone-950 p-[1px] shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] transition-all">
            <div className="w-full h-full bg-stone-950 rounded-lg flex items-center justify-center font-display font-black text-crimson-500 text-lg">
              L
            </div>
          </div>
          <div>
            <span className="font-display font-black tracking-wider text-base sm:text-lg text-white block leading-none group-hover:text-crimson-400 transition-colors uppercase">
              IT MANAGER
            </span>
            <span className="text-[9px] tracking-[0.25em] text-crimson-500 font-bold uppercase block mt-1">
              SEMAPHORE FEST
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center space-x-5 text-[11px] font-semibold tracking-[0.18em]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-crimson-600 hover:after:w-full after:transition-all uppercase"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions: WhatsApp Group + Replay Intro & Login */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* WhatsApp Direct Group Link */}
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all flex items-center space-x-1.5 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            title="Join Official WhatsApp Group"
          >
            <MessageSquareCode className="w-4 h-4 text-emerald-400 fill-emerald-950" />
            <span className="hidden md:inline">WHATSAPP</span>
          </a>

          <button
            onClick={onReplayIntro}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-white hover:border-crimson-700 hover:bg-crimson-950/40 transition-all text-xs font-semibold tracking-wider group"
            title="Replay Cinematic Welcome Sequence"
          >
            <Play className="w-3.5 h-3.5 text-crimson-500 fill-crimson-500 group-hover:scale-110 transition-transform" />
            <span>REPLAY</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-2">
              <span className="px-3 py-2 rounded-lg bg-stone-900 border border-crimson-900 text-crimson-400 text-[11px] font-mono font-bold uppercase">
                {user.role === 'ROLE_EVENT_HEAD' ? 'COMMANDER' : 'VOLUNTEER'}
              </span>
              <button
                onClick={logout}
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-crimson-700 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-bold text-xs uppercase tracking-widest hover:brightness-125 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center space-x-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>COMMAND ACCESS</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="xl:hidden flex items-center space-x-2">
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400"
            title="Join WhatsApp Group"
          >
            <MessageSquareCode className="w-5 h-5" />
          </a>

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
        <div className="xl:hidden bg-stone-950/95 border-b border-stone-800 px-6 py-6 space-y-3 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-semibold tracking-widest text-stone-300 hover:text-crimson-500 py-1 uppercase"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-stone-800 flex flex-col space-y-2">
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>JOIN WHATSAPP GROUP</span>
            </a>
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
          </div>
        </div>
      )}
    </header>
  );
}
