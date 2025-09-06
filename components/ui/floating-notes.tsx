'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Note {
  id: string;
  x: number;
  y: number;
  symbol: string;
  delay: number;
}

const musicalSymbols = ['♪', '♫', '♬', '♭', '♯', '𝄞'];

export function FloatingNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const generateNotes = () => {
      const newNotes: Note[] = [];
      for (let i = 0; i < 15; i++) {
        newNotes.push({
          id: `note-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          symbol: musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)],
          delay: Math.random() * 5,
        });
      }
      setNotes(newNotes);
    };

    generateNotes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute text-yellow-400/20 text-4xl select-none"
          style={{
            left: `${note.x}%`,
            top: `${note.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: note.delay,
            ease: "easeInOut"
          }}
        >
          {note.symbol}
        </motion.div>
      ))}
    </div>
  );
}