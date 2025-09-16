'use client';

import * as Tone from 'tone';
import { swarasthanas } from './carnatic-music';

export class AudioEngine {
  private mandraSynth: Tone.FMSynth;
  private madhyaSynth: Tone.FMSynth;
  private taraSynth: Tone.FMSynth;
  private tanpuraSynth: Tone.PolySynth;
  private reverb: Tone.Reverb;
  private basePitch = 261.63; // C4
  private isInitialized = false;

  constructor() {
    this.reverb = new Tone.Reverb({ decay: 1.5, wet: 0.3 }).toDestination();
    
    // Different synths for different octaves with unique timbres
    this.mandraSynth = new Tone.FMSynth({
      harmonicity: 2,
      modulationIndex: 10,
      envelope: { attack: 0.01, decay: 0.5, sustain: 0.1, release: 0.8 },
      volume: -6
    }).connect(this.reverb);

    this.madhyaSynth = new Tone.FMSynth({
      harmonicity: 1.5,
      modulationIndex: 8,
      envelope: { attack: 0.01, decay: 0.5, sustain: 0.1, release: 0.8 },
      volume: -10
    }).connect(this.reverb);

    this.taraSynth = new Tone.FMSynth({
      harmonicity: 1.5,
      modulationIndex: 12,
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.6 },
      volume: -12
    }).connect(this.reverb);

    this.tanpuraSynth = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 3,
      modulationIndex: 10,
      envelope: { attack: 1, decay: 0.1, sustain: 1, release: 1 },
      volume: -20
    }).chain(this.reverb);
  }

  async initialize() {
    if (!this.isInitialized) {
      await Tone.start();
      this.isInitialized = true;
    }
  }

  playSwara(swara: string, octave: number, duration = '8n') {
    if (!this.isInitialized) return;
    
    const frequency = this.basePitch * swarasthanas[swara].ratio * Math.pow(2, octave - 4);
    
    // Select appropriate synth based on octave
    let activeSynth: Tone.FMSynth;
    switch(octave) {
      case 3: activeSynth = this.mandraSynth; break;
      case 4: activeSynth = this.madhyaSynth; break;
      case 5: activeSynth = this.taraSynth; break;
      default: activeSynth = this.madhyaSynth;
    }
    
    activeSynth.triggerAttackRelease(frequency, duration, Tone.now());
  }

  startTanpura(octave = 3) {
    if (!this.isInitialized) return;
    
    const saFreq = this.basePitch * swarasthanas.Sa.ratio * Math.pow(2, octave - 4);
    const paFreq = this.basePitch * swarasthanas.Pa.ratio * Math.pow(2, octave - 4);
    
    this.tanpuraSynth.triggerAttack(saFreq, Tone.now());
    this.tanpuraSynth.triggerAttack(paFreq, Tone.now() + 0.1);
  }

  stopTanpura() {
    this.tanpuraSynth.releaseAll();
  }

  setTanpuraVolume(volume: number) {
    this.tanpuraSynth.volume.value = volume;
  }

  dispose() {
    this.mandraSynth.dispose();
    this.madhyaSynth.dispose();
    this.taraSynth.dispose();
    this.tanpuraSynth.dispose();
    this.reverb.dispose();
  }
}