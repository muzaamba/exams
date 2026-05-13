'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, Brain, Sparkles, TrendingUp, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const [stats, setStats] = useState({ exams: 0, students: 0 });
  const supabase = createClient();

  useEffect(() => {
    async function fetchHeroStats() {
      if (!supabase) return;
      try {
        const { count: examCount } = await supabase.from('exams').select('*', { count: 'exact', head: true });
        const { count: studentCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        setStats({ exams: examCount || 0, students: studentCount || 0 });
      } catch (err) {
        console.error('Error fetching hero stats:', err);
      }
    }
    fetchHeroStats();
  }, [supabase]);

  const metrics = [
    { label: 'Success Rate', value: '94%' },
    { label: 'Exams Analyzed', value: stats.exams.toLocaleString() },
    { label: 'Active Students', value: stats.students.toLocaleString() },
    { label: 'AI Accuracy', value: '98.2%' },
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-background">
      {/* Structural Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        {/* Subtle Geometric Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 M0 50 L50 0 M50 100 L100 50" stroke="currentColor" strokeWidth="0.1" fill="none" />
        </svg>
      </div>

      <div className="container-main relative z-10 pt-20">
        <div className="max-w-5xl">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface border border-border mb-10 animate-fade-in shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Advanced Learning Systems</span>
          </div>

          {/* Precision Heading */}
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold font-heading tracking-tighter leading-[0.9] mb-10 animate-slide-up">
            ELEVATE <br />
            <span className="text-primary italic">YOUR</span> EXAMS.
          </h1>

          {/* Professional Subtitle */}
          <p className="text-xl sm:text-2xl text-muted max-w-2xl mb-12 leading-tight font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
            The definitive revision platform for Somali National Exams. 
            Powered by precision AI to analyze past papers and predict future outcomes.
          </p>

          {/* Structured CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/signup">
              <button className="px-10 py-5 bg-primary text-background font-black text-sm uppercase tracking-widest rounded-none hover:bg-primary-light transition-all shadow-xl shadow-primary/20">
                Get Started
              </button>
            </Link>
            <Link href="/subjects">
              <button className="px-10 py-5 bg-transparent border-2 border-foreground text-foreground font-black text-sm uppercase tracking-widest rounded-none hover:bg-foreground hover:text-background transition-all">
                Explore Subjects
              </button>
            </Link>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {metrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-3xl font-black font-heading text-foreground">{metric.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
