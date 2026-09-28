'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, ShieldCheck, Zap } from 'lucide-react';
import { audioEngine } from '@/lib/audio-engine';

interface CinematicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CinematicModal({ isOpen, onClose }: CinematicModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    audioEngine.playHover(1.3);
    setTimeout(() => {
      setToken(`BRZ-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
      setLoading(false);
      audioEngine.playSubDrop();
    }, 700);
  };

  const handleClose = () => {
    audioEngine.playHover(0.8);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#050505]/88 backdrop-blur-xl"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 18 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #180507 0%, #0d0204 60%, #08080a 100%)',
              border: '1px solid rgba(232,22,30,0.45)',
              boxShadow: '0 0 80px rgba(232,22,30,0.3), 0 0 0 1px rgba(232,22,30,0.1)',
            }}
          >
            {/* Red ambient top glow */}
            <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[#e8161e]/20 blur-3xl pointer-events-none" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#e8161e] transition-all focus:outline-none z-50 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-7 sm:p-10">
              {!submitted ? (
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#200507] border border-[#e8161e]/35 text-mono text-[10px] tracking-[0.28em] text-[#e8161e] mb-5">
                    <Zap className="w-3 h-3" />
                    EARLY TRANSMISSION ACCESS
                  </div>

                  <h3 className="text-display text-4xl sm:text-5xl tracking-[0.1em] text-white mb-1">
                    IT&rsquo;S <span className="text-[#e8161e]">COMING.</span>
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light max-w-sm">
                    &ldquo;A new way to build, connect and grow your business is on the way.&rdquo;
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 w-full flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your enterprise email..."
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#e8161e] focus:ring-1 focus:ring-[#e8161e] transition-all text-mono"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full py-3.5 px-6 rounded-xl text-white text-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                      style={{
                        background: 'linear-gradient(90deg, #8f0007, #e8161e, #c40c12)',
                        boxShadow: '0 0 30px rgba(232,22,30,0.45)',
                      }}
                    >
                      {loading ? <span>TRANSMITTING...</span> : (
                        <>
                          <span>STAY TUNED // REQUEST ACCESS</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-5 flex items-center gap-2 text-mono text-[9px] text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#e8161e]" />
                    <span>EARLY COHORT — EXCLUSIVE LAUNCH ALLOCATION</span>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#200507] border-2 border-[#e8161e] flex items-center justify-center text-[#e8161e] mb-4 shadow-[0_0_30px_rgba(232,22,30,0.5)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="text-display text-2xl sm:text-3xl tracking-wider text-white uppercase mb-2">
                    ACCESS INITIALIZED
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 max-w-sm font-light">
                    Your priority identifier has been registered in the BRIIZZ vanguard queue.
                  </p>

                  <div className="mt-6 p-4 rounded-xl w-full flex flex-col items-center bg-neutral-950 border border-[#e8161e]/35">
                    <span className="text-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      PRIORITY ACCESS TOKEN
                    </span>
                    <span className="text-xl font-mono font-bold tracking-widest text-[#e8161e] mt-1">
                      {token}
                    </span>
                  </div>

                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-mono text-[10px] tracking-widest text-white hover:border-[#e8161e] transition-all"
                  >
                    RETURN TO EXPERIENCE
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
