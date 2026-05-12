'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Search, Calendar, Clock, Award } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { SUBJECTS } from '@/lib/constants';

const exams = [
  { id: 1, title: 'Somali Form 4 Final 2024', subject: 'somali', grade: 'form4', year: 2024, marks: 100, duration: 120, sections: 4 },
  { id: 2, title: 'Mathematics Form 4 Final 2024', subject: 'mathematics', grade: 'form4', year: 2024, marks: 100, duration: 150, sections: 3 },
  { id: 3, title: 'Biology Grade 8 Final 2024', subject: 'biology', grade: 'grade8', year: 2024, marks: 80, duration: 90, sections: 3 },
  { id: 4, title: 'Chemistry Form 4 Mid-Year 2024', subject: 'chemistry', grade: 'form4', year: 2024, marks: 80, duration: 90, sections: 3 },
  { id: 5, title: 'Physics Form 4 Final 2023', subject: 'physics', grade: 'form4', year: 2023, marks: 100, duration: 120, sections: 4 },
  { id: 6, title: 'English Grade 8 Final 2023', subject: 'english', grade: 'grade8', year: 2023, marks: 80, duration: 90, sections: 3 },
  { id: 7, title: 'Geography Form 4 Final 2023', subject: 'geography', grade: 'form4', year: 2023, marks: 100, duration: 120, sections: 4 },
  { id: 8, title: 'History Grade 8 Mid-Year 2023', subject: 'history', grade: 'grade8', year: 2023, marks: 60, duration: 60, sections: 2 },
];

export default function ExamsPage() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');

  const filtered = exams.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (yearFilter !== 'all' && e.year !== parseInt(yearFilter)) return false;
    if (subjectFilter !== 'all' && e.subject !== subjectFilter) return false;
    if (gradeFilter !== 'all' && e.grade !== gradeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Exam Papers</h1>
        <p className="text-muted mt-1">Browse past papers and practice exams</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input type="text" placeholder="Search exams..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer">
          <option value="all">All Subjects</option>
          {SUBJECTS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
        <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer">
          <option value="all">All Grades</option>
          <option value="form4">Form 4</option>
          <option value="grade8">Grade 8</option>
        </select>
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm cursor-pointer">
          <option value="all">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <div className="space-y-3 stagger-children">
        {filtered.map((exam) => {
          const sub = SUBJECTS.find((s) => s.slug === exam.subject);
          return (
            <Link key={exam.id} href={`/exams/${exam.id}`} className="glass-card p-5 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${sub?.color || '#6366F1'}15` }}>
                {sub?.icon || '📄'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold group-hover:text-primary transition-colors truncate">{exam.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <Badge color="blue">{exam.grade === 'form4' ? 'Form 4' : 'Grade 8'}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted"><Calendar size={12} />{exam.year}</span>
                  <span className="flex items-center gap-1 text-xs text-muted"><Award size={12} />{exam.marks} marks</span>
                  <span className="flex items-center gap-1 text-xs text-muted"><Clock size={12} />{exam.duration}min</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto text-muted mb-3" size={48} />
          <p className="text-muted">No exams found</p>
        </div>
      )}
    </div>
  );
}
