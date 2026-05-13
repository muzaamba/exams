-- English National Exam 2020 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
    v_sec_adj_id UUID := gen_random_uuid();
    v_sec_arr_id UUID := gen_random_uuid();
    v_sec_voc_id UUID := gen_random_uuid();
    v_sec_tag_id UUID := gen_random_uuid();
    v_sec_adv_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'English National Exam 2020', 'english', 'form4', 2020, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Part A: Reading Comprehension', 16, 1),
    (v_sec_b_id, v_exam_id, 'Part B: Grammar', 16, 2),
    (v_sec_adj_id, v_exam_id, 'Adjectives', 10, 3),
    (v_sec_arr_id, v_exam_id, 'Sentence Rearrangement', 10, 4),
    (v_sec_voc_id, v_exam_id, 'Vocabulary Fill in the Blank', 20, 5),
    (v_sec_tag_id, v_exam_id, 'Question Tags', 8, 6),
    (v_sec_adv_id, v_exam_id, 'Adverbs', 6, 7);

    -- 3. Insert Questions (Part A: Reading Comprehension)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Instruction means:', 'short_answer', 'Teaching', 1),
    (v_exam_id, v_sec_a_id, 'Extremely means:', 'short_answer', 'Very', 2),
    (v_exam_id, v_sec_a_id, 'Mother tongue means:', 'short_answer', 'First language', 3),
    (v_exam_id, v_sec_a_id, 'Illiterate means:', 'short_answer', 'Untaught', 4),
    (v_exam_id, v_sec_a_id, 'Enrollment means:', 'short_answer', 'Number joined', 5),
    (v_exam_id, v_sec_a_id, 'The mass literacy campaigns reduced illiteracy to ______ in Somalia.', 'short_answer', 'Under 50%', 6),
    (v_exam_id, v_sec_a_id, 'In the year 1973 and 1974, the enrollment in primary schools was:', 'short_answer', '24,000', 7),
    (v_exam_id, v_sec_a_id, 'Secondary school teachers are trained at:', 'short_answer', 'Lafoole College', 8);

    -- 4. Insert Questions (Part B: Grammar)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Yesterday morning, Ali ______ to the Somali museum.', 'short_answer', 'Went', 9),
    (v_exam_id, v_sec_b_id, 'He felt ______ tired that he fell asleep.', 'short_answer', 'So', 10),
    (v_exam_id, v_sec_b_id, 'Who usually ______ to school?', 'short_answer', 'Walks', 11),
    (v_exam_id, v_sec_b_id, 'While Ahmed ______ the football, he got sleepy.', 'short_answer', 'Was watching', 12),
    (v_exam_id, v_sec_b_id, 'Somali people used to live in America many years ______.', 'short_answer', 'Ago', 13),
    (v_exam_id, v_sec_b_id, 'Did he ______ to work yesterday?', 'short_answer', 'Go', 14),
    (v_exam_id, v_sec_b_id, 'Where ______ Dirir?', 'short_answer', 'Is', 15),
    (v_exam_id, v_sec_b_id, 'Kismayo is ______ large city.', 'short_answer', 'A', 16);

    -- 5. Insert Questions (Adjectives)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_adj_id, 'He is ______ than his sister. In fact she is the ______ in the family.', 'short_answer', 'Younger, oldest', 17),
    (v_exam_id, v_sec_adj_id, 'I think that mathematics is the ______ subject I take in the school.', 'short_answer', 'Most difficult', 18),
    (v_exam_id, v_sec_adj_id, 'Our new car is ______ and ______ than the one we just sold.', 'short_answer', 'Faster and more reliable', 19),
    (v_exam_id, v_sec_adj_id, 'The Chinese generator is ______ than the Japanese one.', 'short_answer', 'Cheaper', 20),
    (v_exam_id, v_sec_adj_id, 'Livestock is the ______ part of our economy.', 'short_answer', 'Most important', 21);

    -- 6. Insert Questions (Sentence Rearrangement)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_arr_id, 'Rearrange: Harun / Bossaso / from / is.', 'short_answer', 'Harun is from Bossaso.', 22),
    (v_exam_id, v_sec_arr_id, 'Rearrange: And / Hamar / Ahmed / School / to / Abdi / go.', 'short_answer', 'Ahmed and Abdi go to Hamar School.', 23),
    (v_exam_id, v_sec_arr_id, 'Rearrange: Books / those / your / are?', 'short_answer', 'Are those your books?', 24),
    (v_exam_id, v_sec_arr_id, 'Rearrange: Go / school / when / do / you / to?', 'short_answer', 'When do you go to school?', 25),
    (v_exam_id, v_sec_arr_id, 'Rearrange: Duhur / did / pray / prayer / you?', 'short_answer', 'Did you pray Duhur prayer?', 26);

    -- 7. Insert Questions (Vocabulary Fill in the Blank)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_voc_id, 'I felt so ______ that I went to see my doctor.', 'short_answer', 'Sick', 27),
    (v_exam_id, v_sec_voc_id, 'My grandfather is so ______ that he cannot work.', 'short_answer', 'Old', 28),
    (v_exam_id, v_sec_voc_id, 'He is so ______ that he could buy a hundred cars.', 'short_answer', 'Rich', 29),
    (v_exam_id, v_sec_voc_id, 'My cousin is so ______ that he has to have a special bed.', 'short_answer', 'Tall', 30),
    (v_exam_id, v_sec_voc_id, 'The Somali ______ is estimated at thirty million.', 'short_answer', 'Population', 31),
    (v_exam_id, v_sec_voc_id, 'Our government started a mass ______ campaigns in rural areas.', 'short_answer', 'Literacy', 32),
    (v_exam_id, v_sec_voc_id, 'There was an earthquake in America last week. Nobody was killed but some houses ______.', 'short_answer', 'Collapsed', 33),
    (v_exam_id, v_sec_voc_id, 'This printer was very ______ because it printed a lot of books.', 'short_answer', 'Effective', 34),
    (v_exam_id, v_sec_voc_id, 'I''ve been playing football for 3 hours. I feel ______.', 'short_answer', 'Exhausted', 35),
    (v_exam_id, v_sec_voc_id, 'Somalia is ______ in the horn of Africa.', 'short_answer', 'Situated', 36);

    -- 8. Insert Questions (Question Tags)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_tag_id, 'You are a student, ______?', 'short_answer', 'Aren''t you?', 37),
    (v_exam_id, v_sec_tag_id, 'Ali isn''t a doctor, ______?', 'short_answer', 'Is he?', 38),
    (v_exam_id, v_sec_tag_id, 'Muna goes to the cinema, ______?', 'short_answer', 'Doesn''t she?', 39),
    (v_exam_id, v_sec_tag_id, 'I didn''t do homework, ______?', 'short_answer', 'Did you?', 40);

    -- 9. Insert Questions (Adverbs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_adv_id, 'Change to adverb: Quiet', 'short_answer', 'Quietly', 41),
    (v_exam_id, v_sec_adv_id, 'Change to adverb: Usual', 'short_answer', 'Usually', 42),
    (v_exam_id, v_sec_adv_id, 'Change to adverb: Beautiful', 'short_answer', 'Beautifully', 43);

END $$;
