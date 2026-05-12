import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'Zeweno — AI-Powered Exam Revision for Somali Students',
  description: 'Study smarter with AI-assisted past paper analysis, smart quizzes, and personalized study plans for Form 4 & Grade 8 Somali students.',
  keywords: 'Somali education, exam revision, Form 4, Grade 8, past papers, quizzes, AI learning',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
