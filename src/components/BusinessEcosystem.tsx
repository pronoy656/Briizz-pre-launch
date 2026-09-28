'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { villainVoice } from '@/lib/voice-synthesizer';
import { audioEngine } from '@/lib/audio-engine';
import {
  Boxes, Truck, Globe, Cpu,
  Building2, Workflow, TrendingUp, Layers,
} from 'lucide-react';
import { EcosystemNode } from '@/lib/types';

const NODES: EcosystemNode[] = [
  { id: 'products',    name: 'PRODUCTS',           category: 'CREATION & INVENTORY',   description: 'Autonomous catalog management, intelligent manufacturing pipelines, and full SKU lifecycle orchestration.', icon: 'Boxes',     angle: 0,   radius: 170, status: 'OPTIMIZED',    tags: ['Catalog', 'Prototyping', 'Inventory'] },
  { id: 'suppliers',   name: 'SUPPLIERS',           category: 'GLOBAL SOURCING',        description: 'Direct tier-1 supply network, automated RFQ dispatch, and verified vendor synchronization.', icon: 'Truck',     angle: 45,  radius: 170, status: 'CONNECTED',    tags: ['Tier-1', 'Logistics', 'QA'] },
  { id: 'website',     name: 'WEBSITE',             category: 'DIGITAL STOREFRONTS',   description: 'Sub-second conversion storefronts and edge-deployed commerce architecture.', icon: 'Globe',     angle: 90,  radius: 170, status: 'ACTIVE',       tags: ['Edge', 'Cart', 'SEO'] },
  { id: 'engineering', name: 'DIGITAL ENGINEERING', category: 'CUSTOM TECH STACK',     description: 'Enterprise APIs, custom web apps, serverless compute, and proprietary automation.', icon: 'Cpu',      angle: 135, radius: 170, status: 'ENABLED',      tags: ['APIs', 'Microservices', 'Automation'] },
  { id: 'workspace',   name: 'WORKSPACE',           category: 'COLLABORATIVE MATRIX',  description: 'Unified command center for founders, teams, contractors, and real-time execution.', icon: 'Building2', angle: 180, radius: 170, status: 'ONLINE',       tags: ['Roles', 'Docs', 'Feed'] },
  { id: 'operations',  name: 'OPERATIONS',          category: 'AUTOMATION ENGINE',     description: 'Zero-friction fulfillment, financial reconciliation, and autonomous workflow pipelines.', icon: 'Workflow',  angle: 225, radius: 170, status: 'SYNCHRONIZED', tags: ['Pipelines', 'Finance', 'Compliance'] },
  { id: 'growth',      name: 'GROWTH',              category: 'ACQUISITION & MEDIA',   description: 'AI-driven campaign synthesis, multi-channel retention, and viral distribution levers.', icon: 'TrendingUp', angle: 270, radius: 170, status: 'SCALING',      tags: ['Paid', 'Attribution', 'LTV'] },
  { id: 'scale',       name: 'SCALE',               category: 'GLOBAL EXPANSION',      description: 'Multi-currency settlement, cross-border logistics, and infinite throughput scaling.', icon: 'Layers',    angle: 315, radius: 170, status: 'EXPANDING',    tags: ['Multi-Region', 'Concurrency', 'L10n'] },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  Boxes:     <Boxes     className="w-4 h-4 text-[#e8161e]" />,
  Truck:     <Truck     className="w-4 h-4 text-[#e8161e]" />,
  Globe:     <Globe     className="w-4 h-4 text-[#e8161e]" />,
  Cpu:       <Cpu       className="w-4 h-4 text-[#e8161e]" />,
  Building2: <Building2 className="w-4 h-4 text-[#e8161e]" />,
  Workflow:  <Workflow  className="w-4 h-4 text-[#e8161e]" />,
  TrendingUp:<TrendingUp className="w-4 h-4 text-[#e8161e]" />,
  Layers:    <Layers    className="w-4 h-4 text-[#e8161e]" />,
};

// Voice narration sequence for ecosystem building
const ECOSYSTEM_VOICE: string[] = [
  'You bring the vision.',
  'We build everything around it.',
  'Products.',
  'Technology.',
  'Digital experiences.',
  'Infrastructure.',
  'Growth.',
  'One ecosystem.',
  'One place.',
  'The breeze.',
];

export default function BusinessEcosystem() {
  const [activeNode, setActiveNode] = useState<EcosystemNode | null>(null);
  const [voiceStarted, setVoiceStarted] = useState(false);
  const [revealedNodes, setRevealedNodes] = useState<Set<string>>(new Set());

  const handleNarrateEcosystem = async () => {
    if (voiceStarted) return;
    setVoiceStarted(true);

    for (let i = 0; i < ECOSYSTEM_VOICE.length; i++) {
      const line = ECOSYSTEM_VOICE[i];

      // Reveal nodes progressively during narration
      if (i === 2) setRevealedNodes(prev => new Set([...prev, 'products']));
      if (i === 3) setRevealedNodes(prev => new Set([...prev, 'engineering', 'website']));
      if (i === 4) setRevealedNodes(prev => new Set([...prev, 'workspace']));
      if (i === 5) setRevealedNodes(prev => new Set([...prev, 'suppliers', 'operations']));
      if (i === 6) setRevealedNodes(prev => new Set([...prev, 'growth', 'scale']));

      await villainVoice.speak(line, {
        pauseAfter: [7, 8, 9].includes(i) ? 1200 : 650,
      });
    }
  };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 select-none overflow-hidden bg-[#020000]"
      onMouseEnter={handleNarrateEcosystem}
    >
      {/* ── CINEMATIC ATMOSPHERE ───────────────────────── */}
      {/* Faint background red core */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[#e8161e]/10 blur-[100px] pointer-events-none" />

      {/* Radar sweep background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(232, 22, 30, 0.25) 100%)',
        }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(232,22,30,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,22,30,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 opacity-30" />

      {/* ── HEADER ──────────────────────────────────────── */}
      <div className="text-center max-w-3xl mb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#e8161e]/40 bg-[#e8161e]/5 text-mono text-[10px] tracking-[0.4em] text-[#ff4d55] font-bold mb-6 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 bg-[#e8161e] shadow-[0_0_8px_#e8161e] animate-pulse" />
          ONE ECOSYSTEM // INFINITE CAPABILITY
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-display text-4xl sm:text-6xl md:text-7xl tracking-[0.15em] text-white"
        >
          EVERYTHING <span className="text-[#e8161e] drop-shadow-[0_0_30px_rgba(232,22,30,0.5)]">CONNECTED.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-neutral-400 font-light tracking-[0.1em] max-w-xl mx-auto"
        >
          Hover to begin the narration — experience the architecture building around your idea.
        </motion.p>
      </div>

      {/* ── TACTICAL ECOSYSTEM MAP ───────────────────────── */}
      <div className="relative w-full max-w-4xl h-[560px] sm:h-[640px] flex items-center justify-center">
        
        {/* Connection Lines (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="-300 -300 600 600"
        >
          {/* Orbital Rings */}
          <circle cx="0" cy="0" r="210" fill="none" stroke="#200609" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="0" cy="0" r="140" fill="none" stroke="#180408" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="100" fill="none" stroke="#e8161e" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="2 4" />

          {/* Node Connections */}
          {NODES.map(node => {
            const rad = (node.angle * Math.PI) / 180;
            const iw = typeof window !== 'undefined' ? window.innerWidth : 800;
            const r  = iw < 640 ? 150 : 210;
            const nx = Math.cos(rad) * r;
            const ny = Math.sin(rad) * r;
            const isActive = activeNode?.id === node.id;
            const isRevealed = revealedNodes.has(node.id);

            return (
              <g key={node.id}>
                {/* Data line */}
                <motion.line
                  x1="0" y1="0" x2={nx} y2={ny}
                  stroke={isActive ? '#e8161e' : isRevealed ? '#4a060a' : '#1a0305'}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray="4 6"
                  animate={{ strokeDashoffset: isActive ? [0, -24] : 0 }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                  className="transition-colors duration-300"
                />
                {/* Connection point */}
                {isActive && (
                  <circle cx={nx * 0.4} cy={ny * 0.4} r="3" fill="#e8161e" className="animate-ping" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Core Reactor */}
        <div className="relative z-20 flex flex-col items-center justify-center cursor-pointer">
          {/* Rotating complex rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full border-t-2 border-r-2 border-transparent border-l-[#e8161e] border-b-[#e8161e] opacity-70"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full border border-dashed border-[#e8161e]/50"
          />
          
          {/* Solid Core with static shadow, animating a separate aura layer for performance */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center z-10">
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(232,22,30,0.8),inset_0_0_20px_rgba(232,22,30,0.5)] pointer-events-none"
            />
            <div className="absolute inset-0 rounded-full bg-[#050000] border-2 border-[#e8161e] shadow-[0_0_20px_rgba(232,22,30,0.3),inset_0_0_10px_rgba(232,22,30,0.2)]" />
            <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-mono text-[9px] tracking-[0.3em] text-[#e8161e] font-bold">ORIGIN</span>
              <span className="text-display text-base tracking-widest text-white mt-0.5">CORE</span>
              <div className="w-1.5 h-1.5 rounded-sm bg-[#e8161e] mt-2 animate-pulse shadow-[0_0_8px_#e8161e]" />
            </div>
          </div>
        </div>

        {/* Orbital Node Panels */}
        {NODES.map(node => {
          const rad = (node.angle * Math.PI) / 180;
          const iw = typeof window !== 'undefined' ? window.innerWidth : 800;
          const r  = iw < 640 ? 150 : 210;
          const nx = Math.cos(rad) * r;
          const ny = Math.sin(rad) * r;
          const isActive   = activeNode?.id === node.id;
          const isRevealed = revealedNodes.has(node.id);

          return (
            <div
              key={node.id}
              style={{ transform: `translate(${nx}px, ${ny}px)` }}
              onMouseEnter={() => {
                setActiveNode(node);
                audioEngine.playNodeTone(260 + (node.angle / 360) * 300);
              }}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute z-30 cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: isRevealed ? 1 : 0.15, scale: isRevealed ? 1 : 0.85 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.15, zIndex: 50 }}
                className={`relative flex items-center gap-3 p-3 sm:px-4 sm:py-3 border backdrop-blur-md transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'bg-[#150203]/90 border-[#e8161e] shadow-[0_0_30px_rgba(232,22,30,0.4)]'
                    : 'bg-[#050505]/80 border-neutral-800 hover:border-[#e8161e]/50'
                }`}
              >
                {/* Active tactical indicator line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${isActive ? 'bg-[#e8161e] shadow-[0_0_10px_#e8161e]' : 'bg-transparent'}`} />
                
                <div className={`p-1.5 transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_#e8161e]' : 'text-[#e8161e]'}`}>
                  {ICON_MAP[node.icon]}
                </div>
                
                <div className="flex flex-col">
                  <span className="text-display text-[10px] sm:text-xs tracking-widest text-white whitespace-nowrap">
                    {node.name}
                  </span>
                  <span className={`text-mono text-[8px] transition-colors duration-300 hidden sm:block tracking-widest ${isActive ? 'text-[#ff4d55]' : 'text-neutral-500'}`}>
                    [{node.status}]
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── ACTIVE NODE DATAPAD ─────────────────────────── */}
      <div className="relative z-20 min-h-[120px] w-full max-w-2xl mx-auto mt-8 px-4">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 bg-[#0a0001]/90 border-t-2 border-[#e8161e] border-b border-l border-r border-[#e8161e]/30 backdrop-blur-xl flex flex-col gap-3 shadow-[0_10px_40px_rgba(232,22,30,0.15)] relative overflow-hidden"
            >
              {/* Scanline overlay for the datapad */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)]" />

              <div className="flex items-center justify-between relative z-10">
                <span className="text-mono text-[11px] sm:text-xs text-[#e8161e] font-bold tracking-[0.3em]">
                  // {activeNode.category}
                </span>
                <span className="text-mono text-[10px] text-white uppercase tracking-widest bg-[#e8161e] px-2 py-0.5">
                  {activeNode.status}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-neutral-300 font-light tracking-wide leading-relaxed relative z-10">
                {activeNode.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                {activeNode.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-mono text-[10px] tracking-wider px-2 py-1 bg-[#200507] border border-[#e8161e]/30 text-neutral-300"
                  >
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 border border-neutral-900/80 bg-neutral-950/40 text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-[1px] bg-neutral-800" />
              <span className="text-mono text-[10px] tracking-[0.4em] text-neutral-600">
                [ WAITING FOR NODE SELECTION ]
              </span>
              <div className="w-12 h-[1px] bg-neutral-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
