import React, { useState } from 'react';
import { Shield, Users, Calendar, MapPin, Plus, Bell, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function EventHeadDashboard() {
  const { user } = useAuth();
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [publishedMsg, setPublishedMsg] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newAnnouncement) return;
    setPublishedMsg('Announcement Broadcasted to All Volunteers!');
    setNewAnnouncement('');
    setTimeout(() => setPublishedMsg(''), 4000);
  };

  return (
    <section id="event-head-dashboard" className="py-24 relative border-t border-stone-800/40 bg-stone-950/90 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            EVENT HEAD COMMAND CENTER
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            COMMAND DASHBOARD
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
            <Activity className="w-5 h-5 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">ACTIVE ROUND</span>
            <span className="text-sm font-bold text-white uppercase">ROUND 1 (AWAKENING)</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
            <Users className="w-5 h-5 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">VOLUNTEERS ON DUTY</span>
            <span className="text-sm font-bold text-white uppercase">20 VOLUNTEERS</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
            <MapPin className="w-5 h-5 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">VENUES ACTIVE</span>
            <span className="text-sm font-bold text-white uppercase">3 VENUES</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 backdrop-blur">
            <Calendar className="w-5 h-5 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase tracking-wider">SCHEDULE STATUS</span>
            <span className="text-sm font-bold text-white uppercase">ON TIME</span>
          </div>
        </div>

        {/* Broadcast Announcement Form */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-stone-900/80 border border-stone-800/90 space-y-4">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-crimson-500" />
            <h3 className="font-display font-bold text-lg text-white uppercase">
              BROADCAST COMMAND ANNOUNCEMENT
            </h3>
          </div>

          {publishedMsg && (
            <div className="p-3 rounded-xl bg-crimson-950 border border-crimson-700 text-crimson-400 text-xs font-semibold">
              {publishedMsg}
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-4">
            <textarea
              rows={3}
              required
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Type urgent operational instructions or updates for volunteers..."
              className="w-full p-4 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:outline-none focus:border-crimson-600 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>BROADCAST TO ALL VOLUNTEERS</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
