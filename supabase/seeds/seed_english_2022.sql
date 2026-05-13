-- English National Exam 2022 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_1a_id UUID := gen_random_uuid();
    v_sec_1b_id UUID := gen_random_uuid();
    v_sec_2a_id UUID := gen_random_uuid();
    v_sec_2b_id UUID := gen_random_uuid();
    v_sec_2c_id UUID := gen_random_uuid();
    v_sec_2d_id UUID := gen_random_uuid();
    v_sec_3a_id UUID := gen_random_uuid();
    v_sec_3b_id UUID := gen_random_uuid();
    v_sec_3c_id UUID := gen_random_uuid();
    v_sec_3d_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'English National Exam 2022', 'english', 'form4', 2022, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_1a_id, v_exam_id, 'Part 1A: Reading Comprehension (Q&A)', 10, 1),
    (v_sec_1b_id, v_exam_id, 'Part 1B: Reading Comprehension (Multiple Choice)', 10, 2),
    (v_sec_2a_id, v_exam_id, 'Part 2A: Grammar (Choose correct word)', 10, 3),
    (v_sec_2b_id, v_exam_id, 'Part 2B: Grammar (Noun Forms)', 10, 4),
    (v_sec_2c_id, v_exam_id, 'Part 2C: Grammar (Gerund or Infinitive)', 10, 5),
    (v_sec_2d_id, v_exam_id, 'Part 2D: Grammar (Change into Questions)', 10, 6),
    (v_sec_3a_id, v_exam_id, 'Part 3A: Vocabulary (Meanings)', 10, 7),
    (v_sec_3b_id, v_exam_id, 'Part 3B: Vocabulary (Matching)', 10, 8),
    (v_sec_3c_id, v_exam_id, 'Part 3C: Vocabulary (Opposites)', 10, 9),
    (v_sec_3d_id, v_exam_id, 'Part 3D: Vocabulary (Sentence Construction)', 10, 10);

    -- 3. Insert Questions (Part 1A: Reading Comprehension Q&A)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_1a_id, 'What do we call edible thorns?', 'short_answer', 'Canbuul', 1),
    (v_exam_id, v_sec_1a_id, 'How does the Galool help the livestock?', 'short_answer', 'It provides shelter, seeds for camels, and pods and fruits for sheep and goats.', 2),
    (v_exam_id, v_sec_1a_id, 'What is the Galool tree roots used for?', 'short_answer', 'They are used to make strong frames for nomads'' huts (Aqal).', 3),
    (v_exam_id, v_sec_1a_id, 'State some of the benefits of Galool tree to Somali communities?', 'short_answer', 'It provides shade, animal food, medicine, firewood, hut frames, ropes, and meeting places for peace building.', 4),
    (v_exam_id, v_sec_1a_id, 'What are the smaller branches used for?', 'short_answer', 'They are used to make hangool handles, axes, pestles, and ropes.', 5);

    -- 4. Insert Questions (Part 1B: Reading Comprehension Multiple Choice)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_1b_id, 'The thinner branches of the Galool tree are used for:', 'short_answer', 'Ropes', 6),
    (v_exam_id, v_sec_1b_id, 'The Galool tree grows best at altitudes between ______ and ______ meters.', 'short_answer', '900 and 1300', 7),
    (v_exam_id, v_sec_1b_id, 'The roots of the Galool tree are used to make strong frames of nomads'' hut which is called:', 'short_answer', 'Aqal', 8),
    (v_exam_id, v_sec_1b_id, 'ASAL is also used as traditional medicine to treat:', 'short_answer', 'Stomach ache', 9),
    (v_exam_id, v_sec_1b_id, 'Somali communities use the shade of Galool tree for the most convenient place for:', 'short_answer', 'Clan meetings for peace building', 10);

    -- 5. Insert Questions (Part 2A: Grammar - Choose the correct word)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_2a_id, 'Ahmed usually ______ at the apartment but this time he is staying at the city center.', 'short_answer', 'Stays', 11),
    (v_exam_id, v_sec_2a_id, 'Put the clothes ______ the house as it is raining.', 'short_answer', 'In', 12),
    (v_exam_id, v_sec_2a_id, 'Amina was walking ______ the shops when she was hit by a car.', 'short_answer', 'To', 13),
    (v_exam_id, v_sec_2a_id, 'Students are going ______ the museum this afternoon.', 'short_answer', 'To', 14),
    (v_exam_id, v_sec_2a_id, 'The work will be finished ______ tomorrow.', 'short_answer', 'By', 15);

    -- 6. Insert Questions (Part 2B: Grammar - Noun Forms)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_2b_id, 'The ______ refused to tell his capture how he escaped from the prison. (Escape)', 'short_answer', 'Escapee', 16),
    (v_exam_id, v_sec_2b_id, 'The ______ of the election pamphlets was interrupted by the late delivery of the printing paper. (Publish)', 'short_answer', 'Publication', 17),
    (v_exam_id, v_sec_2b_id, 'Owing to the delayed ______ of funds, the completion of our dining hall cannot now be guaranteed. (Disburse)', 'short_answer', 'Disbursement', 18),
    (v_exam_id, v_sec_2b_id, 'Due to the cancellation of the ______ all the interviewers were returned to prospective application. (Advertise)', 'short_answer', 'Advertisement', 19),
    (v_exam_id, v_sec_2b_id, 'The driver got in the car and requested the ______ to take her to the construction site. (Survey)', 'short_answer', 'Surveyor', 20);

    -- 7. Insert Questions (Part 2C: Grammar - Gerund or Infinitive)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_2c_id, 'She likes ______ up early in the morning.', 'short_answer', 'Getting', 21),
    (v_exam_id, v_sec_2c_id, 'I can''t stand ______ on trains.', 'short_answer', 'Riding', 22),
    (v_exam_id, v_sec_2c_id, 'Mr. Mohamed enjoys ______ people out to dinner.', 'short_answer', 'Inviting', 23),
    (v_exam_id, v_sec_2c_id, 'He allowed me ______ his Facebook page.', 'short_answer', 'To join', 24),
    (v_exam_id, v_sec_2c_id, 'Don''t forget ______ milk on your way home.', 'short_answer', 'To pick', 25);

    -- 8. Insert Questions (Part 2D: Grammar - Change into Questions)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_2d_id, 'Change to question: She is very late.', 'short_answer', 'Is she very late?', 26),
    (v_exam_id, v_sec_2d_id, 'Change to question: He knows you well.', 'short_answer', 'Does he know you well?', 27),
    (v_exam_id, v_sec_2d_id, 'Change to question: They have won the final match.', 'short_answer', 'Have they won the final match?', 28),
    (v_exam_id, v_sec_2d_id, 'Change to question: You can swim to the other end of the pool.', 'short_answer', 'Can you swim to the other end of the pool?', 29),
    (v_exam_id, v_sec_2d_id, 'Change to question: I should write it again.', 'short_answer', 'Should I write it again?', 30);

    -- 9. Insert Questions (Part 3A: Vocabulary - Meanings)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_3a_id, 'Collision means:', 'short_answer', 'Crash', 31),
    (v_exam_id, v_sec_3a_id, 'Flavor means:', 'short_answer', 'Taste', 32),
    (v_exam_id, v_sec_3a_id, 'Protect means:', 'short_answer', 'Defend', 33),
    (v_exam_id, v_sec_3a_id, 'Feeble means:', 'short_answer', 'Weak', 34),
    (v_exam_id, v_sec_3a_id, 'Cure means:', 'short_answer', 'Heal', 35);

    -- 10. Insert Questions (Part 3B: Vocabulary - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_3b_id, 'Match: To get rid of impurities by or as if by washing.', 'short_answer', 'Cleansing', 36),
    (v_exam_id, v_sec_3b_id, 'Match: Brought together as one.', 'short_answer', 'Unified', 37),
    (v_exam_id, v_sec_3b_id, 'Match: Things that you throw away because you no longer need them.', 'short_answer', 'Trash', 38),
    (v_exam_id, v_sec_3b_id, 'Match: Containing poison.', 'short_answer', 'Toxic', 39),
    (v_exam_id, v_sec_3b_id, 'Match: Made to be thrown off after use.', 'short_answer', 'Disposable', 40);

    -- 11. Insert Questions (Part 3C: Vocabulary - Opposites)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_3c_id, 'Opposite of Conserve', 'short_answer', 'Waste', 41),
    (v_exam_id, v_sec_3c_id, 'Opposite of Danger', 'short_answer', 'Safety', 42),
    (v_exam_id, v_sec_3c_id, 'Opposite of Peace', 'short_answer', 'War', 43),
    (v_exam_id, v_sec_3c_id, 'Opposite of Naturally', 'short_answer', 'Artificially', 44),
    (v_exam_id, v_sec_3c_id, 'Opposite of Consciousness', 'short_answer', 'Unconsciousness', 45);

    -- 12. Insert Questions (Part 3D: Vocabulary - Sentence Construction)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_3d_id, 'Use the word ''Comb'' in a sentence.', 'short_answer', 'I use a comb to arrange my hair.', 46),
    (v_exam_id, v_sec_3d_id, 'Use the word ''Bridge'' in a sentence.', 'short_answer', 'The bridge connects the two villages.', 47),
    (v_exam_id, v_sec_3d_id, 'Use the word ''Honest'' in a sentence.', 'short_answer', 'Ahmed is an honest student.', 48),
    (v_exam_id, v_sec_3d_id, 'Use the word ''Acquire'' in a sentence.', 'short_answer', 'Students acquire knowledge at school.', 49),
    (v_exam_id, v_sec_3d_id, 'Use the word ''Mandatory'' in a sentence.', 'short_answer', 'School attendance is mandatory.', 50);

END $$;
