-- English National Exam 2024 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_read_id UUID := gen_random_uuid();
    v_sec_vocab_id UUID := gen_random_uuid();
    v_sec_gram_id UUID := gen_random_uuid();
    v_sec_lit_id UUID := gen_random_uuid();
    v_sec_writ_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'English National Exam 2024', 'english', 'form4', 2024, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_read_id, v_exam_id, 'Reading Comprehension', 30, 1),
    (v_sec_vocab_id, v_exam_id, 'Vocabulary', 20, 2),
    (v_sec_gram_id, v_exam_id, 'Grammar', 30, 3),
    (v_sec_lit_id, v_exam_id, 'Literature and Poetry', 10, 4),
    (v_sec_writ_id, v_exam_id, 'Writing', 10, 5);

    -- 3. Insert Questions (Reading Comprehension - Short Answer)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_read_id, 'What is the main goal of educational technology?', 'short_answer', 'To enhance the learning experience by integrating digital tools.', 1),
    (v_exam_id, v_sec_read_id, 'State three examples of digital devices mentioned in the passage.', 'short_answer', 'Computers, tablets, and smart boards.', 2),
    (v_exam_id, v_sec_read_id, 'What are some benefits of integrating educational technology into the classroom?', 'short_answer', 'It personalizes learning, enables interactive activities, and provides access to vast online resources.', 3),
    (v_exam_id, v_sec_read_id, 'How can online learning platforms help students?', 'short_answer', 'They allow students to learn at their own pace.', 4),
    (v_exam_id, v_sec_read_id, 'What are some challenges associated with the use of educational technology?', 'short_answer', 'Need for expensive equipment, digital divide, and technical issues.', 5);

    -- 4. Insert Questions (Reading Comprehension - MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_read_id, 'What does EdTech refer to?', 'mcq', 'The use of technology in entertainment', 'The integration of technology into education', 'The development of new technologies', 'The study of educational theories', 'B', 6),
    (v_exam_id, v_sec_read_id, 'Which of the following is an example of EdTech?', 'mcq', 'Watching educational videos on YouTube', 'Reading books in a traditional library', 'Using paper and pencils for note-taking', 'Participating in a physical education class', 'A', 7),
    (v_exam_id, v_sec_read_id, 'How can smart boards enhance the learning experience?', 'mcq', 'By providing access to the internet', 'By enabling interactive activities', 'By reducing the need for textbooks', 'By replacing teachers with technology', 'B', 8),
    (v_exam_id, v_sec_read_id, 'What is the main advantage of online learning platforms?', 'mcq', 'They allow students to learn at their own pace', 'They eliminate the need for teachers', 'They provide physical interaction with peers', 'They require expensive computer equipment', 'A', 9),
    (v_exam_id, v_sec_read_id, 'What is the purpose of adaptive learning technology?', 'mcq', 'To increase student engagement in learning', 'To personalize the learning experience', 'To replace traditional teaching methods', 'To replace human teachers with AI algorithms', 'B', 10);

    -- 5. Insert Questions (Reading Comprehension - Vocabulary Meaning)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_read_id, 'Provide the meaning: Implementation', 'short_answer', 'The process of putting a decision or plan into effect.', 11),
    (v_exam_id, v_sec_read_id, 'Provide the meaning: Environment', 'short_answer', 'The surroundings or conditions in which a person lives or operates.', 12),
    (v_exam_id, v_sec_read_id, 'Provide the meaning: Assignment', 'short_answer', 'A task or piece of work allocated to someone as part of a course of study.', 13),
    (v_exam_id, v_sec_read_id, 'Provide the meaning: Significant', 'short_answer', 'Sufficiently great or important to be worthy of attention.', 14),
    (v_exam_id, v_sec_read_id, 'Provide the meaning: Numerous', 'short_answer', 'Great in number; many.', 15);

    -- 6. Insert Questions (Vocabulary - Opposites)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_vocab_id, 'Opposite of: Ignorance', 'short_answer', 'Knowledge', 16),
    (v_exam_id, v_sec_vocab_id, 'Opposite of: Heavy', 'short_answer', 'Light', 17),
    (v_exam_id, v_sec_vocab_id, 'Opposite of: Man', 'short_answer', 'Woman', 18),
    (v_exam_id, v_sec_vocab_id, 'Opposite of: Inside', 'short_answer', 'Outside', 19),
    (v_exam_id, v_sec_vocab_id, 'Opposite of: Increase', 'short_answer', 'Decrease', 20);

    -- 7. Insert Questions (Vocabulary - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_vocab_id, 'Match the definition: Reuse of things that have been used before', 'short_answer', 'Recycle', 21),
    (v_exam_id, v_sec_vocab_id, 'Match the definition: To get rid of impurities by washing', 'short_answer', 'Cleansing', 22),
    (v_exam_id, v_sec_vocab_id, 'Match the definition: To stop doing or using something', 'short_answer', 'Refuse', 23),
    (v_exam_id, v_sec_vocab_id, 'Match the definition: Withdrawal from one''s occupation', 'short_answer', 'Retirement', 24),
    (v_exam_id, v_sec_vocab_id, 'Match the definition: Having a right to certain benefits', 'short_answer', 'Entitled', 25);

    -- 8. Insert Questions (Vocabulary - Fill in the blank)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_vocab_id, 'Fill in the blank: The two sides ____ to solve their differences.', 'short_answer', 'agreed', 26),
    (v_exam_id, v_sec_vocab_id, 'Fill in the blank: The school ____ students'' registration each year.', 'short_answer', 'anticipated', 27),
    (v_exam_id, v_sec_vocab_id, 'Fill in the blank: The child was ____ to lower his head.', 'short_answer', 'instructed', 28),
    (v_exam_id, v_sec_vocab_id, 'Fill in the blank: I bought this at a shop and it ____ me thirty-five dollars.', 'short_answer', 'costed', 29),
    (v_exam_id, v_sec_vocab_id, 'Fill in the blank: Halima ____ at Hill secondary school.', 'short_answer', 'learns', 30);

    -- 9. Insert Questions (Grammar - MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_gram_id, 'We ____ eaten our dinner recently.', 'mcq', 'has', 'did', 'have', 'are', 'C', 31),
    (v_exam_id, v_sec_gram_id, 'I ____ my homework yesterday.', 'mcq', 'doing', 'did', 'do', 'done', 'B', 32),
    (v_exam_id, v_sec_gram_id, 'He ____ his friends tomorrow.', 'mcq', 'visiting', 'visited', 'visit', 'will visit', 'D', 33);

    -- 10. Insert Questions (Grammar - Sentence Correction)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_gram_id, 'Correct the sentence: Halima eated the lunch.', 'short_answer', 'Halima ate the lunch.', 34),
    (v_exam_id, v_sec_gram_id, 'Correct the sentence: They was going to the park.', 'short_answer', 'They were going to the park.', 35),
    (v_exam_id, v_sec_gram_id, 'Correct the sentence: The teacher explain the lesson.', 'short_answer', 'The teacher explains the lesson.', 36),
    (v_exam_id, v_sec_gram_id, 'Correct the sentence: Where the student was going?', 'short_answer', 'Where was the student going?', 37),
    (v_exam_id, v_sec_gram_id, 'Correct the sentence: Did you visited your mother?', 'short_answer', 'Did you visit your mother?', 38);

    -- 11. Insert Questions (Grammar - Join Sentences)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_gram_id, 'Join: Take your pen. Write down what I say. (And)', 'short_answer', 'Take your pen and write down what I say.', 39),
    (v_exam_id, v_sec_gram_id, 'Join: Hurry up. You will be late for the class. (Otherwise)', 'short_answer', 'Hurry up, otherwise you will be late for the class.', 40),
    (v_exam_id, v_sec_gram_id, 'Join: Chicken meat is white. Camel meat is red. (Whereas)', 'short_answer', 'Chicken meat is white, whereas camel meat is red.', 41),
    (v_exam_id, v_sec_gram_id, 'Join: We saw the fire on the top floor. We could do nothing to put it out. (But)', 'short_answer', 'We saw the fire on the top floor, but we could do nothing to put it out.', 42),
    (v_exam_id, v_sec_gram_id, 'Join: The bus was half empty. It did not stop. (Yet)', 'short_answer', 'The bus was half empty, yet it did not stop.', 43);

    -- 12. Insert Questions (Literature and Poetry)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_lit_id, 'Hand is to glove as foot is to boot is an example of:', 'mcq', 'Idiom', 'Analogy', 'Simile', 'Proverb', 'B', 44),
    (v_exam_id, v_sec_lit_id, '''The sun is smiling at us'' is an example of:', 'mcq', 'Imagery', 'Personification', 'Hyperbole', 'Metaphor', 'B', 45);

    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_lit_id, 'Poem: "This is the debt I pay / Just for one riotous day / Year of regret and grief / Sorrow without relief / Pay it, I will to the end / Until the grave, my friend." How many lines does this poem consist of?', 'short_answer', '6 lines', 46),
    (v_exam_id, v_sec_lit_id, 'What is the letter ''I'' in line 5 called in Literature?', 'short_answer', 'A pronoun referring to the speaker/persona.', 47);

    -- 13. Insert Questions (Writing)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_writ_id, 'Choose one topic and write an essay: 1. Importance of regular exercise. 2. Your memorable childhood experience. 3. Advantages of social media.', 'essay', 'Open-ended essay question. Grading is based on structure, grammar, and vocabulary.', 48);

END $$;
