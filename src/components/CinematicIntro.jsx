import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, RotateCcw, Play, Sparkles } from 'lucide-react';
import CrowVortexCanvas from './CrowVortexCanvas';
import EyeTransformation from './EyeTransformation';
import { audioEngine } from '../utils/audioEngine';

export default function CinematicIntro({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [sceneStep, setSceneStep] = useState(1); // 1 to 5
  const [progress, setProgress] = useState(0); // 0.0 to 1.0 overall progress
  const [isMuted, setIsMuted] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');

  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Keyboard ENTER listener to start intro
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !hasStarted) {
        startCinematicExperience();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted]);

  // GSAP 50-Second Sequence Timeline
  const startCinematicExperience = () => {
    setHasStarted(true);
    audioEngine.init();
    audioEngine.playScene1Rumble();

    const tl = gsap.timeline({
      onUpdate: () => {
        if (tl) {
          const currentProg = tl.progress();
          setProgress(currentProg);

          // 5 Script Steps mapped across 50 seconds
          if (currentProg < 0.20) {
            setSceneStep(1); // 0s – 10s: Two Sharingan eyes rolling in dark void
          } else if (currentProg >= 0.20 && currentProg < 0.44) {
            setSceneStep(2); // 10s – 22s: Full picture reveal of character face & throne -> fade out
          } else if (currentProg >= 0.44 && currentProg < 0.68) {
            setSceneStep(3); // 22s – 34s: Big Sharingan rolling & expanding to full screen -> red flames
          } else {
            setSceneStep(4); // 34s – 50s: Fiery flame letter typing for IT MANAGER & WELCOME TO LEVIATHAN DEN
          }
        }
      },
      onComplete: () => {
        // Step 5 (50s): Smooth transition into main web application
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.0,
          ease: "power2.inOut",
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    timelineRef.current = tl;

    // Timeline Duration Cues (Total: 50 seconds)
    tl.to({}, { duration: 10 }) // Step 1 (0s-10s)
      .to({}, { duration: 12 }) // Step 2 (10s-22s)
      .call(() => audioEngine.playSharinganExplosionSFX())
      .to({}, { duration: 12 }) // Step 3 (22s-34s)
      .to({}, { duration: 16 }); // Step 4 (34s-50s)
  };

  // Step 4 (34s to 50s): Fiery Flame Letter-by-Letter Drawing Animation
  useEffect(() => {
    if (sceneStep === 4) {
      const titleText = "IT MANAGER";
      const subText = "WELCOME TO LEVIATHAN DEN";
      let charIdx = 0;
      let subIdx = 0;

      const titleInterval = setInterval(() => {
        if (charIdx <= titleText.length) {
          setTypedTitle(titleText.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(titleInterval);
          const subInterval = setInterval(() => {
            if (subIdx <= subText.length) {
              setTypedSubtitle(subText.slice(0, subIdx));
              subIdx++;
            } else {
              clearInterval(subInterval);
            }
          }, 80);
        }
      }, 150);

      return () => {
        clearInterval(titleInterval);
      };
    }
  }, [sceneStep]);

  const handleToggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleReplay = () => {
    if (timelineRef.current) {
      setTypedTitle('');
      setTypedSubtitle('');
      timelineRef.current.restart();
      gsap.to(containerRef.current, { opacity: 1, duration: 0.3 });
    } else {
      startCinematicExperience();
    }
  };

  // Step 2 Full Picture Character & Face Reveal opacity (10s-22s)
  const getCharacterOpacityStyle = () => {
    if (sceneStep !== 2) return { opacity: 0 };
    // 10s to 22s (progress 0.20 to 0.44)
    // 10s-17s: Full reveal; 17s-22s: Fade out and vanish
    const norm = (progress - 0.20) / 0.24;
    let opacity = 0;
    if (norm < 0.6) {
      opacity = norm * 1.66; // Smooth reveal to full opacity
    } else {
      opacity = (1 - norm) * 2.5; // Smooth vanish back to darkness
    }
    return { opacity: Math.max(0, Math.min(1, opacity)) };
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-white overflow-hidden flex items-center justify-center select-none"
    >
      {/* 3D WebGL Red Flame Atmosphere */}
      <CrowVortexCanvas scenePhase={sceneStep} progress={progress} />

      {/* Control Toolbar */}
      <div className="absolute top-6 right-6 z-40 flex items-center space-x-3">
        <button
          onClick={handleToggleSound}
          className="p-3 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-300 hover:text-white hover:border-crimson-500 transition-all backdrop-blur"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-crimson-500" />}
        </button>

        {hasStarted && (
          <button
            onClick={handleReplay}
            className="p-3 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-300 hover:text-white hover:border-crimson-500 transition-all backdrop-blur"
            title="Replay 50s Sequence"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* START PROMPT OVERLAY */}
      {!hasStarted && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-crimson-950 border border-crimson-700 flex items-center justify-center mx-auto shadow-[0_0_30px_#dc2626]">
              <Sparkles className="w-8 h-8 text-crimson-500 animate-pulse" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-crimson-500 uppercase block mb-1">
                SEMAPHORE FEST PRESENTS
              </span>
              <h1 className="font-display font-black text-4xl text-white tracking-tight uppercase">
                LEVIATHAN'S DEN
              </h1>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed">
              PRESS <kbd className="px-2 py-1 rounded bg-stone-900 border border-crimson-700 font-mono text-crimson-400">ENTER</kbd> KEY TO BEGIN INTRO
            </p>

            <button
              onClick={startCinematicExperience}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-700 text-white font-extrabold text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:brightness-125 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>ENTER THE DEN</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 1 & STEP 3: SHARINGAN OVERLAYS (Two Sharingan in Step 1) */}
      {hasStarted && (
        <EyeTransformation active={sceneStep === 1 || sceneStep === 3} progress={progress} phase={sceneStep} />
      )}

      {/* STEP 2 (10s – 22s): FULL PICTURE CHARACTER & FACE REVEAL THEN FADES & VANISHES */}
      {hasStarted && sceneStep === 2 && (
        <div 
          className="relative w-full h-full flex items-center justify-center transition-opacity duration-300"
          style={getCharacterOpacityStyle()}
        >
          <div className="relative w-full max-w-4xl h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl">
            <img 
              src="/assets/character.jpg" 
              alt="Leviathan Throne Character"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 opacity-70" />
            <div 
              className="absolute inset-0 mix-blend-soft-light animate-pulse pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.6) 0%, transparent 70%)' }}
            />
            <div className="absolute bottom-6 right-6 z-30 p-2.5 rounded-xl bg-black/90 border border-crimson-800/80 flex items-center space-x-2 backdrop-blur shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <div className="w-6 h-6 rounded-lg bg-crimson-950 border border-crimson-600 flex items-center justify-center font-display font-black text-crimson-500 text-xs">
                L
              </div>
              <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase">
                LEVIATHAN
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4 (34s – 50s): DARK SCREEN WITH RED FLAMES & FIERY LETTER TYPING TITLE */}
      {hasStarted && sceneStep === 4 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center p-4 bg-black">
          {/* Realistic Red Flame Atmosphere Backdrop */}
          <div 
            className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.6) 0%, rgba(153, 27, 27, 0.4) 50%, #000 85%)'
            }}
          />

          <div className="relative z-10">
            <h1 
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-crimson-600 to-red-950 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
              style={{
                WebkitTextStroke: '1px rgba(220, 38, 38, 0.8)',
                filter: 'drop-shadow(0 0 30px rgba(220, 38, 38, 0.8))'
              }}
            >
              {typedTitle}
              <span className="animate-pulse text-crimson-500">|</span>
            </h1>
            <div className="absolute -inset-6 bg-crimson-600/30 blur-3xl -z-10 rounded-full animate-pulse" />
          </div>

          {typedSubtitle && (
            <div className="mt-8 relative z-10 animate-in fade-in duration-500">
              <span className="font-cinematic font-bold text-lg sm:text-2xl md:text-3xl text-stone-200 tracking-[0.3em] uppercase block drop-shadow-[0_0_20px_#dc2626]">
                {typedSubtitle}
              </span>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-crimson-600 to-transparent mx-auto mt-4" />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
