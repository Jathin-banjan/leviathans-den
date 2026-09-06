// Web Audio & YouTube Track Engine (0:57 to 1:41 Looping)

const INTRO_MUSIC_PATH = "/audio/akatsuki-theme.webm";
const LOOP_START_TIME = 57.0; // 0:57
const LOOP_END_TIME = 101.0;  // 1:41

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
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // YouTube Audio Track Element (0:57 to 1:41 Looping)
      this.audioElement = new Audio();
      this.audioElement.src = INTRO_MUSIC_PATH;
      this.audioElement.loop = false; // Custom loop boundary listener
      this.audioElement.volume = 0.8;

      // Real-time timeupdate listener for precise 0:57 to 1:41 looping
      this.audioElement.addEventListener("timeupdate", () => {
        if (!this.audioElement) return;
        if (this.audioElement.currentTime >= LOOP_END_TIME || this.audioElement.currentTime < LOOP_START_TIME - 0.5) {
          this.audioElement.currentTime = LOOP_START_TIME;
        }
      });

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
      this.audioElement.currentTime = LOOP_START_TIME;
      this.audioElement.play().catch(() => {
        // Fallback to Akatsuki Synthetic Looper if MP3/WebM auto-play is blocked
        this.startAkatsukiSynthLoop();
      });
    } else {
      this.startAkatsukiSynthLoop();
    }
  }

  stopIntroTrack() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = LOOP_START_TIME;
    }
    this.stopAkatsukiSynthLoop();
  }

  setMute(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
  }

  toggleMute() {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  // Akatsuki Theme Looper Synthesizer Fallback
  startAkatsukiSynthLoop() {
    if (!this.ctx || this.synthLoopInterval || this.isMuted) return;
    this.resume();

    const triggerAkatsukiChords = () => {
      if (this.isMuted || !this.ctx) return;
      const t = this.ctx.currentTime;

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

  // SFX Triggers
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

  playSharinganExplosionSFX() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, t);
    subOsc.frequency.exponentialRampToValueAtTime(25, t + 1.5);

    subGain.gain.setValueAtTime(1.0, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(t);
    subOsc.stop(t + 1.65);
  }

  playCrowWhooshSFX() {}
  playTitleImpactSFX() {}
}

export const audioEngine = new SoundEngine();
