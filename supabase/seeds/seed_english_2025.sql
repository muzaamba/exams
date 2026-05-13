-- English National Exam 2025 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_read_id UUID := gen_random_uuid();
    v_sec_gram_id UUID := gen_random_uuid();
    v_sec_lit_id UUID := gen_random_uuid();
    v_sec_vocab_id UUID := gen_random_uuid();
    v_sec_short_id UUID := gen_random_uuid();
    v_sec_writ_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'English National Exam 2025', 'english', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_read_id, v_exam_id, 'Reading Comprehension', 40, 1),
    (v_sec_gram_id, v_exam_id, 'Grammar', 20, 2),
    (v_sec_lit_id, v_exam_id, 'Literature', 20, 3),
    (v_sec_vocab_id, v_exam_id, 'Vocabulary', 10, 4),
    (v_sec_short_id, v_exam_id, 'Short Questions', 10, 5),
    (v_sec_writ_id, v_exam_id, 'Writing Skills', 10, 6);

    -- 3. Insert Questions (Reading Comprehension - MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_read_id, 'The word ''people'' is:', 'mcq', 'Adverb', 'Pronoun', 'Noun', 'Adjective', 'C', 1),
    (v_exam_id, v_sec_read_id, 'Mosque is a holy place, it is a ____ noun.', 'mcq', 'Abstract', 'Proper', 'Common', 'Collective', 'C', 2),
    (v_exam_id, v_sec_read_id, 'Her kindness made her success. The word ''kindness'' is:', 'mcq', 'Concrete noun', 'Material noun', 'Abstract noun', 'Proper noun', 'C', 3),
    (v_exam_id, v_sec_read_id, 'Marry was a young lady. The word ''young'' is:', 'mcq', 'Noun', 'Adjective', 'Adverb', 'Conjunction', 'B', 4),
    (v_exam_id, v_sec_read_id, 'We respect each other. Which tense is it?', 'mcq', 'Past tense', 'Present simple', 'Future tense', 'Present perfect', 'B', 5);

    -- 4. Insert Questions (Grammar - MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_gram_id, 'Complex sentence can have one or more:', 'mcq', 'Coordinating conjunction', 'Subordinating conjunction', 'Correlative conjunction', 'Compound conjunction', 'B', 6),
    (v_exam_id, v_sec_gram_id, 'Typically the adverb ends with LY usually called:', 'mcq', 'Adverb of place', 'Adverb of manner', 'Adverb of time', 'Adverb of duration', 'B', 7),
    (v_exam_id, v_sec_gram_id, 'Phrasal verbs are made up of:', 'mcq', 'Verb and noun', 'Verb and adjective', 'Verb and pronoun', 'Verb and preposition', 'D', 8),
    (v_exam_id, v_sec_gram_id, 'The goat produces much milk at night, ____?', 'mcq', 'Is it?', 'Isn''t the goat?', 'Isn''t it?', 'Doesn''t it?', 'D', 9),
    (v_exam_id, v_sec_gram_id, 'This exercise is ____ than the last one.', 'mcq', 'Trickier', 'Tracker', 'Tricky', 'More tricky', 'A', 10);

    -- 5. Insert Questions (Literature - MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_lit_id, 'The author of a poem is called:', 'mcq', 'Player', 'Poet', 'Poetry', 'Persona', 'B', 11),
    (v_exam_id, v_sec_lit_id, 'He is as black as charcoal. This is an example of:', 'mcq', 'Metaphor', 'Simile', 'Smile', 'Smell', 'B', 12),
    (v_exam_id, v_sec_lit_id, 'The voice speaking in the poem is called:', 'mcq', 'Person', 'Character', 'Persona', 'Poet', 'C', 13),
    (v_exam_id, v_sec_lit_id, 'Short statements with hidden meaning delivered from generation to generation are:', 'mcq', 'Provisions', 'Proverbs', 'Pronouns', 'Propositions', 'B', 14),
    (v_exam_id, v_sec_lit_id, 'The nature of the voice used in a poem is called:', 'mcq', 'Tool', 'Team', 'Torch', 'Tone', 'D', 15);

    -- 6. Insert Questions (Vocabulary - Short Answer)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_vocab_id, 'The opposite of reject is:', 'short_answer', 'Accept', 16),
    (v_exam_id, v_sec_vocab_id, 'The singular form of mice is:', 'short_answer', 'Mouse', 17),
    (v_exam_id, v_sec_vocab_id, 'The homophone of eight is:', 'short_answer', 'Ate', 18),
    (v_exam_id, v_sec_vocab_id, 'The opposite of conflict is:', 'short_answer', 'Peace', 19),
    (v_exam_id, v_sec_vocab_id, 'The synonym of quick is:', 'short_answer', 'Fast', 20);

    -- 7. Insert Questions (Short Questions - Short Answer)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_short_id, 'Define synopsis.', 'short_answer', 'A brief summary or general survey of something.', 21),
    (v_exam_id, v_sec_short_id, 'Differentiate simile and metaphor.', 'short_answer', 'A simile compares two things using ''like'' or ''as'', while a metaphor states that one thing is another.', 22),
    (v_exam_id, v_sec_short_id, 'What is a paragraph?', 'short_answer', 'A distinct section of a piece of writing, usually dealing with a single theme and indicated by a new line or indentation.', 23),
    (v_exam_id, v_sec_short_id, 'Explain character.', 'short_answer', 'A person, animal, or being in a story, play, or other literary work.', 24),
    (v_exam_id, v_sec_short_id, 'Define Curriculum Vitae.', 'short_answer', 'A brief account of a person''s education, qualifications, and previous experience, typically sent with a job application.', 25),
    (v_exam_id, v_sec_short_id, 'Describe riddle.', 'short_answer', 'A question or statement intentionally phrased so as to require ingenuity in ascertaining its answer or meaning.', 26),
    (v_exam_id, v_sec_short_id, 'What is an interjection?', 'short_answer', 'An abrupt remark, made especially as an aside or interruption (e.g., Oh! Wow!).', 27),
    (v_exam_id, v_sec_short_id, 'Explain composition.', 'short_answer', 'The way in which a whole or mixture is made up; a piece of writing or music.', 28),
    (v_exam_id, v_sec_short_id, 'What is imagery?', 'short_answer', 'Visually descriptive or figurative language, especially in a literary work.', 29),
    (v_exam_id, v_sec_short_id, 'Write the meaning of the proverb ''Rome was not built in a day''.', 'short_answer', 'Important work takes time and cannot be completed quickly.', 30);

    -- 8. Insert Questions (Writing Skills)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_writ_id, 'Write an essay on the following topic: Disadvantages of Tribalism', 'essay', 'Open-ended essay question. Grading is based on structure, grammar, and vocabulary.', 31);

END $$;
