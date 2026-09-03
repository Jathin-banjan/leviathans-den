import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, Clock } from 'lucide-react';
import { fetchAnnouncements } from '../api/client';

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements().then(data => setAnnouncements(data));
  }, []);

  return (
    <section id="announcements" className="py-24 relative border-t border-stone-800/40 bg-stone-950/80 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            COMMAND COMMUNICATIONS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            ANNOUNCEMENTS
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Announcements List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/90 border-glow-hover flex items-start space-x-5 backdrop-blur"
            >
              <div className="w-10 h-10 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-crimson-500" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-white uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                    item.priority === 'HIGH' ? 'bg-crimson-950 border border-crimson-700 text-crimson-400' : 'bg-stone-900 text-stone-400'
                  }`}>
                    {item.priority} PRIORITY
                  </span>
                </div>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
