'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell, PieChart, Pie 
} from 'recharts';
import { TrendingUp, AlertTriangle, ShieldCheck, Zap, Info, Calendar } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { LinearProgress } from '@/components/ui/Progress';

export default function AnalysisDashboard({ subject }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`/api/ai-analysis?subject=${subject}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (subject) fetchAnalysis();
  }, [subject]);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      <div className="h-64 bg-surface rounded-3xl" />
      <div className="h-64 bg-surface rounded-3xl" />
    </div>
  );

  if (!data) return null;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-primary" size={20} />
            <h4 className="text-sm font-bold">Correlation Score</h4>
          </div>
          <p className="text-3xl font-black">{Math.round(data.correlation_score * 100)}%</p>
          <p className="text-xs text-muted mt-1">Consistency in question patterns over 3 years.</p>
        </Card>

        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-yellow-400" size={20} />
            <h4 className="text-sm font-bold">Difficulty Trend</h4>
          </div>
          <p className="text-3xl font-black capitalize">{data.difficulty_trend}</p>
          <p className="text-xs text-muted mt-1">AI detected shift in question complexity.</p>
        </Card>

        <Card className="bg-green-500/5 border-green-500/20">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-green-400" size={20} />
            <h4 className="text-sm font-bold">Strategy</h4>
          </div>
          <p className="text-sm font-medium leading-tight">{data.strategy}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Frequency Chart */}
        <Card hover={false} className="h-80">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            Most Repeated Topics
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.repeated_topics} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="topic" 
                type="category" 
                tick={{ fontSize: 10, fill: 'var(--muted)' }} 
                width={80}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}
              />
              <Bar dataKey="frequency" radius={[0, 4, 4, 0]}>
                {data.repeated_topics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary)' : 'var(--primary-muted)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Prediction Hot Topics */}
        <Card hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <Calendar size={18} className="text-orange-400" />
              AI Focus Predictions
            </h3>
            <Badge color="orange">Hot Areas</Badge>
          </div>
          <div className="space-y-4">
            {data.predicted_focus_areas.map((area, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">{area.area}</span>
                  <span className="text-primary font-black">{area.probability}% Prob.</span>
                </div>
                <LinearProgress value={area.probability} color="var(--primary)" />
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-2xl bg-surface border border-border flex gap-3">
             <Info className="text-muted shrink-0" size={18} />
             <p className="text-[10px] text-muted italic">
               Note: These are statistical correlations based on past Somali National Exams and do not constitute actual leaks.
             </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
