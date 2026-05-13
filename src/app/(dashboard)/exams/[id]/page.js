'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Clock, Award, FileText, Play, Loader2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge, { DifficultyBadge } from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/client';
import { normalizeSubject } from '@/lib/utils';

export default function ExamDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchExamDetails() {
      if (!id) return;
      setLoading(true);
      try {
        // Fetch Exam
        const { data: examData, error: examError } = await supabase
          .from('exams')
          .select('*')
          .eq('id', id)
          .single();

        if (examError) throw examError;
        setExam({ ...examData, subject: normalizeSubject(examData.subject) });

        // Fetch Sections
        const { data: sectionData } = await supabase
          .from('sections')
          .select('*')
          .eq('exam_id', id)
          .order('sort_order', { ascending: true });
        
        setSections(sectionData || []);

        // Fetch Questions (first few for preview)
        const { data: questionData } = await supabase
          .from('questions')
          .select('*')
          .eq('exam_id', id)
          .order('question_number', { ascending: true })
          .limit(5);
        
        setQuestions(questionData || []);

      } catch (err) {
        console.error('Error fetching exam details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchExamDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-muted font-medium">Loading exam details...</p>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <AlertCircle size={64} className="mx-auto text-red-500/50" />
        <h2 className="text-2xl font-bold">Failed to load exam</h2>
        <p className="text-muted">{error || 'The requested exam could not be found.'}</p>
        <Button onClick={() => router.push('/exams')} variant="secondary">Back to Exams</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => router.push('/exams')} className="flex items-center gap-2 text-muted hover:text-foreground transition-colors font-medium">
        <ArrowLeft size={18} /> Back to Exams
      </button>

      {/* Exam Header */}
      <div className="glass-card p-6 border-primary/20 bg-gradient-to-br from-surface to-primary/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge color="green">{exam.subject}</Badge>
              <Badge color="blue">{exam.grade === 'form4' ? 'Form 4' : 'Grade 8'}</Badge>
              <Badge color="purple">{exam.year}</Badge>
            </div>
            <h1 className="text-3xl font-black font-heading tracking-tight">{exam.title}</h1>
          </div>
          <div className="flex items-center gap-6 bg-surface/50 p-4 rounded-2xl border border-border/50">
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{exam.total_marks}</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Marks</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black">{exam.duration}</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Mins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section, i) => (
          <Card key={i} className="!p-4 border-border/50 hover:border-primary/30 transition-colors">
            <h3 className="font-bold text-sm mb-3 line-clamp-1" title={section.section_name}>{section.section_name}</h3>
            <div className="flex items-center justify-between text-[11px] text-muted font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Award size={12} className="text-primary" />{section.marks} marks</span>
            </div>
          </Card>
        ))}
        {sections.length === 0 && (
          <div className="col-span-full p-4 text-center text-xs text-muted italic">
            No sections defined for this exam.
          </div>
        )}
      </div>

      {/* Questions Preview */}
      <Card hover={false} className="border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            Exam Structure Preview
          </h3>
          <span className="text-xs text-muted font-medium">Showing first {questions.length} questions</span>
        </div>
        
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="p-4 rounded-2xl border border-border/50 bg-surface/30">
              <div className="flex items-center gap-2 mb-3">
                <DifficultyBadge difficulty={q.difficulty} />
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest px-2 py-0.5 bg-surface rounded-full border border-border/50">
                  {q.question_type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm font-semibold leading-relaxed">{q.question_number}. {q.question_text}</p>
              {(q.option_a || q.option_b) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {[q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean).map((opt, oi) => (
                    <div key={oi} className="p-2.5 rounded-xl bg-surface/50 border border-border/50 text-xs text-muted font-medium">
                      <span className="text-primary font-bold mr-2">{String.fromCharCode(65 + oi)}.</span> {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {questions.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm text-muted italic">Full question data available in simulator.</p>
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-center pt-4 pb-10">
        <Button size="lg" className="px-12 h-14 text-lg font-black shadow-xl shadow-primary/20" icon={Play}>
          Start Full Exam Simulation
        </Button>
      </div>
    </div>
  );
}

