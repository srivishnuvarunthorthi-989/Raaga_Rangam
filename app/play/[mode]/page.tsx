'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Navbar } from '@/components/layout/navbar';
import { GameCanvas } from '@/components/game/game-canvas';
import { ControlPanel } from '@/components/game/control-panel';
import { InstructionsPanel } from '@/components/game/instructions-panel';
import { useGameStore } from '@/lib/stores/game-store';
import { GameMode } from '@/lib/stores/game-store';

const modeNames = {
  traditional: 'Traditional Mode',
  onehand: 'One-Hand Virtuoso',
  gamaka: 'Gamaka Master'
};

export default function PlayModePage() {
  const params = useParams();
  const router = useRouter();
  const mode = params.mode as GameMode;
  
  const { setMode, resetGame } = useGameStore();

  useEffect(() => {
    if (mode && ['traditional', 'onehand', 'gamaka'].includes(mode)) {
      setMode(mode);
      resetGame();
    } else {
      router.push('/dashboard');
    }
  }, [mode, setMode, resetGame, router]);

  const handleTanpuraToggle = () => {
    // This will be handled by the GameCanvas component
  };

  const handleTanpuraVolumeChange = (volume: number) => {
    // This will be handled by the GameCanvas component
  };

  if (!mode || !['traditional', 'onehand', 'gamaka'].includes(mode)) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="flex items-center space-x-2 text-amber-300 hover:text-amber-200 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </motion.button>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold gradient-text text-center"
          >
            {modeNames[mode]}
          </motion.h1>
          
          <div className="w-32" /> {/* Spacer for centering */}
        </div>

        {/* Control Panel */}
        <ControlPanel
          onTanpuraToggle={handleTanpuraToggle}
          onTanpuraVolumeChange={handleTanpuraVolumeChange}
        />

        {/* Game Canvas */}
        <div className="mb-6">
          <GameCanvas />
        </div>

        {/* Instructions Panel */}
        <InstructionsPanel />
      </main>
    </div>
  );
}