'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FileText, Search, Plus, Edit, Eye, Calendar, Award, Loader2, Trash2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';

export default function AdminExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchExams() {
      if (!supabase) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*, questions(count)')
          .order('year', { ascending: false });

        if (error) throw error;
        setExams(data || []);
      } catch (err) {
        console.error('Error fetching admin exams:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchExams();
  }, [supabase]);

  const filtered = exams.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (s) => 
    s === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
    s === 'review' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
    'bg-gray-500/10 text-muted border-border';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Manage Archive</h1>
          <p className="text-muted mt-1">Organize and publish national exam papers</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/upload">
            <Button variant="primary" icon={Plus}>Upload New Paper</Button>
          </Link>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input 
          type="text" 
          placeholder="Search by title, year, or subject..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-border text-sm font-medium placeholder:text-muted focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all" 
        />
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-xs font-black text-muted uppercase tracking-widest">Retrieving Archive...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((exam) => (
            <Card key={exam.id} className="!p-5 border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xl font-black text-primary">{exam.year}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg truncate">{exam.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <Badge color="blue" className="uppercase tracking-tighter">{exam.grade}</Badge>
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-1">
                        <Award size={12} className="text-primary/60" /> {exam.subject}
                      </span>
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-1">
                        <FileText size={12} className="text-primary/60" /> {exam.questions?.[0]?.count || 0} Questions
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyle(exam.status)}`}>
                    {exam.status}
                  </span>
                  <div className="flex items-center gap-1 ml-2">
                    <Link href={`/exams/${exam.id}`} target="_blank">
                      <button className="p-2.5 rounded-xl hover:bg-primary/5 text-muted hover:text-primary transition-all" title="View Preview">
                        <Eye size={18} />
                      </button>
                    </Link>
                    <button className="p-2.5 rounded-xl hover:bg-indigo-500/5 text-muted hover:text-indigo-400 transition-all" title="Edit Paper">
                      <Edit size={18} />
                    </button>
                    <button className="p-2.5 rounded-xl hover:bg-red-500/5 text-muted hover:text-red-400 transition-all" title="Delete Paper">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-surface/30 rounded-[3rem] border-2 border-dashed border-border/50">
              <h3 className="text-xl font-bold">No exams found</h3>
              <p className="text-muted text-sm mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
