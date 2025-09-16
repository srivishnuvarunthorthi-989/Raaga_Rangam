'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  MusicalNoteIcon, 
  HandRaisedIcon, 
  SparklesIcon,
  TrophyIcon,
  ChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '@/components/layout/navbar';
import { useLanguage } from '@/contexts/language-context';

const gameModes = [
  {
    id: 'traditional',
    icon: MusicalNoteIcon,
    emoji: '🎵',
    title: 'Traditional Mode',
    description: 'Customizable finger mappings for authentic playing',
    gradient: 'from-blue-500 to-purple-600',
    delay: 0.2,
  },
  {
    id: 'onehand',
    icon: HandRaisedIcon,
    emoji: '🤚',
    title: 'One-Hand Virtuoso',
    description: 'Master all swaras with single-hand gestures',
    gradient: 'from-green-500 to-teal-600',
    delay: 0.4,
  },
  {
    id: 'gamaka',
    icon: SparklesIcon,
    emoji: '🎭',
    title: 'Gamaka Master',
    description: 'Advanced ornamentations and expressions',
    gradient: 'from-orange-500 to-red-600',
    delay: 0.6,
  },
];

const statsCards = [
  { icon: TrophyIcon, label: 'Total Score', value: '12,450', color: 'text-yellow-400' },
  { icon: ChartBarIcon, label: 'Accuracy', value: '94.2%', color: 'text-green-400' },
  { icon: MusicalNoteIcon, label: 'Notes Played', value: '2,847', color: 'text-blue-400' },
  { icon: UserIcon, label: 'Skill Level', value: 'Advanced', color: 'text-purple-400' },
];

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const handleModeSelect = (modeId: string) => {
    if (modeId === 'traditional') {
      router.push('/play/traditional');
    } else {
      alert(`${modeId} mode coming soon!`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Continue your Carnatic music journey. Choose a mode to start playing.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="glass-panel p-4 text-center">
                <IconComponent className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Game Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
            Choose Your Mode
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {gameModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: mode.delay }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => handleModeSelect(mode.id)}
                  className="glass-panel p-8 text-center group cursor-pointer relative overflow-hidden"
                >
                  {/* Background Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Mode Icon */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-6xl mb-4 floating-animation">
                      {mode.emoji}
                    </div>
                    <div className="text-yellow-400 mx-auto">
                      <IconComponent className="h-8 w-8 mx-auto" />
                    </div>
                  </motion.div>

                  {/* Mode Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {mode.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {mode.description}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Play {mode.title}
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
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6 rounded-xl"
        >
          <h3 className="text-2xl font-bold text-amber-300 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { mode: 'Traditional', raga: 'Mayamalavagowla', score: 1250, time: '2 hours ago' },
              { mode: 'One-Hand', raga: 'Mohanam', score: 980, time: '1 day ago' },
              { mode: 'Gamaka', raga: 'Kalyani', score: 1450, time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="font-semibold text-white">{activity.mode} Mode</div>
                  <div className="text-sm text-gray-400">Raga: {activity.raga}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-amber-300">{activity.score} pts</div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}