'use client';

import { create } from 'zustand';
import { Raga, Tala, ragas, talas } from '../carnatic-music';

export type GameMode = 'traditional' | 'onehand' | 'gamaka';

export interface GameState {
  // Current game settings
  currentMode: GameMode;
  currentRaga: Raga;
  currentTala: Tala;
  octave: number;
  
  // Audio settings
  isTanpuraPlaying: boolean;
  tanpuraVolume: number;
  
  // Performance tracking
  currentSwara: string;
  score: number;
  accuracy: number;
  notesPlayed: number;
  
  // UI state
  isPlaying: boolean;
  showInstructions: boolean;
  
  // Actions
  setMode: (mode: GameMode) => void;
  setRaga: (ragaKey: string) => void;
  setTala: (talaKey: string) => void;
  setOctave: (octave: number) => void;
  setTanpuraPlaying: (playing: boolean) => void;
  setTanpuraVolume: (volume: number) => void;
  setCurrentSwara: (swara: string) => void;
  updateScore: (points: number) => void;
  resetGame: () => void;
  setPlaying: (playing: boolean) => void;
  toggleInstructions: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  currentMode: 'traditional',
  currentRaga: ragas.mayamalavagowla,
  currentTala: talas.adi,
  octave: 4,
  
  isTanpuraPlaying: false,
  tanpuraVolume: -20,
  
  currentSwara: '--',
  score: 0,
  accuracy: 100,
  notesPlayed: 0,
  
  isPlaying: false,
  showInstructions: true,
  
  // Actions
  setMode: (mode) => set({ currentMode: mode }),
  
  setRaga: (ragaKey) => {
    const raga = ragas[ragaKey];
    if (raga) {
      set({ currentRaga: raga });
    }
  },
  
  setTala: (talaKey) => {
    const tala = talas[talaKey];
    if (tala) {
      set({ currentTala: tala });
    }
  },
  
  setOctave: (octave) => set({ octave }),
  
  setTanpuraPlaying: (playing) => set({ isTanpuraPlaying: playing }),
  
  setTanpuraVolume: (volume) => set({ tanpuraVolume: volume }),
  
  setCurrentSwara: (swara) => set({ currentSwara: swara }),
  
  updateScore: (points) => set((state) => ({ 
    score: state.score + points,
    notesPlayed: state.notesPlayed + 1
  })),
  
  resetGame: () => set({
    score: 0,
    accuracy: 100,
    notesPlayed: 0,
    currentSwara: '--',
    isPlaying: false
  }),
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  
  toggleInstructions: () => set((state) => ({ 
    showInstructions: !state.showInstructions 
  }))
}));