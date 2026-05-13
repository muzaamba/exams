'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FileText, Search, Clock, Award, Loader2, Share2, Download, Zap } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';
import { normalizeSubject } from '@/lib/utils';
import ExamGrid from '@/components/dashboard/ExamGrid';
import QuizSimulator from '@/components/dashboard/QuizSimulator';

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeQuizId, setActiveQuizId] = useState(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchExams() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('status', 'published')
          .order('year', { ascending: false });

        if (error) throw error;
        
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
  }, [supabase]);

  const handleShare = async (e, exam) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: exam.title,
      text: `Check out this ${exam.title} on Zeweno National Exam Repository!`,
      url: `${window.location.origin}/exams/${exam.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Clipboard failed:', err);
      }
    }
  };

  const handleDownload = async (e, exam) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic update
    setExams(prev => prev.map(ex => 
      ex.id === exam.id ? { ...ex, downloads: (ex.downloads || 0) + 1 } : ex
    ));

    await import('@/lib/download-exam').then(m => m.downloadExamPaper(exam.id, exam.title));
  };

  const filteredExams = exams.filter(e => {
    if (selectedSubject !== 'all' && e.subject !== selectedSubject) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (yearFilter !== 'all' && e.year !== parseInt(yearFilter)) return false;
    return true;
  });

  const subjectExamsCount = exams.reduce((acc, e) => {
    acc[e.subject] = (acc[e.subject] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-6xl space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">National Archive</h1>
          <p className="text-muted font-medium text-lg">Select a subject to browse past exam papers and solutions.</p>
        </div>
        <div className="bg-surface p-4 rounded-3xl border border-border/50 flex items-center gap-6 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-black text-primary leading-none">{exams.length}</p>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Papers</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-black text-foreground leading-none">
              {exams.reduce((sum, e) => sum + (e.downloads || 0), 0)}
            </p>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Downloads</p>
          </div>
        </div>
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <button 
          onClick={() => setSelectedSubject('all')}
          className={`p-4 rounded-[2rem] border transition-all flex flex-col items-center justify-center gap-3 group ${
            selectedSubject === 'all' 
            ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' 
            : 'bg-surface border-border/50 hover:border-primary/30 text-foreground'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
            selectedSubject === 'all' ? 'bg-white/20' : 'bg-primary/10 text-primary'
          }`}>
            🌟
          </div>
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest">All Subjects</p>
            <p className={`text-[10px] font-bold ${selectedSubject === 'all' ? 'text-white/70' : 'text-muted'}`}>
              {exams.length} Papers
            </p>
          </div>
        </button>

        {SUBJECTS.map((sub) => (
          <button 
            key={sub.slug}
            onClick={() => setSelectedSubject(sub.slug)}
            className={`p-4 rounded-[2rem] border transition-all flex flex-col items-center justify-center gap-3 group relative ${
              selectedSubject === sub.slug 
              ? 'bg-surface border-primary text-foreground shadow-xl ring-2 ring-primary/20 scale-105 z-10' 
              : 'bg-surface border-border/50 hover:border-primary/30 text-foreground'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-110"
              style={{ background: `${sub.color}15`, color: sub.color }}>
              {sub.icon}
            </div>
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest">{sub.name}</p>
              <p className="text-[10px] font-bold text-muted">
                {subjectExamsCount[sub.slug] || 0} Papers
              </p>
            </div>
            {selectedSubject === sub.slug && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-surface" />
            )}
          </button>
        ))}
      </div>

      {/* Filter & Results Area */}
      <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border/50 pb-6">
          <h2 className="text-2xl font-black flex items-center gap-3">
            {selectedSubject === 'all' ? 'All National Exams' : `${SUBJECTS.find(s => s.slug === selectedSubject)?.name} Archive`}
            {!loading && (
              <span className="text-sm font-bold text-muted bg-surface px-3 py-1 rounded-full border border-border/50">
                {filteredExams.length} results
              </span>
            )}
          </h2>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select 
              value={yearFilter} 
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-surface border border-border/50 text-sm font-bold cursor-pointer focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Years</option>
              {[2025, 2024, 2023, 2022, 2021, 2020].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative">
              <Loader2 className="animate-spin text-primary" size={48} />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText size={20} className="text-primary/40" />
              </div>
            </div>
            <p className="text-muted text-sm font-bold tracking-widest animate-pulse">RETRIVING DATA...</p>
          </div>
        ) : activeQuizId ? (
          <QuizSimulator 
            examId={activeQuizId} 
            onExit={() => setActiveQuizId(null)} 
          />
        ) : (
          <>
            {selectedSubject !== 'all' ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-[2.5rem] border border-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-2xl text-white shadow-lg shadow-primary/20">
                      {SUBJECTS.find(s => s.slug === selectedSubject)?.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{SUBJECTS.find(s => s.slug === selectedSubject)?.name} Master Grid</h3>
                      <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">5-Year National Archive (2020-2025)</p>
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    icon={Download}
                    className="hidden sm:flex"
                    onClick={() => {
                      const subjectExams = filteredExams.filter(e => e.subject === selectedSubject);
                      subjectExams.forEach((e, i) => {
                        setTimeout(() => handleDownload(null, e), i * 1000); // Stagger downloads
                      });
                    }}
                  >
                    Download All Papers
                  </Button>
                </div>
                
                <ExamGrid 
                  exams={filteredExams} 
                  subjectColor={SUBJECTS.find(s => s.slug === selectedSubject)?.color}
                  onDownload={(exam) => handleDownload(null, exam)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExams.map((exam) => {
                  const sub = SUBJECTS.find((s) => s.slug === exam.subject);
                  return (
                    <div 
                      key={exam.id} 
                      className="glass-card p-5 flex items-center gap-5 group hover:border-primary/40 transition-all active:scale-[0.99] hover:shadow-xl hover:shadow-primary/5"
                    >
                      <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-3xl shrink-0 transition-all group-hover:scale-110 shadow-lg"
                        style={{ background: `${sub?.color || '#6366F1'}15`, color: sub?.color }}>
                        {sub?.icon || '📄'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md tracking-wider">
                            {exam.year}
                          </span>
                          <span className="text-[10px] font-black text-muted/60 flex items-center gap-1 uppercase tracking-widest">
                            <Clock size={10} /> {exam.duration} MIN
                          </span>
                        </div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate leading-tight">
                          {exam.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2.5">
                          <span className="flex items-center gap-1.5 text-[10px] text-muted font-bold uppercase tracking-widest">
                            <Award size={10} className="text-primary" /> {exam.total_marks} MARKS
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] text-muted font-bold uppercase tracking-widest">
                            <FileText size={10} className="text-primary" /> {exam.downloads || 0} DOWNLOADS
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button 
                          onClick={() => setActiveQuizId(exam.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                          title="Start Quiz"
                        >
                          <Zap size={18} />
                        </button>
                        <button 
                          onClick={(e) => handleShare(e, exam)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border hover:border-primary/50 hover:bg-primary/5 text-muted hover:text-primary transition-all shadow-sm"
                          title="Share with friends"
                        >
                          <Share2 size={18} />
                        </button>
                        <button 
                          onClick={(e) => handleDownload(e, exam)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border group-hover:border-primary/50 group-hover:bg-primary/5 text-muted group-hover:text-primary transition-all shadow-sm"
                          title="Download Paper"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredExams.length === 0 && (
              <div className="text-center py-20 bg-surface/30 rounded-[3rem] border-2 border-dashed border-border/50">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 border border-border/50 shadow-inner">
                  <Search className="text-muted/20" size={40} />
                </div>
                <h3 className="text-2xl font-black tracking-tight">No papers found</h3>
                <p className="text-muted max-w-sm mx-auto mt-2 font-medium">
                  We couldn't find any {selectedSubject !== 'all' ? SUBJECTS.find(s => s.slug === selectedSubject)?.name : ''} papers for the selected criteria.
                </p>
                <button 
                  onClick={() => {setSearch(''); setYearFilter('all'); setSelectedSubject('all');}}
                  className="mt-8 bg-primary/10 text-primary px-6 py-2 rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
