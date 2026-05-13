-- English National Exam 2021 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec1_id UUID := gen_random_uuid();
    v_sec2_id UUID := gen_random_uuid();
    v_sec3_id UUID := gen_random_uuid();
    v_sec4_id UUID := gen_random_uuid();
    v_sec5_id UUID := gen_random_uuid();
    v_sec6_id UUID := gen_random_uuid();
    v_sec7_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'English National Exam 2021', 'english', 'form4', 2021, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec1_id, v_exam_id, 'Part 1: Reading Comprehension', 15, 1),
    (v_sec2_id, v_exam_id, 'Multiple Choice Questions', 5, 2),
    (v_sec3_id, v_exam_id, 'Part 2: Vocabulary in Use', 15, 3),
    (v_sec4_id, v_exam_id, 'Word Sentences', 10, 4),
    (v_sec5_id, v_exam_id, 'Part 3: Grammar in Use', 20, 5),
    (v_sec6_id, v_exam_id, 'Part 4: Direct Questions', 15, 6),
    (v_sec7_id, v_exam_id, 'Part 5: Proverbs', 20, 7);

    -- 3. Insert Questions (Part 1: Reading Comprehension)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec1_id, 'What is the main idea of the story?', 'short_answer', 'The passage explains cultural shock and its effects on people in a new environment.', 1),
    (v_exam_id, v_sec1_id, 'Why was travelling to the city exciting for Mariam?', 'short_answer', 'Because she saw beautiful buildings, traffic, new food, foreign language and a new way of life.', 2),
    (v_exam_id, v_sec1_id, 'What is the meaning of cultural shock?', 'short_answer', 'It is the feeling of disorientation experienced when someone enters an unfamiliar culture or way of life.', 3),
    (v_exam_id, v_sec1_id, 'What does the writer mean when he says, ''turned stressful and full of discomfort''?', 'short_answer', 'The new experience became difficult, uncomfortable and stressful for Mariam.', 4),
    (v_exam_id, v_sec1_id, 'What are the minor difficulties experienced in the cultural shock?', 'short_answer', 'Using ATMs and paying cashless public transport.', 5),
    (v_exam_id, v_sec1_id, 'In a note form, describe the difficulties experienced in the third stage of culture shock.', 'short_answer', 'Isolation from society, failure to participate in social activities, associating only with familiar people, eating familiar foods, limited opportunities and reduced social networks.', 6);

    -- 4. Insert Questions (Multiple Choice Questions - presented as short answer here due to lack of options provided)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec2_id, 'Cultural shock is:', 'short_answer', 'Having problems with a new culture', 7),
    (v_exam_id, v_sec2_id, 'Isolated means:', 'short_answer', 'To be alone', 8),
    (v_exam_id, v_sec2_id, 'Reject means:', 'short_answer', 'To say no', 9),
    (v_exam_id, v_sec2_id, 'Negotiate means:', 'short_answer', 'Talk', 10);

    -- 5. Insert Questions (Part 2: Vocabulary in Use)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec3_id, 'The museum contained some pre-historic ______.', 'short_answer', 'Artefacts', 11),
    (v_exam_id, v_sec3_id, 'The Somali People have continually ______ the old customs.', 'short_answer', 'Retained', 12),
    (v_exam_id, v_sec3_id, 'English is becoming a ______ language.', 'short_answer', 'Global', 13),
    (v_exam_id, v_sec3_id, 'He is ______ teacher.', 'short_answer', 'Essentially', 14),
    (v_exam_id, v_sec3_id, 'None was happy about what was ______.', 'short_answer', 'Occurring', 15),
    (v_exam_id, v_sec3_id, 'The policy was supported by a ______ majority of citizens.', 'short_answer', 'Tremendous', 16);

    -- 6. Insert Questions (Word Sentences)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec4_id, 'Use the word ''Sympathetic'' in a sentence.', 'short_answer', 'The teacher was sympathetic to the sick student.', 17),
    (v_exam_id, v_sec4_id, 'Use the word ''Relieve'' in a sentence.', 'short_answer', 'The medicine helped relieve his pain.', 18),
    (v_exam_id, v_sec4_id, 'Use the word ''Transfer'' in a sentence.', 'short_answer', 'Ali requested a transfer to another school.', 19),
    (v_exam_id, v_sec4_id, 'Use the word ''Campaign'' in a sentence.', 'short_answer', 'The government launched a health campaign.', 20);

    -- 7. Insert Questions (Part 3: Grammar in Use)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec5_id, 'I apologize for the ______. I really do she said, politely.', 'short_answer', 'Loss', 21),
    (v_exam_id, v_sec5_id, 'Why did the child ______ to eat raw mangoes while he had ripe ones?', 'short_answer', 'Choose', 22),
    (v_exam_id, v_sec5_id, 'Mother ______ for us each time she gets an opportunity.', 'short_answer', 'Prays', 23),
    (v_exam_id, v_sec5_id, 'Will Ahmed ______ the bell tomorrow morning?', 'short_answer', 'Ring', 24),
    (v_exam_id, v_sec5_id, 'Mrs Fatuma ______ cooked the food.', 'short_answer', 'Herself', 25),
    (v_exam_id, v_sec5_id, 'Honestly, you do not need four ______.', 'short_answer', 'Radios', 26),
    (v_exam_id, v_sec5_id, 'Please, do not forget to buy some ______ for grandmother.', 'short_answer', 'Potatoes', 27),
    (v_exam_id, v_sec5_id, 'All the ______ disappeared into the bush.', 'short_answer', 'Deer', 28),
    (v_exam_id, v_sec5_id, '______ does your father do? Is he a doctor or a teacher?', 'short_answer', 'What', 29),
    (v_exam_id, v_sec5_id, '______ did you find at the mall? Ali or Aisha?', 'short_answer', 'Who', 30);

    -- 8. Insert Questions (Part 4: Direct Questions)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec6_id, 'What is Oral Poetry?', 'short_answer', 'Oral poetry is poetry spoken or recited aloud instead of written.', 31),
    (v_exam_id, v_sec6_id, 'What is a preposition?', 'short_answer', 'A preposition is a word used to show the relationship between nouns or pronouns and other words in a sentence.', 32),
    (v_exam_id, v_sec6_id, 'What is a recipe?', 'short_answer', 'A recipe is a set of instructions for preparing and cooking food.', 33),
    (v_exam_id, v_sec6_id, 'Define adjective.', 'short_answer', 'An adjective is a word that describes or modifies a noun or pronoun.', 34),
    (v_exam_id, v_sec6_id, 'What is a simile?', 'short_answer', 'A simile is a figure of speech that compares two things using ''like'' or ''as''.', 35);

    -- 9. Insert Questions (Part 5: Proverbs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec7_id, 'Look before ______.', 'short_answer', 'You leap', 36),
    (v_exam_id, v_sec7_id, 'People who live in glass houses ______.', 'short_answer', 'Should not throw stones', 37),
    (v_exam_id, v_sec7_id, 'Let sleeping dogs ______.', 'short_answer', 'Lie', 38),
    (v_exam_id, v_sec7_id, 'You can lead your horse to the water, ______.', 'short_answer', 'But you cannot make it drink', 39),
    (v_exam_id, v_sec7_id, 'Many hands ______.', 'short_answer', 'Make light work', 40),
    (v_exam_id, v_sec7_id, 'Don''t judge a book ______.', 'short_answer', 'By its cover', 41),
    (v_exam_id, v_sec7_id, 'There is no smoke ______.', 'short_answer', 'Without fire', 42),
    (v_exam_id, v_sec7_id, 'When the cat is away ______.', 'short_answer', 'The mice will play', 43),
    (v_exam_id, v_sec7_id, 'Too many cooks ______.', 'short_answer', 'Spoil the broth', 44),
    (v_exam_id, v_sec7_id, 'Where there is a will ______.', 'short_answer', 'There is a way', 45);

END $$;
