import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, RotateCcw, Play, Sparkles } from 'lucide-react';
import CrowVortexCanvas from './CrowVortexCanvas';
import EyeTransformation from './EyeTransformation';
import { audioEngine } from '../utils/audioEngine';

export default function CinematicIntro({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [scenePhase, setScenePhase] = useState(1); // 1 to 6
  const [progress, setProgress] = useState(0); // 0.0 to 1.0 overall progress
  const [isMuted, setIsMuted] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');

  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Script timing configuration (Total duration: 50 seconds)
  // Phase 1 (0s-3s): Dark screen (3s)
  // Phase 2 (3s-8s): Sharingan eyes in dark void (5s)
  // Phase 3 (8s-18s): Character image fades in with massive red flames (10s)
  // Phase 4 (18s-30s): Sharingan re-appears + crows fly (12s)
  // Phase 5 (30s-40s): Sharingan expands massively & explodes into red flames (10s)
  // Phase 6 (40s-50s): Fiery flame typing animation for IT MANAGER & LEVIATHAN'S DEN (10s)

  const startCinematicExperience = () => {
    setHasStarted(true);
    audioEngine.init();
    audioEngine.playScene1Rumble();

    const tl = gsap.timeline({
      onUpdate: () => {
        if (tl) {
          const currentProg = tl.progress();
          setProgress(currentProg);

          // Map 50s timeline progress (0.0 to 1.0) to Script Phases
          if (currentProg < 0.06) {
            setScenePhase(1); // 0s - 3s (Dark screen)
          } else if (currentProg >= 0.06 && currentProg < 0.16) {
            setScenePhase(2); // 3s - 8s (Sharingan in darkness)
          } else if (currentProg >= 0.16 && currentProg < 0.36) {
            setScenePhase(3); // 8s - 18s (Character image + massive red flames)
          } else if (currentProg >= 0.36 && currentProg < 0.60) {
            setScenePhase(4); // 18s - 30s (Sharingan + crow flock)
          } else if (currentProg >= 0.60 && currentProg < 0.80) {
            setScenePhase(5); // 30s - 40s (Sharingan explosion)
          } else {
            setScenePhase(6); // 40s - 50s (Red flame typing letters)
          }
        }
      },
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    timelineRef.current = tl;

    // GSAP Keyframe Timings (Total: 50 seconds)
    tl.to({}, { duration: 3 }) // 0-3s (Phase 1)
      .call(() => audioEngine.playEyeActivationSFX())
      .to({}, { duration: 5 }) // 3-8s (Phase 2)
      .to({}, { duration: 10 }) // 8-18s (Phase 3)
      .call(() => audioEngine.playCrowWhooshSFX())
      .to({}, { duration: 12 }) // 18-30s (Phase 4)
      .call(() => audioEngine.playSharinganExplosionSFX())
      .to({}, { duration: 10 }) // 30-40s (Phase 5)
      .to({}, { duration: 10 }); // 40-50s (Phase 6)
  };

  // Phase 6 Fiery Flame Typing Letter Animation Trigger (40s to 50s)
  useEffect(() => {
    if (scenePhase === 6) {
      const titleText = "IT MANAGER";
      const subText = "WELCOME TO LEVIATHAN'S DEN";
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
          }, 70);
        }
      }, 120);

      return () => {
        clearInterval(titleInterval);
      };
    }
  }, [scenePhase]);

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

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-white overflow-hidden flex items-center justify-center select-none"
    >
      {/* 3D WebGL Crow & Red Flame Particle Atmosphere Overlay */}
      <CrowVortexCanvas scenePhase={scenePhase} progress={progress} />

      {/* Control Toolbar (Sound ON/OFF & Replay) */}
      <div className="absolute top-6 right-6 z-40 flex items-center space-x-3">
        <button
          onClick={handleToggleSound}
          className="p-3 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-300 hover:text-white hover:border-crimson-500 hover:bg-crimson-950/60 transition-all backdrop-blur"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-crimson-500" />}
        </button>

        {hasStarted && (
          <button
            onClick={handleReplay}
            className="p-3 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-300 hover:text-white hover:border-crimson-500 hover:bg-crimson-950/60 transition-all backdrop-blur"
            title="Replay 50s Sequence"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* START PROMPT OVERLAY */}
      {!hasStarted && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
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
              Experience the 50-second cinematic opening sequence for the IT Manager Championship.
            </p>

            <button
              onClick={startCinematicExperience}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-700 text-white font-extrabold text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:brightness-125 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>ENTER THE DEN (50S INTRO)</span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 1: DARK SCREEN (0s - 3s) */}
      {hasStarted && scenePhase === 1 && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-crimson-600 animate-ping opacity-75" />
        </div>
      )}

      {/* PHASE 2, 4, 5: SHARINGAN TRANSFORMATION OVERLAYS */}
      {hasStarted && (
        <EyeTransformation active={scenePhase === 2 || scenePhase === 4 || scenePhase === 5} progress={progress} phase={scenePhase} />
      )}

      {/* PHASE 3 & 4: CHARACTER IMAGE APPEARS WITH MASSIVE RED FLAMES (8s - 30s) */}
      {hasStarted && (scenePhase === 3 || scenePhase === 4) && (
        <div className="relative w-full h-full flex items-center justify-center animate-in fade-in duration-1000">
          <div className="relative w-full max-w-4xl h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl">
            <img 
              src="/assets/character.jpg" 
              alt="Leviathan Throne Character"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
            />
            {/* Massive Red Flame Rim Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 opacity-70" />
            <div 
              className="absolute inset-0 mix-blend-soft-light animate-pulse pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.6) 0%, transparent 70%)'
              }}
            />
            {/* Leviathan Emblem */}
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

      {/* PHASE 6: RED FLAME TYPING LETTER ANIMATION (40s - 50s) */}
      {hasStarted && scenePhase === 6 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative">
            <h1 
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-crimson-600 to-red-950 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
              style={{
                WebkitTextStroke: '1px rgba(220, 38, 38, 0.8)',
                filter: 'drop-shadow(0 0 25px rgba(220, 38, 38, 0.7))'
              }}
            >
              {typedTitle}
              <span className="animate-pulse text-crimson-500">|</span>
            </h1>
            <div className="absolute -inset-6 bg-crimson-600/30 blur-3xl -z-10 rounded-full animate-pulse" />
          </div>

          {typedSubtitle && (
            <div className="mt-8 animate-in fade-in duration-500">
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
