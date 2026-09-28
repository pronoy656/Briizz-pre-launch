'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { audioEngine } from '@/lib/audio-engine';

interface SplashScreenProps {
  onEnter: () => void;
  isActivating: boolean;
}

export default function SplashScreen({ onEnter, isActivating }: SplashScreenProps) {
  const [characterReacting, setCharacterReacting] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const bx = useSpring(rawX, { stiffness: 200, damping: 16 });
  const by = useSpring(rawY, { stiffness: 200, damping: 16 });

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    rawY.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  };

  const handleBtnLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovering(false);
  };

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setCharacterReacting(true);
    audioEngine.playActivationBuild();
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-30 overflow-hidden select-none bg-[#050505]">

      {/* ── Atmospheric red bloom behind character ───────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 65% 90% at 25% 58%, rgba(170,0,8,0.38) 0%, transparent 68%)',
        }}
      />

      {/* ── Horizontal scan beam ─────────────────────────────────────── */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, transparent, rgba(232,22,30,0.65), transparent)' }}
        animate={{ top: ['8%', '92%', '8%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── CHARACTER PORTRAIT — Left half ───────────────────────────── */}
      <motion.div
        className="absolute inset-y-0 left-0 z-10 flex items-center justify-start"
        style={{ width: '60%' }}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The actual character image */}
        <motion.img
          src="/kratos.jpg"
          alt="BRIIZZ character"
          className="relative w-full h-[95vh] sm:h-full object-contain object-left"

          animate={characterReacting ? {
            filter: [
              'brightness(1) saturate(0.8)',
              'brightness(1.6) saturate(1.1)',
              'brightness(1.1) saturate(0.85)',
            ],
            x: [0, 14, -5, 0],
          } : {
            filter: ['brightness(0.95) saturate(0.78)', 'brightness(1.02) saturate(0.84)', 'brightness(0.95) saturate(0.78)'],
          }}
          transition={characterReacting
            ? { duration: 0.55 }
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }
        />

        {/* ── COLOUR GRADE LAYERS ──────────────────────────────────── */}

        {/* 1. Multiply red — converts blue flames → dark crimson */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(155deg, rgba(110,0,0,0.75) 0%, rgba(70,0,0,0.48) 38%, rgba(20,0,0,0.18) 68%, transparent 88%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* 2. Screen red bloom — bottom-left (blue axe area → red) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 58% 48% at 4% 86%, rgba(210,0,8,0.6) 0%, transparent 72%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* 3. Slight overall darkener */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(5,5,5,0.22)' }}
        />

        {/* 4. Right-side fade into content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent 38%, rgba(5,5,5,0.65) 68%, #050505 100%)',
          }}
        />

        {/* 5. Bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #050505 0%, transparent 24%)' }}
        />

        {/* 6. Red rim light — strengthens on hover / reaction */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: characterReacting ? 0.70 : isHovering ? 0.38 : 0.06 }}
          transition={{ duration: 0.35 }}
          style={{
            background: 'linear-gradient(to right, rgba(232,22,30,0.7) 0%, transparent 65%)',
          }}
        />

        {/* 7. Idle breathing red pulse */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.04, 0.15, 0.04] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at 32% 38%, rgba(232,22,30,0.30) 0%, transparent 62%)',
          }}
        />
      </motion.div>

      {/* ── RIGHT CONTENT PANEL ───────────────────────────────────────── */}
      <div
        className="absolute inset-y-0 right-0 z-20 flex flex-col items-end md:items-start justify-center px-8 sm:px-12 md:px-14 lg:px-20"
        style={{ width: '60%' }}
      >
        <div className="max-w-lg w-full flex flex-col items-end md:items-start text-right md:text-left">

          {/* System Tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] text-mono tracking-[0.28em] mb-6"
            style={{
              background: 'rgba(232,22,30,0.08)',
              borderColor: 'rgba(232,22,30,0.30)',
              color: '#e8161e',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8161e] animate-ping" />
            PRE-LAUNCH // CLASSIFIED
          </motion.div>

          {/* BRIIZZ Wordmark */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-display text-7xl sm:text-8xl md:text-9xl tracking-[0.2em] text-white"
              style={{ textShadow: '0 0 48px rgba(232,22,30,0.28)' }}
            >
              BRIIZZ
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="text-[11px] sm:text-sm text-mono tracking-[0.32em] font-semibold mb-3 uppercase"
            style={{ color: '#e8161e' }}
          >
            THE NEXT BUSINESS EXPERIENCE
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="text-sm sm:text-base text-neutral-400 tracking-wide font-light mb-12"
          >
            It&rsquo;s closer than you think.
          </motion.p>

          {/* ENTER button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              ref={btnRef}
              style={{ x: bx, y: by }}
              onMouseMove={handleBtnMouseMove}
              onMouseEnter={() => { setIsHovering(true); audioEngine.playHover(1.05); }}
              onMouseLeave={handleBtnLeave}
              onClick={handleClick}
              disabled={clicked}
              className="group relative flex items-center gap-4 cursor-pointer focus:outline-none"
              aria-label="Enter the BRIIZZ experience"
            >
              {/* Ring button */}
              <motion.div
                animate={{
                  boxShadow: isHovering
                    ? '0 0 0 1px rgba(232,22,30,0.85), 0 0 38px rgba(232,22,30,0.5)'
                    : '0 0 0 1px rgba(232,22,30,0.38), 0 0 14px rgba(232,22,30,0.16)',
                }}
                transition={{ duration: 0.3 }}
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: '#0d0102', border: '1px solid rgba(232,22,30,0.5)' }}
              >
                <svg
                  className={`absolute inset-0 w-full h-full ${isHovering ? 'animate-rotate-slow' : ''}`}
                  style={{ animationDuration: '4s' }}
                  viewBox="0 0 64 64"
                >
                  <circle
                    cx="32" cy="32" r="28" fill="none" stroke="#e8161e"
                    strokeWidth="1" strokeDasharray="8 6 20 6"
                    className={isHovering ? 'opacity-90' : 'opacity-40'}
                  />
                </svg>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6 4L12 9L6 14"
                    stroke={isHovering ? '#ffffff' : '#e8161e'}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Label */}
              <div className="flex flex-col items-start">
                <span className="text-display text-xs tracking-[0.35em] text-white group-hover:text-[#ff4d55] transition-colors">
                  {clicked ? 'AWAKENING' : 'ENTER THE WORLD'}
                </span>
                <span className="text-mono text-[9px] tracking-[0.22em] text-neutral-500 mt-0.5">
                  [ CLICK TO ACTIVATE AUDIO + IMMERSION ]
                </span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── Character watermark — bottom left ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.4 }}
        className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col"
      >
        <div className="mb-2" style={{ height: 1, width: 64, background: 'linear-gradient(90deg, transparent, #e8161e, transparent)' }} />
        <span className="text-mono text-[9px] tracking-[0.3em] text-neutral-400">THE ARCHITECT</span>
        <span className="text-mono text-[8px] tracking-[0.2em] text-neutral-600 mt-0.5">BRIIZZ — CLASSIFIED ENTITY</span>
      </motion.div>

      {/* ── Activation ripple on click ────────────────────────────────── */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{}}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: '50%', top: '50%', width: 160, height: 160,
              marginLeft: -80, marginTop: -80,
              borderRadius: '50%', border: '2px solid #e8161e',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
