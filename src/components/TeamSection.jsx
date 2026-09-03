import React from 'react';
import { UserCheck, Shield, Mail, Phone } from 'lucide-react';

export default function TeamSection() {
  const eventHeads = [
    {
      name: 'ARJUN VERMA',
      role: 'EVENT HEAD / CHIEF COMMANDER',
      dept: 'DEPT. OF INFORMATION TECHNOLOGY',
      email: 'arjun.verma@semaphorefest.com',
      phone: '+91 98765 43210',
      initials: 'AV'
    },
    {
      name: 'SANYA SHARMA',
      role: 'CO-EVENT HEAD / OPERATIONS DIRECTOR',
      dept: 'DEPT. OF INFORMATION TECHNOLOGY',
      email: 'sanya.sharma@semaphorefest.com',
      phone: '+91 98765 43211',
      initials: 'SS'
    }
  ];

  // 20 Dedicated Volunteers
  const volunteers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `VOLUNTEER ${String(i + 1).padStart(2, '0')}`,
    role: i % 2 === 0 ? 'TECHNICAL EXECUTION' : 'LOGISTICS & OPERATIONS',
    code: `VOL-ITM-${String(i + 1).padStart(2, '0')}`
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

        {/* 2 Event Heads (Premium Featured Presentation) */}
        <div className="mb-16">
          <h3 className="text-xs font-bold tracking-[0.25em] text-stone-400 uppercase text-center mb-8">
            EVENT HEADS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {eventHeads.map((head, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800/90 border-glow-hover relative overflow-hidden backdrop-blur flex flex-col justify-between"
              >
                <div className="flex items-start space-x-5 mb-6">
                  {/* Portrait Placeholder Avatar */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-crimson-800 to-stone-950 p-[1px] shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    <div className="w-full h-full bg-stone-950 rounded-xl flex items-center justify-center font-display font-black text-white text-xl">
                      {head.initials}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-crimson-500 uppercase block">
                      {head.role}
                    </span>
                    <h4 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                      {head.name}
                    </h4>
                    <span className="text-xs text-stone-400 block mt-0.5">
                      {head.dept}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/80 space-y-2 text-xs text-stone-400">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-crimson-500" />
                    <span>{head.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-crimson-500" />
                    <span>{head.phone}</span>
                  </div>
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
                className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/70 hover:border-crimson-900/60 hover:bg-stone-900/80 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className="w-3.5 h-3.5 text-crimson-500/80 group-hover:text-crimson-500 transition-colors" />
                  <span className="text-[9px] font-mono text-stone-600 group-hover:text-stone-400 transition-colors">
                    {vol.code}
                  </span>
                </div>
                <h5 className="font-display font-bold text-xs text-white tracking-wide uppercase">
                  {vol.name}
                </h5>
                <span className="text-[10px] text-stone-500 block mt-1 tracking-wider uppercase">
                  {vol.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
