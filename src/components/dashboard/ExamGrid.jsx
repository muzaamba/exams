'use client';

import { useState, useMemo } from 'react';
import { FileText, Download, Play, CheckCircle, Clock, Award, ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

export default function ExamGrid({ exams, subjectColor, onDownload }) {
  // Group exams by year (allowing multiple per year)
  const examsByYear = useMemo(() => (exams || []).reduce((acc, exam) => {
    if (!acc[exam.year]) acc[exam.year] = [];
    acc[exam.year].push(exam);
    return acc;
  }, {}), [exams]);

  const handleDownload = async (exam) => {
    if (onDownload) {
      await onDownload(exam);
    } else {
      await import('@/lib/download-exam').then(m => m.downloadExamPaper(exam.id, exam.title));
    }
  };

  // Get only the years that have exams and sort them descending
  const availableYears = useMemo(() => {
    return Object.keys(examsByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [examsByYear]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableYears.map((year) => {
        const yearExams = examsByYear[year] || [];

        return (
          <Card key={year} hover={false} className="relative overflow-hidden border-2 border-border/50 transition-all">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-foreground">{year}</span>
                <Badge color="primary" variant="outline" className="text-[10px]">
                  {yearExams.length} {yearExams.length === 1 ? 'PAPER' : 'PAPERS'}
                </Badge>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-500" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="space-y-3">
                {yearExams.map((exam) => (
                  <div key={exam.id} className="p-3 rounded-2xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-all group">
                    <div className="mb-3">
                      <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{exam.title}</h4>
                      <p className="text-[9px] text-muted font-black uppercase tracking-widest mt-1 flex items-center gap-2">
                        <Badge color="blue" className="px-1.5 py-0 h-4 text-[8px]">{exam.grade === 'form4' ? 'F4' : 'G8'}</Badge>
                        <Award size={10} className="text-primary/60" /> {exam.total_marks}M
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/exams/${exam.id}`} className="flex-1">
                        <Button size="xs" className="w-full text-[10px] h-8" variant="primary" icon={Play}>Practice</Button>
                      </Link>
                      <Button 
                        size="xs" 
                        variant="secondary" 
                        className="h-8 w-8 !p-0"
                        icon={Download}
                        onClick={() => handleDownload(exam)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Year Decal */}
            <span className="absolute -bottom-4 -right-2 text-6xl font-black text-foreground/[0.03] select-none pointer-events-none">
              {year}
            </span>
          </Card>
        );
      })}
      
      {availableYears.length === 0 && (
        <div className="col-span-full py-20 text-center glass-card border-dashed border-2">
          <FileText size={48} className="mx-auto text-muted/20 mb-4" />
          <h3 className="text-xl font-bold">No Papers in Archive</h3>
          <p className="text-muted text-sm max-w-xs mx-auto mt-2">We are currently digitizing the archive for this subject. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
