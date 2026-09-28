'use client';

import React from 'react';
import { audioEngine } from '@/lib/audio-engine';

const CHAPTERS = [
  { id: 'narration', label: 'NARRATIVE' },
  { id: 'ecosystem', label: 'ECOSYSTEM' },
  { id: 'reveal',    label: 'COMING SOON' },
  { id: 'core',      label: 'ARTIFACT' },
];

interface ChapterNavProps {
  activeChapter: string;
  onSelectChapter: (id: string) => void;
}

export default function ChapterNav({ activeChapter, onSelectChapter }: ChapterNavProps) {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 select-none hidden md:block">
      <nav className="flex items-center gap-1 p-1.5 rounded-full bg-[#0d0204]/85 border border-[#e8161e]/25 backdrop-blur-md shadow-[0_0_28px_rgba(0,0,0,0.85)]">
        {CHAPTERS.map(chap => {
          const isActive = activeChapter === chap.id;
          return (
            <button
              key={chap.id}
              onClick={() => { audioEngine.playHover(1.1); onSelectChapter(chap.id); }}
              className={`px-3.5 py-1.5 rounded-full text-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                isActive
                  ? 'text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-200'
              }`}
              style={isActive ? {
                background: 'linear-gradient(90deg, #8f0007, #e8161e)',
                boxShadow: '0 0 12px rgba(232,22,30,0.45)',
              } : {}}
            >
              {chap.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
