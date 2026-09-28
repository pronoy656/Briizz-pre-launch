'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import AmbientBackground    from '@/components/AmbientBackground';
import AmbientParticles     from '@/components/AmbientParticles';
import Preloader            from '@/components/Preloader';
import SplashScreen         from '@/components/SplashScreen';
import CinematicTransition  from '@/components/CinematicTransition';
import MainExperience       from '@/components/MainExperience';
import BusinessEcosystem    from '@/components/BusinessEcosystem';
import ComingSoonReveal     from '@/components/ComingSoonReveal';
import BriizzCore           from '@/components/BriizzCore';
import CinematicModal       from '@/components/CinematicModal';
import SoundManager         from '@/components/SoundManager';
import ChapterNav           from '@/components/ChapterNav';
import Footer               from '@/components/Footer';
import { audioEngine }      from '@/lib/audio-engine';

type Phase = 'PRELOAD' | 'SPLASH' | 'TRANSITION' | 'EXPERIENCE';

export default function Home() {
  const [phase, setPhase]           = useState<Phase>('PRELOAD');
  const [isActivating, setActivating] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeChapter, setChapter] = useState('narration');
  const [isMuted, setIsMuted] = useState(false);

  // Section anchors
  const iframeRef    = useRef<HTMLIFrameElement | null>(null);
  const narrationRef = useRef<HTMLDivElement | null>(null);
  const ecosystemRef = useRef<HTMLDivElement | null>(null);
  const revealRef    = useRef<HTMLDivElement | null>(null);
  const coreRef      = useRef<HTMLDivElement | null>(null);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreloaderDone = () => setPhase('SPLASH');

  const handleEnter = () => {
    if (isActivating) return;
    setActivating(true);
    // Initialize audio context on user gesture
    audioEngine.init();
    audioEngine.resume();
    setTimeout(() => setPhase('TRANSITION'), 420);
  };

  const handleTransitionDone = () => {
    setPhase('EXPERIENCE');
    setActivating(false);
  };

  const handleSelectChapter = (id: string) => {
    setChapter(id);
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      narration: narrationRef,
      ecosystem: ecosystemRef,
      reveal:    revealRef,
      core:      coreRef,
    };
    refMap[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMuteChange = (muted: boolean) => {
    setIsMuted(muted);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const action = muted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: action, args: [] }),
        '*'
      );
    }
  };

  const isPostSplash = phase === 'TRANSITION' || phase === 'EXPERIENCE';

  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden grain">

      {/* ── Universal environment layers ────────────────────────────── */}
      <AmbientBackground />
      <AmbientParticles />

      {/* ── Global controls (only visible post-splash) ──────────────── */}
      <SoundManager isActivated={isPostSplash} isMuted={isMuted} onToggleMute={handleMuteChange} />

      {/* ── Background Music ────────────────────────────────────────── */}
      {isPostSplash && (
        <iframe
          ref={iframeRef}
          width="1"
          height="1"
          src="https://www.youtube.com/embed/jpyVfd8TyoI?autoplay=1&loop=1&playlist=jpyVfd8TyoI&enablejsapi=1"
          title="Background Music"
          frameBorder="0"
          allow="autoplay"
          className="absolute opacity-0 pointer-events-none"
        />
      )}

      {phase === 'EXPERIENCE' && (
        <ChapterNav activeChapter={activeChapter} onSelectChapter={handleSelectChapter} />
      )}

      {/* ── Preloader ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'PRELOAD' && (
          <Preloader key="preloader" onComplete={handlePreloaderDone} />
        )}
      </AnimatePresence>

      {/* ── Splash Screen ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'SPLASH' && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SplashScreen onEnter={handleEnter} isActivating={isActivating} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cinematic Transition ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'TRANSITION' && (
          <CinematicTransition key="transition" onTransitionEnd={handleTransitionDone} />
        )}
      </AnimatePresence>

      {/* ── Main Experience (scrollable) ─────────────────────────────── */}
      {phase === 'EXPERIENCE' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-20 flex flex-col w-full"
        >
          <div ref={narrationRef} id="narration" className="scroll-mt-12">
            <MainExperience />
          </div>

          <div ref={ecosystemRef} id="ecosystem" className="scroll-mt-12">
            <BusinessEcosystem />
          </div>

          <div ref={revealRef} id="reveal" className="scroll-mt-12">
            <ComingSoonReveal />
          </div>

          <div ref={coreRef} id="core" className="scroll-mt-12">
            <BriizzCore onCoreClick={() => setModalOpen(true)} />
          </div>

          <Footer onOpenModal={() => setModalOpen(true)} />
        </motion.div>
      )}

      {/* ── Modal ───────────────────────────────────────────────────── */}
      <CinematicModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
