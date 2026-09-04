import React from 'react';

export default function EyeTransformation({ active, progress, phase }) {
  if (!active && phase !== 2 && phase !== 4 && phase !== 5) return null;

  const SHARINGAN_IMG = "/assets/sharingan_reference.png";

  // Phase 2 (3s-8s): Exact Sharingan eye materializes in dark Genjutsu void
  if (phase === 2) {
    const norm = Math.max(0, Math.min(1, (progress - 0.06) / 0.1));
    const rotation = norm * 360 * 2;
    return (
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center bg-black/95">
        {/* Electric Red Chakra Lightning Background Overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.5) 0%, transparent 70%)'
          }}
        />

        <div className="flex items-center space-x-12 sm:space-x-20 scale-125 sm:scale-150 transition-all duration-700">
          {[0, 1].map((idx) => (
            <div key={idx} className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-[0_0_60px_#dc2626]">
              {/* Electric Aura Ring */}
              <div className="absolute -inset-3 rounded-full bg-crimson-600/30 blur-md animate-pulse" />
              
              {/* Exact Uploaded Sharingan Reference Image */}
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

  // Phase 4 (18s-30s): Sharingan superimposed over character eyes with crows flying
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

            {/* Left Eye Sharingan Overlay */}
            <div className="absolute z-30 w-9 h-9 rounded-full flex items-center justify-center" style={{ left: '43.5%', top: '31.2%', transform: 'translate(-50%, -50%)' }}>
              <img 
                src={SHARINGAN_IMG}
                alt="Left Sharingan"
                className="w-full h-full object-contain rounded-full shadow-[0_0_15px_#dc2626]"
                style={{ transform: `rotate(${tomoeRotation}deg)` }}
              />
            </div>

            {/* Right Eye Sharingan Overlay */}
            <div className="absolute z-30 w-9 h-9 rounded-full flex items-center justify-center" style={{ left: '56.5%', top: '31.2%', transform: 'translate(-50%, -50%)' }}>
              <img 
                src={SHARINGAN_IMG}
                alt="Right Sharingan"
                className="w-full h-full object-contain rounded-full shadow-[0_0_15px_#dc2626]"
                style={{ transform: `rotate(${tomoeRotation}deg)` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 5 (30s-40s): Massive Expansion of Exact Uploaded Sharingan Image & Red Flame Shockwave
  if (phase === 5) {
    const localProg = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));
    const scaleVal = 1 + localProg * 9; // Massive expansion filling screen
    const isExploding = localProg > 0.65;

    return (
      <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden bg-black/95">
        {/* Genjutsu Electric Red Backdrop Distortion Waves */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
          style={{
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.7) 0%, rgba(153, 27, 27, 0.5) 45%, #000 85%)'
          }}
        />

        {/* Massive Expanding Sharingan Reference Image */}
        <div 
          className="relative w-64 h-64 sm:w-96 sm:h-96 rounded-full flex items-center justify-center transition-transform duration-100 ease-out drop-shadow-[0_0_100px_#dc2626]"
          style={{ transform: `scale(${scaleVal}) rotate(${localProg * 720}deg)` }}
        >
          <img 
            src={SHARINGAN_IMG}
            alt="Expanding Sharingan"
            className="w-full h-full object-contain rounded-full filter contrast-125 brightness-125"
          />
        </div>

        {/* Realistic Red Flame Shockwave Explosion */}
        {isExploding && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-crimson-600/95 to-red-800/90 animate-ping z-50 flex items-center justify-center mix-blend-screen">
            <div className="w-[800px] h-[800px] rounded-full border-8 border-red-500 blur-sm animate-pulse" />
          </div>
        )}
      </div>
    );
  }

  return null;
}
