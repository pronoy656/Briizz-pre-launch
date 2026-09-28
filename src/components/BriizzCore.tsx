'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { audioEngine } from '@/lib/audio-engine';
import { villainVoice } from '@/lib/voice-synthesizer';

interface BriizzCoreProps {
  onCoreClick: () => void;
}

export default function BriizzCore({ onCoreClick }: BriizzCoreProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [spoke, setSpoke] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 110, damping: 18 });
  const sy = useSpring(rawY, { stiffness: 110, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    rawY.set((e.clientY - (r.top + r.height / 2)) * 0.22);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioEngine.playHover(1.35);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  const handleClick = async () => {
    setIsFlashing(true);
    audioEngine.playThunderImpact();

    setTimeout(() => setIsFlashing(false), 500);

    onCoreClick();

    // Voice after impact — if not spoken before
    if (!spoke) {
      setSpoke(true);
      await villainVoice.pause(900);
      await villainVoice.speak("It's coming.", { pauseAfter: 1200 });
      await villainVoice.speak("And you won't be ready for what comes next.", { pauseAfter: 0 });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 select-none overflow-hidden bg-[#020000]">
      {/* Screen flash on click */}
      {isFlashing && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-white opacity-80" style={{ transition: 'opacity 0.15s ease-out' }} />
      )}

      {/* Atmospheric Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          animate={{ opacity: isHovered ? 0.35 : 0.15, scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-[radial-gradient(circle,rgba(232,22,30,1)_0%,transparent_70%)] blur-[80px]"
        />
        {/* Subtle grid to give scale */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,22,30,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(232,22,30,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Header */}
      <div className="relative z-20 mb-12 max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#e8161e]/40 bg-[#e8161e]/5 text-mono text-[10px] tracking-[0.4em] text-[#ff4d55] font-bold mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-[#e8161e] shadow-[0_0_8px_#e8161e] animate-pulse" />
          CLASSIFIED ARTIFACT // SYNCHRONIZED CORE
        </div>
        <h3 className="text-display text-4xl sm:text-6xl md:text-7xl tracking-[0.15em] text-white">
          THE BRIIZZ <span className="text-[#e8161e] drop-shadow-[0_0_40px_rgba(232,22,30,0.6)]">ARTIFACT</span>
        </h3>
      </div>

      {/* Core Object */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative z-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center cursor-pointer group"
      >
        <motion.div
          style={{ x: sx, y: sy }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Static Aura Layer (Optimized Box Shadow) */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-8 rounded-full shadow-[0_0_80px_40px_rgba(232,22,30,0.5)] pointer-events-none"
          />

          {/* Outer slow-rotating intricate ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className={`absolute inset-0 w-full h-full rounded-full border-[1px] border-dashed border-[#e8161e]/30 pointer-events-none transition-all duration-700 ${isHovered ? 'border-[#e8161e]/80 scale-105' : ''}`}
          />

          {/* Inner counter-rotating solid arcs */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className={`absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full border-2 border-transparent border-t-[#e8161e] border-b-[#e8161e] pointer-events-none transition-all duration-700 ${isHovered ? 'scale-110 opacity-100 shadow-[0_0_20px_#e8161e]' : 'opacity-40'}`}
          />

          {/* Core artifact image container */}
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#100304] flex items-center justify-center transition-all duration-700 bg-black z-10"
          >
            {/* Inner Red Glow Ring */}
            <div className={`absolute inset-0 rounded-full border-2 transition-colors duration-500 z-20 ${isHovered ? 'border-[#e8161e] shadow-[inset_0_0_40px_rgba(232,22,30,0.8)]' : 'border-[#e8161e]/30 shadow-[inset_0_0_20px_rgba(232,22,30,0.3)]'}`} />
            
            <img
              src="/core-artifact.jpg"
              alt="BRIIZZ Core Artifact"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Overlays */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-500 z-10 ${isHovered ? 'opacity-0' : 'opacity-40'}`} />
            
            {/* Tactical Crosshairs inside the image */}
            <div className={`absolute w-full h-[1px] transition-colors duration-300 z-20 ${isHovered ? 'bg-[#e8161e]/50' : 'bg-[#e8161e]/20'}`} />
            <div className={`absolute h-full w-[1px] transition-colors duration-300 z-20 ${isHovered ? 'bg-[#e8161e]/50' : 'bg-[#e8161e]/20'}`} />
          </motion.div>
          
          {/* External Targeting brackets on Hover */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.2 }}
            className="absolute inset-[-20px] pointer-events-none z-30"
          >
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e8161e]" />
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e8161e]" />
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e8161e]" />
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e8161e]" />
          </motion.div>

        </motion.div>
      </div>

      {/* Interaction hint */}
      <div className="relative z-20 mt-16 flex flex-col items-center">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          className="px-6 py-2 border border-neutral-800 bg-[#050000]/80 backdrop-blur-md"
        >
          <p className="text-mono text-[10px] sm:text-xs tracking-[0.4em] text-[#e8161e] uppercase">
            [ {isHovered ? 'TARGET LOCKED // INITIATE IMPACT' : 'CLICK ARTIFACT TO TRIGGER IMPACT'} ]
          </p>
        </motion.div>
      </div>
    </section>
  );
}
