'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '@/lib/audio-engine';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  'SYSTEM CORE... INITIALIZING',
  'NEURAL SUBSTRATE... LINKING',
  'ENCRYPTION MATRIX... ACTIVE',
  'ENVIRONMENT MESH... CALIBRATED',
  'BRIIZZ PROTOCOL... READY',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 7) + 4;
      p = Math.min(100, p + step);

      setProgress(p);
      setLineIndex(Math.min(Math.floor((p / 100) * (BOOT_LINES.length - 1)), BOOT_LINES.length - 2));

      if (p >= 100) {
        setLineIndex(BOOT_LINES.length - 1);
        clearInterval(interval);
        
        // Play whoosh sound right as it hits 100% and transitions
        audioEngine.playWhoosh();
        
        setTimeout(onComplete, 500);
      }
    }, 48);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Faint red aura */}
      <div className="absolute w-80 h-80 rounded-full bg-[#e8161e]/8 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center w-[340px]">
        {/* Wordmark */}
        <motion.p
          className="text-mono text-[11px] tracking-[0.5em] text-[#e8161e] mb-4 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          BRIIZZ PROTOCOL
        </motion.p>

        <motion.h1
          className="text-display text-4xl tracking-[0.35em] text-white mb-8"
          initial={{ opacity: 0, letterSpacing: '0.7em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          BRIIZZ
        </motion.h1>

        {/* Boot status line */}
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-mono text-[10px] tracking-[0.22em] text-[#e8161e] mb-3 h-4"
          >
            {BOOT_LINES[lineIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress track */}
        <div className="relative w-full h-[2px] bg-neutral-900 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8f0007] via-[#e8161e] to-[#ff4d55]"
            style={{ width: `${progress}%` }}
          />
          {/* Laser head */}
          <div
            className="absolute top-0 h-full w-10 bg-white/60 blur-[2px] rounded-full"
            style={{ left: `calc(${progress}% - 20px)`, transition: 'left 50ms linear' }}
          />
        </div>

        {/* Percentage */}
        <div className="mt-3 flex items-center justify-between w-full text-mono text-[10px] text-neutral-500 tracking-widest">
          <span>LOADING EXPERIENCE</span>
          <span className="text-white font-semibold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
