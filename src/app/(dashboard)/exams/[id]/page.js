'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Award, FileText, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge, { DifficultyBadge } from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

const exam = {
  id: 1, title: 'Af-Soomaali Form 4 Final Exam 2024', subject: 'Af-Soomaali', grade: 'Form 4',
  year: 2024, marks: 100, duration: 120,
  sections: [
    { name: 'Section A: Grammar (Naxwe)', marks: 30, questions: 10 },
    { name: 'Section B: Reading Comprehension', marks: 25, questions: 5 },
    { name: 'Section C: Poetry (Gabay)', marks: 20, questions: 3 },
    { name: 'Section D: Essay Writing', marks: 25, questions: 2 },
  ],
  questions: [
    { id: 1, section: 'A', number: 1, text: 'Sheeg nooca erayga "wanaagsan" marka loo eego qaybaha hadalka.', type: 'mcq', difficulty: 'easy',
      options: ['Magac', 'Falmaah', 'Tilmaan', 'Xaraf'], correct: 2 },
    { id: 2, section: 'A', number: 2, text: 'Waa maxay falmaahda jumladdaan: "Ardaygu buugguu akhrinayaa"?', type: 'mcq', difficulty: 'medium',
      options: ['akhrinayaa', 'Ardaygu', 'buugguu', 'waa'], correct: 0 },
    { id: 3, section: 'A', number: 3, text: 'Qor jumladdo isticmaalaya erayga "Barwaaqo" si sax ah.', type: 'short_answer', difficulty: 'medium' },
    { id: 4, section: 'B', number: 1, text: 'Akhri cutubka soo socda oo ka jawaab su\'aalaha ku xiga...', type: 'reading_comprehension', difficulty: 'hard' },
  ],
};

export default function ExamDetailPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => router.push('/exams')} className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
        <ArrowLeft size={18} /> Back to Exams
      </button>

      {/* Exam Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge color="green">{exam.subject}</Badge>
              <Badge color="blue">{exam.grade}</Badge>
              <Badge color="purple">{exam.year}</Badge>
            </div>
            <h1 className="text-2xl font-bold">{exam.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">{exam.marks}</p>
              <p className="text-xs text-muted">Marks</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{exam.duration}</p>
              <p className="text-xs text-muted">Minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exam.sections.map((section, i) => (
          <Card key={i} className="!p-5">
            <h3 className="font-bold mb-2">{section.name}</h3>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex items-center gap-1"><Award size={14} />{section.marks} marks</span>
              <span className="flex items-center gap-1"><FileText size={14} />{section.questions} questions</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Questions Preview */}
      <Card hover={false}>
        <h3 className="font-bold mb-4">Questions Preview</h3>
        <div className="space-y-4">
          {exam.questions.map((q) => (
            <div key={q.id} className="p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Badge color="indigo">Section {q.section}</Badge>
                <DifficultyBadge difficulty={q.difficulty} />
                <span className="text-xs text-muted capitalize">{q.type.replace('_', ' ')}</span>
              </div>
              <p className="text-sm font-medium">{q.number}. {q.text}</p>
              {q.options && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="p-2 rounded-lg bg-surface text-sm text-muted">
                      {String.fromCharCode(65 + oi)}. {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" icon={Play}>Start Exam Simulation</Button>
      </div>
    </div>
  );
}
