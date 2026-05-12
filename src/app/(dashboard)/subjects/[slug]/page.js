'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Brain, FileText, TrendingUp, ArrowLeft, Play, Clock, Zap } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge, { DifficultyBadge } from '@/components/ui/Badge';
import { CircularProgress, LinearProgress } from '@/components/ui/Progress';
import AnalysisDashboard from '@/components/dashboard/AnalysisDashboard';

const tabs = ['Overview', 'Quizzes', 'Exams', 'Notes', 'AI Analysis'];

const topicBreakdown = [
  { name: 'Grammar (Naxwe)', frequency: 92, mastery: 65, exams: 12 },
  { name: 'Vocabulary', frequency: 85, mastery: 72, exams: 10 },
  { name: 'Reading Comprehension', frequency: 88, mastery: 58, exams: 11 },
  { name: 'Poetry (Gabay)', frequency: 75, mastery: 45, exams: 8 },
  { name: 'Essay Writing', frequency: 70, mastery: 40, exams: 9 },
  { name: 'Proverbs (Maahmaah)', frequency: 80, mastery: 70, exams: 10 },
];

const sampleQuizzes = [
  { id: 1, title: 'Grammar Quick Test', questions: 15, time: 10, difficulty: 'easy', attempts: 156 },
  { id: 2, title: 'Vocabulary Builder', questions: 20, time: 15, difficulty: 'medium', attempts: 234 },
  { id: 3, title: 'Past Paper 2024 Simulation', questions: 40, time: 60, difficulty: 'hard', attempts: 89 },
  { id: 4, title: 'Poetry Analysis', questions: 10, time: 20, difficulty: 'hard', attempts: 67 },
];

const sampleExams = [
  { id: 1, title: 'Form 4 Final Exam 2024', year: 2024, marks: 100, duration: 120, sections: 4 },
  { id: 2, title: 'Form 4 Mid-Year 2024', year: 2024, marks: 80, duration: 90, sections: 3 },
  { id: 3, title: 'Form 4 Final Exam 2023', year: 2023, marks: 100, duration: 120, sections: 4 },
  { id: 4, title: 'Form 4 Mock Exam 2023', year: 2023, marks: 100, duration: 120, sections: 4 },
];

export default function SubjectDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const subject = SUBJECTS.find((s) => s.slug === slug) || SUBJECTS[0];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link href="/subjects" className="p-2 rounded-lg hover:bg-surface transition-colors text-muted hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${subject.color}15` }}>
            {subject.icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{subject.name}</h1>
            <p className="text-muted text-sm">{subject.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:text-foreground hover:bg-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="!p-4 text-center">
              <p className="text-2xl font-black" style={{ color: subject.color }}>62%</p>
              <p className="text-xs text-muted mt-1">Overall Mastery</p>
            </Card>
            <Card className="!p-4 text-center">
              <p className="text-2xl font-black">15</p>
              <p className="text-xs text-muted mt-1">Past Papers</p>
            </Card>
            <Card className="!p-4 text-center">
              <p className="text-2xl font-black">48</p>
              <p className="text-xs text-muted mt-1">Quizzes</p>
            </Card>
            <Card className="!p-4 text-center">
              <p className="text-2xl font-black">6</p>
              <p className="text-xs text-muted mt-1">Topics</p>
            </Card>
          </div>

          {/* Topic Breakdown */}
          <Card hover={false}>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              Topic Breakdown & Exam Frequency
            </h3>
            <div className="space-y-4">
              {topicBreakdown.map((topic) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{topic.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted">Appears in {topic.frequency}% of exams</span>
                      <span className="text-xs font-semibold" style={{ color: subject.color }}>{topic.mastery}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <LinearProgress value={topic.mastery} color={subject.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Quizzes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sampleQuizzes.map((quiz) => (
            <Card key={quiz.id} className="group">
              <div className="flex items-center justify-between mb-3">
                <Badge color="green">{subject.name}</Badge>
                <DifficultyBadge difficulty={quiz.difficulty} />
              </div>
              <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{quiz.title}</h3>
              <div className="flex items-center gap-4 text-xs text-muted mb-4">
                <span className="flex items-center gap-1"><Zap size={12} /> {quiz.questions} Qs</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {quiz.time}min</span>
                <span>{quiz.attempts} attempts</span>
              </div>
              <Link href={`/quizzes/${quiz.id}`}>
                <Button size="sm" icon={Play}>Start Quiz</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'Exams' && (
        <div className="space-y-3">
          {sampleExams.map((exam) => (
            <Link key={exam.id} href={`/exams/${exam.id}`} className="glass-card p-5 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <FileText size={20} className="text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold group-hover:text-primary transition-colors">{exam.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted mt-1">
                  <span>{exam.year}</span>
                  <span>{exam.marks} marks</span>
                  <span>{exam.duration}min</span>
                  <span>{exam.sections} sections</span>
                </div>
              </div>
              <Button variant="secondary" size="sm" icon={Play}>View</Button>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'Notes' && (
        <Card hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            Revision Notes
          </h3>
          <div className="prose prose-sm max-w-none text-muted">
            <p className="mb-4">Revision notes for <strong>{subject.name}</strong> will be available here. Topics covered include:</p>
            <ul className="space-y-2">
              {topicBreakdown.map((topic) => (
                <li key={topic.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{topic.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic">Notes are being compiled from past papers and study materials. Check back soon!</p>
          </div>
        </Card>
      )}

      {activeTab === 'AI Analysis' && (
        <div className="space-y-6">
          <Card hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <Zap size={18} className="text-yellow-400" />
                Smart Exam Analysis & Predictions
              </h3>
              <Badge color="primary">Government Model</Badge>
            </div>
            <AnalysisDashboard subject={subject.slug} />
          </Card>
        </div>
      )}
    </div>
  );
}
