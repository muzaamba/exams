'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Search, Plus, Edit, Eye, Calendar, Award } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { SUBJECTS } from '@/lib/constants';

const exams = [
  { id: 1, title: 'Somali Form 4 Final 2024', subject: 'Somali', grade: 'Form 4', year: 2024, questions: 45, status: 'published' },
  { id: 2, title: 'Mathematics Grade 8 2024', subject: 'Mathematics', grade: 'Grade 8', year: 2024, questions: 38, status: 'review' },
  { id: 3, title: 'Biology Form 4 2024', subject: 'Biology', grade: 'Form 4', year: 2024, questions: 12, status: 'draft' },
  { id: 4, title: 'Chemistry Form 4 2023', subject: 'Chemistry', grade: 'Form 4', year: 2023, questions: 40, status: 'published' },
  { id: 5, title: 'Physics Grade 8 2023', subject: 'Physics', grade: 'Grade 8', year: 2023, questions: 35, status: 'published' },
];

export default function AdminExamsPage() {
  const [search, setSearch] = useState('');

  const filtered = exams.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (s) => s === 'published' ? 'bg-green-500/15 text-green-400' : s === 'review' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-gray-500/15 text-gray-400';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Exams</h1>
          <p className="text-muted mt-1">Create and manage exam papers</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/upload"><Button variant="secondary" icon={Plus}>Upload New</Button></Link>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input type="text" placeholder="Search exams..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>

      <div className="space-y-3">
        {filtered.map((exam) => (
          <Card key={exam.id} className="!p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold">{exam.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge color="blue">{exam.grade}</Badge>
                    <span className="text-xs text-muted">{exam.questions} questions</span>
                    <span className="text-xs text-muted">{exam.year}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle(exam.status)}`}>{exam.status}</span>
                <button className="p-2 rounded-lg hover:bg-surface text-muted hover:text-foreground"><Eye size={16} /></button>
                <button className="p-2 rounded-lg hover:bg-surface text-muted hover:text-foreground"><Edit size={16} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
