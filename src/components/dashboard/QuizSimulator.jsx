'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle, RotateCcw, Play, Loader2, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import { CircularProgress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export default function QuizSimulator({ examId, onExit }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizDone, setQuizDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchQuestions() {
      if (!examId || !supabase) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .eq('exam_id', examId)
          .in('question_type', ['mcq', 'vocabulary', 'grammar'])
          .order('question_number', { ascending: true });

        if (error) throw error;
        
        // Filter valid questions
        const validQuestions = (data || []).filter(q => q.option_a && q.option_b);
        setQuestions(validQuestions);
      } catch (err) {
        console.error('Error fetching quiz questions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [examId, supabase]);

  // Timer logic
  useEffect(() => {
    if (quizDone || questions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setQuizDone(true);
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizDone, questions.length]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-muted font-bold tracking-widest uppercase text-xs">Generating Simulator...</p>
    </div>
  );

  if (error || questions.length === 0) return (
    <div className="text-center py-20 glass-card">
      <h3 className="text-xl font-bold mb-2">No Quiz Data</h3>
      <p className="text-muted mb-6">This exam doesn't have multiple choice questions formatted for simulation yet.</p>
      <Button variant="secondary" onClick={onExit}>Go Back</Button>
    </div>
  );

  const question = questions[currentQ];
  const totalQuestions = questions.length;
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const selectAnswer = (letter) => {
    if (revealed) return;
    setAnswers({ ...answers, [question.id]: letter });
    setRevealed(true);
  };

  const nextQuestion = () => {
    setRevealed(false);
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setQuizDone(true);
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setRevealed(!!answers[questions[currentQ - 1].id]);
      setCurrentQ(currentQ - 1);
    }
  };

  const score = questions.reduce((acc, q) => acc + (answers[q.id] === (q.correct_answer || '').toUpperCase() ? 1 : 0), 0);
  const percentage = Math.round((score / totalQuestions) * 100);

  if (quizDone) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-scale-in">
        <div className="glass-card p-8 text-center border-primary/30">
          <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 60 ? '👏' : '💪'}</div>
          <h2 className="text-3xl font-black mb-2">Quiz Complete!</h2>
          <p className="text-muted mb-8 font-medium">You've mastered {percentage}% of this paper</p>

          <div className="flex justify-center mb-8">
            <CircularProgress value={score} max={totalQuestions} size={160} strokeWidth={12}
              color={percentage >= 80 ? '#22c55e' : percentage >= 60 ? '#f59e0b' : '#ef4444'}>
              <div className="text-center">
                <span className="text-4xl font-black">{percentage}%</span>
                <p className="text-xs text-muted font-bold uppercase">{score}/{totalQuestions}</p>
              </div>
            </CircularProgress>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20">
              <p className="text-2xl font-black text-green-400">{score}</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Correct</p>
            </div>
            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <p className="text-2xl font-black text-red-400">{totalQuestions - score}</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Mistakes</p>
            </div>
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="text-2xl font-black text-primary">+{score * 10}</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">XP Gained</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="secondary" icon={RotateCcw} onClick={() => {
              setAnswers({}); setCurrentQ(0); setQuizDone(false); setRevealed(false); setTimeLeft(600);
            }}>Retry Session</Button>
            <Button icon={ArrowLeft} onClick={onExit}>Exit to Subject</Button>
          </div>
        </div>
      </div>
    );
  }

  const options = [
    { letter: 'A', text: question.option_a },
    { letter: 'B', text: question.option_b },
    { letter: 'C', text: question.option_c },
    { letter: 'D', text: question.option_d },
  ].filter(o => o.text);

  const correctAnswerLetter = (question.correct_answer || '').toUpperCase();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Simulation Header */}
      <div className="flex items-center justify-between p-4 glass-card rounded-2xl border-primary/20">
        <button onClick={onExit} className="p-2 rounded-lg hover:bg-surface text-muted hover:text-foreground">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/5 border border-primary/20">
          <Clock size={16} className={timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-primary'} />
          <span className={`font-mono font-black ${timeLeft < 60 ? 'text-red-400' : 'text-primary'}`}>{formatTime(timeLeft)}</span>
        </div>
        <div className="text-xs font-black text-muted uppercase tracking-widest">
          Q {currentQ + 1} / {totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }} />
      </div>

      {/* Question Container */}
      <div className="glass-card p-6 sm:p-10 border-2 border-border/50">
        <div className="mb-8">
          <Badge color="blue" className="mb-4 uppercase tracking-widest text-[10px]">{question.topic || 'General'}</Badge>
          <h2 className="text-xl sm:text-2xl font-black leading-tight text-foreground">{question.question_text}</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => {
            const isSelected = answers[question.id] === opt.letter;
            const isCorrect = opt.letter === correctAnswerLetter;
            let styles = 'border-border hover:border-primary/50 hover:bg-primary/5';
            
            if (revealed) {
              if (isCorrect) styles = 'border-green-500 bg-green-500/10 ring-2 ring-green-500/20';
              else if (isSelected && !isCorrect) styles = 'border-red-500 bg-red-500/10 ring-2 ring-red-500/20';
              else styles = 'border-border opacity-50 grayscale';
            } else if (isSelected) {
              styles = 'border-primary bg-primary/10';
            }

            return (
              <button
                key={opt.letter}
                onClick={() => selectAnswer(opt.letter)}
                disabled={revealed}
                className={cn(
                  'w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200',
                  styles,
                  !revealed && 'active:scale-[0.98]'
                )}
              >
                <span className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm',
                  revealed && isCorrect ? 'bg-green-500 text-white' :
                  revealed && isSelected ? 'bg-red-500 text-white' :
                  'bg-surface border border-border'
                )}>
                  {opt.letter}
                </span>
                <span className="text-base font-bold">{opt.text}</span>
                {revealed && isCorrect && <CheckCircle size={24} className="ml-auto text-green-400" />}
                {revealed && isSelected && !isCorrect && <XCircle size={24} className="ml-auto text-red-400" />}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Brain size={18} className="text-primary" />
              <p className="text-xs font-black text-primary uppercase tracking-widest">Smart Explanation</p>
            </div>
            <p className="text-sm font-medium text-muted leading-relaxed">{question.explanation || 'The correct answer is based on the national curriculum standards for this subject.'}</p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pb-10">
        <Button variant="secondary" icon={ArrowLeft} onClick={prevQuestion} disabled={currentQ === 0}>Previous</Button>
        <div className="hidden sm:flex gap-1.5">
          {questions.map((_, i) => (
            <div key={i} className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === currentQ ? 'bg-primary w-4' : answers[questions[i].id] ? 'bg-primary/50' : 'bg-surface'
            )} />
          ))}
        </div>
        <Button icon={ArrowRight} onClick={nextQuestion} disabled={!revealed}>
          {currentQ === totalQuestions - 1 ? 'Finish Simulation' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
}
