'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { villainVoice } from '@/lib/voice-synthesizer';
import { audioEngine } from '@/lib/audio-engine';

interface CinematicTransitionProps {
  onTransitionEnd: () => void;
}

type Beat = { text: string };

export default function CinematicTransition({ onTransitionEnd }: CinematicTransitionProps) {
  const [currentLine, setCurrentLine] = useState<string>('');
  const [phase, setPhase] = useState<'enter' | 'line1' | 'pause' | 'line2' | 'warp'>('enter');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // Short silence — character receives the command
      await villainVoice.pause(500);
      if (cancelled) return;

      // Activation energy
      audioEngine.playTransitionWhoosh();

      // First line: "Are you ready?"
      setCurrentLine('Are you ready?');
      setPhase('line1');
      await villainVoice.speak('Are you ready?', {
        pauseAfter: 200,
      });
      if (cancelled) return;

      // Cinematic silence
      setCurrentLine('');
      setPhase('pause');
      await villainVoice.pause(1600);
      if (cancelled) return;

      // Sub-drop impact before second line
      audioEngine.playSubDrop();
      await villainVoice.pause(400);
      if (cancelled) return;

      // Second line: "Step inside."
      setCurrentLine('Step inside.');
      setPhase('line2');
      await villainVoice.speak('Step inside.', {
        pauseAfter: 1000,
      });
      if (cancelled) return;

      // Start ambient before warp
      audioEngine.startAmbient();

      // Warp / scene change
      setPhase('warp');
      await villainVoice.pause(700);
      if (!cancelled) onTransitionEnd();
    }

    run();
    return () => { cancelled = true; };
  }, [onTransitionEnd]);

  const isWarp = phase === 'warp';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden select-none">

      {/* Energy shockwave radial */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: [0.15, 2.2, 5], opacity: [0, 0.55, 0] }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
        className="absolute w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #e8161e 0%, #600004 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Thin expanding ring */}
      {phase !== 'enter' && (
        <motion.div
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute w-72 h-72 rounded-full border border-[#e8161e] pointer-events-none"
        />
      )}

      {/* Voice subtitle */}
      <div className="relative z-10 text-center px-6 min-h-[100px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentLine && (
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <span className="text-mono text-[10px] tracking-[0.4em] text-[#e8161e] mb-4 uppercase">
                [ TRANSMISSION INCOMING ]
              </span>
              <h2 className="text-display text-4xl sm:text-6xl md:text-7xl tracking-[0.12em] text-white drop-shadow-[0_0_30px_rgba(232,22,30,0.4)]">
                &ldquo;{currentLine}&rdquo;
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Warp / fade-to-black overlay */}
      <motion.div
        className="absolute inset-0 bg-[#050505] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isWarp ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </div>
  );
}
