'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';

export default function FeaturedSubjects() {
  return (
    <section id="subjects" className="py-20">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Browse <span className="gradient-text">Subjects</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            9 subjects with past papers, quizzes, and AI-powered topic analysis for both Form 4 and Grade 8
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
              className="glass-card p-6 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${subject.color}15` }}
                >
                  {subject.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-muted mb-3">{subject.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-surface" style={{ color: subject.color }}>
                      12 Exams
                    </span>
                    <span className="text-xs px-2 py-1 rounded-md bg-surface text-muted">
                      45 Quizzes
                    </span>
                  </div>
                </div>
                <ArrowRight size={18} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
