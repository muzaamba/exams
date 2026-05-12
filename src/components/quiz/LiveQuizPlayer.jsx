'use client';

import { useState, useEffect } from 'react';
import { Trophy, Clock, Zap, Target, Users, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { CircularProgress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function LiveQuizPlayer({ roomCode, questions }) {
  const { user, profile } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState({});
  const [timeLeft, setTimeLeft] = useState(20);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (finished) return;

    const channel = supabase.channel(`live:${roomCode}`);

    channel
      .on('broadcast', { event: 'player_score' }, ({ payload }) => {
        setScores(prev => ({
          ...prev,
          [payload.user_id]: {
            name: payload.name,
            score: payload.score,
            isCorrect: payload.isCorrect
          }
        }));
      })
      .on('broadcast', { event: 'next_question' }, ({ payload }) => {
        setCurrentQ(payload.index);
        setSelectedAnswer(null);
        setRevealed(false);
        setTimeLeft(20);
      })
      .subscribe();

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          revealAnswers();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      channel.unsubscribe();
    };
  }, [currentQ, finished]);

  const revealAnswers = () => {
    setRevealed(true);
    // Automatically move to next after 3 seconds if host? 
    // In this MVP, everyone follows the timer.
  };

  const submitAnswer = async (letter) => {
    if (revealed || selectedAnswer) return;
    
    const isCorrect = letter === question.correct_answer;
    setSelectedAnswer(letter);
    
    // Calculate score based on time left (speed bonus)
    const points = isCorrect ? 100 + (timeLeft * 5) : 0;
    const newScore = (scores[user.id]?.score || 0) + points;

    // Broadcast score update
    await supabase.channel(`live:${roomCode}`).send({
      type: 'broadcast',
      event: 'player_score',
      payload: {
        user_id: user.id,
        name: profile?.full_name || user.email,
        score: newScore,
        isCorrect
      }
    });

    if (currentQ === totalQuestions - 1) {
      setTimeout(() => {
        setFinished(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#10B981', '#F59E0B']
        });
      }, 3000);
    }
  };

  const sortedLeaderboard = Object.entries(scores)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 5);

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-scale-in py-12">
        <div className="text-center space-y-4">
          <div className="text-7xl">🏆</div>
          <h1 className="text-4xl font-black">Final Leaderboard</h1>
          <p className="text-muted">Great competition! Here are the winners.</p>
        </div>

        <div className="space-y-3">
          {sortedLeaderboard.map(([id, data], i) => (
            <div key={id} className={cn(
              "flex items-center gap-4 p-5 rounded-2xl border transition-all",
              id === user.id ? "border-primary bg-primary/10 scale-105" : "border-border bg-surface"
            )}>
              <span className="text-2xl font-black w-8">{i + 1}</span>
              <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center text-white font-bold">
                {data.name[0]}
              </div>
              <span className="flex-1 font-bold text-lg">{data.name}</span>
              <span className="text-2xl font-black text-primary">{data.score}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-3 mt-8">
          <Button icon={Trophy} onClick={() => window.location.href = '/quizzes'}>Back to Quizzes</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Quiz Area */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-surface border-2 border-primary/20 flex items-center justify-center">
                <span className={cn("text-2xl font-black", timeLeft < 5 ? "text-red-500 animate-ping" : "text-primary")}>
                  {timeLeft}
                </span>
             </div>
             <div>
                <h3 className="font-bold">Question {currentQ + 1}</h3>
                <p className="text-xs text-muted">of {totalQuestions}</p>
             </div>
          </div>
          <div className="flex -space-x-2">
            {Object.keys(scores).map((id, i) => (
              <div key={id} className="w-8 h-8 rounded-full border-2 border-bg bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                {scores[id].name[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-surface">
            <div 
              className="h-full bg-primary transition-all duration-1000 linear" 
              style={{ width: `${(timeLeft / 20) * 100}%` }} 
            />
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-8">
            {question.question_text}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['A', 'B', 'C', 'D'].map((letter) => {
              const text = question[`option_${letter.toLowerCase()}`];
              const isSelected = selectedAnswer === letter;
              const isCorrect = letter === question.correct_answer;
              
              let styles = "border-border hover:border-primary hover:scale-[1.02]";
              if (revealed) {
                if (isCorrect) styles = "border-green-500 bg-green-500/20 scale-105";
                else if (isSelected) styles = "border-red-500 bg-red-500/20 opacity-50";
                else styles = "opacity-30";
              } else if (isSelected) {
                styles = "border-primary bg-primary/10 ring-4 ring-primary/20";
              }

              return (
                <button
                  key={letter}
                  onClick={() => submitAnswer(letter)}
                  disabled={revealed || !!selectedAnswer}
                  className={cn(
                    "flex items-center gap-4 p-6 rounded-3xl border-2 text-left transition-all relative group",
                    styles
                  )}
                >
                  <span className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center font-black text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    {letter}
                  </span>
                  <span className="text-lg font-bold">{text}</span>
                  {revealed && isCorrect && <CheckCircle className="ml-auto text-green-500" size={24} />}
                  {revealed && isSelected && !isCorrect && <XCircle className="ml-auto text-red-500" size={24} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-time Leaderboard Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Users size={18} className="text-primary" />
          Live Ranking
        </h3>
        <div className="space-y-2">
          {sortedLeaderboard.map(([id, data], i) => (
            <div 
              key={id} 
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl border transition-all animate-slide-up",
                id === user.id ? "border-primary/50 bg-primary/5" : "border-border bg-surface"
              )}
            >
              <span className="font-black text-muted text-sm w-4">{i + 1}</span>
              <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center text-white text-xs font-bold">
                {data.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{data.name}</p>
                <p className="text-[10px] text-muted">{data.score} pts</p>
              </div>
              {data.isCorrect !== undefined && revealed && (
                 data.isCorrect ? <Zap size={14} className="text-yellow-400" /> : <div className="w-1 h-1 bg-red-500 rounded-full" />
              )}
            </div>
          ))}
        </div>

        <Card className="!p-4 bg-primary/5 border-primary/20">
          <p className="text-xs text-muted mb-2">Pro Tip</p>
          <p className="text-sm font-medium">Faster answers earn up to <span className="text-primary">+100</span> bonus points!</p>
        </Card>
      </div>
    </div>
  );
}
