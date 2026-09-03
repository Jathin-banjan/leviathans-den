// Web Audio & MP3 Audio Engine for Leviathan's Den Intro Sequence

const INTRO_MUSIC_PATH = "/audio/leviathan-intro.mp3";

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.initialized = false;
    this.audioElement = null;
    this.ambientNodes = [];
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Configurable MP3 Audio Element
      this.audioElement = new Audio();
      this.audioElement.src = INTRO_MUSIC_PATH;
      this.audioElement.loop = true;
      this.audioElement.volume = 0.65;

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
        // Fallback to synthetic Web Audio API synth if MP3 is pending or blocked
        this.playScene1Rumble();
      });
    } else {
      this.playScene1Rumble();
    }
  }

  stopIntroTrack() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
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

  // Web Audio Synth Fallbacks
  playScene1Rumble() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(35, t);
    subOsc.frequency.exponentialRampToValueAtTime(45, t + 3.0);

    subGain.gain.setValueAtTime(0.01, t);
    subGain.gain.linearRampToValueAtTime(0.5, t + 1.5);
    subGain.gain.linearRampToValueAtTime(0.3, t + 3.0);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(t);
    subOsc.stop(t + 3.2);
  }

  playScene2RisingTension() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 2.0);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 1.5);
    gain.gain.linearRampToValueAtTime(0.05, t + 2.0);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 2.1);
  }

  playEyeActivationSFX() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;
    const chimeOsc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(880, t);
    chimeOsc.frequency.exponentialRampToValueAtTime(1760, t + 0.3);
    chimeOsc.frequency.exponentialRampToValueAtTime(440, t + 1.2);

    chimeGain.gain.setValueAtTime(0.01, t);
    chimeGain.gain.linearRampToValueAtTime(0.6, t + 0.1);
    chimeGain.gain.exponentialRampToValueAtTime(0.01, t + 1.3);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    chimeOsc.start(t);
    chimeOsc.stop(t + 1.4);
  }

  playCrowWhooshSFX() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 1.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();

    noiseGain.gain.setValueAtTime(0.01, t);
    noiseGain.gain.linearRampToValueAtTime(0.3, t + 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);

    noise.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 1.2);
  }

  playTitleImpactSFX() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, t);
    subOsc.frequency.exponentialRampToValueAtTime(25, t + 1.2);

    subGain.gain.setValueAtTime(0.8, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(t);
    subOsc.stop(t + 1.6);
  }
}

export const audioEngine = new SoundEngine();
