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

export default function RevisionPage() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  
  const daysUntilExam = 45;
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
  }, [user, supabase]);

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
            <Badge color="blue">0/0</Badge>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4 text-2xl">🎯</div>
            <p className="font-bold">No goals set for today</p>
            <p className="text-sm text-muted mt-1">Start a practice exam to automatically generate study goals.</p>
          </div>
        </Card>

        {/* Weekly Schedule */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-indigo-400" /> Weekly Plan
          </h3>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted italic">Your personalized study schedule will appear here as you practice more subjects.</p>
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

