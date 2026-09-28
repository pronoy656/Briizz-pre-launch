'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AmbientBackground() {
  const [ready, setReady] = useState(false);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 32, damping: 22 });
  const y = useSpring(rawY, { stiffness: 32, damping: 22 });

  useEffect(() => {
    setReady(true);
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  if (!ready) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* ── Primary blood-red orb following cursor ─────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(180,10,18,0.22) 0%, rgba(120,0,5,0.08) 50%, transparent 72%)',
          filter: 'blur(80px)',
          translateX: '-50%',
          translateY: '-50%',
          left: x,    // framer handles % via transform internally
          top:  y,
        }}
        animate={{ scale: [1, 1.1, 0.97, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Secondary deep crimson pool — bottom left ─────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(130,0,8,0.18) 0%, transparent 68%)',
          filter: 'blur(110px)',
          bottom: '-10%',
          left: '5%',
        }}
        animate={{ scale: [1.08, 0.92, 1.08], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Tertiary far-right dark ember ─────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(100,0,6,0.14) 0%, transparent 65%)',
          filter: 'blur(100px)',
          top: '15%',
          right: '-5%',
        }}
        animate={{ scale: [0.95, 1.12, 0.95], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Perspective grid lines ─────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(232,22,30,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(232,22,30,1) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 68%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 68%)',
        }}
      />

      {/* ── Scanlines ─────────────────────────────────────────────── */}
      <div className="scanlines absolute inset-0 opacity-35" />

      {/* ── Vignette ──────────────────────────────────────────────── */}
      <div className="vignette absolute inset-0" />
    </div>
  );
}
