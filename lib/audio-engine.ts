'use client';

import * as Tone from 'tone';
import { swarasthanas } from './carnatic-music';

export class AudioEngine {
  private synth: Tone.PolySynth;
  private tanpuraSynth: Tone.PolySynth;
  private reverb: Tone.Reverb;
  private vibrato: Tone.Vibrato;
  private basePitch = 261.63; // C4
  private isInitialized = false;

  constructor() {
    this.reverb = new Tone.Reverb({ decay: 1.5, wet: 0.4 }).toDestination();
    this.vibrato = new Tone.Vibrato({ frequency: 5, depth: 0.1, type: 'sine' });
    
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine', partials: [1, 0.2, 0.01] },
      envelope: { attack: 0.01, decay: 0.4, sustain: 0.2, release: 0.4 },
      volume: -8
    }).chain(this.vibrato, this.reverb);

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
    this.synth.triggerAttackRelease(frequency, duration, Tone.now());
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
    this.synth.dispose();
    this.tanpuraSynth.dispose();
    this.reverb.dispose();
    this.vibrato.dispose();
  }
}