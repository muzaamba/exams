-- =============================================
-- ZEWENO: Seed Data
-- =============================================

-- Achievements
INSERT INTO achievements (id, name, description, icon, xp_reward, condition_type, condition_value) VALUES
  ('first_quiz', 'First Steps', 'Complete your first quiz', '🎯', 50, 'quizzes_completed', 1),
  ('streak_3', 'On Fire', '3-day study streak', '🔥', 100, 'streak', 3),
  ('streak_7', 'Week Warrior', '7-day study streak', '⚔️', 250, 'streak', 7),
  ('streak_30', 'Monthly Master', '30-day study streak', '👑', 1000, 'streak', 30),
  ('perfect_quiz', 'Perfect Score', 'Get 100% on a quiz', '💎', 200, 'perfect_score', 1),
  ('all_subjects', 'Renaissance Student', 'Attempt quizzes in all subjects', '🌟', 500, 'subject_count', 9),
  ('speed_demon', 'Speed Demon', 'Complete a quiz in under 2 minutes', '⚡', 150, 'speed', 120),
  ('hundred_questions', 'Century Club', 'Answer 100 questions', '💯', 300, 'questions_answered', 100)
ON CONFLICT (id) DO NOTHING;

-- Sample Exams
INSERT INTO exams (id, title, subject, grade, year, duration, total_marks, status) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Af-Soomaali Form 4 Final 2024', 'af-soomaali', 'form4', 2024, 120, 100, 'published'),
  ('22222222-2222-2222-2222-222222222222', 'Mathematics Form 4 Final 2024', 'mathematics', 'form4', 2024, 150, 100, 'published'),
  ('33333333-3333-3333-3333-333333333333', 'Biology Grade 8 Final 2024', 'biology', 'grade8', 2024, 90, 80, 'published'),
  ('44444444-4444-4444-4444-444444444444', 'Chemistry Form 4 2024', 'chemistry', 'form4', 2024, 120, 100, 'published'),
  ('55555555-5555-5555-5555-555555555555', 'Physics Form 4 Final 2023', 'physics', 'form4', 2023, 120, 100, 'published'),
  ('66666666-6666-6666-6666-666666666666', 'English Grade 8 Final 2023', 'english', 'grade8', 2023, 90, 80, 'published')
ON CONFLICT (id) DO NOTHING;

-- Sections for Af-Soomaali exam
INSERT INTO sections (exam_id, section_name, marks, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Section A: Naxwe (Grammar)', 30, 1),
  ('11111111-1111-1111-1111-111111111111', 'Section B: Akhris (Reading)', 25, 2),
  ('11111111-1111-1111-1111-111111111111', 'Section C: Gabay (Poetry)', 20, 3),
  ('11111111-1111-1111-1111-111111111111', 'Section D: Qoraal (Writing)', 25, 4);

-- Sample Questions
INSERT INTO questions (exam_id, question_number, question_type, topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  -- Af-Soomaali
  ('11111111-1111-1111-1111-111111111111', 1, 'mcq', 'Vocabulary', 'Waa maxay macnaha erayga "Barwaaqo"?', 'Abaar', 'Nabadgelyo iyo barako', 'Dagaal', 'Safar', 'B', 'Barwaaqo waa eray macnaheedu yahay nabadgelyo, barako, iyo nolol wanaagsan.', 'easy'),
  ('11111111-1111-1111-1111-111111111111', 2, 'mcq', 'Grammar', 'Sheeg nooca erayga "wanaagsan"', 'Magac', 'Falmaah', 'Tilmaan', 'Xaraf', 'C', 'Wanaagsan waa tilmaan (adjective) oo sharaxaysa sifada shayga.', 'easy'),
  ('11111111-1111-1111-1111-111111111111', 3, 'mcq', 'Grammar', 'Waa maxay falmaahda jumladdaan: "Ardaygu buugguu akhrinayaa"?', 'akhrinayaa', 'Ardaygu', 'buugguu', 'waa', 'A', 'Akhrinayaa waa falmaahdda (verb) ee jumladdaan.', 'medium'),
  ('11111111-1111-1111-1111-111111111111', 4, 'mcq', 'Proverbs', 'Maahmaahda "Aqoon la''aan waa iftiin la''aan" macneheedu waa?', 'Aqoontu waa iftiin', 'Iftiin la''aanu waa mugdi', 'Cilmi darridu waa mugdi', 'Waxba', 'C', 'Maahmaahdan waxay tilmaamaysaa in aqoon la''aantu la mid tahay mugdiga.', 'medium'),
  ('11111111-1111-1111-1111-111111111111', 5, 'short_answer', 'Poetry', 'Qor laba sadar oo gabay ah oo ku saabsan waxbarashada.', NULL, NULL, NULL, NULL, NULL, 'Jawaabtu waa mid furan — ardaygu wuxuu qoraa gabay yar.', 'hard'),
  
  -- Mathematics
  ('22222222-2222-2222-2222-222222222222', 1, 'mcq', 'Algebra', 'Solve: 2x + 5 = 15. What is x?', '3', '5', '7', '10', 'B', '2x + 5 = 15 → 2x = 10 → x = 5', 'easy'),
  ('22222222-2222-2222-2222-222222222222', 2, 'mcq', 'Algebra', 'What is the value of x² when x = -3?', '-9', '9', '-6', '6', 'B', '(-3)² = (-3) × (-3) = 9. Squaring a negative gives a positive.', 'easy'),
  ('22222222-2222-2222-2222-222222222222', 3, 'mcq', 'Geometry', 'What is the area of a circle with radius 7cm? (π = 22/7)', '154 cm²', '44 cm²', '49 cm²', '22 cm²', 'A', 'A = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm²', 'medium'),
  ('22222222-2222-2222-2222-222222222222', 4, 'mcq', 'Statistics', 'Find the mean of: 4, 8, 12, 16, 20', '10', '12', '15', '14', 'B', 'Mean = (4+8+12+16+20)/5 = 60/5 = 12', 'easy'),
  ('22222222-2222-2222-2222-222222222222', 5, 'mcq', 'Quadratic Equations', 'Solve: x² - 5x + 6 = 0', 'x=1, x=6', 'x=2, x=3', 'x=-2, x=-3', 'x=1, x=5', 'B', 'x²-5x+6 = (x-2)(x-3) = 0, so x=2 or x=3', 'medium'),

  -- Biology
  ('33333333-3333-3333-3333-333333333333', 1, 'mcq', 'Cell Biology', 'What is the powerhouse of the cell?', 'Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body', 'C', 'Mitochondria generate most of the cell''s ATP energy.', 'easy'),
  ('33333333-3333-3333-3333-333333333333', 2, 'mcq', 'Cell Biology', 'Which organelle contains DNA?', 'Ribosome', 'Nucleus', 'Cell membrane', 'Lysosome', 'B', 'The nucleus contains the cell''s genetic material (DNA).', 'easy'),
  ('33333333-3333-3333-3333-333333333333', 3, 'mcq', 'Photosynthesis', 'What gas is produced during photosynthesis?', 'Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen', 'C', 'Plants produce oxygen as a byproduct of photosynthesis.', 'easy'),
  ('33333333-3333-3333-3333-333333333333', 4, 'mcq', 'Human Body', 'How many chambers does the human heart have?', '2', '3', '4', '5', 'C', 'The human heart has 4 chambers: 2 atria and 2 ventricles.', 'easy'),
  
  -- Chemistry
  ('44444444-4444-4444-4444-444444444444', 1, 'mcq', 'Elements', 'What is the chemical symbol for Gold?', 'Go', 'Gd', 'Au', 'Ag', 'C', 'Au comes from the Latin word "Aurum".', 'easy'),
  ('44444444-4444-4444-4444-444444444444', 2, 'mcq', 'Elements', 'What is the atomic number of Carbon?', '4', '6', '8', '12', 'B', 'Carbon has 6 protons, giving it atomic number 6.', 'easy'),
  ('44444444-4444-4444-4444-444444444444', 3, 'mcq', 'Chemical Bonding', 'What type of bond forms between Na and Cl?', 'Covalent', 'Ionic', 'Metallic', 'Hydrogen', 'B', 'Na (metal) donates electron to Cl (non-metal) forming ionic bond.', 'medium'),

  -- Physics
  ('55555555-5555-5555-5555-555555555555', 1, 'mcq', 'Forces', 'What is Newton''s First Law?', 'F = ma', 'Every action has equal opposite reaction', 'Object stays at rest unless acted on by force', 'Energy cannot be created or destroyed', 'C', 'Newton''s First Law: Law of Inertia.', 'medium'),
  ('55555555-5555-5555-5555-555555555555', 2, 'mcq', 'Energy', 'What is the SI unit of energy?', 'Watt', 'Newton', 'Joule', 'Pascal', 'C', 'The Joule (J) is the SI unit of energy.', 'easy'),
  
  -- English
  ('66666666-6666-6666-6666-666666666666', 1, 'mcq', 'Grammar', 'Choose the correct form: "She ___ to school every day"', 'go', 'goes', 'going', 'gone', 'B', 'Third person singular uses "goes" in simple present.', 'easy'),
  ('66666666-6666-6666-6666-666666666666', 2, 'mcq', 'Vocabulary', 'What is a synonym for "happy"?', 'Sad', 'Angry', 'Joyful', 'Tired', 'C', 'Joyful means feeling or expressing great happiness.', 'easy');

-- Daily Challenge
INSERT INTO daily_challenges (challenge_date, subject, title, xp_reward) VALUES
  (CURRENT_DATE, 'mathematics', 'Math Quick Fire', 50);
