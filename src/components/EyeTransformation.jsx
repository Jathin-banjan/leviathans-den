import React from 'react';

export default function EyeTransformation({ active, progress }) {
  if (!active) return null;

  // Calculate local progress (0 to 1) within Scene 3 window (approx 0.42 to 0.54 overall timeline)
  const normProgress = Math.max(0, Math.min(1, (progress - 0.42) / 0.12));

  // Sequence phases:
  // 0 - 0.25: Normal eyes with subtle red backlight
  // 0.25 - 0.55: Subtle red glow -> Crimson iris activation
  // 0.55 - 1.0: Three-Tomoe pattern rotation & fiery crimson flare

  const redGlowOpacity = Math.max(0, (normProgress - 0.2) / 0.8);
  const tomoeOpacity = Math.max(0, (normProgress - 0.5) / 0.5);
  const tomoeRotation = normProgress * 360 * 2; // 2 full rotations

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Dark Vignette Overlay */}
      <div 
        className="absolute inset-0 bg-radial-vignette opacity-80"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(9, 9, 11, 0.95) 85%)'
        }}
      />

      {/* Dramatic Facial Crop Container with Zoom-in */}
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `scale(${1 + normProgress * 0.45}) translate(0px, ${-normProgress * 50}px)`
        }}
      >
        {/* Character Face Image */}
        <div className="relative w-[500px] md:w-[650px] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src="/assets/character.jpg" 
            alt="Character Face" 
            className="w-full h-full object-cover object-top filter contrast-110 brightness-90"
            style={{
              objectPosition: '50% 18%' // Focus exactly on character face and eyes
            }}
          />

          {/* Crimson Facial Reflection & Aura Overlay */}
          <div 
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none mix-blend-soft-light"
            style={{
              background: `radial-gradient(circle at 50% 32%, rgba(220, 38, 38, ${redGlowOpacity * 0.85}) 0%, transparent 60%)`,
              opacity: redGlowOpacity
            }}
          />

          {/* EYE transformation overlays for LEFT and RIGHT eyes */}
          {/* Left Eye Container */}
          <div 
            className="absolute z-30 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              left: '43.5%',
              top: '31.2%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Red Glow Base */}
            <div 
              className="absolute inset-0 rounded-full bg-crimson-600 blur-[2px] transition-opacity"
              style={{ opacity: redGlowOpacity }}
            />

            {/* Crimson Iris */}
            <div 
              className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-red-600 via-crimson-600 to-red-800 border border-red-400 shadow-[0_0_12px_#dc2626]"
              style={{ opacity: redGlowOpacity }}
            >
              {/* Three-Tomoe Pattern SVG */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full text-black transition-opacity"
                style={{ 
                  opacity: tomoeOpacity,
                  transform: `rotate(${tomoeRotation}deg)`
                }}
              >
                <circle cx="50" cy="50" r="16" fill="black" />
                {/* 3 Tomoe Comma Swirls */}
                <g fill="black">
                  <path d="M 50 20 C 58 20 62 26 58 32 C 54 38 46 36 48 28 C 49 23 50 20 50 20 Z" />
                  <path d="M 24 65 C 28 58 36 58 38 66 C 40 74 32 78 28 72 C 25 68 24 65 24 65 Z" />
                  <path d="M 76 65 C 72 72 64 68 62 60 C 60 52 68 48 72 54 C 75 58 76 65 76 65 Z" />
                </g>
              </svg>
            </div>
          </div>

          {/* Right Eye Container */}
          <div 
            className="absolute z-30 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              left: '56.5%',
              top: '31.2%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Red Glow Base */}
            <div 
              className="absolute inset-0 rounded-full bg-crimson-600 blur-[2px] transition-opacity"
              style={{ opacity: redGlowOpacity }}
            />

            {/* Crimson Iris */}
            <div 
              className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-red-600 via-crimson-600 to-red-800 border border-red-400 shadow-[0_0_12px_#dc2626]"
              style={{ opacity: redGlowOpacity }}
            >
              {/* Three-Tomoe Pattern SVG */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full text-black transition-opacity"
                style={{ 
                  opacity: tomoeOpacity,
                  transform: `rotate(${tomoeRotation}deg)`
                }}
              >
                <circle cx="50" cy="50" r="16" fill="black" />
                {/* 3 Tomoe Comma Swirls */}
                <g fill="black">
                  <path d="M 50 20 C 58 20 62 26 58 32 C 54 38 46 36 48 28 C 49 23 50 20 50 20 Z" />
                  <path d="M 24 65 C 28 58 36 58 38 66 C 40 74 32 78 28 72 C 25 68 24 65 24 65 Z" />
                  <path d="M 76 65 C 72 72 64 68 62 60 C 60 52 68 48 72 54 C 76 58 76 65 76 65 Z" />
                </g>
              </svg>
            </div>
          </div>

          {/* Shockwave Crimson Flash Pulse at eye activation peak */}
          {normProgress > 0.6 && normProgress < 0.85 && (
            <div className="absolute inset-0 bg-crimson-600/30 animate-pulse pointer-events-none mix-blend-screen" />
          )}
        </div>
      </div>
    </div>
  );
}
