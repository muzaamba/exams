'use client';

import { useState, useEffect } from 'react';
import { Users, Play, Copy, Check, LogOut, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export default function MultiplayerLobby({ roomCode, onStart }) {
  const { user, profile } = useAuth();
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomCode) return;

    const fetchRoom = async () => {
      const { data, error } = await supabase
        .from('quiz_rooms')
        .select('*, host:host_user_id(*), quiz:quiz_id(*)')
        .eq('room_code', roomCode)
        .single();

      if (data) {
        setRoom(data);
        subscribeToRoom(data.id);
      }
      setLoading(false);
    };

    fetchRoom();
  }, [roomCode]);

  const subscribeToRoom = (roomId) => {
    // 1. Listen for player joins/leaves
    const channel = supabase.channel(`room:${roomId}`, {
      config: { presence: { key: user.id } }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const playersList = Object.values(state).flat();
        setPlayers(playersList);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('Joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('Left:', leftPresences);
      })
      .on('broadcast', { event: 'start_quiz' }, () => {
        onStart();
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            name: profile?.full_name || user.email,
            avatar: profile?.avatar_url,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const startGame = async () => {
    if (room?.host_user_id !== user.id) return;
    
    // Broadcast start to everyone
    await supabase.channel(`room:${room.id}`).send({
      type: 'broadcast',
      event: 'start_quiz',
    });

    // Update room status
    await supabase.from('quiz_rooms').update({ status: 'playing' }).eq('id', room.id);
    
    onStart();
  };

  if (loading) return <div className="text-center py-20 text-muted">Loading lobby...</div>;

  const isHost = room?.host_user_id === user.id;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-scale-in">
      <div className="text-center space-y-2">
        <Badge color="primary" className="mb-2">Multiplayer Lobby</Badge>
        <h1 className="text-3xl font-black">{room?.quiz?.title || 'Custom Quiz'}</h1>
        <p className="text-muted">Invite your friends to compete live!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Room Info */}
        <Card className="md:col-span-1 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Room Code</p>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-border group">
              <span className="text-xl font-mono font-black text-primary flex-1">{roomCode}</span>
              <button onClick={copyCode} className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                {isCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Settings</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Mode</span>
                <span className="font-bold capitalize">{room?.mode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Max Players</span>
                <span className="font-bold">{room?.max_players}</span>
              </div>
            </div>
          </div>

          {isHost ? (
            <Button 
              className="w-full" 
              icon={Play} 
              size="lg" 
              onClick={startGame}
              disabled={players.length < 2}
            >
              Start Game
            </Button>
          ) : (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <p className="text-sm font-medium animate-pulse">Waiting for host to start...</p>
            </div>
          )}
        </Card>

        {/* Players List */}
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <Users size={18} className="text-primary" />
              Players ({players.length}/{room?.max_players})
            </h3>
            <Badge color="green">Real-time</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {players.map((p, i) => (
              <div 
                key={p.user_id} 
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border transition-all animate-slide-in",
                  p.user_id === room.host_user_id ? "border-primary/30 bg-primary/5" : "border-border bg-surface/50"
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center text-white font-bold text-lg">
                  {p.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{p.name}</p>
                  <div className="flex items-center gap-1.5">
                    {p.user_id === room.host_user_id && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase">
                        <Shield size={10} /> Host
                      </span>
                    )}
                    <span className="text-[10px] text-muted">Ready</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty Slots */}
            {Array.from({ length: Math.max(0, (room?.max_players || 4) - players.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex items-center gap-3 p-4 rounded-2xl border border-border border-dashed opacity-40">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                  <Users size={16} className="text-muted" />
                </div>
                <div className="flex-1">
                  <div className="h-4 w-20 bg-surface rounded mb-1" />
                  <div className="h-3 w-12 bg-surface rounded" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
