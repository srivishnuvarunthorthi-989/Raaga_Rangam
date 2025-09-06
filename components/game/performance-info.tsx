'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/stores/game-store';

export function PerformanceInfo() {
  const { currentSwara, octave, currentRaga, score, notesPlayed } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 left-4 glass-panel p-3 text-sm space-y-1"
    >
      <div className="text-amber-300 font-semibold">
        Current Swara: <span className="text-white">{currentSwara}</span>
      </div>
      <div className="text-amber-200">
        Octave: <span className="text-white">{octave}</span>
      </div>
      <div className="text-amber-200">
        Raga: <span className="text-white">{currentRaga.name}</span>
      </div>
      <div className="text-amber-200">
        Score: <span className="text-white">{score}</span>
      </div>
      <div className="text-amber-200">
        Notes: <span className="text-white">{notesPlayed}</span>
      </div>
    </motion.div>
  );
}