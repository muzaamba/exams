'use client';

import { Trophy, Medal, Award } from 'lucide-react';

import { Trophy, Medal, Award, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LeaderboardPreview() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('xp', { ascending: false })
          .limit(5);
        
        if (!error) setLeaders(data || []);
      } catch (err) {
        console.error('Error fetching leaders preview:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaders();
  }, [supabase]);

  const avatars = ['🏆', '🥈', '🥉', '⭐', '⭐'];

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
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="animate-spin text-primary" size={32} />
                <p className="text-muted text-xs font-medium">Loading rankings...</p>
              </div>
            ) : leaders.length > 0 ? (
              leaders.map((leader, i) => (
                <div
                  key={leader.id}
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
                    {i + 1}
                  </div>

                  {/* Avatar */}
                  <div className="text-2xl">{avatars[i]}</div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{leader.full_name || 'Anonymous'}</p>
                    <p className="text-xs text-muted">{leader.grade || 'Form 4'} • 🔥 {leader.study_streak || 0} day streak</p>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <p className="font-bold text-sm text-primary">{(leader.xp || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted">XP</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm text-muted">No rankings available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
