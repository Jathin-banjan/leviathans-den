import React, { useState, useEffect } from 'react';
import { User, Calendar, MapPin, Clock, ShieldCheck, AlertTriangle, Bell, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OFFICIAL_VOLUNTEERS } from '../api/client';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const [volunteerData, setVolunteerData] = useState(null);
  const [urgentBroadcast, setUrgentBroadcast] = useState('');

  useEffect(() => {
    // Find matching volunteer record from real roster or default to Volunteer 01 (Dhanush)
    const query = user?.name ? user.name.toLowerCase() : "dhanush";
    const matched = OFFICIAL_VOLUNTEERS.find(v => v.name.toLowerCase().includes(query)) || OFFICIAL_VOLUNTEERS[0];
    setVolunteerData(matched);

    // Sync urgent broadcast from Commanders Jathin & Hasth
    const saved = localStorage.getItem("leviathan_urgent_command");
    if (saved) {
      setUrgentBroadcast(saved);
    } else {
      setUrgentBroadcast("All IT Manager Volunteers report to Nethravathi Seminar Hall (4th Floor) at 09:00 AM on September 17 for final briefing.");
    }
  }, [user]);

  if (!volunteerData) return null;

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

        {/* Urgent Commander Broadcast Notification Box */}
        {urgentBroadcast && (
          <div className="max-w-4xl mx-auto mb-10 p-6 rounded-2xl bg-crimson-950/90 border border-crimson-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start space-x-4">
              <div className="p-2.5 rounded-xl bg-crimson-900 border border-crimson-600 text-white shrink-0 mt-0.5">
                <Bell className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-crimson-400 uppercase block">
                  URGENT BROADCAST FROM EVENT COMMANDERS (JATHIN & HASTH)
                </span>
                <p className="text-sm font-semibold leading-relaxed text-white">
                  "{urgentBroadcast}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Real Volunteer Assignment Card */}
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-stone-900/80 border border-stone-800/90 relative overflow-hidden backdrop-blur shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-6 gap-4">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-stone-950 border border-crimson-800 flex items-center justify-center font-display font-black text-crimson-500 text-xl shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Flame className="w-8 h-8 text-crimson-500 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold text-crimson-500 uppercase">
                    #{String(volunteerData.id).padStart(2, '0')} • {volunteerData.usn}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-950 text-[9px] font-mono font-bold text-stone-400 uppercase">
                    SEC {volunteerData.sec}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wide mt-1">
                  {volunteerData.name}
                </h3>
                <span className="text-xs text-stone-400 font-mono">
                  {volunteerData.role} ({volunteerData.category})
                </span>
              </div>
            </div>

            <span className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold uppercase text-center ${
              volunteerData.status === 'ACTIVE'
                ? 'bg-emerald-950 border-emerald-700 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-rose-950 border-rose-800 text-rose-400'
            }`}>
              {volunteerData.status === 'ACTIVE' ? '✓ ACTIVE IT MANAGER DUTY' : `• ${volunteerData.role} (${volunteerViewDataCategory(volunteerData)})`}
            </span>
          </div>

          {/* Real Operational Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase block tracking-wider">ASSIGNED EVENT TRIAL</span>
              <span className="text-sm font-bold text-white uppercase">{volunteerData.assignedRound}</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase block tracking-wider">TIME SLOT</span>
              <span className="text-sm font-bold text-crimson-400 uppercase font-mono">{volunteerData.timeSlot}</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase block tracking-wider">VENUE & FLOOR</span>
              <span className="text-sm font-bold text-white uppercase">{volunteerData.assignedVenue}</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase block tracking-wider">SPECIFIC DUTY RESPONSIBILITY</span>
              <span className="text-sm font-bold text-white uppercase">{volunteerData.duty}</span>
            </div>
          </div>

          {/* Specific Duty Instructions */}
          <div className="p-6 rounded-2xl bg-crimson-950/20 border border-crimson-900/60 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-crimson-400 uppercase">
              <ShieldCheck className="w-4 h-4 text-crimson-500 shrink-0" />
              <span>COMMANDER DUTY INSTRUCTIONS</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Report 30 minutes prior to trial inauguration at your assigned venue ({volunteerData.assignedVenue}). Coordinate directly with Event Commanders Jathin V Banjan (6364058375) and Hasth R Karkera (7338371775).
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

function volunteerViewDataCategory(vol) {
  return vol.category || "Event";
}
