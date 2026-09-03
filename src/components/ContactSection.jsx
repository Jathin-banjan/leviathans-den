import React from 'react';
import { MapPin, Phone, Calendar, Clock, Terminal, Shield, MessageSquareCode } from 'lucide-react';

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/LkVZPSPNUUDGJjRORgBsPe?mode=gi_t";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative border-t border-stone-800/40 bg-stone-950/90 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            DIRECT COMMAND COMMUNICATION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            EVENT HEAD CONTACTS
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Direct Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          
          {/* Commander 1 */}
          <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800/90 border-glow-hover space-y-5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-crimson-950 border border-crimson-700 flex items-center justify-center font-display font-black text-crimson-500 text-lg">
                JV
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-crimson-500 uppercase block">
                  EVENT COMMANDER / HEAD
                </span>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                  JATHIN V BANJAN
                </h3>
                <span className="text-xs text-stone-400 font-mono">DEPT. OF MCA</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 text-sm">
              <div className="flex items-center space-x-3 text-stone-300">
                <Phone className="w-4 h-4 text-crimson-500 shrink-0" />
                <span className="font-mono text-base font-bold text-white">6364058375</span>
              </div>
            </div>
          </div>

          {/* Commander 2 */}
          <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800/90 border-glow-hover space-y-5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-crimson-950 border border-crimson-700 flex items-center justify-center font-display font-black text-crimson-500 text-lg">
                HK
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-crimson-500 uppercase block">
                  EVENT COMMANDER / HEAD
                </span>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                  HASTH R KARKERA
                </h3>
                <span className="text-xs text-stone-400 font-mono">DEPT. OF MCA</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 text-sm">
              <div className="flex items-center space-x-3 text-stone-300">
                <Phone className="w-4 h-4 text-crimson-500 shrink-0" />
                <span className="font-mono text-base font-bold text-white">7338371775</span>
              </div>
            </div>
          </div>

        </div>

        {/* WhatsApp Group Banner */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-950 to-stone-900 border border-emerald-700/60 text-center relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <div className="max-w-2xl mx-auto space-y-4">
            <MessageSquareCode className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide">
              OFFICIAL IT MANAGER VOLUNTEER WHATSAPP GROUP
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed font-light">
              All 20 assigned volunteers join the official communication channel for real-time operational broadcasts during September 17 & 18.
            </p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all"
            >
              <span>JOIN WHATSAPP GROUP</span>
            </a>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-stone-800/60 text-center text-xs text-stone-500">
        <p>© 2026 SEMAPHORE FEST | DEPARTMENT OF MCA. ALL RIGHTS RESERVED.</p>
        <p className="mt-1 text-crimson-500 font-bold tracking-[0.2em] uppercase">IT MANAGER — SEPTEMBER 17 & 18, 2026</p>
      </footer>
    </section>
  );
}
