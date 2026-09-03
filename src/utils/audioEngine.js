// Web Audio & Looping Akatsuki Theme Music Engine

const INTRO_MUSIC_PATH = "/audio/akatsuki-theme.mp3";

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.initialized = false;
    this.audioElement = null;
    this.synthLoopInterval = null;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Akatsuki Theme Looping MP3 Audio Element
      this.audioElement = new Audio();
      this.audioElement.src = INTRO_MUSIC_PATH;
      this.audioElement.loop = true;
      this.audioElement.volume = 0.7;

      this.initialized = true;
    } catch (e) {
      console.warn("AudioContext not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playIntroTrack() {
    this.init();
    this.resume();
    if (this.audioElement && !this.isMuted) {
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch(() => {
        // Fallback to Akatsuki Synthetic Looper if MP3 is pending
        this.startAkatsukiSynthLoop();
      });
    } else {
      this.startAkatsukiSynthLoop();
    }
  }

  stopIntroTrack() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.stopAkatsukiSynthLoop();
  }

  setMute(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.75, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
  }

  toggleMute() {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  // Akatsuki Theme Looper Synthesizer (Ominous Choir + Gong Pulse + Bass Drone)
  startAkatsukiSynthLoop() {
    if (!this.ctx || this.synthLoopInterval || this.isMuted) return;
    this.resume();

    const triggerAkatsukiChords = () => {
      if (this.isMuted || !this.ctx) return;
      const t = this.ctx.currentTime;

      // Dark Minor Chord Drone (A Minor / C Ominous Choir)
      [110, 130.81, 164.81, 220].forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 1.0);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 3.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 4.0);
      });

      // Japanese Taiko/Gong Sub Pulse
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(80, t);
      kickOsc.frequency.exponentialRampToValueAtTime(30, t + 0.8);

      kickGain.gain.setValueAtTime(0.7, t);
      kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain);

      kickOsc.start(t);
      kickOsc.stop(t + 0.95);
    };

    triggerAkatsukiChords();
    this.synthLoopInterval = setInterval(triggerAkatsukiChords, 4000);
  }

  stopAkatsukiSynthLoop() {
    if (this.synthLoopInterval) {
      clearInterval(this.synthLoopInterval);
      this.synthLoopInterval = null;
    }
  }

  // Cinematic SFX Triggers
  playScene1Rumble() { this.playIntroTrack(); }
  playScene2RisingTension() {}
  playEyeActivationSFX() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;
    const chimeOsc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(880, t);
    chimeOsc.frequency.exponentialRampToValueAtTime(1760, t + 0.3);

    chimeGain.gain.setValueAtTime(0.01, t);
    chimeGain.gain.linearRampToValueAtTime(0.5, t + 0.1);
    chimeGain.gain.exponentialRampToValueAtTime(0.01, t + 1.0);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    chimeOsc.start(t);
    chimeOsc.stop(t + 1.1);
  }
  playCrowWhooshSFX() {}
  playTitleImpactSFX() {}
}

export const audioEngine = new SoundEngine();
