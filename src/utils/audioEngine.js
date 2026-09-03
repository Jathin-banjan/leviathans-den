// Web Audio API Synthesizer for Cinematic Sound Effects

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.initialized = false;
    this.ambientNodes = [];
  }

  init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.75, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  // Scene 1: 0-3s Deep atmospheric rumble & ambient drone
  playScene1Rumble() {
    if (!this.initialized || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;

    // Sub bass oscillator (35Hz)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    const subFilter = this.ctx.createBiquadFilter();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(35, t);
    subOsc.frequency.exponentialRampToValueAtTime(45, t + 3.0);

    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(80, t);

    subGain.gain.setValueAtTime(0.01, t);
    subGain.gain.linearRampToValueAtTime(0.5, t + 1.5);
    subGain.gain.linearRampToValueAtTime(0.3, t + 3.0);

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(t);
    subOsc.stop(t + 3.2);

    this.ambientNodes.push(subGain);
  }

  // Scene 2: 3-5s Slow rising cinematic tension sound
  playScene2RisingTension() {
    if (!this.initialized || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;

    // Sawtooth rising synth drone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 2.0);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, t);
    filter.frequency.exponentialRampToValueAtTime(600, t + 2.0);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 1.5);
    gain.gain.linearRampToValueAtTime(0.05, t + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 2.1);
  }

  // Scene 3: 5-6.5s Sharp supernatural eye activation sound (Sharingan / Tomoe chime)
  playEyeActivationSFX() {
    if (!this.initialized || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;

    // High harmonic chime string + bass sweep
    const chimeOsc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    const chimeFilter = this.ctx.createBiquadFilter();

    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(880, t); // A5
    chimeOsc.frequency.exponentialRampToValueAtTime(1760, t + 0.3); // High A6 pitch burst
    chimeOsc.frequency.exponentialRampToValueAtTime(440, t + 1.2);

    chimeFilter.type = 'bandpass';
    chimeFilter.frequency.setValueAtTime(1200, t);
    chimeFilter.Q.setValueAtTime(5, t);

    chimeGain.gain.setValueAtTime(0.01, t);
    chimeGain.gain.linearRampToValueAtTime(0.6, t + 0.1);
    chimeGain.gain.exponentialRampToValueAtTime(0.01, t + 1.3);

    chimeOsc.connect(chimeFilter);
    chimeFilter.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    chimeOsc.start(t);
    chimeOsc.stop(t + 1.4);

    // Deep resonant pulse
    const pulseOsc = this.ctx.createOscillator();
    const pulseGain = this.ctx.createGain();
    pulseOsc.type = 'triangle';
    pulseOsc.frequency.setValueAtTime(150, t);
    pulseOsc.frequency.exponentialRampToValueAtTime(50, t + 0.6);

    pulseGain.gain.setValueAtTime(0.5, t);
    pulseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);

    pulseOsc.connect(pulseGain);
    pulseGain.connect(this.masterGain);

    pulseOsc.start(t);
    pulseOsc.stop(t + 0.7);
  }

  // Scene 4 & 5: Crow wing flaps & dark whoosh spatial audio
  playCrowWhooshSFX() {
    if (!this.initialized || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;

    // White noise flutter for wings
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(400, t);
    noiseFilter.frequency.linearRampToValueAtTime(800, t + 0.8);
    noiseFilter.frequency.linearRampToValueAtTime(300, t + 1.5);
    noiseFilter.Q.setValueAtTime(3, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, t);
    noiseGain.gain.linearRampToValueAtTime(0.35, t + 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 1.5);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 1.5);
  }

  // Scene 6: 10s Deep cinematic impact when "IT MANAGER" title appears
  playTitleImpactSFX() {
    if (!this.initialized || this.isMuted) return;
    this.resume();
    const t = this.ctx.currentTime;

    // Heavy Sub Drop (100Hz -> 20Hz)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, t);
    subOsc.frequency.exponentialRampToValueAtTime(25, t + 1.2);

    subGain.gain.setValueAtTime(0.8, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(t);
    subOsc.stop(t + 1.9);

    // Metallic hit transient
    const hitOsc = this.ctx.createOscillator();
    const hitGain = this.ctx.createGain();

    hitOsc.type = 'triangle';
    hitOsc.frequency.setValueAtTime(320, t);
    hitOsc.frequency.exponentialRampToValueAtTime(80, t + 0.2);

    hitGain.gain.setValueAtTime(0.5, t);
    hitGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    hitOsc.connect(hitGain);
    hitGain.connect(this.masterGain);

    hitOsc.start(t);
    hitOsc.stop(t + 0.35);
  }
}

export const audioEngine = new SoundEngine();
