'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { FloatingParticles } from '@/components/ui/floating-particles';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-tight logo-glow mb-4">
            RaagaRangam
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light">
            Master Carnatic Music Through Technology
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Link href="/dashboard">
            <motion.button
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3 shadow-elevated"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Three Mode Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              title: 'Traditional Mode',
              description: 'Master authentic finger mappings with customizable gesture controls',
              icon: '🎵',
              href: '/play/traditional'
            },
            {
              title: 'One-Hand Virtuoso',
              description: 'Advanced single-hand techniques for complete swara control',
              icon: '🤚',
              href: '/play/onehand'
            },
            {
              title: 'Gamaka Master',
              description: 'Express complex ornamentations and musical emotions',
              icon: '🎭',
              href: '/play/gamaka'
            }
          ].map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              whileHover={{ y: -2 }}
              className="glass-card text-center group cursor-pointer"
            >
              <div className="text-4xl mb-4 float-gentle">
                {mode.icon}
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {mode.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {mode.description}
              </p>
              <Link href={mode.href}>
                <button className="btn-text text-sm">
                  Explore Mode →
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mini Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="glass-card max-w-2xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-medium text-white mb-2">
              Experience Live Demo
            </h3>
            <p className="text-slate-300 text-sm">
              Try our gesture recognition technology
            </p>
          </div>
          
          <div className="bg-black/30 rounded-lg h-48 flex items-center justify-center border border-white/5 mb-6">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-3"
              >
                🎵
              </motion.div>
              <p className="text-slate-400 text-sm">Interactive Demo</p>
            </div>
          </div>
          
          <Link href="/play/traditional">
            <motion.button
              className="btn-secondary w-full inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Play className="w-4 h-4" />
              Try Traditional Mode
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}