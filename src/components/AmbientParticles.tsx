'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  opacitySpeed: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = Math.min(28, Math.floor(W / 52));
    const COLORS = [
      'rgba(220,12,20,',
      'rgba(160,5,12,',
      'rgba(255,80,88,',
      'rgba(110,110,118,',
    ];

    const spawn = (existing?: Particle): Particle => ({
      x: existing?.x ?? Math.random() * W,
      y: H + 10,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.5 + 0.18),
      size: Math.random() * 1.8 + 0.5,
      opacity: 0,
      opacitySpeed: Math.random() * 0.005 + 0.002,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: Math.random() * 240 + 120,
    });

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      ...spawn(),
      y: Math.random() * H,     // scatter initial positions
      opacity: Math.random() * 0.45,
      life: Math.random() * 180,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.opacity = Math.min(0.65, p.opacity + p.opacitySpeed);

        // Fade-out near end of life
        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (1 - Math.pow(lifeRatio, 2));

        if (p.life >= p.maxLife || p.y < -10) {
          Object.assign(particles[i], spawn(p));
          continue;
        }

        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, alpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5] opacity-60"
    />
  );
}
