'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Brain, FileText, TrendingUp, ArrowLeft, Play, Clock, Zap, Loader2 } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge, { DifficultyBadge } from '@/components/ui/Badge';
import { CircularProgress, LinearProgress } from '@/components/ui/Progress';
import AnalysisDashboard from '@/components/dashboard/AnalysisDashboard';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';

export default function SubjectDetailPage() {
  const { slug } = useParams();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const subject = SUBJECTS.find((s) => s.slug === slug) || SUBJECTS[0];
  const supabase = createClient();

  useEffect(() => {
    async function fetchSubjectData() {
      if (!supabase || !slug) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .ilike('subject', slug)
          .eq('status', 'published');
        
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
                <Card className="!p-4 text-center">
                  <p className="text-2xl font-black" style={{ color: subject.color }}>{profile?.accuracy || 0}%</p>
                  <p className="text-xs text-muted mt-1">Mastery</p>
                </Card>
                <Card className="!p-4 text-center">
                  <p className="text-2xl font-black">{exams.length}</p>
                  <p className="text-xs text-muted mt-1">Past Papers</p>
                </Card>
                <Card className="!p-4 text-center">
                  <p className="text-2xl font-black">0</p>
                  <p className="text-xs text-muted mt-1">Quizzes</p>
                </Card>
                <Card className="!p-4 text-center">
                  <p className="text-2xl font-black">--</p>
                  <p className="text-xs text-muted mt-1">Ranking</p>
                </Card>
              </div>

              {/* Info Card */}
              <Card hover={false}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary" />
                  Subject Analysis
                </h3>
                <div className="flex flex-col items-center justify-center py-10 text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Brain className="text-primary" size={32} />
                  </div>
                  <p className="font-bold text-lg">No Practice Data Yet</p>
                  <p className="text-sm text-muted mt-1">Start practicing real past papers to unlock detailed topic analysis and performance tracking for {subject.name}.</p>
                  <Button className="mt-6" size="sm" onClick={() => setActiveTab('Exams')}>View Exams</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'Quizzes' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4 text-2xl">⚡</div>
              <h3 className="font-bold text-lg">Quizzes Coming Soon</h3>
              <p className="text-sm text-muted mt-1">We are currently generating smart quizzes for {subject.name}.</p>
              <Button className="mt-6" variant="secondary" onClick={() => setActiveTab('Exams')}>Practice Exams Instead</Button>
            </div>
          )}

          {activeTab === 'Exams' && (
            <div className="space-y-3">
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <Link key={exam.id} href={`/exams/${exam.id}`} className="glass-card p-5 flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <FileText size={20} className="text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold group-hover:text-primary transition-colors">{exam.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted mt-1">
                        <span>{exam.year}</span>
                        <span>{exam.duration}min</span>
                        <Badge color="blue" variant="outline" className="text-[10px] h-4 uppercase">{exam.grade}</Badge>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" icon={Play}>Practice</Button>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center glass-card">
                  <FileText className="text-muted mb-4" size={48} />
                  <h3 className="font-bold text-lg">No Exams Found</h3>
                  <p className="text-sm text-muted mt-1">We haven&apos;t uploaded real exams for {subject.name} yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Notes' && (
            <Card hover={false}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                Revision Notes
              </h3>
              <div className="flex flex-col items-center justify-center py-10 text-center px-6">
                <p className="text-sm text-muted italic">Revision notes for {subject.name} are currently being compiled from past papers and government curriculum. Check back soon!</p>
              </div>
            </Card>
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
