import React from 'react';

export default function EyeTransformation({ active, progress, phase }) {
  if (!active && phase !== 2 && phase !== 4 && phase !== 5) return null;

  // Phase 2 (3s-8s): Sharingan eyes appear in dark void
  if (phase === 2) {
    const norm = Math.max(0, Math.min(1, (progress - 0.06) / 0.1));
    const rotation = norm * 360 * 2;
    return (
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center bg-black/95">
        <div className="flex items-center space-x-12 sm:space-x-20 scale-125 sm:scale-150 transition-all duration-700">
          {[0, 1].map((idx) => (
            <div key={idx} className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-[0_0_50px_#dc2626]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-crimson-600 to-red-800 border-2 border-red-400 animate-pulse" />
              <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-black flex items-center justify-center relative z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-black" style={{ transform: `rotate(${rotation}deg)` }}>
                  <circle cx="50" cy="50" r="18" fill="red" />
                  <g fill="black">
                    <circle cx="50" cy="50" r="10" />
                    <path d="M 50 18 C 58 18 62 24 58 30 C 54 36 46 34 48 26 C 49 21 50 18 50 18 Z" />
                    <path d="M 22 66 C 26 59 34 59 36 67 C 38 75 30 79 26 73 C 23 69 22 66 22 66 Z" />
                    <path d="M 78 66 C 74 73 66 69 64 61 C 62 53 70 49 74 55 C 77 59 78 66 78 66 Z" />
                  </g>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Phase 4 (18s-30s): Sharingan superimposed over character face
  if (phase === 4) {
    const normProgress = Math.max(0, Math.min(1, (progress - 0.36) / 0.24));
    const tomoeRotation = normProgress * 360 * 3;
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

            {/* Left Eye Sharingan */}
            <div className="absolute z-30 w-8 h-8 rounded-full flex items-center justify-center" style={{ left: '43.5%', top: '31.2%', transform: 'translate(-50%, -50%)' }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-crimson-700 border border-red-400 shadow-[0_0_15px_#dc2626]">
                <svg viewBox="0 0 100 100" className="w-full h-full text-black" style={{ transform: `rotate(${tomoeRotation}deg)` }}>
                  <circle cx="50" cy="50" r="16" fill="black" />
                  <g fill="black">
                    <path d="M 50 20 C 58 20 62 26 58 32 C 54 38 46 36 48 28 C 49 23 50 20 50 20 Z" />
                    <path d="M 24 65 C 28 58 36 58 38 66 C 40 74 32 78 28 72 C 25 68 24 65 24 65 Z" />
                    <path d="M 76 65 C 72 72 64 68 62 60 C 60 52 68 48 72 54 C 75 58 76 65 76 65 Z" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Eye Sharingan */}
            <div className="absolute z-30 w-8 h-8 rounded-full flex items-center justify-center" style={{ left: '56.5%', top: '31.2%', transform: 'translate(-50%, -50%)' }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-crimson-700 border border-red-400 shadow-[0_0_15px_#dc2626]">
                <svg viewBox="0 0 100 100" className="w-full h-full text-black" style={{ transform: `rotate(${tomoeRotation}deg)` }}>
                  <circle cx="50" cy="50" r="16" fill="black" />
                  <g fill="black">
                    <path d="M 50 20 C 58 20 62 26 58 32 C 54 38 46 36 48 28 C 49 23 50 20 50 20 Z" />
                    <path d="M 24 65 C 28 58 36 58 38 66 C 40 74 32 78 28 72 C 25 68 24 65 24 65 Z" />
                    <path d="M 76 65 C 72 72 64 68 62 60 C 60 52 68 48 72 54 C 75 58 76 65 76 65 Z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 5 (30s-40s): Massive Sharingan Expansion and Red Flame Shockwave Explosion
  if (phase === 5) {
    const localProg = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));
    const scaleVal = 1 + localProg * 8; // Scales up massively
    const isExploding = localProg > 0.7;

    return (
      <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden bg-black/90">
        <div 
          className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ transform: `scale(${scaleVal}) rotate(${localProg * 720}deg)` }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-crimson-600 to-red-900 border-4 border-red-500 shadow-[0_0_100px_#dc2626]" />
          <div className="w-40 h-40 rounded-full bg-black flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
              <circle cx="50" cy="50" r="18" fill="red" />
              <g fill="black">
                <circle cx="50" cy="50" r="10" />
                <path d="M 50 18 C 58 18 62 24 58 30 C 54 36 46 34 48 26 C 49 21 50 18 50 18 Z" />
                <path d="M 22 66 C 26 59 34 59 36 67 C 38 75 30 79 26 73 C 23 69 22 66 22 66 Z" />
                <path d="M 78 66 C 74 73 66 69 64 61 C 62 53 70 49 74 55 C 77 59 78 66 78 66 Z" />
              </g>
            </svg>
          </div>
        </div>

        {/* Flame Explosion Shockwave Ring */}
        {isExploding && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-crimson-600/90 to-red-700/80 animate-ping z-50 flex items-center justify-center mix-blend-screen" />
        )}
      </div>
    );
  }

  return null;
}
