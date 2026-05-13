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

  const groupedByYear = filtered.reduce((acc, exam) => {
    const year = exam.year || 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(exam);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => b - a);

  const handleDownload = async (e, exam) => {
    e.preventDefault();
    e.stopPropagation();
    await import('@/lib/download-exam').then(m => m.downloadExamPaper(exam.id, exam.title));
  };

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">National Exam Repository</h1>
          <p className="text-muted mt-1 font-medium">Browse, practice and download authentic Somali National Exams</p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20 flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Total Papers</p>
            <p className="text-lg font-black text-primary leading-tight">{exams.length}</p>
          </div>
          <div className="w-px h-8 bg-primary/20" />
          <div className="text-right">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Downloads</p>
            <p className="text-lg font-black text-primary leading-tight">
              {exams.reduce((sum, e) => sum + (e.downloads || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-surface/50 p-2 rounded-2xl border border-border/50 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border/50 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-2">
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-surface border border-border/50 text-sm cursor-pointer focus:ring-2 focus:ring-primary/30">
            <option value="all">All Subjects</option>
            {SUBJECTS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
            className="hidden md:block px-4 py-2.5 rounded-xl bg-surface border border-border/50 text-sm cursor-pointer focus:ring-2 focus:ring-primary/30">
            <option value="all">All Years</option>
            {[2025, 2024, 2023, 2022, 2021, 2020].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="relative">
            <Loader2 className="animate-spin text-primary" size={48} />
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText size={20} className="text-primary/50" />
            </div>
          </div>
          <p className="text-muted text-sm font-bold tracking-wide">INITIALIZING REPOSITORY...</p>
        </div>
      ) : (
        <div className="space-y-10">
          {years.map(year => (
            <div key={year} className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black text-foreground flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-surface border border-border/50 flex items-center justify-center text-xs text-primary">{year}</span>
                  Exam Papers
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedByYear[year].map((exam) => {
                  const sub = SUBJECTS.find((s) => s.slug === exam.subject);
                  return (
                    <Link key={exam.id} href={`/exams/${exam.id}`} className="glass-card p-5 flex items-center gap-4 group hover:border-primary/30 transition-all active:scale-[0.98]">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110 shadow-lg"
                        style={{ background: `${sub?.color || '#6366F1'}15`, color: sub?.color }}>
                        {sub?.icon || '📄'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge color={exam.grade === 'form4' ? 'blue' : 'green'} className="text-[9px] px-1.5 py-0">
                            {exam.grade === 'form4' ? 'FORM 4' : 'GRADE 8'}
                          </Badge>
                          <span className="text-[10px] font-bold text-muted/60 flex items-center gap-1">
                            <Clock size={10} /> {exam.duration} MIN
                          </span>
                        </div>
                        <h3 className="font-bold text-base group-hover:text-primary transition-colors truncate">{exam.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-[10px] text-muted font-bold uppercase tracking-wider">
                            <Award size={10} className="text-primary" /> {exam.total_marks} MARKS
                          </span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="flex items-center gap-1 text-[10px] text-muted font-bold uppercase tracking-wider">
                            <FileText size={10} className="text-primary" /> {exam.downloads || 0} DOWNLOADS
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => handleDownload(e, exam)}
                        className="p-3 rounded-xl bg-surface border border-border group-hover:border-primary/50 group-hover:bg-primary/5 text-muted group-hover:text-primary transition-all shadow-sm"
                        title="Download Paper"
                      >
                        <FileText size={20} />
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-surface/30 rounded-[2rem] border border-dashed border-border/50">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 border border-border/50 shadow-inner">
                <Search className="text-muted/30" size={32} />
              </div>
              <h3 className="text-xl font-black tracking-tight">No exams matched your search</h3>
              <p className="text-muted max-w-xs mx-auto mt-2 font-medium">Try adjusting your filters or searching for a specific subject or year.</p>
              <button 
                onClick={() => {setSearch(''); setSubjectFilter('all'); setYearFilter('all');}}
                className="mt-6 text-primary font-bold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

