'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { HandRaisedIcon, MusicalNoteIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    id: 'traditional',
    icon: MusicalNoteIcon,
    emoji: '🎵',
    gradient: 'from-blue-500 to-purple-600',
    delay: 0.2,
  },
  {
    id: 'onehand',
    icon: HandRaisedIcon,
    emoji: '🤚',
    gradient: 'from-green-500 to-teal-600',
    delay: 0.4,
  },
  {
    id: 'gamaka',
    icon: SparklesIcon,
    emoji: '🎭',
    gradient: 'from-orange-500 to-red-600',
    delay: 0.6,
  },
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Three Ways to Master Carnatic Music
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your learning path and discover the beauty of Indian classical music through innovative gesture controls
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-panel p-8 text-center group cursor-pointer relative overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Feature Icon */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-6xl mb-4 floating-animation">
                    {feature.emoji}
                  </div>
                  <div className="text-yellow-400 mx-auto">
                    <IconComponent className="h-8 w-8 mx-auto" />
                  </div>
                </motion.div>

                {/* Feature Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(`features.${feature.id}.title`)}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {t(`features.${feature.id}.description`)}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary"
                  >
                    Try {t(`features.${feature.id}.title`)}
                  </motion.button>
                </div>

                {/* Hover Effect Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}