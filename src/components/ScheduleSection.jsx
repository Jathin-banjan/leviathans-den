import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, AlertCircle, Filter } from 'lucide-react';
import { fetchSchedules } from '../api/client';

export default function ScheduleSection() {
  const [schedules, setSchedules] = useState([]);
  const [activeDay, setActiveDay] = useState('ALL');

  useEffect(() => {
    fetchSchedules().then(data => setSchedules(data));
  }, []);

  const filteredSchedules = activeDay === 'ALL'
    ? schedules
    : schedules.filter(s => s.day === activeDay);

  return (
    <section id="schedule" className="py-24 relative border-t border-stone-800/40 bg-stone-950/80 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            OPERATIONAL TIMELINE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            EVENT SCHEDULE
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Day Filter Tabs */}
        <div className="flex justify-center space-x-3 mb-12">
          {['ALL', 'DAY 1', 'DAY 2'].map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase border transition-all ${
                activeDay === day
                  ? 'bg-crimson-600 border-crimson-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
              }`}
            >
              {day === 'ALL' ? 'COMPLETE SCHEDULE' : day}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {filteredSchedules.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 border-glow-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur"
            >
              {/* Left: Time & Day Badge */}
              <div className="flex items-center space-x-4 shrink-0">
                <div className="w-14 h-14 rounded-xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-crimson-500 uppercase">{item.day}</span>
                  <Clock className="w-4 h-4 text-stone-400 mt-1" />
                </div>
                <div>
                  <span className="text-xs font-bold text-crimson-500 block uppercase tracking-wider">
                    {item.startTime} – {item.endTime}
                  </span>
                  <span className="text-[11px] text-stone-500 block font-mono">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Center: Round & Activity */}
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase block">
                  {item.roundName}
                </span>
                <h4 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                  {item.activity}
                </h4>
                <p className="text-xs text-stone-400 font-light">
                  {item.instructions}
                </p>
              </div>

              {/* Right: Venue & Status */}
              <div className="flex flex-col md:items-end space-y-2 shrink-0">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-crimson-500" />
                  <span>{item.venueName}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
