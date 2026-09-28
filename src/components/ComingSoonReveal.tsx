'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { villainVoice } from '@/lib/voice-synthesizer';
import { audioEngine } from '@/lib/audio-engine';

export default function ComingSoonReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [narrated, setNarrated] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || narrated) return;
    setNarrated(true);

    async function narrate() {
      await villainVoice.pause(600);
      audioEngine.playSubDrop();

      await villainVoice.speak('You wanted a solution.', { pauseAfter: 1400 });
      await villainVoice.speak("We're bringing you an ecosystem.", { pauseAfter: 1600 });
      audioEngine.playHover(0.7);
      await villainVoice.speak('The breeze is coming.', { pauseAfter: 0 });
    }

    narrate();
  }, [inView, narrated]);

  const letters = 'BRIIZZ'.split('');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-32 select-none overflow-hidden bg-[#030000]"
    >
      {/* ── CINEMATIC BACKGROUND ─────────────────────────────────────── */}
      
      {/* Central Eclipse / Black Hole */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] pointer-events-none z-0 flex items-center justify-center">
        {/* Glowing Aura (Animating Opacity) */}
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full shadow-[0_0_160px_50px_rgba(232,22,30,0.7)]"
        />
        {/* Core block to ensure it's pitch black inside */}
        <div className="absolute inset-2 rounded-full bg-black z-10" />
      </div>

      {/* Atmospheric Fog/Smoke */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,22,30,0.15)_0%,transparent_80%)] pointer-events-none z-0"
      />

      {/* Grid Floor */}
      <div className="absolute bottom-0 w-full h-[40vh] overflow-hidden pointer-events-none z-0 opacity-20">
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(232,22,30,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(232,22,30,0.5)_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{ transform: 'perspective(600px) rotateX(75deg) translateY(50px) scale(2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#030000]" />
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        
        {/* BRIIZZ Kinetic Letters */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-5 mb-6 overflow-hidden">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 120, opacity: 0, rotateX: 60, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-display text-[5rem] sm:text-[9rem] md:text-[12rem] lg:text-[15rem] tracking-tight text-white leading-none drop-shadow-[0_0_40px_rgba(232,22,30,0.5)]"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* High-tech divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full max-w-3xl h-[2px] my-6 flex items-center justify-center"
        >
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8161e]/40 to-transparent" />
          <div className="w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#e8161e] to-transparent shadow-[0_0_15px_#e8161e]" />
          {/* Center node */}
          <div className="absolute w-2.5 h-2.5 bg-[#e8161e] rotate-45 shadow-[0_0_10px_#e8161e]" />
          <div className="absolute w-1.5 h-1.5 bg-white rotate-45" />
        </motion.div>

        {/* COMING SOON title */}
        <div className="overflow-hidden mt-4">
          <motion.h2
            initial={{ y: 60, opacity: 0, letterSpacing: '0.6em' }}
            whileInView={{ y: 0, opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-4xl sm:text-6xl md:text-8xl text-transparent relative pl-[0.3em]" // padding matches letter spacing to stay centered
            style={{
              backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #ff4d55 70%, #500004 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              filter: 'drop-shadow(0 0 50px rgba(232,22,30,0.6))',
            }}
          >
            COMING SOON
          </motion.h2>
        </div>

        {/* Subtitle / HUD Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 flex flex-col items-center"
        >
          <div className="px-6 py-2 border-l-2 border-r-2 border-[#e8161e]/40 bg-gradient-to-r from-transparent via-[#e8161e]/5 to-transparent">
            <p className="text-mono text-[10px] sm:text-xs tracking-[0.4em] text-neutral-400 uppercase text-center">
              THE NEXT WAY TO BUILD YOUR BUSINESS STARTS HERE.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
