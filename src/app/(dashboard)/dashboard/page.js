'use client';

import { useState, useEffect, useMemo } from 'react';
import { Flame, Brain, Trophy, Target, TrendingUp, BookOpen, Clock, Zap, Users, Play, Loader2, FileText } from 'lucide-react';
import { CircularProgress, LinearProgress } from '@/components/ui/Progress';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { getGreeting, cn } from '@/lib/utils';
import { SUBJECTS } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import AdBanner from '@/components/ads/AdBanner';
import { createClient } from '@/lib/supabase/client';

export default function DashboardPage() {
  const { profile, loading: authLoading } = useAuth();
  const [greeting, setGreeting] = useState('Hello');
  const [examCount, setExamCount] = useState(0);
  const [globalStanding, setGlobalStanding] = useState('...');
  const [statsLoading, setStatsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    setGreeting(getGreeting());
    
    async function fetchStats() {
      if (!supabase) {
        setStatsLoading(false);
        return;
      }
      try {
        // Fetch Exam Count
        const { count: eCount } = await supabase
          .from('exams')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published');
        
        setExamCount(eCount || 0);

        // Fetch Global Standing
        if (profile) {
          const { count: aheadCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gt('xp', profile.xp || 0);
          
          setGlobalStanding(`#${(aheadCount || 0) + 1}`);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setStatsLoading(false);
      }
    }

    if (!authLoading) {
      fetchStats();
    }
  }, [authLoading, profile]);

  // Safety timeout: never stay stuck on loading for more than 3 seconds
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (authLoading && !timedOut) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-muted font-medium">Preparing your professional dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Premium Corporate Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold font-heading tracking-tight text-foreground">
            {greeting}, {profile?.full_name || 'Student'}
          </h1>
          <p className="text-muted font-medium">Professional Exam Readiness Dashboard</p>
        </div>
        
        {/* Simplified Progress Section */}
        <div className="bg-surface border border-border p-5 rounded-2xl min-w-[300px] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Academic Level {Math.floor((profile?.xp || 0) / 1000) + 1}</span>
            <span className="text-xs font-bold text-primary">{(profile?.xp || 0) % 1000} / 1000 XP</span>
          </div>
          <div className="h-2 w-full bg-background rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out" 
              style={{ width: `${((profile?.xp || 0) % 1000) / 10}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Structured Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Flame} label="Active Streak" value={`${profile?.study_streak || 0} Days`} color="text-primary" bgColor="bg-primary/5" trend="Consistent" />
        <StatCard icon={FileText} label="Available Exams" value={statsLoading ? '...' : examCount} color="text-accent" bgColor="bg-accent/5" trend="Real Data" />
        <StatCard icon={Trophy} label="Global Standing" value={globalStanding} color="text-primary" bgColor="bg-primary/5" trend="Top Tier" />
        <StatCard icon={Target} label="Questions Answered" value={profile?.questions_answered || 0} color="text-success" bgColor="bg-success/5" trend="Growing" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Readiness Analysis */}
        <Card hover={false} className="lg:col-span-1 bg-surface border-border p-6 rounded-3xl">
          <h3 className="font-bold mb-6 flex items-center gap-2 font-heading uppercase tracking-widest text-xs text-muted">
            <Target size={16} className="text-primary" />
            Performance Metrics
          </h3>
          <div className="flex flex-col items-center py-6">
            <CircularProgress value={profile?.accuracy || 0} size={180} strokeWidth={8} color="var(--primary)">
              <div className="text-center">
                <span className="text-5xl font-extrabold text-foreground font-heading tracking-tighter">{profile?.accuracy || 0}%</span>
                <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mt-2">Accuracy</p>
              </div>
            </CircularProgress>
          </div>
        </Card>

        {/* Info Card */}
        <Card hover={false} className="lg:col-span-2">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Study Progress
          </h3>
          <div className="flex flex-col items-center justify-center h-48 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="text-primary" size={32} />
            </div>
            <p className="font-bold text-lg">Start Practicing!</p>
            <p className="text-sm text-muted mt-1">Complete your first quiz to see detailed topic analysis and AI recommendations.</p>
            <Link href="/exams" className="mt-6">
              <Button size="sm">Browse Exams</Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity placeholder */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-indigo-400" />
            Recent Activity
          </h3>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-sm text-muted">No recent activity found.</p>
            <p className="text-xs text-muted/50 mt-1">Your practice sessions will appear here.</p>
          </div>
        </Card>

        {/* AI Recommendations placeholder */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" />
            AI Recommendations
          </h3>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-sm text-muted">Analysis pending.</p>
            <p className="text-xs text-muted/50 mt-1">We need more data to provide smart recommendations.</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Multiplayer Quick Start */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-indigo-500/10 to-primary/10 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">Multiplayer Battle</h3>
              <p className="text-xs text-muted">Challenge your friends in real-time!</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
              <Users size={24} />
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/quizzes/rooms" className="flex-1">
              <Button className="w-full" icon={Play}>Create Room</Button>
            </Link>
            <Button variant="secondary" className="flex-1">Join with Code</Button>
          </div>
        </Card>

        {/* Friends Online - Hide mock friends */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Users size={18} className="text-green-400" />
            Friends
          </h3>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-xs text-muted">Connect with other students to see their progress.</p>
            <button className="mt-4 px-4 py-2 text-[10px] font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5">Invite Friends</button>
          </div>
        </Card>
      </div>

      {/* Study Streak Heatmap */}
      <Card hover={false}>
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Flame size={18} className="text-orange-400" />
          Study Activity
        </h3>
        <div className="flex gap-1 flex-wrap">
          {HEATMAP_DATA.map((level, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${HEATMAP_COLORS[level]} transition-colors hover:ring-1 hover:ring-primary/50`} title={`Day ${90 - i}`} />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-xs text-muted">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-surface" />
            <div className="w-3 h-3 rounded-sm bg-primary/20" />
            <div className="w-3 h-3 rounded-sm bg-primary/50" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
          </div>
          <span className="text-xs text-muted">More</span>
        </div>
      </Card>

      {/* Optimized Ad Placement */}
      <AdBanner slot="dashboard_bottom" />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bgColor, trend, className }) {
  return (
    <Card className={cn("!p-5 border-b-2", className)} style={{ borderBottomColor: `var(--primary)` }}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}>
          <Icon size={20} className={color} />
        </div>
        {trend && (
          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUp size={10} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-black font-heading tracking-tight">{value}</p>
      <p className="text-[11px] font-bold text-muted uppercase tracking-widest mt-1">{label}</p>
    </Card>
  );
}

