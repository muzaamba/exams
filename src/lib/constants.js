export const SUBJECTS = [
  { slug: 'somali', name: 'Somali', icon: '📖', color: '#10B981', description: 'Somali Language & Literature' },
  { slug: 'mathematics', name: 'Mathematics', icon: '📐', color: '#6366F1', description: 'Algebra, Geometry & Statistics' },
  { slug: 'biology', name: 'Biology', icon: '🧬', color: '#22C55E', description: 'Life Sciences & Human Biology' },
  { slug: 'chemistry', name: 'Chemistry', icon: '⚗️', color: '#F59E0B', description: 'Chemical Reactions & Elements' },
  { slug: 'physics', name: 'Physics', icon: '⚡', color: '#3B82F6', description: 'Forces, Energy & Waves' },
  { slug: 'arabic', name: 'Arabic', icon: '🕌', color: '#8B5CF6', description: 'Arabic Language & Grammar' },
  { slug: 'english', name: 'English', icon: '🌍', color: '#EC4899', description: 'English Language & Comprehension' },
  { slug: 'geography', name: 'Geography', icon: '🗺️', color: '#14B8A6', description: 'Physical & Human Geography' },
  { slug: 'history', name: 'History', icon: '📜', color: '#F97316', description: 'Somali & World History' },
  { slug: 'islamic_studies', name: 'Islamic Studies', icon: '🕋', color: '#059669', description: 'Islamic Jurisprudence & Ethics' },
  { slug: 'business', name: 'Business', icon: '💼', color: '#64748B', description: 'Business Studies & Economics' },
];

export const GRADES = [
  { value: 'form4', label: 'Form 4', description: 'Secondary School' },
  { value: 'grade8', label: 'Grade 8', description: 'Primary School' },
];

export const QUESTION_TYPES = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'essay', label: 'Essay' },
  { value: 'short_answer', label: 'Short Answer' },
  { value: 'vocabulary', label: 'Vocabulary' },
  { value: 'grammar', label: 'Grammar' },
  { value: 'reading_comprehension', label: 'Reading Comprehension' },
  { value: 'poetry_analysis', label: 'Poetry Analysis' },
];

export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', color: '#22C55E' },
  { value: 'medium', label: 'Medium', color: '#F59E0B' },
  { value: 'hard', label: 'Hard', color: '#EF4444' },
];

export const ACHIEVEMENTS = [
  { id: 'first_quiz', name: 'First Steps', description: 'Complete your first quiz', icon: '🎯', xp: 50 },
  { id: 'streak_3', name: 'On Fire', description: '3-day study streak', icon: '🔥', xp: 100 },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day study streak', icon: '⚔️', xp: 250 },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day study streak', icon: '👑', xp: 1000 },
  { id: 'perfect_quiz', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💎', xp: 200 },
  { id: 'all_subjects', name: 'Renaissance Student', description: 'Attempt quizzes in all subjects', icon: '🌟', xp: 500 },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a quiz in under 2 minutes', icon: '⚡', xp: 150 },
  { id: 'hundred_questions', name: 'Century Club', description: 'Answer 100 questions', icon: '💯', xp: 300 },
];

export const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/subjects', label: 'Subjects', icon: 'BookOpen' },
  { href: '/quizzes', label: 'Quizzes', icon: 'Brain' },
  { href: '/exams', label: 'Exams', icon: 'FileText' },
  { href: '/revision', label: 'Revision', icon: 'Target' },
  { href: '/leaderboard', label: 'Leaderboard', icon: 'Trophy' },
];

export const ADMIN_NAV_LINKS = [
  { href: '/admin', label: 'Overview', icon: 'BarChart3' },
  { href: '/admin/exams', label: 'Manage Exams', icon: 'FileText' },
  { href: '/admin/upload', label: 'Upload & OCR', icon: 'Upload' },
  { href: '/admin/questions', label: 'Questions', icon: 'HelpCircle' },
];
