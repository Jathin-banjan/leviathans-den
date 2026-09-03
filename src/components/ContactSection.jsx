import React from 'react';
import { MapPin, Mail, Phone, Calendar, Clock, Terminal, ChevronRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative border-t border-stone-800/40 bg-stone-950/90 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            THE FINAL CHAPTER
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            COMMUNICATION & LOCATION
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Contact Info & Registration Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Location & Venue */}
          <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 border-glow-hover space-y-4">
            <div className="w-10 h-10 rounded-lg bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-crimson-500" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wide">
              VENUE LOCATION
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Main Auditorium, Department of Information Technology,<br />
              Semaphore Fest Campus Arena.
            </p>
          </div>

          {/* Timing & Dates */}
          <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 border-glow-hover space-y-4">
            <div className="w-10 h-10 rounded-lg bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-crimson-500" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wide">
              EVENT TIMINGS
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Inauguration: October 24, 09:00 AM IST<br />
              Grand Finale: October 25, 04:00 PM IST
            </p>
          </div>

          {/* Quick Enquiries */}
          <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 border-glow-hover space-y-4">
            <div className="w-10 h-10 rounded-lg bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-crimson-500" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wide">
              DIRECT ENQUIRIES
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Email: itmanager@semaphorefest.com<br />
              Helpline: +91 98765 43210
            </p>
          </div>

        </div>

        {/* Registration CTA Card */}
        <div id="register" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-crimson-950/80 via-stone-900 to-stone-950 border border-crimson-900/60 text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wide">
              CLAIM YOUR THRONE AT LEVIATHAN'S DEN
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              Registration spots are capped for the IT Manager Championship. Secure your entry for Semaphore Fest today.
            </p>
            <button
              onClick={() => alert("Registration Confirmed! Welcome to Leviathan's Den.")}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-extrabold text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 hover:brightness-110 transition-all inline-flex items-center space-x-2"
            >
              <span>REGISTER NOW</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-stone-800/60 text-center text-xs text-stone-500">
        <p>© 2026 SEMAPHORE FEST | DEPARTMENT OF INFORMATION TECHNOLOGY. ALL RIGHTS RESERVED.</p>
        <p className="mt-1 text-crimson-500/80 font-bold tracking-[0.2em] uppercase">IT MANAGER — LEVIATHAN'S DEN</p>
      </footer>
    </section>
  );
}
