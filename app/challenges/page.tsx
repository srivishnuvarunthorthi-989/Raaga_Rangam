'use client';

import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  TrophyIcon, 
  ClockIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '@/components/layout/navbar';

const dailyChallenges = [
  {
    id: 1,
    title: 'Raga Mastery',
    description: 'Play 50 perfect notes in Mayamalavagowla',
    progress: 32,
    total: 50,
    reward: 500,
    timeLeft: '4h 23m',
    difficulty: 'Medium',
    icon: '🎵'
  },
  {
    id: 2,
    title: 'Speed Demon',
    description: 'Complete a sequence in under 30 seconds',
    progress: 0,
    total: 1,
    reward: 750,
    timeLeft: '4h 23m',
    difficulty: 'Hard',
    icon: '⚡'
  },
  {
    id: 3,
    title: 'Gamaka Explorer',
    description: 'Perform 10 different gamakas',
    progress: 6,
    total: 10,
    reward: 300,
    timeLeft: '4h 23m',
    difficulty: 'Easy',
    icon: '🎭'
  }
];

const weeklyChallenges = [
  {
    id: 4,
    title: 'Raga Journey',
    description: 'Master 5 different ragas this week',
    progress: 2,
    total: 5,
    reward: 2000,
    timeLeft: '3d 12h',
    difficulty: 'Hard',
    icon: '🌟'
  },
  {
    id: 5,
    title: 'Consistency King',
    description: 'Play for 7 consecutive days',
    progress: 4,
    total: 7,
    reward: 1500,
    timeLeft: '3d 12h',
    difficulty: 'Medium',
    icon: '📅'
  }
];

const achievements = [
  { name: 'First Steps', description: 'Complete your first song', icon: '👶', unlocked: true },
  { name: 'Raga Master', description: 'Master 10 different ragas', icon: '🎓', unlocked: true },
  { name: 'Speed Virtuoso', description: 'Complete a song in record time', icon: '🏃', unlocked: false },
  { name: 'Perfect Pitch', description: 'Achieve 100% accuracy', icon: '🎯', unlocked: false },
];

export default function ChallengesPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Challenges
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your skills and earn rewards with daily and weekly challenges
          </p>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <CalendarDaysIcon className="h-8 w-8 text-amber-400 mr-3" />
            <h2 className="text-3xl font-bold text-amber-300">Daily Challenges</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{challenge.timeLeft}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrophyIcon className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-300 font-semibold">{challenge.reward} pts</span>
                  </div>
                  <span className={`text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <StarIcon className="h-8 w-8 text-purple-400 mr-3" />
            <h2 className="text-3xl font-bold text-purple-300">Weekly Challenges</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {weeklyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{challenge.icon}</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{challenge.timeLeft}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-300 mb-4">{challenge.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrophyIcon className="h-5 w-5 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-lg">{challenge.reward} pts</span>
                  </div>
                  <span className={`font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center mb-6">
            <FireIcon className="h-8 w-8 text-orange-400 mr-3" />
            <h2 className="text-3xl font-bold text-orange-300">Achievements</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className={`p-4 rounded-xl text-center transition-all ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30' 
                    : 'bg-gray-800/50 border border-gray-600/30'
                }`}
              >
                <div className={`text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-bold mb-1 ${achievement.unlocked ? 'text-amber-300' : 'text-gray-400'}`}>
                  {achievement.name}
                </h3>
                <p className={`text-xs ${achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-2 text-xs text-green-400 font-semibold">✓ Unlocked</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}