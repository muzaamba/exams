'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Brain, FileText, Search } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';
import { LinearProgress } from '@/components/ui/Progress';
import { useState } from 'react';

const subjectStats = {
  'af-soomaali': { exams: 15, quizzes: 48, mastery: 65 },
  'mathematics': { exams: 18, quizzes: 62, mastery: 45 },
  'biology': { exams: 12, quizzes: 38, mastery: 72 },
  'chemistry': { exams: 14, quizzes: 42, mastery: 38 },
  'physics': { exams: 13, quizzes: 40, mastery: 52 },
  'arabic': { exams: 10, quizzes: 30, mastery: 60 },
  'english': { exams: 16, quizzes: 55, mastery: 68 },
  'geography': { exams: 11, quizzes: 35, mastery: 55 },
  'history': { exams: 9, quizzes: 28, mastery: 50 },
};

export default function SubjectsPage() {
  const [search, setSearch] = useState('');

  const filtered = SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Subjects</h1>
          <p className="text-muted mt-1">Browse all subjects and track your progress</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filtered.map((subject) => {
          const stats = subjectStats[subject.slug] || { exams: 0, quizzes: 0, mastery: 0 };
          return (
            <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="glass-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${subject.color}15` }}
                >
                  {subject.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{subject.name}</h3>
                  <p className="text-xs text-muted">{subject.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">Mastery</span>
                    <span className="font-semibold" style={{ color: subject.color }}>{stats.mastery}%</span>
                  </div>
                  <LinearProgress value={stats.mastery} color={subject.color} />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <FileText size={12} /> {stats.exams} exams
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Brain size={12} /> {stats.quizzes} quizzes
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Study Now <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
