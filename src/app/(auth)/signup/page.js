'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, GraduationCap } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { GRADES } from '@/lib/constants';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('form4');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: authError } = await signUp(email, password, {
        full_name: fullName,
        grade,
      });
      
      if (authError) throw authError;

      // Successful signup
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-12 h-12 rounded-2xl animated-gradient flex items-center justify-center text-white font-black text-2xl">
              Z
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Join Zeweno</h1>
          <p className="text-muted">Start your smart revision journey</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="Abdirahman Mohamed"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              icon={Mail}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            {/* Grade Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                <GraduationCap size={14} className="inline mr-1.5" />
                Select Your Grade
              </label>
              <div className="grid grid-cols-2 gap-3">
                {GRADES.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setGrade(g.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      grade === g.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/30 bg-surface'
                    }`}
                  >
                    <p className="font-bold text-lg">{g.label}</p>
                    <p className="text-xs text-muted mt-0.5">{g.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          AI-assisted revision — not leaked exams 🇸🇴
        </p>
      </div>
    </div>
  );
}
