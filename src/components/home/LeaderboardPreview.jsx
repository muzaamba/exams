'use client';

import { Trophy, Medal, Award } from 'lucide-react';

const leaders = [
  { rank: 1, name: 'Abdirahman M.', xp: 4520, grade: 'Form 4', streak: 15, avatar: '🏆' },
  { rank: 2, name: 'Hodan A.', xp: 3890, grade: 'Grade 8', streak: 12, avatar: '🥈' },
  { rank: 3, name: 'Mohamed F.', xp: 3450, grade: 'Form 4', streak: 10, avatar: '🥉' },
  { rank: 4, name: 'Fadumo H.', xp: 3120, grade: 'Grade 8', streak: 8, avatar: '⭐' },
  { rank: 5, name: 'Ahmed O.', xp: 2980, grade: 'Form 4', streak: 7, avatar: '⭐' },
];

export default function LeaderboardPreview() {
  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <div className="container-main">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Leaderboard</span>
            </h2>
            <p className="text-muted">Top students this week</p>
          </div>

          <div className="glass-card p-2 overflow-hidden">
            {leaders.map((leader, i) => (
              <div
                key={leader.rank}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  i === 0 ? 'bg-yellow-500/5' : 'hover:bg-surface/50'
                }`}
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  i === 1 ? 'bg-gray-400/20 text-gray-300' :
                  i === 2 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-surface text-muted'
                }`}>
                  {leader.rank}
                </div>

                {/* Avatar */}
                <div className="text-2xl">{leader.avatar}</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{leader.name}</p>
                  <p className="text-xs text-muted">{leader.grade} • 🔥 {leader.streak} day streak</p>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="font-bold text-sm text-primary">{leader.xp.toLocaleString()}</p>
                  <p className="text-xs text-muted">XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
