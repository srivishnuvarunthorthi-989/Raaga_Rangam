'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MusicalNoteIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { useGameStore } from '@/lib/stores/game-store';
import { useLanguage } from '@/contexts/language-context';
import { ragas, talas } from '@/lib/carnatic-music';

interface ControlPanelProps {
  onTanpuraToggle: () => void;
  onTanpuraVolumeChange: (volume: number) => void;
}

export function ControlPanel({ onTanpuraToggle, onTanpuraVolumeChange }: ControlPanelProps) {
  const { t } = useLanguage();
  const {
    currentRaga,
    currentTala,
    octave,
    isTanpuraPlaying,
    tanpuraVolume,
    setRaga,
    setTala,
    setOctave
  } = useGameStore();

  const ragaOptions = Object.entries(ragas).map(([key, raga]) => ({
    value: key,
    label: raga.name
  }));

  const talaOptions = Object.entries(talas).map(([key, tala]) => ({
    value: key,
    label: `${tala.name} (${tala.beats} beats)`
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Raga Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-4 rounded-xl"
      >
        <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
          <MusicalNoteIcon className="h-5 w-5 mr-2" />
          Raga
        </h3>
        <select
          value={Object.keys(ragas).find(key => ragas[key] === currentRaga)}
          onChange={(e) => setRaga(e.target.value)}
          className="w-full bg-gray-800 border border-amber-500 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {ragaOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="mt-2 text-xs text-amber-200">
          {currentRaga.description}
        </div>
      </motion.div>

      {/* Tala Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-4 rounded-xl"
      >
        <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
          <span className="mr-2">🥁</span>
          Tala
        </h3>
        <select
          value={Object.keys(talas).find(key => talas[key] === currentTala)}
          onChange={(e) => setTala(e.target.value)}
          className="w-full bg-gray-800 border border-amber-500 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {talaOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="mt-2 flex justify-center space-x-1">
          {currentTala.pattern.map((beat, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                beat ? 'bg-amber-600' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Tanpura Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-4 rounded-xl"
      >
        <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
          <SpeakerWaveIcon className="h-5 w-5 mr-2" />
          Tanpura
        </h3>
        <button
          onClick={onTanpuraToggle}
          className={`w-full rounded-lg p-2 transition-colors text-sm font-medium ${
            isTanpuraPlaying
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-amber-600 hover:bg-amber-500'
          }`}
        >
          {isTanpuraPlaying ? 'Stop Drone' : 'Start Drone'}
        </button>
        <input
          type="range"
          min="-60"
          max="0"
          value={tanpuraVolume}
          onChange={(e) => onTanpuraVolumeChange(Number(e.target.value))}
          className="w-full mt-2 accent-amber-400"
        />
        <div className="text-xs text-amber-200 mt-1">Drone Volume</div>
      </motion.div>

      {/* Octave Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-4 rounded-xl"
      >
        <h3 className="text-amber-300 font-semibold mb-3 flex items-center">
          <span className="mr-2">⬆️</span>
          Octave
        </h3>
        <div className="flex justify-around space-x-2">
          {[
            { value: 3, label: 'Mandra' },
            { value: 4, label: 'Madhya' },
            { value: 5, label: 'Tara' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setOctave(value)}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                octave === value
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black'
                  : 'bg-blue-600 border border-blue-400 text-white hover:bg-blue-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}