import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, RotateCcw, Play, Sparkles } from 'lucide-react';
import CrowVortexCanvas from './CrowVortexCanvas';
import EyeTransformation from './EyeTransformation';
import { audioEngine } from '../utils/audioEngine';

export default function CinematicIntro({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [scenePhase, setScenePhase] = useState(1); // 1 to 10
  const [progress, setProgress] = useState(0); // 0.0 to 1.0 overall progress
  const [isMuted, setIsMuted] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);

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
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 400);

    audioEngine.init();
    audioEngine.playScene1Rumble();

    const tl = gsap.timeline({
      onUpdate: () => {
        if (tl) {
          const currentProg = tl.progress();
          setProgress(currentProg);

          // 10 Timeline Phases corresponding to exact 50s Script
          if (currentProg < 0.06) {
            setScenePhase(1); // 0–3s: Complete darkness
          } else if (currentProg >= 0.06 && currentProg < 0.16) {
            setScenePhase(2); // 3–8s: Sharingan in darkness
          } else if (currentProg >= 0.16 && currentProg < 0.32) {
            setScenePhase(3); // 8–16s: Red flame outline trace (head->body)
          } else if (currentProg >= 0.32 && currentProg < 0.50) {
            setScenePhase(4); // 16–25s: Progressive character reveal
          } else if (currentProg >= 0.50 && currentProg < 0.60) {
            setScenePhase(5); // 25–30s: Facial Sharingan eye reveal
          } else if (currentProg >= 0.60 && currentProg < 0.74) {
            setScenePhase(6); // 30–37s: Black crows flying
          } else if (currentProg >= 0.74 && currentProg < 0.86) {
            setScenePhase(7); // 37–43s: Cinematic power build-up
          } else if (currentProg >= 0.86 && currentProg < 0.94) {
            setScenePhase(8); // 43–47s: Final energy surge
          } else if (currentProg >= 0.94 && currentProg < 0.98) {
            setScenePhase(9); // 47–49s: Final quiet eye moment
          } else {
            setScenePhase(10); // 49–50s: Transition to website
          }
        }
      },
      onComplete: () => {
        // Smooth cinematic dissolve transition into existing web application
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
    tl.to({}, { duration: 3 }) // 0-3s
      .call(() => audioEngine.playEyeActivationSFX())
      .to({}, { duration: 5 }) // 3-8s
      .to({}, { duration: 8 }) // 8-16s
      .to({}, { duration: 9 }) // 16-25s
      .to({}, { duration: 5 }) // 25-30s
      .call(() => audioEngine.playCrowWhooshSFX())
      .to({}, { duration: 7 }) // 30-37s
      .to({}, { duration: 6 }) // 37-43s
      .call(() => audioEngine.playSharinganExplosionSFX())
      .to({}, { duration: 4 }) // 43-47s
      .to({}, { duration: 2 }) // 47-49s
      .to({}, { duration: 1 }); // 49-50s
  };

  const handleToggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleReplay = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
      gsap.to(containerRef.current, { opacity: 1, duration: 0.3 });
    } else {
      startCinematicExperience();
    }
  };

  // Progressive reveal height style for Phase 4 (16s-25s)
  const getRevealClipStyle = () => {
    if (scenePhase < 4) return { clipPath: 'inset(100% 0 0 0)' };
    if (scenePhase > 4) return { clipPath: 'inset(0% 0 0 0)' };

    // 16s to 25s (progress 0.32 to 0.50)
    const norm = (progress - 0.32) / 0.18;
    const insetVal = Math.max(0, (1 - norm) * 100);
    return { clipPath: `inset(${insetVal}% 0 0 0)` };
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-white overflow-hidden flex items-center justify-center select-none"
    >
      {/* 3D WebGL Crow & Particle Atmosphere Overlay */}
      <CrowVortexCanvas scenePhase={scenePhase} progress={progress} />

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

      {/* START PROMPT OVERLAY (0-3s Complete Darkness & ENTER Prompt) */}
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

      {/* PHASE 1: DARK SCREEN & Subtle Red Flash on ENTER */}
      {hasStarted && scenePhase === 1 && (
        <div className={`absolute inset-0 z-50 bg-black transition-colors duration-300 ${screenFlash ? 'bg-crimson-950/60' : 'bg-black'}`} />
      )}

      {/* SHARINGAN OVERLAY PHASES (Phase 2: 3-8s, Phase 5: 25-30s, Phase 9: 47-49s) */}
      {hasStarted && (
        <EyeTransformation active={scenePhase === 2 || scenePhase === 5 || scenePhase === 9} progress={progress} phase={scenePhase} />
      )}

      {/* PHASE 3 (8-16s): RED FLAME TRACING SILHOUETTE OUTLINE */}
      {hasStarted && scenePhase === 3 && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-black/90">
          <div className="relative w-[500px] md:w-[650px] aspect-[4/5] overflow-hidden rounded-2xl">
            {/* Glowing Red Flame Energy Silhouette Brush Trace */}
            <div 
              className="absolute inset-0 border-2 border-red-500/80 rounded-2xl shadow-[0_0_30px_#dc2626] animate-pulse"
              style={{
                background: 'radial-gradient(circle at 50% 25%, rgba(239, 68, 68, 0.4) 0%, transparent 60%)'
              }}
            />
          </div>
        </div>
      )}

      {/* PHASE 4 to 9 (16s-49s): CHARACTER IMAGE REVEAL & ENVIRONMENT LIGHTING */}
      {hasStarted && scenePhase >= 4 && scenePhase <= 9 && (
        <div className="relative w-full h-full flex items-center justify-center animate-in fade-in duration-1000">
          <div 
            className="relative w-full max-w-4xl h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl transition-all duration-700"
            style={getRevealClipStyle()}
          >
            {/* Original Throne Character Image (Unchanged) */}
            <img 
              src="/assets/character.jpg" 
              alt="Leviathan Throne Character"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
            />

            {/* Volumetric Red Lighting & Throne Reflections */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 opacity-70" />
            <div 
              className="absolute inset-0 mix-blend-soft-light animate-pulse pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.65) 0%, transparent 70%)'
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

      {/* PHASE 10 (49s-50s): DISSOLVE FADE TO WEB APPLICATION */}
      {hasStarted && scenePhase === 10 && (
        <div className="absolute inset-0 z-50 bg-black/90 animate-out fade-out duration-1000" />
      )}

    </div>
  );
}
