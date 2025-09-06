'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/stores/game-store';
import { allBaseSwaras, allSwarasWithVariants } from '@/lib/carnatic-music';

interface SwaraDisplayProps {
  highlightedSwara?: string;
}

export function SwaraDisplay({ highlightedSwara }: SwaraDisplayProps) {
  const { currentRaga } = useGameStore();

  const getSwaraPresence = (baseSwara: string): boolean => {
    const relevantSwaras = allSwarasWithVariants.filter(s => s.startsWith(baseSwara));
    return relevantSwaras.some(variant => currentRaga.swaras.includes(variant));
  };

  return (
    <div className="flex justify-center space-x-2">
      {allBaseSwaras.map((swara) => {
        const isPresent = getSwaraPresence(swara);
        const isHighlighted = highlightedSwara?.startsWith(swara);
        
        return (
          <motion.div
            key={swara}
            className={`
              bg-black/50 rounded-lg p-2 text-center min-w-12 text-sm font-medium
              transition-all duration-200
              ${!isPresent ? 'opacity-30 line-through pointer-events-none' : ''}
              ${isHighlighted ? 'bg-amber-400/80 text-black scale-110 shadow-lg shadow-amber-400/50' : 'text-white'}
            `}
            animate={isHighlighted ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            {swara}
          </motion.div>
        );
      })}
    </div>
  );
}