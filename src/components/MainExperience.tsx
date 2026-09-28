'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { villainVoice } from '@/lib/voice-synthesizer';
import { audioEngine } from '@/lib/audio-engine';

interface MainExperienceProps {
  onComplete?: () => void;
}

interface Beat {
  voice: string;
  headline: string;
  highlightWord: string;
  sub: string;
  badge: string;
}

const BEATS: Beat[] = [
  {
    voice: 'Welcome to the breeze.',
    badge: '// IDENTITY',
    headline: 'WELCOME TO',
    highlightWord: 'BRIIZZ.',
    sub: 'The architecture of your next business empire begins here.',
  },
  {
    voice: 'Where every business problem has a solution.',
    badge: '// CAPABILITY',
    headline: 'EVERY PROBLEM.',
    highlightWord: 'ONE SOLUTION.',
    sub: 'Commerce, engineering, operations, and growth — unified.',
  },
  {
    voice: 'From your first move...',
    badge: '// ORIGIN',
    headline: 'FROM YOUR',
    highlightWord: 'FIRST MOVE.',
    sub: 'Every empire starts with a decision. Make yours.',
  },
  {
    voice: '...to everything that comes next.',
    badge: '// SCALE',
    headline: 'TO EVERYTHING',
    highlightWord: 'THAT COMES NEXT.',
    sub: 'One ecosystem built to elevate every phase of the journey.',
  },
];

export default function MainExperience({ onComplete }: MainExperienceProps) {
  const [beatIdx, setBeatIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function narrate() {
      for (let i = 0; i < BEATS.length; i++) {
        if (cancelled) return;
        setBeatIdx(i);

        await villainVoice.speak(BEATS[i].voice, {
          pauseAfter: 1100,
        });
        if (cancelled) return;

        // Brief silence between beats
        await villainVoice.pause(300);
      }

      if (!cancelled && onComplete) onComplete();
    }

    narrate();
    return () => { cancelled = true; };
  }, [onComplete]);

  const beat = BEATS[beatIdx];

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden select-none bg-[#050505]">

      {/* ── CINEMATIC HUD BACKGROUND ─────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Deep red atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(160,0,8,0.12)_0%,transparent_100%)]" />

        {/* Outer rotating dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[90vw] max-w-[800px] aspect-square rounded-full border-[1px] border-dashed border-[#e8161e]/20 opacity-40"
        />
        
        {/* Inner fast-rotating solid ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[65vw] max-w-[550px] aspect-square rounded-full border-[1px] border-[#e8161e]/15 opacity-60"
        />

        {/* Center reticle crosshairs */}
        <div className="absolute w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-[#e8161e]/10 to-transparent" />
        <div className="absolute h-[100vh] w-[1px] bg-gradient-to-b from-transparent via-[#e8161e]/10 to-transparent" />
      </div>

      {/* ── MAIN CONTENT LAYER ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={beatIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            {/* 1. HUD Badge */}
            <div className="relative inline-flex items-center gap-3 px-4 py-1.5 mb-8 border-l-2 border-r-2 border-[#e8161e]/50 bg-gradient-to-r from-transparent via-[#e8161e]/10 to-transparent">
              <span className="w-1.5 h-1.5 bg-[#e8161e] shadow-[0_0_8px_#e8161e] animate-pulse" />
              <span className="text-mono text-[9px] sm:text-[11px] tracking-[0.4em] text-[#ff4d55] font-bold">
                {beat.badge}
              </span>
              <span className="w-1.5 h-1.5 bg-[#e8161e] shadow-[0_0_8px_#e8161e] animate-pulse" />
            </div>

            {/* 2. Kinetic Headline */}
            <div className="flex flex-col items-center justify-center space-y-1 mb-6">
              <h2 className="text-display text-4xl sm:text-5xl md:text-7xl tracking-[0.2em] text-white/90 leading-none">
                {beat.headline}
              </h2>
              <h1 className="text-display text-6xl sm:text-7xl md:text-9xl tracking-[0.25em] text-[#e8161e] drop-shadow-[0_0_60px_rgba(232,22,30,0.45)] leading-none mt-2">
                {beat.highlightWord}
              </h1>
            </div>

            {/* 3. Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm sm:text-lg md:text-xl text-neutral-400 font-light tracking-[0.1em] max-w-2xl px-4"
            >
              {beat.sub}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* ── INTERFACE CONTROLS ─────────────────────────────────────── */}
        
        {/* Stage Progress HUD */}
        <div className="mt-16 flex items-center justify-center gap-3 bg-[#0a0001]/50 border border-[#e8161e]/20 p-2 rounded-full backdrop-blur-md">
          {BEATS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setBeatIdx(i); audioEngine.playHover(0.9 + i * 0.08); }}
              className="group relative p-2 focus:outline-none flex items-center justify-center"
              aria-label={`Stage ${i + 1}`}
            >
              {/* Outer hover ring */}
              <div className={`absolute inset-0 rounded-full border border-[#e8161e]/0 group-hover:border-[#e8161e]/50 transition-colors duration-300 ${i === beatIdx ? 'border-[#e8161e]/80 scale-125' : ''}`} />
              {/* Inner dot/dash */}
              <div
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === beatIdx
                    ? 'w-8 bg-[#e8161e] shadow-[0_0_12px_#e8161e]'
                    : i < beatIdx
                    ? 'w-3 bg-[#e8161e]/40 group-hover:bg-[#e8161e]/70'
                    : 'w-2 bg-neutral-800 group-hover:bg-neutral-600'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Live Voice Caption (Subtitles) */}
        <div className="mt-8 relative inline-flex items-center gap-3">
          <div className="absolute left-0 w-2 h-[1px] bg-[#e8161e]/50 -translate-x-full" />
          <div className="absolute right-0 w-2 h-[1px] bg-[#e8161e]/50 translate-x-full" />
          <p className="text-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
            <span className="text-[#e8161e] mr-2">▶</span>
            &ldquo;{beat.voice}&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
