/**
 * Procedural Celestial Audio Synthesizer (Web Audio API)
 * Generates real-time ambient cosmic drones, harmonic chimes, 
 * particle collider energy sweeps, and black hole catharsis chimes.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private isMuted: boolean = true; // Default muted until user interacts
  private droneOscillators: OscillatorNode[] = [];
  private isInitialized: boolean = false;

  public init() {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.6, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return this.isMuted;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    const targetGain = this.isMuted ? 0 : 0.6;
    this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);

    if (!this.isMuted && this.droneOscillators.length === 0) {
      this.startAmbientDrone();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startAmbientDrone() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Stop existing drone if running
    this.stopAmbientDrone();

    const now = this.ctx.currentTime;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.12, now);
    this.droneGain.connect(this.masterGain);

    // Deep cosmic binaural foundation (54Hz & 57Hz theta drone)
    const frequencies = [54, 57.5, 108, 162];
    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const pan = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280 + idx * 80, now);

      if (pan) {
        pan.pan.setValueAtTime((idx % 2 === 0 ? -0.3 : 0.3), now);
        osc.connect(filter);
        filter.connect(pan);
        pan.connect(this.droneGain);
      } else {
        osc.connect(filter);
        filter.connect(this.droneGain);
      }

      osc.start(now);
      this.droneOscillators.push(osc);
    });
  }

  public stopAmbientDrone() {
    this.droneOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (_) {}
    });
    this.droneOscillators = [];
  }

  /**
   * Harmonically resonant chime when interacting with a thought node
   */
  public playNodeResonance(frequency: number = 432, type: string = 'planet') {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Harmonic tuning based on node type
    switch (type) {
      case 'star':
        osc.type = 'sine';
        frequency = frequency * 0.5; // Deeper stellar authority
        break;
      case 'pulsar':
        osc.type = 'sawtooth';
        break;
      case 'moon':
        osc.type = 'triangle';
        frequency = frequency * 1.5;
        break;
      case 'asteroid':
        osc.type = 'sine';
        frequency = frequency * 2;
        break;
      default:
        osc.type = 'sine';
    }

    osc.frequency.setValueAtTime(frequency, now);

    // Exponential chime envelope
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.3);
  }

  /**
   * Rising particle accelerator energy sweep for Thought Collider
   */
  public playColliderCharge(durationMs: number = 2000) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const duration = durationMs / 1000;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + duration);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + duration);
    filter.Q.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.3, now + duration * 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  /**
   * Massive cosmic explosion + harmonic crystallization upon collision
   */
  public playColliderImpact() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // 1. Sub-bass boom
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 1.3);

    // 2. High crystal chord (Major 9th synthesis: 528Hz, 660Hz, 792Hz)
    [528, 660, 792, 1056].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chime.type = 'sine';
      chime.frequency.setValueAtTime(freq, now + 0.05);

      chimeGain.gain.setValueAtTime(0.18, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.3);

      chime.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      chime.start(now + 0.05);
      chime.stop(now + 2.5);
    });
  }

  /**
   * Black hole gravitational suction followed by peaceful catharsis chime (528 Hz)
   */
  public playSingularitySacrifice() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Suction downsweep
    const suction = this.ctx.createOscillator();
    const suctionGain = this.ctx.createGain();
    suction.type = 'triangle';
    suction.frequency.setValueAtTime(480, now);
    suction.frequency.exponentialRampToValueAtTime(40, now + 1.0);

    suctionGain.gain.setValueAtTime(0.3, now);
    suctionGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);

    suction.connect(suctionGain);
    suctionGain.connect(this.masterGain);
    suction.start(now);
    suction.stop(now + 1.1);

    // Catharsis Solfeggio Chime (528 Hz DNA repair / transformation frequency)
    setTimeout(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const chimeNow = this.ctx.currentTime;
      const solfeggio = this.ctx.createOscillator();
      const solfeggioGain = this.ctx.createGain();

      solfeggio.type = 'sine';
      solfeggio.frequency.setValueAtTime(528, chimeNow);

      solfeggioGain.gain.setValueAtTime(0.35, chimeNow);
      solfeggioGain.gain.exponentialRampToValueAtTime(0.0001, chimeNow + 2.5);

      solfeggio.connect(solfeggioGain);
      solfeggioGain.connect(this.masterGain);

      solfeggio.start(chimeNow);
      solfeggio.stop(chimeNow + 2.6);
    }, 900);
  }

  /**
   * Spacetime warp sound when switching timelines
   */
  public playTimelineShift() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.6);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.7);
  }
}

export const soundEngine = new SoundEngine();
