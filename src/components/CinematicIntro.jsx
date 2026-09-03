import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, RotateCcw, Play, Sparkles, Shield } from 'lucide-react';
import CrowVortexCanvas from './CrowVortexCanvas';
import EyeTransformation from './EyeTransformation';
import { audioEngine } from '../utils/audioEngine';

export default function CinematicIntro({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [scenePhase, setScenePhase] = useState(1); // 1 to 7
  const [progress, setProgress] = useState(0); // 0.0 to 1.0 overall progress
  const [isMuted, setIsMuted] = useState(false);
  const [showEyeCloseUp, setShowEyeCloseUp] = useState(false);
  const [bodyDisintegrating, setBodyDisintegrating] = useState(false);

  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Initialize GSAP Timeline for the 12-second sequence
  const startCinematicExperience = () => {
    setHasStarted(true);
    audioEngine.init();
    audioEngine.playScene1Rumble();

    const tl = gsap.timeline({
      onUpdate: () => {
        if (tl) {
          const currentProg = tl.progress();
          setProgress(currentProg);

          // Update Scene Phases based on elapsed percentage (12 seconds total)
          if (currentProg < 0.25) {
            setScenePhase(1); // 0 - 3s
            setShowEyeCloseUp(false);
            setBodyDisintegrating(false);
          } else if (currentProg >= 0.25 && currentProg < 0.42) {
            setScenePhase(2); // 3 - 5s
            setShowEyeCloseUp(false);
            setBodyDisintegrating(false);
          } else if (currentProg >= 0.42 && currentProg < 0.54) {
            setScenePhase(3); // 5 - 6.5s
            setShowEyeCloseUp(true);
            setBodyDisintegrating(false);
          } else if (currentProg >= 0.54 && currentProg < 0.75) {
            setScenePhase(4); // 6.5 - 9.5s
            setShowEyeCloseUp(false);
            setBodyDisintegrating(true);
          } else if (currentProg >= 0.75 && currentProg < 0.83) {
            setScenePhase(5); // 9 - 10s
            setShowEyeCloseUp(false);
            setBodyDisintegrating(true);
          } else if (currentProg >= 0.83 && currentProg < 0.92) {
            setScenePhase(6); // 10 - 11s
            setShowEyeCloseUp(false);
          } else {
            setScenePhase(7); // 11 - 12s
          }
        }
      },
      onComplete: () => {
        // Smooth fade transition into Home Page after sequence finishes
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

    // Timeline Cues and Sound FX triggers (Total duration: 12 seconds)
    tl.to({}, { duration: 3 }) // Scene 1 (0-3s)
      .call(() => audioEngine.playScene2RisingTension())
      .to({}, { duration: 2 }) // Scene 2 (3-5s)
      .call(() => audioEngine.playEyeActivationSFX())
      .to({}, { duration: 1.5 }) // Scene 3 (5-6.5s)
      .call(() => audioEngine.playCrowWhooshSFX())
      .to({}, { duration: 2.5 }) // Scene 4 (6.5-9s)
      .to({}, { duration: 1 }) // Scene 5 (9-10s)
      .call(() => audioEngine.playTitleImpactSFX())
      .to({}, { duration: 1 }) // Scene 6 (10-11s)
      .to({}, { duration: 1.0 }); // Scene 7 (11-12s)
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

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-white overflow-hidden flex items-center justify-center select-none"
    >
      {/* 3D WebGL Crow & Particle Atmosphere Overlay */}
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
            title="Replay Cinematic Sequence"
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
              Experience the cinematic opening sequence for the IT Manager Championship.
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

      {/* SCENE 1 & 2: CHARACTER & STONE THRONE STAGE */}
      {hasStarted && !showEyeCloseUp && (
        <div 
          className={`relative w-full h-full flex items-center justify-center transition-opacity duration-700 ${
            bodyDisintegrating ? 'opacity-0 scale-95 blur-sm transition-all duration-1000' : 'opacity-100'
          }`}
        >
          {/* Stone Throne & Background Image */}
          <div 
            className="relative w-full max-w-4xl h-[90vh] flex items-center justify-center transition-transform duration-100 ease-out overflow-hidden rounded-3xl"
            style={{
              transform: scenePhase === 1 
                ? `scale(${1 + progress * 0.3})` 
                : scenePhase === 2 
                ? `scale(1.08) translateY(${- (progress - 0.25) * 60}px)`
                : `scale(1.15)`
            }}
          >
            {/* Throne Wall Background Image */}
            <img 
              src="/assets/character.jpg" 
              alt="Leviathan Throne Character"
              className={`w-full h-full object-cover object-center filter contrast-105 brightness-95 transition-all duration-700 ${
                scenePhase === 2 ? 'translate-y-[-10px]' : ''
              }`}
            />

            {/* Custom Leviathan Crimson Emblem Overlay on Bottom Right */}
            <div className="absolute bottom-6 right-6 z-30 p-2.5 rounded-xl bg-black/90 border border-crimson-800/80 flex items-center space-x-2 backdrop-blur shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <div className="w-6 h-6 rounded-lg bg-crimson-950 border border-crimson-600 flex items-center justify-center font-display font-black text-crimson-500 text-xs">
                L
              </div>
              <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase">
                LEVIATHAN
              </span>
            </div>

            {/* Ambient Dark Fog Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 opacity-70" />
            <div 
              className="absolute inset-0 transition-opacity duration-1000 pointer-events-none mix-blend-soft-light"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.4) 0%, transparent 70%)'
              }}
            />
          </div>
        </div>
      )}

      {/* SCENE 3: DRAMATIC EYE TRANSFORMATION */}
      {hasStarted && (
        <EyeTransformation active={showEyeCloseUp} progress={progress} />
      )}

      {/* SCENE 6 & 7: METALLIC 3D TITLE */}
      {hasStarted && (scenePhase === 6 || scenePhase === 7) && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          
          <div className="relative animate-in fade-in zoom-in-90 duration-700">
            <h1 
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-crimson-600 to-red-950 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
              style={{
                WebkitTextStroke: '1px rgba(220, 38, 38, 0.8)',
                filter: 'drop-shadow(0 0 25px rgba(220, 38, 38, 0.7))'
              }}
            >
              IT MANAGER
            </h1>
            <div className="absolute -inset-4 bg-crimson-600/20 blur-3xl -z-10 rounded-full animate-pulse" />
          </div>

          {scenePhase === 7 && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="font-cinematic font-bold text-lg sm:text-2xl md:text-3xl text-stone-300 tracking-[0.3em] uppercase block drop-shadow-[0_0_15px_#dc2626]">
                WELCOME TO LEVIATHAN'S DEN
              </span>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-crimson-600 to-transparent mx-auto mt-4" />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
