'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Brain, FileText, Search, Loader2 } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';
import { LinearProgress } from '@/components/ui/Progress';
import { createClient } from '@/lib/supabase/client';
import { normalizeSubject } from '@/lib/utils';

export default function SubjectsPage() {
  const [search, setSearch] = useState('');
  const [subjectCounts, setSubjectCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchCounts() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('subject')
          .eq('status', 'published');

        if (error) throw error;

        const counts = data.reduce((acc, curr) => {
          const slug = normalizeSubject(curr.subject);
          acc[slug] = (acc[slug] || 0) + 1;
          return acc;
        }, {});

        setSubjectCounts(counts);
      } catch (err) {
        console.error('Error fetching subject counts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);


  const filtered = SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Subjects</h1>
          <p className="text-muted mt-1">Browse all subjects and track your progress</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-muted text-sm font-medium">Loading subject database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {filtered.map((subject) => {
            const examCount = subjectCounts[subject.slug] || 0;
            const mastery = 0; // Future: fetch from revision_progress
            
            return (
              <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="glass-card p-6 group">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: `${subject.color}15` }}
                  >
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{subject.name}</h3>
                    <p className="text-xs text-muted">{subject.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">Mastery</span>
                      <span className="font-semibold" style={{ color: subject.color }}>{mastery}%</span>
                    </div>
                    <LinearProgress value={mastery} color={subject.color} />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="flex items-center gap-1 text-xs text-muted font-medium">
                      <FileText size={12} /> {examCount} real exams
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Study Now <ArrowRight size={14} className="ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

