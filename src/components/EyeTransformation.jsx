import React from 'react';

export default function EyeTransformation({ active, progress, phase }) {
  if (!active && phase !== 2 && phase !== 5 && phase !== 9) return null;

  const SHARINGAN_IMG = "/assets/sharingan_reference.png";

  // Phase 2 (3s-8s): Sharingan eyes appear in complete darkness
  if (phase === 2) {
    const norm = Math.max(0, Math.min(1, (progress - 0.06) / 0.1));
    const rotation = norm * 360 * 2;
    return (
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-black/95">
        <div className="flex items-center space-x-12 sm:space-x-20 scale-125 sm:scale-150 transition-all duration-700">
          {[0, 1].map((idx) => (
            <div key={idx} className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-[0_0_50px_#dc2626]">
              <div className="absolute -inset-3 rounded-full bg-crimson-600/30 blur-md animate-pulse" />
              <img 
                src={SHARINGAN_IMG}
                alt="Sharingan Eye"
                className="w-full h-full object-contain rounded-full filter contrast-125 brightness-110 drop-shadow-[0_0_15px_rgba(220,38,38,0.9)]"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Phase 5 (25s-30s) & Phase 9 (47s-49s): Sharingan superimposed strictly on character's eyes
  if (phase === 5 || phase === 9) {
    const localNorm = phase === 5 
      ? Math.max(0, Math.min(1, (progress - 0.50) / 0.10))
      : Math.max(0, Math.min(1, (progress - 0.94) / 0.04));

    const tomoeRotation = localNorm * 360 * 2;

    return (
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[500px] md:w-[650px] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="/assets/character.jpg" 
              alt="Character Face" 
              className="w-full h-full object-cover filter contrast-110 brightness-95"
              style={{ objectPosition: '50% 18%' }}
            />

            {/* Left Eye Sharingan Overlay — Strictly on Left Eye */}
            <div 
              className="absolute z-30 w-8 h-8 rounded-full flex items-center justify-center" 
              style={{ left: '43.5%', top: '31.2%', transform: 'translate(-50%, -50%)' }}
            >
              <img 
                src={SHARINGAN_IMG}
                alt="Left Sharingan Eye"
                className="w-full h-full object-contain rounded-full shadow-[0_0_15px_#dc2626]"
                style={{ transform: `rotate(${tomoeRotation}deg)` }}
              />
            </div>

            {/* Right Eye Sharingan Overlay — Strictly on Right Eye */}
            <div 
              className="absolute z-30 w-8 h-8 rounded-full flex items-center justify-center" 
              style={{ left: '56.5%', top: '31.2%', transform: 'translate(-50%, -50%)' }}
            >
              <img 
                src={SHARINGAN_IMG}
                alt="Right Sharingan Eye"
                className="w-full h-full object-contain rounded-full shadow-[0_0_15px_#dc2626]"
                style={{ transform: `rotate(${tomoeRotation}deg)` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
