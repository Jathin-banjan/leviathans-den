import React, { useState, useEffect } from 'react';
import { User, Calendar, MapPin, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    // Check assignment for logged in user or default fallback
    setAssignment({
      volunteerName: user?.name || "VOLUNTEER 01",
      roundName: "THE LEVIATHAN'S AWAKENING (ROUND 1)",
      day: "DAY 1 — OCT 24, 2026",
      timeSlot: "10:00 AM – 11:00 AM",
      venueName: "COMPUTER LAB 01 & 02",
      responsibility: "Technical Execution & Intranet Quiz Supervision",
      instructions: "Report 30 mins prior for system network verification. Ensure candidates maintain strict silence."
    });
  }, [user]);

  return (
    <section id="my-role" className="py-24 relative border-t border-stone-800/40 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            VOLUNTEER COMMAND SCREEN
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            MY DUTY ASSIGNMENT
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Assignment Card */}
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-stone-900/80 border border-stone-800/90 relative overflow-hidden backdrop-blur shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-8">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-700 flex items-center justify-center font-display font-black text-crimson-500 text-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-crimson-500 uppercase block">
                  ASSIGNED VOLUNTEER
                </span>
                <h3 className="font-display font-bold text-xl text-white uppercase">
                  {user?.name || "VOLUNTEER COMMAND"}
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded bg-crimson-950 border border-crimson-700 text-crimson-400 text-xs font-mono font-bold uppercase">
              DUTY ACTIVE
            </span>
          </div>

          {/* Assignment Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase block">ASSIGNED ROUND</span>
              <span className="text-sm font-bold text-white uppercase">{assignment?.roundName}</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase block">DATE & TIME</span>
              <span className="text-sm font-bold text-white uppercase">{assignment?.day} ({assignment?.timeSlot})</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase block">VENUE LOCATION</span>
              <span className="text-sm font-bold text-white uppercase">{assignment?.venueName}</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase block">RESPONSIBILITY</span>
              <span className="text-sm font-bold text-white uppercase">{assignment?.responsibility}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-6 rounded-2xl bg-crimson-950/20 border border-crimson-900/60 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-crimson-400 uppercase">
              <ShieldCheck className="w-4 h-4 text-crimson-500 shrink-0" />
              <span>IMPORTANT OPERATIONAL INSTRUCTIONS</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              {assignment?.instructions}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
