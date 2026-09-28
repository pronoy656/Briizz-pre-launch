'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { audioEngine } from '@/lib/audio-engine';

interface ActivationButtonProps {
  onActivate: () => void;
  disabled?: boolean;
}

export default function ActivationButton({ onActivate, disabled = false }: ActivationButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Magnetic physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 14 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Magnetic pull distance
    mouseX.set((e.clientX - centerX) * 0.35);
    mouseY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    audioEngine.playHover(1.1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    if (disabled || isClicked) return;
    setIsClicked(true);
    audioEngine.playActivationBuild();
    onActivate();
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6">
      {/* Outer Pulse Wave on Click */}
      {isClicked && (
        <motion.div
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-44 h-44 rounded-full border-2 border-[#ff1e27] pointer-events-none"
        />
      )}

      {/* Interactive Magnetic Button */}
      <motion.button
        ref={buttonRef}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        disabled={disabled || isClicked}
        className="group relative w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#ff1e27] focus:ring-offset-4 focus:ring-offset-[#050505] transition-shadow"
        aria-label="Enter BRIIZZ Pre-Launch Experience"
      >
        {/* Deep Red Radial Glow Behind Button */}
        <motion.div
          animate={{
            scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.1, 1],
            opacity: isHovered ? 0.65 : 0.25,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-[#ff1e27] blur-2xl pointer-events-none"
        />

        {/* Outer Thin Red Orbital Ring */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none animate-rotate-slow"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="#ff1e27"
            strokeWidth="0.8"
            strokeDasharray="4 8"
            className={`transition-opacity duration-300 ${
              isHovered ? 'opacity-90' : 'opacity-40'
            }`}
          />
        </svg>

        {/* Inner Counter-Rotating Segmented Ring */}
        <svg
          className={`absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none ${
            isHovered ? 'animate-rotate-slow-reverse' : ''
          }`}
          style={{ animationDuration: isHovered ? '6s' : '18s' }}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#ff3344"
            strokeWidth="1.2"
            strokeDasharray="24 18 12 18"
            className={`transition-all duration-300 ${
              isHovered ? 'opacity-100 stroke-[#ff1e27]' : 'opacity-30 stroke-neutral-600'
            }`}
          />
        </svg>

        {/* Inner Core Disc */}
        <div
          className={`relative z-10 w-28 h-28 md:w-34 md:h-34 rounded-full bg-gradient-to-b from-[#180507] via-[#0d0102] to-[#050505] border border-[#ff1e27]/40 flex flex-col items-center justify-center transition-all duration-300 shadow-[inset_0_0_20px_rgba(255,30,39,0.15)] group-hover:border-[#ff1e27] group-hover:shadow-[0_0_30px_rgba(255,30,39,0.4),inset_0_0_25px_rgba(255,30,39,0.3)]`}
        >
          {/* Subtle Red Center Beacon */}
          <motion.div
            animate={{ scale: isHovered ? [1, 1.4, 1] : [1, 1.1, 1], opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#ff1e27] mb-1.5 shadow-[0_0_8px_#ff1e27]"
          />

          {/* Button Text */}
          <span className="font-bold text-xs md:text-sm tracking-[0.3em] text-white uppercase group-hover:text-[#ff3b44] transition-colors font-['Syne',sans-serif]">
            {isClicked ? 'ACTIVATING' : 'ENTER'}
          </span>

          <span className="text-[9px] tracking-[0.2em] text-neutral-400 font-mono mt-0.5 group-hover:text-neutral-200 transition-colors">
            EXPERIENCE
          </span>
        </div>
      </motion.button>

      {/* Idle Instruction Cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-4 text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase pointer-events-none"
      >
        [ CLICK TO INITIALIZE AUDIO & IMMERSION ]
      </motion.p>
    </div>
  );
}
