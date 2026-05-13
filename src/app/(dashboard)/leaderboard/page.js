'use client';

import { useState, useEffect, useMemo } from 'react';
import { Trophy, Medal, Flame, TrendingUp, Loader2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/client';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('All Time');
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchLeaders() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('xp', { ascending: false })
          .limit(50);
        
        if (!error) setLeaders(data || []);
      } catch (err) {
        console.error('Error fetching leaders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaders();
  }, [supabase]);

  const getRankStyle = (rank) => {
    if (rank === 1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (rank === 2) return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
    if (rank === 3) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-surface text-muted border-border';
  };

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          <Trophy className="inline mr-2 text-yellow-400" size={28} />
          Leaderboard
        </h1>
        <p className="text-muted">Top performers on Zeweno</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-muted text-sm font-medium">Calculating rankings...</p>
        </div>
      ) : leaders.length > 0 ? (
        <>
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-3 items-end">
            {[top3[1], top3[0], top3[2]].map((player, i) => {
              if (!player) return <div key={i} className="flex-1" />;
              const heights = ['h-28', 'h-36', 'h-24'];
              const medals = ['🥈', '🥇', '🥉'];
              const actualRank = leaders.indexOf(player) + 1;
              return (
                <div key={player.id} className="text-center">
                  <div className="text-3xl mb-2">{medals[i]}</div>
                  <p className="font-bold text-sm truncate">{player.full_name || 'Student'}</p>
                  <p className="text-xs text-primary font-bold">{(player.xp || 0).toLocaleString()} XP</p>
                  <div className={`${heights[i]} mt-2 rounded-t-xl bg-gradient-to-t from-primary/20 to-primary/5 border-t-2 border-primary/30 flex items-end justify-center pb-2`}>
                    <span className="text-xs text-muted">#{actualRank}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table */}
          <Card hover={false} className="!p-2 overflow-hidden">
            {leaders.map((player, i) => (
              <div key={player.id} className={`flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-surface/50 ${i < 3 ? 'bg-primary/[0.02]' : ''}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border ${getRankStyle(i + 1)}`}>
                  {i + 1}
                </div>
                <div className="w-9 h-9 rounded-lg animated-gradient flex items-center justify-center text-white font-bold text-sm">
                  {(player.full_name || player.email || 'S')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{player.full_name || 'Anonymous Student'}</p>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="uppercase">{player.grade || 'Form 4'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Flame size={10} className="text-orange-400" />{player.study_streak || 0}d</span>
                    <span>•</span>
                    <span>{player.accuracy || 0}% acc</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-primary">{(player.xp || 0).toLocaleString()}</p>
                  <p className="text-xs text-muted">XP</p>
                </div>
              </div>
            ))}
          </Card>
        </>
      ) : (
        <div className="text-center py-20 glass-card">
          <Trophy className="mx-auto text-muted mb-4" size={48} />
          <h3 className="font-bold text-lg">No Rankings Yet</h3>
          <p className="text-sm text-muted">Be the first to earn XP and claim the top spot!</p>
        </div>
      )}
    </div>
  );
}
