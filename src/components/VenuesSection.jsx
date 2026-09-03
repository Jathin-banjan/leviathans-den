import React, { useState, useEffect } from 'react';
import { MapPin, Users, Clock, ShieldCheck, Compass } from 'lucide-react';
import { fetchVenues } from '../api/client';

export default function VenuesSection() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetchVenues().then(data => setVenues(data));
  }, []);

  return (
    <section id="venues" className="py-24 relative border-t border-stone-800/40 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            LOCATION COMMAND CENTER
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            EVENT VENUES
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800/90 border-glow-hover flex flex-col justify-between backdrop-blur relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-crimson-950/80 border border-crimson-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6 text-crimson-500" />
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-crimson-500 uppercase block">
                    {venue.floor}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                    {venue.name}
                  </h3>
                  <span className="text-xs text-stone-400 block mt-1">
                    {venue.location}
                  </span>
                </div>

                <div className="space-y-2 pt-4 border-t border-stone-800/80 text-xs text-stone-300">
                  <div className="flex items-center space-x-2">
                    <Users className="w-3.5 h-3.5 text-crimson-500 shrink-0" />
                    <span>CAPACITY: <strong className="text-white">{venue.capacity} SEATS</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-crimson-500 shrink-0" />
                    <span>{venue.timeSlot}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <span className="text-[9px] font-bold text-crimson-500 uppercase block">ASSIGNED ROUND:</span>
                  <p className="font-bold text-white uppercase">{venue.assignedRound}</p>
                </div>
              </div>

              {venue.specialInstructions && (
                <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400 flex items-start space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-crimson-500 shrink-0 mt-0.5" />
                  <span>{venue.specialInstructions}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
