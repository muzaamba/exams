-- =============================================
-- ZEWENO: AI-Powered Somali Education Platform
-- Database Schema Migration
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROFILES (extends auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  grade TEXT CHECK (grade IN ('form4', 'grade8')),
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  study_streak INTEGER DEFAULT 0,
  last_study_date DATE,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, grade)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'grade', 'form4'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- 2. EXAMS
-- =============================================
CREATE TABLE IF NOT EXISTS exams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL CHECK (grade IN ('form4', 'grade8')),
  year INTEGER NOT NULL,
  duration INTEGER DEFAULT 120,
  total_marks INTEGER DEFAULT 100,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. SECTIONS
-- =============================================
CREATE TABLE IF NOT EXISTS sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL,
  marks INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- 4. PASSAGES
-- =============================================
CREATE TABLE IF NOT EXISTS passages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL
);

-- =============================================
-- 5. QUESTIONS
-- =============================================
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  section_id UUID REFERENCES sections(id) ON DELETE SET NULL,
  passage_id UUID REFERENCES passages(id) ON DELETE SET NULL,
  question_number INTEGER,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'essay', 'short_answer', 'vocabulary', 'grammar', 'reading_comprehension', 'poetry_analysis')),
  topic TEXT,
  question_text TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT,
  explanation TEXT,
  minimum_words INTEGER,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. QUIZ ATTEMPTS
-- =============================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  selected_answer TEXT,
  is_correct BOOLEAN DEFAULT FALSE,
  time_taken INTEGER, -- seconds
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 7. REVISION PROGRESS
-- =============================================
CREATE TABLE IF NOT EXISTS revision_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
  last_reviewed TIMESTAMPTZ DEFAULT NOW(),
  revision_streak INTEGER DEFAULT 0,
  total_attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  UNIQUE(user_id, subject, topic)
);

-- =============================================
-- 8. ACHIEVEMENTS
-- =============================================
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  xp_reward INTEGER DEFAULT 0,
  condition_type TEXT,
  condition_value INTEGER
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- =============================================
-- 9. DAILY CHALLENGES
-- =============================================
CREATE TABLE IF NOT EXISTS daily_challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  challenge_date DATE NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 50,
  question_ids UUID[] DEFAULT '{}'
);

-- =============================================
-- 10. STUDY STREAKS
-- =============================================
CREATE TABLE IF NOT EXISTS study_streaks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  study_date DATE NOT NULL,
  minutes_studied INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  UNIQUE(user_id, study_date)
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_questions_exam_id ON questions(exam_id);
CREATE INDEX idx_questions_subject ON questions(topic);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_question ON quiz_attempts(question_id);
CREATE INDEX idx_revision_progress_user ON revision_progress(user_id);
CREATE INDEX idx_exams_subject ON exams(subject);
CREATE INDEX idx_exams_grade ON exams(grade);
CREATE INDEX idx_exams_year ON exams(year);
CREATE INDEX idx_study_streaks_user ON study_streaks(user_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Exams, sections, passages, questions: readable by all, manageable by admins
CREATE POLICY "Exams are viewable by everyone" ON exams FOR SELECT USING (true);
CREATE POLICY "Admins can manage exams" ON exams FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')) WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Temp bypass for development" ON exams FOR INSERT WITH CHECK (true); -- ONLY FOR DEV

CREATE POLICY "Sections are viewable" ON sections FOR SELECT USING (true);
CREATE POLICY "Admins can manage sections" ON sections FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Passages are viewable" ON passages FOR SELECT USING (true);
CREATE POLICY "Admins can manage passages" ON passages FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Questions are viewable" ON questions FOR SELECT USING (true);
CREATE POLICY "Admins can manage questions" ON questions FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Temp bypass for questions dev" ON questions FOR INSERT WITH CHECK (true); -- ONLY FOR DEV

-- Quiz attempts: users can CRUD own
CREATE POLICY "Users can view own attempts" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Revision progress: users can CRUD own
CREATE POLICY "Users can view own progress" ON revision_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own progress" ON revision_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON revision_progress FOR UPDATE USING (auth.uid() = user_id);

-- Achievements: viewable by all
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can unlock achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Study streaks
CREATE POLICY "Users can view own streaks" ON study_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON study_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON study_streaks FOR UPDATE USING (auth.uid() = user_id);
