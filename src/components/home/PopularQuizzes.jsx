'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Clock, Users, Zap, FileText } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { SUBJECTS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';

export default function PopularQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!supabase) return;
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('status', 'published')
        .limit(6);
      
      if (data) setQuizzes(data);
      setLoading(false);
    };

    fetchQuizzes();
  }, [supabase]);

  if (loading) {
    return (
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container-main">
          <div className="h-10 w-64 bg-surface rounded mb-12 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-surface rounded-2xl animate-pulse" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <div className="container-main">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Popular <span className="gradient-text">Quizzes</span>
            </h2>
            <p className="text-muted">Test your knowledge with trending quizzes</p>
          </div>
          <Link href="/exams" className="hidden sm:flex items-center gap-2 text-primary text-sm font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => {
              const subject = SUBJECTS.find(s => s.slug === quiz.subject?.toLowerCase()) || { name: quiz.subject || 'Unknown', color: '#6366F1', icon: '📄' };
              return (
                <Link key={quiz.id} href={`/quizzes/${quiz.id}`} className="glass-card p-5 group">
                  <div className="flex items-center justify-between mb-3">
                    <Badge color="indigo">{subject.name}</Badge>
                    <Badge color="blue">{quiz.grade?.toUpperCase() || 'FORM 4'}</Badge>
                  </div>
                  <h3 className="font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2 font-heading tracking-tight">
                    <span className="text-xl">{subject.icon}</span>
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-muted font-bold">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {quiz.duration}min
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-widest text-primary">
                      {quiz.year}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 text-muted">
              No exams found. Start by uploading some in the admin panel!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
