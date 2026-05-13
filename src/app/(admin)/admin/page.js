'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { BarChart3, Users, FileText, HelpCircle, Upload, TrendingUp, Brain, BookOpen, Loader2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import { ADMIN_NAV_LINKS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';

export default function AdminPage() {
  const [stats, setStats] = useState([
    { label: 'Total Students', value: '...', trend: '...', icon: Users, color: 'text-primary' },
    { label: 'Total Exams', value: '...', trend: '...', icon: FileText, color: 'text-indigo-400' },
    { label: 'Total Questions', value: '...', trend: '...', icon: HelpCircle, color: 'text-purple-400' },
    { label: 'Quiz Attempts', value: '...', trend: '...', icon: Brain, color: 'text-yellow-400' },
  ]);
  const [recentExams, setRecentExams] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchAdminData() {
      if (!supabase) return;
      setLoading(true);
      try {
        // Fetch Profiles Count
        const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        
        // Fetch Exams Count
        const { count: examCount } = await supabase.from('exams').select('*', { count: 'exact', head: true });
        
        // Fetch Questions Count
        const { count: questionCount } = await supabase.from('questions').select('*', { count: 'exact', head: true });
        
        // Fetch Quiz Attempts Count
        const { count: attemptCount } = await supabase.from('quiz_attempts').select('*', { count: 'exact', head: true });

        setStats([
          { label: 'Total Students', value: userCount?.toLocaleString() || '0', trend: '+12%', icon: Users, color: 'text-primary' },
          { label: 'Total Exams', value: examCount?.toLocaleString() || '0', trend: 'Live', icon: FileText, color: 'text-indigo-400' },
          { label: 'Total Questions', value: questionCount?.toLocaleString() || '0', trend: 'Database', icon: HelpCircle, color: 'text-purple-400' },
          { label: 'Quiz Attempts', value: attemptCount?.toLocaleString() || '0', trend: 'Activity', icon: Brain, color: 'text-yellow-400' },
        ]);

        // Fetch Recent Exams
        const { data: examsData } = await supabase
          .from('exams')
          .select('*, questions(count)')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentExams(examsData || []);
      } catch (err) {
        console.error('Admin fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAdminData();
  }, [supabase]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading">Admin Dashboard</h1>
        <p className="text-muted mt-1">Real-time platform management & analytics</p>
      </div>

      {/* Admin Nav */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {ADMIN_NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-surface border border-border text-sm font-bold hover:border-primary/50 hover:text-primary transition-all whitespace-nowrap shadow-sm hover:shadow-md">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="!p-6 border-b-4" style={{ borderBottomColor: 'var(--primary)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp size={10} />{stat.trend}
              </span>
            </div>
            <p className="text-3xl font-black font-heading tracking-tight">{stat.value}</p>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Recent Exams */}
      <Card hover={false} className="border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            Recent Repository Updates
          </h3>
          <Link href="/admin/exams" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All Exams</Link>
        </div>
        
        {loading ? (
          <div className="py-10 flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-primary/40" />
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Syncing Data...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentExams.map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 transition-all bg-surface/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold">
                    {exam.year}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{exam.title}</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{exam.subject} • {exam.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    exam.status === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    exam.status === 'review' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                    'bg-gray-500/10 text-muted border border-border'
                  }`}>{exam.status}</span>
                </div>
              </div>
            ))}
            {recentExams.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-sm text-muted">No exams found in the database.</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
