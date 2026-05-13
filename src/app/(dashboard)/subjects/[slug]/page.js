'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Brain, FileText, TrendingUp, ArrowLeft, Play, Clock, Zap, Loader2, Download } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge, { DifficultyBadge } from '@/components/ui/Badge';
import { CircularProgress, LinearProgress } from '@/components/ui/Progress';
import AnalysisDashboard from '@/components/dashboard/AnalysisDashboard';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { normalizeSubject } from '@/lib/utils';
import { useMemo } from 'react';
import ExamGrid from '@/components/dashboard/ExamGrid';

export default function SubjectDetailPage() {
  const { slug } = useParams();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const subject = SUBJECTS.find((s) => s.slug === slug) || SUBJECTS[0];
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!slug) return;
    async function fetchSubjectData() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // First try exact match (normalized)
        let { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('subject', slug)
          .eq('status', 'published');

        // Fallback: ilike for any un-normalized records
        if (!error && (!data || data.length === 0)) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('exams')
            .select('*')
            .ilike('subject', `%${slug}%`)
            .eq('status', 'published');
          if (!fallbackError) data = fallbackData;
        }

        if (!error) setExams(data || []);
      } catch (err) {
        console.error('Error fetching subject data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubjectData();
  }, [slug, supabase]);

  const tabs = ['Overview', 'Quizzes', 'Exams', 'Notes', 'AI Analysis'];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link href="/subjects" className="p-2 rounded-lg hover:bg-surface transition-colors text-muted hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${subject.color}15` }}>
            {subject.icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{subject.name}</h1>
            <p className="text-muted text-sm">{subject.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:text-foreground hover:bg-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="text-muted text-sm font-medium">Loading subject materials...</p>
        </div>
      ) : (
        <>
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="!p-5 text-center bg-primary/5 border-primary/20">
                  <p className="text-3xl font-black text-primary">{profile?.accuracy || 0}%</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Mastery Score</p>
                </Card>
                <Card className="!p-5 text-center">
                  <p className="text-3xl font-black">{exams.length}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Available Papers</p>
                </Card>
                <Card className="!p-5 text-center">
                  <p className="text-3xl font-black">{exams.length}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Interactive Quizzes</p>
                </Card>
                <Card className="!p-5 text-center">
                  <p className="text-3xl font-black">{profile?.xp || 0}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Subject XP</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Action Card */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-primary to-indigo-700 text-white p-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-3xl font-black font-heading leading-tight">Master {subject.name} with Real Past Papers</h3>
                    <p className="text-white/80 font-medium max-w-md">We've compiled every Somali National Exam from 2020-2025. Practice them interactively to boost your grade.</p>
                    <div className="flex gap-4 pt-4">
                      <Button onClick={() => setActiveTab('Quizzes')} className="bg-white text-primary hover:bg-white/90">Take a Quiz</Button>
                      <Button onClick={() => setActiveTab('Exams')} variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">Download Papers</Button>
                    </div>
                  </div>
                  <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform" />
                </Card>

                {/* Study Tip Card */}
                <Card className="bg-surface border-border p-6 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                    <Brain className="text-yellow-500" size={32} />
                  </div>
                  <h4 className="font-bold">Pro Study Tip</h4>
                  <p className="text-xs text-muted mt-2">Students who practice at least 3 years of past papers improve their scores by up to 40% on average.</p>
                </Card>
              </div>

              {/* Subject Breakdown placeholder */}
              <Card hover={false}>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                  <TrendingUp size={22} className="text-primary" />
                  Performance Analysis
                </h3>
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6 border-2 border-dashed border-border">
                    <Loader2 className="text-muted/20" size={32} />
                  </div>
                  <p className="font-bold text-xl">Analysis Pending</p>
                  <p className="text-sm text-muted mt-2 max-w-sm mx-auto font-medium">Complete at least one exam in the {subject.name} archive to unlock detailed AI performance tracking and topic breakdowns.</p>
                  <Button className="mt-8" size="sm" onClick={() => setActiveTab('Exams')}>Browse Exam Archive</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'Quizzes' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/10">
                <div>
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <Zap className="text-indigo-400" size={24} />
                    Interactive Smart Quizzes
                  </h3>
                  <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">Dynamic Tests generated from real National Exams</p>
                </div>
                <Badge color="indigo" className="w-fit">Beta</Badge>
              </div>

              {exams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exams.map((exam) => (
                    <Card key={exam.id} className="p-6 flex flex-col justify-between border-2 border-border/50 hover:border-indigo-500/50 transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-black">{exam.year} Quiz</span>
                          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <Zap size={16} className="text-indigo-400" />
                          </div>
                        </div>
                        <h4 className="font-bold text-sm truncate">{exam.title} Simulator</h4>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">
                          {exam.duration} Min • Timed Practice
                        </p>
                      </div>
                      <Link href={`/quizzes/${exam.id}`} className="mt-6">
                        <Button size="sm" className="w-full bg-indigo-500 hover:bg-indigo-600" icon={Play}>Start Quiz</Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center glass-card">
                  <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6 text-3xl">🧩</div>
                  <h3 className="font-bold text-xl">No Quizzes Available</h3>
                  <p className="text-sm text-muted mt-2 max-w-sm font-medium">We are currently generating smart interactive quizzes for {subject.name}. Check back in a few days!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Exams' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="text-primary" size={24} />
                  5-Year Exam Archive
                </h3>
                {exams.length > 0 && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    icon={Download}
                    onClick={() => {
                      exams.forEach((e, i) => {
                        setTimeout(() => import('@/lib/download-exam').then(m => m.downloadExamPaper(e.id, e.title)), i * 1000);
                      });
                    }}
                  >
                    Download All
                  </Button>
                )}
              </div>
              <ExamGrid exams={exams} subjectColor={subject.color} />
            </div>
          )}

          {activeTab === 'Notes' && (
            <div className="space-y-6">
              <div className="p-10 bg-surface border-2 border-dashed border-border rounded-[3rem] text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-black font-heading mb-2">Subject Revision Guide</h3>
                <p className="text-muted font-medium mb-8">Comprehensive summary of {subject.name} curriculum based on 5-year pattern analysis.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] shrink-0">1</div>
                    <p className="text-xs font-bold leading-tight">Key concepts and definitions mapped to National Exam frequency.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] shrink-0">2</div>
                    <p className="text-xs font-bold leading-tight">Step-by-step solutions for the most difficult exam sections.</p>
                  </div>
                </div>
                <Button variant="primary" className="opacity-50 cursor-not-allowed">Coming Next Week</Button>
              </div>
            </div>
          )}

          {activeTab === 'AI Analysis' && (
            <div className="space-y-6">
              <Card hover={false}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2">
                    <Zap size={18} className="text-yellow-400" />
                    Smart Exam Analysis & Predictions
                  </h3>
                  <Badge color="primary">Government Model</Badge>
                </div>
                <AnalysisDashboard subject={subject.slug} />
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
