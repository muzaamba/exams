'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Users, Brain, Award } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Active Students', value: 2450, suffix: '+', color: 'text-primary' },
  { icon: BookOpen, label: 'Past Papers', value: 180, suffix: '+', color: 'text-indigo-400' },
  { icon: Brain, label: 'Quiz Questions', value: 5200, suffix: '+', color: 'text-purple-400' },
  { icon: Award, label: 'Exams Analyzed', value: 96, suffix: '', color: 'text-yellow-400' },
];

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-3xl sm:text-4xl font-black">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-20">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted">Join the growing community of students preparing smarter</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center group">
              <stat.icon className={`mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} size={28} />
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
