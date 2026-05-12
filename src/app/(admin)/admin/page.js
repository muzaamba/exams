'use client';

import Link from 'next/link';
import { BarChart3, Users, FileText, HelpCircle, Upload, TrendingUp, Brain, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import { ADMIN_NAV_LINKS } from '@/lib/constants';

const stats = [
  { label: 'Total Students', value: '2,450', trend: '+12%', icon: Users, color: 'text-primary' },
  { label: 'Total Exams', value: '96', trend: '+8', icon: FileText, color: 'text-indigo-400' },
  { label: 'Total Questions', value: '5,200', trend: '+340', icon: HelpCircle, color: 'text-purple-400' },
  { label: 'Quiz Attempts', value: '12,800', trend: '+1,200', icon: Brain, color: 'text-yellow-400' },
];

const recentExams = [
  { title: 'Af-Soomaali Form 4 2024', status: 'published', questions: 45 },
  { title: 'Mathematics Grade 8 2024', status: 'review', questions: 38 },
  { title: 'Biology Form 4 2024', status: 'draft', questions: 12 },
];

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted mt-1">Manage exams, questions, and platform content</p>
      </div>

      {/* Admin Nav */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {ADMIN_NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="!p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className={stat.color} />
              <span className="text-xs font-semibold text-primary flex items-center gap-0.5"><TrendingUp size={12} />{stat.trend}</span>
            </div>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Recent Exams */}
      <Card hover={false}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Recent Exams</h3>
          <Link href="/admin/exams" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="space-y-2">
          {recentExams.map((exam, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
              <div>
                <p className="text-sm font-medium">{exam.title}</p>
                <p className="text-xs text-muted">{exam.questions} questions</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                exam.status === 'published' ? 'bg-green-500/15 text-green-400' :
                exam.status === 'review' ? 'bg-yellow-500/15 text-yellow-400' :
                'bg-gray-500/15 text-gray-400'
              }`}>{exam.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
