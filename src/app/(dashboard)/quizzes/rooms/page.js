'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Users, Search, ArrowRight, Play, Swords, Group, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import MultiplayerLobby from '@/components/quiz/MultiplayerLobby';
import LiveQuizPlayer from '@/components/quiz/LiveQuizPlayer';
import { SUBJECTS } from '@/lib/constants';

const sampleQuestions = [
  { id: 1, question_text: 'Waa maxay macnaha erayga "Barwaaqo"?', option_a: 'Abaar', option_b: 'Nabadgelyo iyo barako', option_c: 'Dagaal', option_d: 'Safar', correct_answer: 'B' },
  { id: 2, question_text: 'Solve: 2x + 5 = 15. What is x?', option_a: '3', option_b: '5', option_c: '7', option_d: '10', correct_answer: 'B' },
  { id: 3, question_text: 'What is the powerhouse of the cell?', option_a: 'Nucleus', option_b: 'Ribosome', option_c: 'Mitochondria', option_d: 'Golgi body', correct_answer: 'C' },
];

export default function RoomsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const [activeRoom, setActiveRoom] = useState(null);
  const [view, setView] = useState('list'); // list, lobby, playing
  const [loading, setLoading] = useState(false);

  const createRoom = async (mode = 'battle') => {
    setLoading(true);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { data, error } = await supabase
      .from('quiz_rooms')
      .insert({
        host_user_id: user.id,
        room_code: code,
        mode,
        status: 'lobby',
        max_players: mode === 'battle' ? 2 : 4
      })
      .select()
      .single();

    if (data) {
      setRoomCode(code);
      setActiveRoom(data);
      setView('lobby');
    }
    setLoading(false);
  };

  const joinRoom = async (e) => {
    e?.preventDefault();
    if (!roomCode) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('quiz_rooms')
      .select('*')
      .eq('room_code', roomCode.toUpperCase())
      .single();

    if (data) {
      setActiveRoom(data);
      setView('lobby');
    } else {
      alert('Room not found');
    }
    setLoading(false);
  };

  if (view === 'lobby') {
    return (
      <div className="py-8">
        <MultiplayerLobby 
          roomCode={roomCode || activeRoom?.room_code} 
          onStart={() => setView('playing')} 
        />
      </div>
    );
  }

  if (view === 'playing') {
    return (
      <div className="py-8">
        <LiveQuizPlayer 
          roomCode={roomCode || activeRoom?.room_code} 
          questions={sampleQuestions} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black">Quiz Rooms</h1>
        <p className="text-muted">La tartan asxaabtaada ama samee qol revision ah oo aad si wadajir ah ugu xallisaan quizyada.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Join Room */}
        <Card className="flex flex-col justify-between group overflow-hidden">
          <div className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110">
              <Share2 size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Join a Room</h3>
            <p className="text-sm text-muted mb-6">Enter a code from a friend to start playing together.</p>
            
            <form onSubmit={joinRoom} className="space-y-3">
              <input
                type="text"
                placeholder="ENTER CODE"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full text-center text-2xl font-black tracking-widest p-4 rounded-2xl bg-surface border-2 border-border focus:border-primary focus:outline-none transition-all"
              />
              <Button 
                type="submit" 
                className="w-full" 
                size="lg" 
                loading={loading}
                disabled={!roomCode}
              >
                Join Now
              </Button>
            </form>
          </div>
        </Card>

        {/* Create Room */}
        <Card className="p-6 space-y-6">
          <h3 className="text-2xl font-bold">Create New Room</h3>
          <div className="space-y-3">
            <button 
              onClick={() => createRoom('battle')}
              className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Swords size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold">1v1 Battle</p>
                  <p className="text-xs text-muted">Direct challenge for 2 players</p>
                </div>
              </div>
              <ArrowRight className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
            </button>

            <button 
              onClick={() => createRoom('group')}
              className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Group size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold">Group Battle</p>
                  <p className="text-xs text-muted">Up to 4 players competing</p>
                </div>
              </div>
              <ArrowRight className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
            </button>

            <button 
              onClick={() => createRoom('collab')}
              className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                  <Users size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold">Collab Revision</p>
                  <p className="text-xs text-muted">Solve together and share knowledge</p>
                </div>
              </div>
              <ArrowRight className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
            </button>
          </div>
        </Card>
      </div>

      {/* Online Now Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold animate-pulse">
           <div className="w-2 h-2 rounded-full bg-green-500" />
           2,450 students online right now
        </div>
      </div>
    </div>
  );
}
