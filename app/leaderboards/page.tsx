'use client';

import { motion } from 'framer-motion';
import { TrophyIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid';
import { Navbar } from '@/components/layout/navbar';

const leaderboardData = [
  { rank: 1, name: 'Ravi Kumar', score: 15420, mode: 'Traditional', avatar: '🎵' },
  { rank: 2, name: 'Priya Sharma', score: 14850, mode: 'Gamaka', avatar: '🎭' },
  { rank: 3, name: 'Arjun Patel', score: 14200, mode: 'One-Hand', avatar: '🤚' },
  { rank: 4, name: 'Meera Iyer', score: 13750, mode: 'Traditional', avatar: '🎵' },
  { rank: 5, name: 'Karthik Reddy', score: 13200, mode: 'Gamaka', avatar: '🎭' },
  { rank: 6, name: 'Anjali Nair', score: 12800, mode: 'One-Hand', avatar: '🤚' },
  { rank: 7, name: 'Vikram Singh', score: 12450, mode: 'Traditional', avatar: '🎵' },
  { rank: 8, name: 'Divya Krishnan', score: 12100, mode: 'Gamaka', avatar: '🎭' },
];

const categories = [
  { id: 'overall', name: 'Overall', icon: TrophyIcon },
  { id: 'traditional', name: 'Traditional', icon: StarIcon },
  { id: 'onehand', name: 'One-Hand', icon: FireIcon },
  { id: 'gamaka', name: 'Gamaka', icon: StarIcon },
];

export default function LeaderboardsPage() {
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
            Leaderboards
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how you rank among the RaagaRangam community
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-panel p-2 rounded-xl">
            <div className="flex space-x-2">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      index === 0
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {/* 2nd Place */}
          <div className="glass-panel p-6 text-center order-1">
            <div className="text-4xl mb-2">🥈</div>
            <div className="text-6xl mb-4">{leaderboardData[1].avatar}</div>
            <h3 className="text-xl font-bold text-white mb-2">{leaderboardData[1].name}</h3>
            <div className="text-2xl font-bold text-amber-300 mb-1">{leaderboardData[1].score.toLocaleString()}</div>
            <div className="text-sm text-gray-400">{leaderboardData[1].mode} Mode</div>
          </div>

          {/* 1st Place */}
          <div className="glass-panel p-8 text-center order-2 transform scale-110">
            <div className="text-5xl mb-2">👑</div>
            <div className="text-7xl mb-4">{leaderboardData[0].avatar}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{leaderboardData[0].name}</h3>
            <div className="text-3xl font-bold text-yellow-400 mb-1">{leaderboardData[0].score.toLocaleString()}</div>
            <div className="text-sm text-gray-400">{leaderboardData[0].mode} Mode</div>
          </div>

          {/* 3rd Place */}
          <div className="glass-panel p-6 text-center order-3">
            <div className="text-4xl mb-2">🥉</div>
            <div className="text-6xl mb-4">{leaderboardData[2].avatar}</div>
            <h3 className="text-xl font-bold text-white mb-2">{leaderboardData[2].name}</h3>
            <div className="text-2xl font-bold text-amber-300 mb-1">{leaderboardData[2].score.toLocaleString()}</div>
            <div className="text-sm text-gray-400">{leaderboardData[2].mode} Mode</div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-amber-300">Full Rankings</h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {leaderboardData.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`p-4 flex items-center justify-between hover:bg-white/5 transition-colors ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold w-8 text-center ${
                    player.rank === 1 ? 'text-yellow-400' :
                    player.rank === 2 ? 'text-gray-300' :
                    player.rank === 3 ? 'text-amber-600' :
                    'text-gray-400'
                  }`}>
                    {player.rank}
                  </div>
                  <div className="text-3xl">{player.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{player.name}</div>
                    <div className="text-sm text-gray-400">{player.mode} Mode</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-amber-300">
                    {player.score.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}