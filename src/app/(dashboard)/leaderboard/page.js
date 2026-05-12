'use client';

import { useState } from 'react';
import { Trophy, Medal, Flame, TrendingUp } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

const leaderboardData = [
  { rank: 1, name: 'Abdirahman M.', xp: 4520, grade: 'Form 4', streak: 15, quizzes: 89, accuracy: 82 },
  { rank: 2, name: 'Hodan A.', xp: 3890, grade: 'Grade 8', streak: 12, quizzes: 76, accuracy: 85 },
  { rank: 3, name: 'Mohamed F.', xp: 3450, grade: 'Form 4', streak: 10, quizzes: 68, accuracy: 78 },
  { rank: 4, name: 'Fadumo H.', xp: 3120, grade: 'Grade 8', streak: 8, quizzes: 62, accuracy: 90 },
  { rank: 5, name: 'Ahmed O.', xp: 2980, grade: 'Form 4', streak: 7, quizzes: 55, accuracy: 75 },
  { rank: 6, name: 'Nasra I.', xp: 2750, grade: 'Form 4', streak: 6, quizzes: 50, accuracy: 80 },
  { rank: 7, name: 'Yusuf K.', xp: 2500, grade: 'Grade 8', streak: 5, quizzes: 48, accuracy: 72 },
  { rank: 8, name: 'Amina D.', xp: 2300, grade: 'Form 4', streak: 4, quizzes: 42, accuracy: 88 },
  { rank: 9, name: 'Hassan R.', xp: 2100, grade: 'Grade 8', streak: 3, quizzes: 38, accuracy: 76 },
  { rank: 10, name: 'Sahra M.', xp: 1950, grade: 'Form 4', streak: 3, quizzes: 35, accuracy: 82 },
];

const tabs = ['All Time', 'This Week', 'This Month'];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('All Time');

  const getRankStyle = (rank) => {
    if (rank === 1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (rank === 2) return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
    if (rank === 3) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-surface text-muted border-border';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          <Trophy className="inline mr-2 text-yellow-400" size={28} />
          Leaderboard
        </h1>
        <p className="text-muted">Top performers on Zeweno</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 items-end">
        {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((player, i) => {
          const heights = ['h-28', 'h-36', 'h-24'];
          const medals = ['🥈', '🥇', '🥉'];
          return (
            <div key={player.rank} className="text-center">
              <div className="text-3xl mb-2">{medals[i]}</div>
              <p className="font-bold text-sm truncate">{player.name}</p>
              <p className="text-xs text-primary font-bold">{player.xp.toLocaleString()} XP</p>
              <div className={`${heights[i]} mt-2 rounded-t-xl bg-gradient-to-t from-primary/20 to-primary/5 border-t-2 border-primary/30 flex items-end justify-center pb-2`}>
                <span className="text-xs text-muted">#{player.rank}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface rounded-xl p-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab ? 'bg-primary/10 text-primary' : 'text-muted hover:text-foreground'
            }`}>{tab}</button>
        ))}
      </div>

      {/* Table */}
      <Card hover={false} className="!p-2 overflow-hidden">
        {leaderboardData.map((player) => (
          <div key={player.rank} className={`flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-surface/50 ${player.rank <= 3 ? 'bg-primary/[0.02]' : ''}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border ${getRankStyle(player.rank)}`}>
              {player.rank}
            </div>
            <div className="w-9 h-9 rounded-lg animated-gradient flex items-center justify-center text-white font-bold text-sm">
              {player.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{player.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{player.grade}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><Flame size={10} className="text-orange-400" />{player.streak}d</span>
                <span>•</span>
                <span>{player.accuracy}% acc</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-primary">{player.xp.toLocaleString()}</p>
              <p className="text-xs text-muted">XP</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
