'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, Clock, Zap, Users, Search, Play } from 'lucide-react';
import Badge, { DifficultyBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { SUBJECTS } from '@/lib/constants';

const allQuizzes = [
  { id: 1, title: 'Somali Grammar', subject: 'somali', questions: 20, time: 15, difficulty: 'medium', players: 234, icon: '📖' },
  { id: 2, title: 'Algebra & Equations', subject: 'mathematics', questions: 25, time: 30, difficulty: 'hard', players: 189, icon: '📐' },
  { id: 3, title: 'Cell Biology Basics', subject: 'biology', questions: 15, time: 10, difficulty: 'easy', players: 312, icon: '🧬' },
  { id: 4, title: 'Chemical Bonding', subject: 'chemistry', questions: 20, time: 20, difficulty: 'medium', players: 198, icon: '⚗️' },
  { id: 5, title: 'Forces & Motion', subject: 'physics', questions: 25, time: 30, difficulty: 'hard', players: 156, icon: '⚡' },
  { id: 6, title: 'Arabic Grammar', subject: 'arabic', questions: 15, time: 15, difficulty: 'medium', players: 143, icon: '🕌' },
  { id: 7, title: 'English Comprehension', subject: 'english', questions: 10, time: 20, difficulty: 'medium', players: 278, icon: '🌍' },
  { id: 8, title: 'Map Skills Quiz', subject: 'geography', questions: 20, time: 15, difficulty: 'easy', players: 167, icon: '🗺️' },
  { id: 9, title: 'Somali History', subject: 'history', questions: 15, time: 15, difficulty: 'medium', players: 134, icon: '📜' },
];

export default function QuizzesPage() {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filtered = allQuizzes.filter((q) => {
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false;
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Quizzes</h1>
        <p className="text-muted mt-1">Test your knowledge and earn XP</p>
      </div>

      {/* Daily Challenge */}
      <div className="glass-card p-6 border-primary/30 bg-gradient-to-r from-primary/5 to-indigo-500/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-3xl animate-fire">🔥</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg">Daily Challenge</h3>
                <Badge color="yellow">+50 XP</Badge>
              </div>
              <p className="text-sm text-muted">5 questions • 5 minutes • New challenge every day!</p>
            </div>
          </div>
          <Link href="/quizzes/daily">
            <Button icon={Play}>Start Challenge</Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input type="text" placeholder="Search quizzes..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="all">All Subjects</option>
          {SUBJECTS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="all">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filtered.map((quiz) => (
          <Link key={quiz.id} href={`/quizzes/${quiz.id}`} className="glass-card p-5 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{quiz.icon}</span>
              <DifficultyBadge difficulty={quiz.difficulty} />
            </div>
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{quiz.title}</h3>
            <p className="text-xs text-muted mb-4 capitalize">{quiz.subject.replace('-', ' ')}</p>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1"><Zap size={12} /> {quiz.questions}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {quiz.time}m</span>
              <span className="flex items-center gap-1"><Users size={12} /> {quiz.players}</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Brain className="mx-auto text-muted mb-3" size={48} />
          <p className="text-muted">No quizzes found</p>
        </div>
      )}
    </div>
  );
}
