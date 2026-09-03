import React from 'react';
import { UserCheck, Mail, Phone, Clock, AlertCircle } from 'lucide-react';

export default function TeamSection() {
  const eventHeads = [
    {
      role: 'EVENT HEAD / COMMANDER 01',
      dept: 'DEPT. OF INFORMATION TECHNOLOGY',
      assigned: false
    },
    {
      role: 'EVENT HEAD / COMMANDER 02',
      dept: 'DEPT. OF INFORMATION TECHNOLOGY',
      assigned: false
    }
  ];

  // 20 Volunteers (Data Pending State)
  const volunteers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    code: `VOL-ITM-${String(i + 1).padStart(2, '0')}`,
    role: `VOLUNTEER POST ${String(i + 1).padStart(2, '0')}`,
    assigned: false
  }));

  return (
    <section id="team" className="py-24 relative border-t border-stone-800/40 bg-stone-950/80 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            ORGANIZATION & COMMAND
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            EVENT TEAM & LEADERSHIP
          </h2>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
        </div>

        {/* 2 Event Heads */}
        <div className="mb-16">
          <h3 className="text-xs font-bold tracking-[0.25em] text-stone-400 uppercase text-center mb-8">
            EVENT HEADS (2)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {eventHeads.map((head, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800/90 border-glow-hover relative overflow-hidden backdrop-blur flex flex-col justify-between"
              >
                <div className="flex items-start space-x-5 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-stone-950 border border-stone-800 shrink-0 flex items-center justify-center font-display font-black text-stone-600 text-xl">
                    0{idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-crimson-500 uppercase block">
                      {head.role}
                    </span>
                    <h4 className="font-display font-bold text-xl text-white uppercase tracking-wide mt-1">
                      ASSIGNMENT PENDING
                    </h4>
                    <span className="text-xs text-stone-400 block mt-0.5">
                      {head.dept}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center space-x-2 text-amber-500 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Data Pending — Event Head will update profile details.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 20 Volunteers Grid */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.25em] text-stone-400 uppercase text-center mb-8">
            ORGANIZING VOLUNTEERS (20)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {volunteers.map((vol) => (
              <div 
                key={vol.id}
                className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/70 hover:border-crimson-900/60 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className="w-3.5 h-3.5 text-stone-600 group-hover:text-crimson-500 transition-colors" />
                  <span className="text-[9px] font-mono text-stone-600">
                    {vol.code}
                  </span>
                </div>
                <h5 className="font-display font-bold text-xs text-stone-300 tracking-wide uppercase">
                  UNASSIGNED
                </h5>
                <span className="data-pending-badge mt-2">
                  <Clock className="w-3 h-3" />
                  <span>DATA PENDING</span>
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
