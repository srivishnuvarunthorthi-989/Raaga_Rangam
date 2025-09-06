'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface ParticleSystemProps {
  width: number;
  height: number;
  triggerPosition?: { x: number; y: number };
}

export function ParticleSystem({ width, height, triggerPosition }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (triggerPosition) {
      createParticles(triggerPosition.x, triggerPosition.y);
    }
  }, [triggerPosition]);

  const createParticles = (x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        x: x * width,
        y: y * height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 8 + 2,
        color: `hsl(${Math.random() * 60 + 30}, 100%, 75%)`,
        opacity: 1
      });
    }
    particlesRef.current.push(...newParticles);
  };

  const updateAndDrawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    particlesRef.current.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.opacity -= 0.03;
      particle.size *= 0.97;

      if (particle.opacity <= 0) {
        particlesRef.current.splice(index, 1);
      } else {
        ctx.beginPath();
        ctx.fillStyle = `${particle.color.slice(0, -1)}, ${particle.opacity})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    animationRef.current = requestAnimationFrame(updateAndDrawParticles);
  };

  useEffect(() => {
    updateAndDrawParticles();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ transform: 'scaleX(-1)' }}
    />
  );
}