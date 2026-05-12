import Link from 'next/link';
import { SUBJECTS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--bg-secondary)]">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl animated-gradient flex items-center justify-center text-white font-black text-lg">
                Z
              </div>
              <span className="text-xl font-bold gradient-text">Zeweno</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              AI-powered exam revision platform helping Somali students study smarter with past papers, quizzes, and personalized learning.
            </p>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-semibold mb-4">Subjects</h4>
            <ul className="space-y-2">
              {SUBJECTS.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link href={`/subjects/${s.slug}`} className="text-sm text-muted hover:text-primary transition-colors">
                    {s.icon} {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {['Quizzes', 'Past Papers', 'AI Analysis', 'Revision Planner', 'Leaderboard'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['About Us', 'Privacy Policy', 'Terms of Use', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">© 2026 Zeweno. AI-assisted revision — not leaked exams.</p>
          <p className="text-xs text-muted">Built for Somali students 🇸🇴</p>
        </div>
      </div>
    </footer>
  );
}
