'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Search, Calendar, Clock, Award, Loader2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { SUBJECTS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';
import { normalizeSubject } from '@/lib/utils';

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');

  const supabase = createClient();

  useEffect(() => {
    async function fetchExams() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('status', 'published')
          .order('year', { ascending: false });

        if (error) throw error;
        
        // Normalize subjects on the fly
        const normalized = (data || []).map(e => ({
          ...e,
          subject: normalizeSubject(e.subject)
        }));
        
        setExams(normalized);
      } catch (err) {
        console.error('Error fetching exams:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, []);


  const filtered = exams.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (yearFilter !== 'all' && e.year !== parseInt(yearFilter)) return false;
    if (subjectFilter !== 'all' && e.subject !== subjectFilter) return false;
    if (gradeFilter !== 'all' && e.grade !== gradeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading">National Exam Papers</h1>
        <p className="text-muted mt-1">Browse and practice with authentic Somali National Exams</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input type="text" placeholder="Search exams..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer focus:ring-2 focus:ring-primary/50">
          <option value="all">All Subjects</option>
          {SUBJECTS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
        <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer focus:ring-2 focus:ring-primary/50">
          <option value="all">All Grades</option>
          <option value="form4">Form 4</option>
          <option value="grade8">Grade 8</option>
        </select>
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer focus:ring-2 focus:ring-primary/50">
          <option value="all">All Years</option>
          {[2025, 2024, 2023, 2022, 2021, 2020].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-muted text-sm font-medium">Loading real exam data...</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 stagger-children">
            {filtered.map((exam) => {
              const sub = SUBJECTS.find((s) => s.slug === exam.subject);
              return (
                <Link key={exam.id} href={`/exams/${exam.id}`} className="glass-card p-5 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${sub?.color || '#6366F1'}15` }}>
                    {sub?.icon || '📄'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold group-hover:text-primary transition-colors truncate">{exam.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <Badge color={exam.grade === 'form4' ? 'blue' : 'green'}>{exam.grade === 'form4' ? 'Form 4' : 'Grade 8'}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted font-medium"><Calendar size={12} />{exam.year}</span>
                      <span className="flex items-center gap-1 text-xs text-muted font-medium"><Award size={12} />{exam.total_marks} marks</span>
                      <span className="flex items-center gap-1 text-xs text-muted font-medium"><Clock size={12} />{exam.duration} min</span>
                    </div>
                  </div>
                  <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText size={20} className="text-primary" />
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-surface/50 rounded-3xl border border-dashed border-border">
              <FileText className="mx-auto text-muted/30 mb-4" size={64} />
              <h3 className="text-lg font-bold">No exams found</h3>
              <p className="text-muted max-w-xs mx-auto mt-1">Try adjusting your filters or search terms to find what you're looking for.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

