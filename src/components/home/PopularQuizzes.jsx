'use client';

import Link from 'next/link';
import { Clock, Users, Zap } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const quizzes = [
  { id: 1, title: 'Af-Soomaali Grammar Challenge', subject: 'Af-Soomaali', questions: 20, time: 15, difficulty: 'medium', players: 234, color: 'green' },
  { id: 2, title: 'Mathematics Past Paper 2024', subject: 'Mathematics', questions: 30, time: 45, difficulty: 'hard', players: 189, color: 'indigo' },
  { id: 3, title: 'Biology Cell Structure', subject: 'Biology', questions: 15, time: 10, difficulty: 'easy', players: 312, color: 'green' },
  { id: 4, title: 'Physics Forces & Motion', subject: 'Physics', questions: 25, time: 30, difficulty: 'hard', players: 156, color: 'blue' },
  { id: 5, title: 'English Reading Comprehension', subject: 'English', questions: 10, time: 20, difficulty: 'medium', players: 278, color: 'pink' },
  { id: 6, title: 'Chemistry Elements Quiz', subject: 'Chemistry', questions: 20, time: 15, difficulty: 'medium', players: 198, color: 'yellow' },
];

export default function PopularQuizzes() {
  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <div className="container-main">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Popular <span className="gradient-text">Quizzes</span>
            </h2>
            <p className="text-muted">Test your knowledge with trending quizzes</p>
          </div>
          <Link href="/quizzes" className="hidden sm:flex items-center gap-2 text-primary text-sm font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {quizzes.map((quiz) => (
            <Link key={quiz.id} href={`/quizzes/${quiz.id}`} className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <Badge color={quiz.color}>{quiz.subject}</Badge>
                <Badge color={quiz.difficulty === 'easy' ? 'green' : quiz.difficulty === 'medium' ? 'yellow' : 'red'}>
                  {quiz.difficulty}
                </Badge>
              </div>
              <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">
                {quiz.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Zap size={12} /> {quiz.questions} Qs
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {quiz.time}min
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> {quiz.players}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
