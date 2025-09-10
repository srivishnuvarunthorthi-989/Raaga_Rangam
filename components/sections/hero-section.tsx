'use client';

import { motion } from 'framer-motion';
import { PlayIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/contexts/language-context';
import { FloatingNotes } from '@/components/ui/floating-notes';
import Link from 'next/link';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingNotes />
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="gradient-text glow-effect pulse-glow">
            {t('hero.title')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-yellow-200 mb-4 font-medium"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/dashboard">
            <motion.button
              className="btn-primary flex items-center space-x-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('hero.cta.primary')}</span>
              <ArrowRightIcon className="h-5 w-5" />
            </motion.button>
          </Link>

          <motion.button
            className="btn-secondary flex items-center space-x-3 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlayIcon className="h-5 w-5" />
            <span>{t('hero.cta.secondary')}</span>
          </motion.button>
        </motion.div>

        {/* Interactive Demo Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 glass-panel p-8 max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-yellow-300 mb-2">Experience RaagaRangam</h3>
            <p className="text-gray-300">Try our mini gesture recognition demo</p>
          </div>
          
          {/* Demo Placeholder - Will be replaced with actual gesture demo */}
          <div className="bg-black/30 rounded-xl h-64 flex items-center justify-center border border-yellow-400/20">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎵
              </motion.div>
              <p className="text-yellow-300 font-medium">Mini Demo Coming Soon</p>
              <p className="text-gray-400 text-sm">Interactive gesture recognition preview</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}