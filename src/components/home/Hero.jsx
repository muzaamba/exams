'use client';

import Link from 'next/link';
import { ArrowRight, Brain, Sparkles, TrendingUp, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden mesh-gradient">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float opacity-20">
          <div className="w-20 h-20 rounded-2xl bg-primary/30 backdrop-blur-sm flex items-center justify-center text-3xl">📐</div>
        </div>
        <div className="absolute top-40 right-20 animate-float-delay opacity-20">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/30 backdrop-blur-sm flex items-center justify-center text-2xl">🧬</div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float opacity-15">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/30 backdrop-blur-sm flex items-center justify-center text-xl">⚡</div>
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float-delay opacity-15">
          <div className="w-18 h-18 rounded-2xl bg-emerald-500/30 backdrop-blur-sm flex items-center justify-center text-2xl">📖</div>
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, var(--muted) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.05,
        }} />
      </div>

      <div className="container-main relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">AI-Powered Exam Revision</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-heading tracking-tighter leading-[1.0] mb-8 animate-slide-up">
            Master Your{' '}
            <span className="gradient-text relative">
              Exams
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 blur-sm" />
            </span>
            <br className="hidden sm:block" />
            with <span className="text-primary pulse-glow px-2 rounded-lg">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            The #1 exam revision platform for Somali students. AI-assisted past paper analysis,
            smart quizzes, and personalized study plans for Form 4 & Grade 8.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/signup">
              <Button size="xl" icon={ArrowRight}>
                Start Studying Free
              </Button>
            </Link>
            <Link href="/subjects">
              <Button variant="secondary" size="xl">
                Browse Subjects
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: Brain, text: 'Smart Quizzes', color: 'text-primary' },
              { icon: TrendingUp, text: 'Exam Trends', color: 'text-indigo-400' },
              { icon: Zap, text: 'AI Analysis', color: 'text-yellow-400' },
              { icon: Sparkles, text: 'Daily Revision', color: 'text-purple-400' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border backdrop-blur-sm"
              >
                <item.icon size={14} className={item.color} />
                <span className="text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
