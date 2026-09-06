import React from 'react';

export default function EyeTransformation({ active, progress, phase }) {
  if (!active && phase !== 1 && phase !== 3) return null;

  const SHARINGAN_IMG = "/assets/sharingan_reference.png";

  // Step 1 (0s - 10s): Normal-speed rolling Sharingan in dark black screen
  if (phase === 1) {
    const norm = Math.max(0, Math.min(1, progress / 0.20)); // 0s - 10s progress
    const rotation = norm * 360 * 3; // Rolling at normal speed
    return (
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-black">
        <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full flex items-center justify-center shadow-[0_0_60px_#dc2626] animate-in fade-in duration-1000">
          <div className="absolute -inset-4 rounded-full bg-crimson-600/30 blur-md animate-pulse" />
          <img 
            src={SHARINGAN_IMG}
            alt="Rolling Sharingan"
            className="w-full h-full object-contain rounded-full filter contrast-125 brightness-110 drop-shadow-[0_0_20px_rgba(220,38,38,0.9)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      </div>
    );
  }

  // Step 3 (22s - 34s): Big-Size Sharingan appears, rolls, and expands to cover full screen
  if (phase === 3) {
    const norm = Math.max(0, Math.min(1, (progress - 0.44) / 0.24)); // 22s - 34s progress
    const scaleVal = 1 + norm * 12; // Expands massively to cover screen
    const rotation = norm * 720;
    const isFullCover = norm > 0.75;

    return (
      <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="relative w-64 h-64 sm:w-96 sm:h-96 rounded-full flex items-center justify-center transition-transform duration-100 ease-out shadow-[0_0_120px_#dc2626]"
          style={{ transform: `scale(${scaleVal}) rotate(${rotation}deg)` }}
        >
          <img 
            src={SHARINGAN_IMG}
            alt="Big Expanding Sharingan"
            className="w-full h-full object-contain rounded-full filter contrast-125 brightness-120"
          />
        </div>

        {/* Transition into Dark Screen with Red Flames */}
        {isFullCover && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-crimson-600/95 to-red-900/90 animate-fade-in z-50 mix-blend-screen" />
        )}
      </div>
    );
  }

  return null;
}
