'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge, { DifficultyBadge } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { SUBJECTS, QUESTION_TYPES } from '@/lib/constants';

const questions = [
  { id: 1, text: 'Waa maxay macnaha erayga "Barwaaqo"?', subject: 'Af-Soomaali', type: 'mcq', difficulty: 'easy', topic: 'Vocabulary', year: 2024 },
  { id: 2, text: 'Solve: 2x + 5 = 15', subject: 'Mathematics', type: 'mcq', difficulty: 'medium', topic: 'Algebra', year: 2024 },
  { id: 3, text: 'What is the powerhouse of the cell?', subject: 'Biology', type: 'mcq', difficulty: 'easy', topic: 'Cell Biology', year: 2023 },
  { id: 4, text: 'What is the chemical symbol for Gold?', subject: 'Chemistry', type: 'mcq', difficulty: 'easy', topic: 'Elements', year: 2024 },
  { id: 5, text: 'Explain Newton\'s First Law of Motion', subject: 'Physics', type: 'short_answer', difficulty: 'medium', topic: 'Forces', year: 2023 },
  { id: 6, text: 'Write an essay about climate change', subject: 'English', type: 'essay', difficulty: 'hard', topic: 'Essay Writing', year: 2024 },
];

export default function QuestionsPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = questions.filter((q) =>
    q.text.toLowerCase().includes(search.toLowerCase()) ||
    q.subject.toLowerCase().includes(search.toLowerCase()) ||
    q.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Questions</h1>
          <p className="text-muted mt-1">Manage all exam questions</p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Add Question</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input type="text" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>

      <Card hover={false} className="!p-2">
        <div className="hidden sm:grid grid-cols-12 gap-4 p-3 text-xs font-semibold text-muted uppercase tracking-wider">
          <div className="col-span-5">Question</div>
          <div className="col-span-2">Subject</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-1">Diff.</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {filtered.map((q) => (
          <div key={q.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 p-3 rounded-xl hover:bg-surface/50 transition-colors items-center border-b border-border last:border-0">
            <div className="col-span-5">
              <p className="text-sm font-medium truncate">{q.text}</p>
              <p className="text-xs text-muted sm:hidden">{q.subject} • {q.type} • {q.difficulty}</p>
            </div>
            <div className="col-span-2 hidden sm:block"><Badge color="blue">{q.subject}</Badge></div>
            <div className="col-span-1 hidden sm:block"><span className="text-xs text-muted capitalize">{q.type}</span></div>
            <div className="col-span-1 hidden sm:block"><DifficultyBadge difficulty={q.difficulty} /></div>
            <div className="col-span-1 hidden sm:block"><span className="text-xs text-muted">{q.year}</span></div>
            <div className="col-span-2 flex justify-end gap-1">
              <button className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-foreground"><Eye size={14} /></button>
              <button className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-foreground"><Edit size={14} /></button>
              <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </Card>

      {/* Add Question Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Question" size="lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border text-sm">
                {SUBJECTS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Question Type</label>
              <select className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border text-sm">
                {QUESTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Question Text</label>
            <textarea className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Enter question text..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Option A" placeholder="Enter option A" />
            <Input label="Option B" placeholder="Enter option B" />
            <Input label="Option C" placeholder="Enter option C" />
            <Input label="Option D" placeholder="Enter option D" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Correct Answer</label>
              <select className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border text-sm">
                <option>A</option><option>B</option><option>C</option><option>D</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border text-sm">
                <option>easy</option><option>medium</option><option>hard</option>
              </select>
            </div>
            <Input label="Topic" placeholder="e.g., Algebra" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Explanation</label>
            <textarea className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-border text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Explain the answer..." />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" onClick={() => setShowModal(false)}>Save Question</Button>
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
