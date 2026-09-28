'use client';

import React, { useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '@/lib/audio-engine';
import { villainVoice } from '@/lib/voice-synthesizer';

interface SoundManagerProps {
  isActivated: boolean;
  isMuted: boolean;
  onToggleMute: (muted: boolean) => void;
}

export default function SoundManager({ isActivated, isMuted, onToggleMute }: SoundManagerProps) {
  
  useEffect(() => {
    audioEngine.setMuted(isMuted);
    villainVoice.setMuted(isMuted);
  }, [isMuted]);

  const toggle = () => {
    const next = !isMuted;
    onToggleMute(next);
    
    // Fallback in case useEffect is slightly delayed
    audioEngine.setMuted(next);
    villainVoice.setMuted(next);
    
    if (!next && isActivated) {
      audioEngine.startAmbient();
      audioEngine.playHover(1.1);
    }
  };

  if (!isActivated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <button
        onClick={toggle}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0d0204]/90 border border-[#e8161e]/35 backdrop-blur-md hover:border-[#e8161e] hover:shadow-[0_0_18px_rgba(232,22,30,0.25)] transition-all cursor-pointer focus:outline-none"
        aria-label={isMuted ? 'Unmute experience audio' : 'Mute experience audio'}
      >
        {/* Animated waveform bars */}
        <div className="flex items-end gap-0.5 h-3.5">
          {[2.5, 4, 2, 5, 3].map((h, i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full bg-[#e8161e] transition-all duration-300 ${
                isMuted ? 'opacity-25' : 'animate-breathe'
              }`}
              style={{
                height: isMuted ? '2px' : `${h * 2 + 2}px`,
                animationDelay: `${i * 130}ms`,
              }}
            />
          ))}
        </div>

        <span className="text-mono text-[10px] tracking-[0.22em] text-neutral-200 group-hover:text-white uppercase font-semibold">
          {isMuted ? 'SOUND OFF' : 'SOUND ON'}
        </span>

        <div className={isMuted ? 'text-neutral-500' : 'text-[#e8161e]'}>
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </div>
      </button>
    </div>
  );
}
