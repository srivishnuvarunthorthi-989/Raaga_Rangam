'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Music, 
  Hand, 
  Sparkles,
  Trophy,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

const gameModes = [
  {
    id: 'traditional',
    icon: Music,
    title: 'Traditional Mode',
    description: 'Master authentic finger mappings with customizable gesture controls',
    accuracy: 94,
    sessions: 23,
    bestScore: 1250,
    gradient: 'from-blue-500/20 to-purple-600/20',
    border: 'border-blue-500/30',
  },
  {
    id: 'onehand',
    icon: Hand,
    title: 'One-Hand Virtuoso',
    description: 'Advanced single-hand techniques for complete swara control',
    accuracy: 87,
    sessions: 15,
    bestScore: 980,
    gradient: 'from-green-500/20 to-teal-600/20',
    border: 'border-green-500/30',
  },
  {
    id: 'gamaka',
    icon: Sparkles,
    title: 'Gamaka Master',
    description: 'Express complex ornamentations and musical emotions',
    accuracy: 91,
    sessions: 18,
    bestScore: 1450,
    gradient: 'from-orange-500/20 to-red-600/20',
    border: 'border-orange-500/30',
  },
];

const statsCards = [
  { 
    icon: Trophy, 
    label: 'Total Score', 
    value: '12,450', 
    change: '+12%',
    color: 'text-amber-400' 
  },
  { 
    icon: Target, 
    label: 'Accuracy', 
    value: '94.2%', 
    change: '+2.1%',
    color: 'text-green-400' 
  },
  { 
    icon: Music, 
    label: 'Notes Played', 
    value: '2,847', 
    change: '+156',
    color: 'text-blue-400' 
  },
  { 
    icon: Award, 
    label: 'Skill Level', 
    value: 'Advanced', 
    change: 'Level 8',
    color: 'text-purple-400' 
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleModeSelect = (modeId: string) => {
    router.push(`/play/${modeId}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light tracking-tight text-white mb-2">
            Welcome back
          </h1>
          <p className="text-slate-300">
            Continue your Carnatic music journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="glass-card text-center"
              >
                <IconComponent className={`h-6 w-6 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-medium text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-green-400">
                  {stat.change}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Game Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-medium text-white mb-6">
            Choose Your Mode
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {gameModes.map((mode, index) => {
              const IconComponent = mode.icon;
              return (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={() => handleModeSelect(mode.id)}
                  className={`glass-card cursor-pointer group relative overflow-hidden border ${mode.border}`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Best Score</div>
                        <div className="text-lg font-medium text-white">
                          {mode.bestScore.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-medium text-white mb-2">
                      {mode.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {mode.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-xs text-slate-400">Accuracy</div>
                        <div className="text-sm font-medium text-white">
                          {mode.accuracy}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Sessions</div>
                        <div className="text-sm font-medium text-white">
                          {mode.sessions}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{mode.accuracy}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${mode.accuracy}%` }}
                        />
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full"
                    >
                      Play {mode.title}
                    </motion.button>
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
          transition={{ delay: 0.5 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-white">Recent Activity</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          
          <div className="space-y-4">
            {[
              { 
                mode: 'Traditional', 
                raga: 'Mayamalavagowla', 
                score: 1250, 
                accuracy: 94,
                time: '2 hours ago' 
              },
              { 
                mode: 'One-Hand', 
                raga: 'Mohanam', 
                score: 980, 
                accuracy: 87,
                time: '1 day ago' 
              },
              { 
                mode: 'Gamaka', 
                raga: 'Kalyani', 
                score: 1450, 
                accuracy: 91,
                time: '2 days ago' 
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {activity.mode} Mode
                    </div>
                    <div className="text-sm text-slate-400">
                      Raga: {activity.raga}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">
                    {activity.score} pts
                  </div>
                  <div className="text-sm text-slate-400">
                    {activity.accuracy}% • {activity.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}