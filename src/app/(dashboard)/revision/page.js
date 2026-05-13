'use client';

import { useState, useEffect } from 'react';
import { Target, Calendar, CheckCircle, Clock, Plus, Zap, BookOpen, Loader2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { LinearProgress } from '@/components/ui/Progress';
import { SUBJECTS } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const revisionPlan = [
  { day: 'Mon', subjects: ['Mathematics', 'Physics'], completed: true },
  { day: 'Tue', subjects: ['Somali', 'Biology'], completed: true },
  { day: 'Wed', subjects: ['Chemistry', 'English'], completed: false },
  { day: 'Thu', subjects: ['Arabic', 'Geography'], completed: false },
  { day: 'Fri', subjects: ['History', 'Mathematics'], completed: false },
  { day: 'Sat', subjects: ['Full Practice Exam'], completed: false },
  { day: 'Sun', subjects: ['Weak Topics Review'], completed: false },
];

const dailyGoals = [
  { task: 'Complete 2 quizzes', done: true, xp: 20 },
  { task: 'Revise 1 weak topic', done: true, xp: 15 },
  { task: 'Read revision notes (30min)', done: false, xp: 25 },
  { task: 'Practice 1 past paper section', done: false, xp: 30 },
];

export default function RevisionPage() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  
  const daysUntilExam = 45;
  const completedGoals = dailyGoals.filter((g) => g.done).length;
  const supabase = createClient();

  useEffect(() => {
    async function fetchProgress() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('revision_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        const progressMap = data.reduce((acc, curr) => {
          acc[curr.subject] = curr;
          return acc;
        }, {});
        setProgressData(progressMap);
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [user]);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Revision Planner</h1>
          <p className="text-muted mt-1 font-medium">Plan your study schedule and track real progress</p>
        </div>
        <div className="glass-card !p-4 flex items-center gap-3 border-primary/30">
          <Calendar size={20} className="text-primary" />
          <div>
            <p className="text-xl font-black text-primary">{daysUntilExam}</p>
            <p className="text-xs text-muted font-bold">Days to Exam</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Goals */}
        <Card hover={false} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Target size={18} className="text-primary" /> Today&apos;s Goals
            </h3>
            <Badge color="green">{completedGoals}/{dailyGoals.length}</Badge>
          </div>
          <LinearProgress value={completedGoals} max={dailyGoals.length} color="var(--primary)" className="mb-4" />
          <div className="space-y-2">
            {dailyGoals.map((goal, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                goal.done ? 'border-green-500/20 bg-green-500/5' : 'border-border hover:border-primary/30'
              }`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  goal.done ? 'border-green-500 bg-green-500' : 'border-muted'
                }`}>
                  {goal.done && <CheckCircle size={14} className="text-white" />}
                </div>
                <span className={`flex-1 text-sm ${goal.done ? 'line-through text-muted' : 'font-medium'}`}>{goal.task}</span>
                <Badge color="yellow">+{goal.xp} XP</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Schedule */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-indigo-400" /> This Week
          </h3>
          <div className="space-y-2">
            {revisionPlan.map((day, i) => (
              <div key={i} className={`p-3 rounded-xl border transition-colors ${
                day.completed ? 'border-green-500/20 bg-green-500/5' : 'border-border'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{day.day}</span>
                  {day.completed && <CheckCircle size={14} className="text-green-400" />}
                </div>
                <p className="text-xs text-muted">{day.subjects.join(', ')}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Subject Revision Tracker */}
      <Card hover={false}>
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" /> Subject Revision Status (Real Data)
        </h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUBJECTS.map((subject) => {
              const progress = progressData[subject.slug]?.mastery_level || 0;
              const totalAttempts = progressData[subject.slug]?.total_attempts || 0;
              
              return (
                <div key={subject.slug} className="p-3 rounded-xl border border-border bg-surface/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{subject.icon}</span>
                    <span className="text-sm font-semibold">{subject.name}</span>
                  </div>
                  <LinearProgress value={progress} color={subject.color} />
                  <p className="text-xs text-muted mt-1 font-medium">{totalAttempts} attempts • {progress}% mastery</p>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

