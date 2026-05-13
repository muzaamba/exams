'use client';

import { useState } from 'react';
import { FileText, Download, Play, CheckCircle, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

export default function ExamGrid({ exams, subjectColor, onDownload }) {
  // Group exams by year
  const examsByYear = exams.reduce((acc, exam) => {
    acc[exam.year] = exam;
    return acc;
  }, {});

  const handleDownload = async (exam) => {
    if (onDownload) {
      await onDownload(exam);
    } else {
      await import('@/lib/download-exam').then(m => m.downloadExamPaper(exam.id, exam.title));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {YEARS.map((year) => {
        const exam = examsByYear[year];
        const isAvailable = !!exam;

        return (
          <Card key={year} hover={isAvailable} className={`relative overflow-hidden border-2 transition-all ${isAvailable ? 'border-border/50 hover:border-primary/50' : 'border-dashed border-border/30 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`text-lg font-black ${isAvailable ? 'text-foreground' : 'text-muted'}`}>{year}</span>
                {isAvailable && <Badge color="primary" variant="outline" className="text-[10px]">REAL PAPER</Badge>}
              </div>
              {isAvailable ? (
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
                  <Clock size={16} className="text-muted/30" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {isAvailable ? (
                <>
                  <div>
                    <h4 className="font-bold text-sm truncate">{exam.title}</h4>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">
                      {exam.duration} MIN • {exam.total_marks} MARKS
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/exams/${exam.id}`} className="flex-1">
                      <Button size="sm" className="w-full" variant="primary" icon={Play}>Practice</Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      icon={Download}
                      onClick={() => handleDownload(exam)}
                    />
                  </div>
                </>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <FileText size={24} className="text-muted/20 mb-2" />
                  <p className="text-xs font-bold text-muted/40 uppercase tracking-tighter">Paper Pending</p>
                </div>
              )}
            </div>

            {/* Background Year Decal */}
            <span className="absolute -bottom-4 -right-2 text-6xl font-black text-foreground/[0.03] select-none pointer-events-none">
              {year}
            </span>
          </Card>
        );
      })}
    </div>
  );
}
