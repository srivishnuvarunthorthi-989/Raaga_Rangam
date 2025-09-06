'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { useGameStore } from '@/lib/stores/game-store';

export function InstructionsPanel() {
  const { t } = useLanguage();
  const { currentMode, showInstructions, toggleInstructions } = useGameStore();

  if (!showInstructions) {
    return (
      <motion.button
        onClick={toggleInstructions}
        className="fixed bottom-4 right-4 glass-panel p-3 rounded-full text-amber-300 hover:text-amber-200 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">❓</span>
      </motion.button>
    );
  }

  const getInstructions = () => {
    switch (currentMode) {
      case 'traditional':
        return {
          title: '🙏 Traditional Mode - How to Play',
          sections: [
            {
              title: 'Left Hand (Swaras):',
              instructions: [
                '• Pinky finger to thumb: Sa',
                '• Ring finger to thumb: Ri',
                '• Middle finger to thumb: Ga',
                '• Index finger to thumb: Ma'
              ]
            },
            {
              title: 'Right Hand (Swaras):',
              instructions: [
                '• Index finger to thumb: Pa',
                '• Middle finger to thumb: Da',
                '• Ring finger to thumb: Ni',
                '• Pinky finger to thumb: Not used'
              ]
            }
          ]
        };
      case 'onehand':
        return {
          title: '🤚 One-Hand Virtuoso - How to Play',
          sections: [
            {
              title: 'Single Hand Gestures:',
              instructions: [
                '• Thumb-to-finger combinations for Sa, Ri, Ga, Ma',
                '• Closed fist for Pa',
                '• Open palm for Da',
                '• Pointing finger for Ni'
              ]
            },
            {
              title: 'Octave Control:',
              instructions: [
                '• Other hand vertical position controls octave',
                '• Higher position = higher octave',
                '• Lower position = lower octave'
              ]
            }
          ]
        };
      case 'gamaka':
        return {
          title: '🎭 Gamaka Master - How to Play',
          sections: [
            {
              title: 'Ornamentations:',
              instructions: [
                '• Hand slides for meend (glides)',
                '• Finger shakes for kampana (vibrato)',
                '• Quick taps for jaru (runs)',
                '• Screen tap for grace notes'
              ]
            },
            {
              title: 'Advanced Techniques:',
              instructions: [
                '• Combine gestures for complex gamakas',
                '• Use both hands for layered expressions',
                '• Practice smooth transitions'
              ]
            }
          ]
        };
      default:
        return { title: '', sections: [] };
    }
  };

  const instructions = getInstructions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 glass-panel p-6 rounded-xl relative"
    >
      <button
        onClick={toggleInstructions}
        className="absolute top-4 right-4 text-amber-300 hover:text-amber-200 transition-colors"
      >
        ✕
      </button>
      
      <h3 className="text-amber-300 font-semibold mb-4 text-xl">
        {instructions.title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {instructions.sections.map((section, index) => (
          <div key={index}>
            <h4 className="text-amber-200 font-semibold mb-2">
              {section.title}
            </h4>
            <ul className="space-y-1 text-gray-300">
              {section.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}