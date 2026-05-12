'use client';

import { useState, useEffect, useMemo } from 'react';
import { Flame, Brain, Trophy, Target, TrendingUp, BookOpen, Clock, Zap, Users, Play } from 'lucide-react';
import { CircularProgress, LinearProgress } from '@/components/ui/Progress';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { getGreeting, cn } from '@/lib/utils';
import { SUBJECTS } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';

// Mock data for demo
const mockStats = {
  streak: 7,
  quizzesCompleted: 42,
  totalXP: 2450,
  readinessScore: 73,
  questionsAnswered: 312,
  correctRate: 78,
};

const recentActivity = [
  { type: 'quiz', subject: 'Mathematics', score: '85%', time: '2 hours ago', icon: Brain },
  { type: 'revision', subject: 'Af-Soomaali', topic: 'Naxwe', time: '5 hours ago', icon: BookOpen },
  { type: 'quiz', subject: 'Biology', score: '92%', time: '1 day ago', icon: Brain },
  { type: 'exam', subject: 'Physics', topic: 'Past Paper 2024', time: '2 days ago', icon: Clock },
];

const weakTopics = [
  { subject: 'Mathematics', topic: 'Quadratic Equations', mastery: 35, color: '#6366F1' },
  { subject: 'Chemistry', topic: 'Organic Chemistry', mastery: 42, color: '#F59E0B' },
  { subject: 'Physics', topic: 'Electromagnetic Waves', mastery: 48, color: '#3B82F6' },
  { subject: 'English', topic: 'Essay Writing', mastery: 55, color: '#EC4899' },
];

const recommendedRevision = [
  { subject: 'Mathematics', topic: 'Quadratic Equations', reason: 'Low mastery + High exam frequency', priority: 'high' },
  { subject: 'Chemistry', topic: 'Periodic Table', reason: 'Not reviewed in 5 days', priority: 'medium' },
  { subject: 'Af-Soomaali', topic: 'Maahmaah', reason: 'Appears in 80% of past papers', priority: 'high' },
];

// Generate deterministic heatmap data (seeded, not random)
const HEATMAP_DATA = [
  3,0,1,2,3,1,0,2,1,3,0,2,1,0,3,2,1,0,3,1,
  2,0,1,3,2,0,1,2,3,1,0,2,3,1,0,2,1,3,0,2,
  1,3,0,2,1,0,3,2,1,3,0,1,2,3,0,1,2,0,3,1,
  2,1,3,0,2,1,0,3,2,1,3,0,1,2,0,3,1,2,0,1,
  3,2,0,1,3,1,2,0,3,1
];
const HEATMAP_COLORS = ['bg-surface', 'bg-primary/20', 'bg-primary/50', 'bg-primary'];

export default function DashboardPage() {
  const { profile, loading: authLoading } = useAuth();
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  if (authLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-8 w-64 bg-surface rounded-lg" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-surface rounded-2xl" />)}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header & Retention Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight">
            {greeting}, <span className="gradient-text">{profile?.full_name || 'Student'}</span> 👋
          </h1>
          <p className="text-muted mt-1 font-medium">Ready to dominate your exams today?</p>
        </div>
        
        {/* XP / Level Progress */}
        <div className="glass-card p-4 min-w-[280px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy size={60} />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-sm">
                Lvl {Math.floor((profile?.xp || 0) / 1000) + 1}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Next Level</span>
            </div>
            <span className="text-xs font-bold text-primary">{(profile?.xp || 0) % 1000} / 1000 XP</span>
          </div>
          <LinearProgress value={(profile?.xp || 0) % 10 + 20} color="var(--primary)" />
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Flame} 
          label="Daily Streak" 
          value={`${profile?.study_streak || 0} Days`} 
          color="text-orange-500" 
          bgColor="bg-orange-500/10" 
          trend="+2" 
          className="animate-fire-glow"
        />
        <StatCard icon={Brain} label="Quizzes" value={mockStats.quizzesCompleted} color="text-indigo-500" bgColor="bg-indigo-500/10" trend="+5" />
        <StatCard icon={Trophy} label="Rank" value="#12" color="text-yellow-500" bgColor="bg-yellow-500/10" trend="Top 5%" />
        <StatCard icon={Target} label="Accuracy" value={`${mockStats.correctRate}%`} color="text-emerald-500" bgColor="bg-emerald-500/10" trend="+3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Score */}
        <Card hover={false} className="lg:col-span-1 border-t-4 border-t-primary relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          <h3 className="font-bold mb-4 flex items-center gap-2 font-heading">
            <Target size={18} className="text-primary" />
            Exam Readiness
          </h3>
          <div className="flex flex-col items-center py-4">
            <CircularProgress value={mockStats.readinessScore} size={160} strokeWidth={12} color="var(--primary)">
              <div className="text-center">
                <span className="text-4xl font-black text-primary font-heading tracking-tight">{mockStats.readinessScore}%</span>
                <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">Ready</p>
              </div>
            </CircularProgress>
            <div className="mt-6 w-full p-3 rounded-xl bg-surface/50 border border-border/50 text-center">
              <p className="text-xs font-medium text-muted">
                You are in the <span className="text-primary font-bold">top 15%</span> of students this week!
              </p>
            </div>
          </div>
        </Card>

        {/* Weak Topics */}
        <Card hover={false} className="lg:col-span-2">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-red-400" />
            Topics to Improve
          </h3>
          <div className="space-y-4">
            {weakTopics.map((topic) => (
              <div key={topic.topic} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{topic.topic}</p>
                    <span className="text-xs text-muted">{topic.mastery}%</span>
                  </div>
                  <LinearProgress value={topic.mastery} color={topic.color} />
                  <p className="text-xs text-muted mt-1">{topic.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-indigo-400" />
            Recent Activity
          </h3>
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.subject}</p>
                  <p className="text-xs text-muted">{item.score || item.topic}</p>
                </div>
                <span className="text-xs text-muted whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            {recommendedRevision.map((rec, i) => (
              <div key={i} className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold">{rec.topic}</p>
                  <Badge color={rec.priority === 'high' ? 'red' : 'yellow'}>{rec.priority}</Badge>
                </div>
                <p className="text-xs text-muted">{rec.subject} • {rec.reason}</p>
              </div>
            ))}
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

        {/* Friends Online */}
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Users size={18} className="text-green-400" />
            Friends Online
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Abdirahman M.', level: 15, status: 'Online' },
              { name: 'Hodan A.', level: 12, status: 'Playing' }
            ].map((friend, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center text-white text-xs font-bold">
                    {friend.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{friend.name}</p>
                    <p className="text-[10px] text-muted">Level {friend.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className={cn("w-1.5 h-1.5 rounded-full", friend.status === 'Online' ? 'bg-green-500' : 'bg-primary')} />
                  <span className="text-[10px] text-muted">{friend.status}</span>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-[10px] font-bold text-primary hover:underline">Find more friends</button>
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
