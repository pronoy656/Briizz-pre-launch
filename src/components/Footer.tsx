'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUp } from 'lucide-react';
import { audioEngine } from '@/lib/audio-engine';

interface FooterProps {
  onOpenModal: () => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  const [t, setT] = useState({ d: 42, h: 14, m: 38, s: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setT(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        if (prev.d > 0) return { ...prev, d: prev.d - 1, h: 23, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollTop = () => {
    audioEngine.playHover(1.1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const units = [
    { label: 'DAYS',    val: t.d },
    { label: 'HOURS',   val: t.h },
    { label: 'MINUTES', val: t.m },
    { label: 'SECONDS', val: t.s },
  ];

  return (
    <footer className="relative w-full border-t border-neutral-900 bg-[#050505] px-6 py-20 select-none overflow-hidden text-center z-20">
      {/* Red atmosphere at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(200,0,8,0.08), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

        {/* Countdown */}
        <div className="mb-14">
          <p className="text-mono text-[10px] tracking-[0.3em] text-[#e8161e] uppercase mb-5">
            // ESTIMATED GLOBAL DEPLOYMENT COUNTDOWN
          </p>
          <div className="grid grid-cols-4 gap-3 sm:gap-5">
            {units.map(u => (
              <div
                key={u.label}
                className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl bg-[#0e0204] border border-[#e8161e]/28 min-w-[66px] sm:min-w-[96px]"
                style={{ boxShadow: '0 0 18px rgba(232,22,30,0.12)' }}
              >
                <span className="font-mono font-bold text-2xl sm:text-4xl text-white">
                  {String(u.val).padStart(2, '0')}
                </span>
                <span className="text-mono text-[8px] tracking-widest text-neutral-500 mt-1">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2 className="text-display text-5xl sm:text-7xl md:text-8xl tracking-[0.15em] text-white">
            BRIIZZ
          </h2>
          <h3
            className="mt-3 text-display text-base sm:text-2xl md:text-3xl tracking-[0.22em] uppercase"
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(90deg, #e8161e, #ff6670, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            THE NEXT BUSINESS EXPERIENCE
          </h3>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light max-w-lg">
            Stay ahead. Be part of the sovereign vanguard when the platform opens.
          </p>

          <button
            onClick={() => { audioEngine.playHover(1.2); onOpenModal(); }}
            className="mt-8 px-8 py-4 rounded-xl text-white text-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold flex items-center gap-2 cursor-pointer transition-all hover:shadow-[0_0_40px_rgba(232,22,30,0.55)]"
            style={{
              background: 'linear-gradient(90deg, #8f0007, #e8161e, #c40c12)',
              boxShadow: '0 0 25px rgba(232,22,30,0.35)',
            }}
          >
            <Zap className="w-4 h-4" />
            REQUEST VIP ACCESS
          </button>
        </motion.div>

        <div className="w-full h-px bg-neutral-900 my-12" />

        {/* Meta bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-mono text-[10px] tracking-wider text-neutral-500 gap-4">
          <span>© 2026 BRIIZZ GLOBAL. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-5">
            {['SECURITY', 'TERMS', 'NETWORK'].map(label => (
              <button
                key={label}
                onClick={onOpenModal}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={scrollTop}
            className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#e8161e] transition-all flex items-center gap-1.5"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[9px]">TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
