/**
 * BRIIZZ Cinematic Audio Engine
 * Procedural Web Audio API — zero external assets
 * Optimized for villain-character game-world experience
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientRunning: boolean = false;
  private isMuted: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);
    } catch {
      // Unsupported
    }
  }

  public resume() {
    if (!this.ctx) this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    if (muted) {
      this.masterGain.gain.setTargetAtTime(0, now, 0.04);
    } else {
      this.resume();
      this.masterGain.gain.setTargetAtTime(0.9, now, 0.12);
    }
  }

  public getMuted() { return this.isMuted; }

  // ─── AMBIENT DEEP DRONE ─────────────────────────────────────────────────────

  public startAmbient() {
    if (this.isMuted || !this.ctx || !this.ambientGain || this.ambientRunning) return;
    this.resume();
    this.ambientRunning = true;
    const now = this.ctx.currentTime;

    // Sub-bass oscillator (A0 = 27.5 Hz — physical rumble)
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(27.5, now);

    // Dark sawtooth drone
    const saw = this.ctx.createOscillator();
    saw.type = 'sawtooth';
    saw.frequency.setValueAtTime(55, now);

    // Heavy low-pass shaping
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(110, now);
    filter.Q.setValueAtTime(5, now);

    // Slow LFO for breathing
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(22, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const toneGain = this.ctx.createGain();
    toneGain.gain.setValueAtTime(0.14, now);

    sub.connect(toneGain);
    saw.connect(filter);
    filter.connect(toneGain);
    toneGain.connect(this.ambientGain);

    sub.start(now);
    saw.start(now);
    lfo.start(now);

    // Slow fade-in over 4s
    this.ambientGain.gain.setTargetAtTime(0.4, now, 4);
  }

  public stopAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.6);
    this.ambientRunning = false;
  }

  // ─── UI MICRO-SOUNDS ─────────────────────────────────────────────────────────

  /** Very subtle breath on hover */
  public playHover(pitchMult = 1.0) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260 * pitchMult, now);
    osc.frequency.exponentialRampToValueAtTime(520 * pitchMult, now + 0.06);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  /** Deep activation energy build — plays when user clicks ENTER */
  public playActivationBuild() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    // Rising bass sweep
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(30, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 1.4);

    const flt = this.ctx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.setValueAtTime(60, now);
    flt.frequency.exponentialRampToValueAtTime(800, now + 1.4);
    flt.Q.setValueAtTime(5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.32, now + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

    osc.connect(flt);
    flt.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 1.7);

    // Impact sub-drop after the build
    setTimeout(() => this.playSubDrop(), 1100);
  }

  /** Deep sub-bass cinematic drop */
  public playSubDrop() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 1.0);
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.05);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 1.1);
  }

  /** Wide cinematic whoosh for scene transitions */
  public playTransitionWhoosh() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    const buf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 1.0), this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    const src = this.ctx.createBufferSource();
    src.buffer = buf;

    const flt = this.ctx.createBiquadFilter();
    flt.type = 'bandpass';
    flt.frequency.setValueAtTime(120, now);
    flt.frequency.exponentialRampToValueAtTime(2200, now + 0.45);
    flt.frequency.exponentialRampToValueAtTime(80, now + 0.95);
    flt.Q.setValueAtTime(4, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.26, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

    src.connect(flt);
    flt.connect(gain);
    gain.connect(this.masterGain);
    src.start(now);
    src.stop(now + 1.0);
  }

  /** Full thunder artifact impact — lightning snap + deep rumble */
  public playThunderImpact() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;

    // 1. Lightning snap (high-frequency noise burst)
    const snapBuf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.14), this.ctx.sampleRate);
    const snapData = snapBuf.getChannelData(0);
    for (let i = 0; i < snapData.length; i++) {
      snapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.015));
    }
    const snap = this.ctx.createBufferSource();
    snap.buffer = snapBuf;
    const snapFlt = this.ctx.createBiquadFilter();
    snapFlt.type = 'highpass';
    snapFlt.frequency.setValueAtTime(1400, now);
    const snapGain = this.ctx.createGain();
    snapGain.gain.setValueAtTime(0.45, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    snap.connect(snapFlt);
    snapFlt.connect(snapGain);
    snapGain.connect(this.masterGain);
    snap.start(now);

    // 2. Thunder sub rumble
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.exponentialRampToValueAtTime(24, now + 2.2);

    const rumbleBuf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 2.5), this.ctx.sampleRate);
    const rumbleData = rumbleBuf.getChannelData(0);
    for (let i = 0; i < rumbleData.length; i++) rumbleData[i] = (Math.random() * 2 - 1) * 0.7;
    const rumble = this.ctx.createBufferSource();
    rumble.buffer = rumbleBuf;

    const rumbleFlt = this.ctx.createBiquadFilter();
    rumbleFlt.type = 'lowpass';
    rumbleFlt.frequency.setValueAtTime(420, now);
    rumbleFlt.frequency.exponentialRampToValueAtTime(48, now + 2.2);
    rumbleFlt.Q.setValueAtTime(5, now);

    const thunderGain = this.ctx.createGain();
    thunderGain.gain.setValueAtTime(0.7, now);
    thunderGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    subOsc.connect(thunderGain);
    rumble.connect(rumbleFlt);
    rumbleFlt.connect(thunderGain);
    thunderGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 2.5);
    rumble.start(now);
    rumble.stop(now + 2.5);
  }

  /** Subtle node tone for hover on ecosystem nodes */
  public playNodeTone(freq = 300) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + 0.14);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  /** Quick "shhhh" transition swoosh */
  public playWhoosh() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    this.resume();
    const now = this.ctx.currentTime;
    
    // Create white noise buffer
    const bufferSize = this.ctx.sampleRate * 1.0; 
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Bandpass filter to sweep frequencies
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.setValueAtTime(1.5, now);
    // Sweep from high to low to sound like a whoosh
    bandpass.frequency.setValueAtTime(4000, now);
    bandpass.frequency.exponentialRampToValueAtTime(200, now + 0.8);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    
    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start(now);
    noise.stop(now + 1.0);
  }
}

export const audioEngine = new AudioEngine();
