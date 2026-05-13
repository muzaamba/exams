'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle, RotateCcw, Home, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import { CircularProgress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';

import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';

export default function QuizPlayerPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizDone, setQuizDone] = useState(false);

  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchQuestions() {
      if (!id || !supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .eq('exam_id', id)
          .in('question_type', ['mcq', 'vocabulary', 'grammar'])
          .order('question_number', { ascending: true });

        if (error) throw error;
        
        // Only use questions that have options for the quiz simulator
        const validQuestions = (data || []).filter(q => q.option_a && q.option_b);
        setQuestions(validQuestions);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [id, supabase]);

  // Timer
  useEffect(() => {
    if (quizDone || questions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setQuizDone(true); clearInterval(timer); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizDone, questions.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        <p className="text-muted font-medium">Loading quiz questions...</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Unable to load quiz</h2>
        <p className="text-muted">{error || 'This exam has no multiple choice questions available yet.'}</p>
        <Button onClick={() => router.push('/exams')} variant="secondary">Back to Exams</Button>
      </div>
    );
  }

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
        <div className="glass-card p-8 text-center">
          <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 60 ? '👏' : '💪'}</div>
          <h2 className="text-3xl font-black mb-2">Quiz Complete!</h2>
          <p className="text-muted mb-6">Here are your results</p>

          <CircularProgress value={score} max={totalQuestions} size={160} strokeWidth={12}
            color={percentage >= 80 ? '#22c55e' : percentage >= 60 ? '#f59e0b' : '#ef4444'}>
            <div className="text-center">
              <span className="text-4xl font-black">{percentage}%</span>
              <p className="text-xs text-muted">{score}/{totalQuestions}</p>
            </div>
          </CircularProgress>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="p-3 rounded-xl bg-green-500/10">
              <p className="text-xl font-bold text-green-400">{score}</p>
              <p className="text-xs text-muted">Correct</p>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10">
              <p className="text-xl font-bold text-red-400">{totalQuestions - score}</p>
              <p className="text-xs text-muted">Wrong</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <p className="text-xl font-bold text-primary">+{score * 10}</p>
              <p className="text-xs text-muted">XP Earned</p>
            </div>
          </div>

          <div className="flex gap-3 mt-8 justify-center">
            <Button variant="secondary" icon={RotateCcw} onClick={() => {
              setAnswers({}); setCurrentQ(0); setQuizDone(false); setRevealed(false); setTimeLeft(600);
            }}>Retry</Button>
            <Button icon={Home} onClick={() => router.push('/quizzes')}>All Quizzes</Button>
          </div>
        </div>

        {/* Answer Review */}
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4">Answer Review</h3>
          <div className="space-y-3">
            {questions.map((q, i) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === (q.correct_answer || '').toUpperCase();
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle size={18} className="text-green-400 mt-0.5" /> : <XCircle size={18} className="text-red-400 mt-0.5" />}
                    <div>
                      <p className="text-sm font-medium">Q{i + 1}: {q.question_text}</p>
                      <p className="text-xs text-muted mt-1">Your answer: {userAnswer || 'Skipped'} • Correct: {(q.correct_answer || '').toUpperCase()}</p>
                      <p className="text-xs text-primary mt-1">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
  ].filter(o => o.text); // Filter out empty options if any

  // Ensure answer keys match correctly (e.g. "a", "b", "c", "d" from DB vs "A", "B", "C", "D")
  const correctAnswerLetter = (question.correct_answer || '').toUpperCase();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.push('/quizzes')} className="p-2 rounded-lg hover:bg-surface text-muted hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border">
          <Clock size={16} className={timeLeft < 60 ? 'text-red-400' : 'text-primary'} />
          <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-400' : ''}`}>{formatTime(timeLeft)}</span>
        </div>
        <span className="text-sm text-muted font-medium">{currentQ + 1}/{totalQuestions}</span>
      </div>

      {/* Progress */}
      <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }} />
      </div>

      {/* Question Card */}
      <div className="glass-card p-6 sm:p-8">
        <span className="text-xs text-muted font-medium mb-3 block">{question.topic}</span>
        <h2 className="text-xl sm:text-2xl font-bold mb-8 leading-relaxed">{question.question_text}</h2>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = answers[question.id] === opt.letter;
            const isCorrect = opt.letter === correctAnswerLetter;
            let styles = 'border-border hover:border-primary/50 hover:bg-primary/5';
            if (revealed) {
              if (isCorrect) styles = 'border-green-500 bg-green-500/10';
              else if (isSelected && !isCorrect) styles = 'border-red-500 bg-red-500/10';
              else styles = 'border-border opacity-50';
            } else if (isSelected) {
              styles = 'border-primary bg-primary/10';
            }

            return (
              <button
                key={opt.letter}
                onClick={() => selectAnswer(opt.letter)}
                disabled={revealed}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                  styles,
                  !revealed && 'cursor-pointer'
                )}
              >
                <span className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
                  revealed && isCorrect ? 'bg-green-500 text-white' :
                  revealed && isSelected ? 'bg-red-500 text-white' :
                  'bg-surface'
                )}>
                  {opt.letter}
                </span>
                <span className="text-sm font-medium">{opt.text}</span>
                {revealed && isCorrect && <CheckCircle size={20} className="ml-auto text-green-400" />}
                {revealed && isSelected && !isCorrect && <XCircle size={20} className="ml-auto text-red-400" />}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-slide-up">
            <p className="text-sm font-semibold text-primary mb-1">Explanation</p>
            <p className="text-sm text-muted">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" icon={ArrowLeft} onClick={prevQuestion} disabled={currentQ === 0}>Previous</Button>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div key={i} className={cn(
              'w-2.5 h-2.5 rounded-full transition-all',
              i === currentQ ? 'bg-primary scale-125' : answers[questions[i].id] ? 'bg-primary/50' : 'bg-surface'
            )} />
          ))}
        </div>
        <Button icon={ArrowRight} onClick={nextQuestion} disabled={!revealed}>
          {currentQ === totalQuestions - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
