-- Geography National Exam 2021 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Geography National Exam 2021', 'geography', 'form4', 2021, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice Questions', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Short Answer Questions', 60, 2);

    -- 3. Insert Questions (Section A)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'The branch of geology that concerns the study of soil is:', 'short_answer', 'Engineering geology', 1),
    (v_exam_id, v_sec_a_id, 'The soil found in the deltas of Jubba and Shabelle is called:', 'short_answer', 'Black clay soil', 2),
    (v_exam_id, v_sec_a_id, 'The zone in which all organisms live on the earth is called:', 'short_answer', 'Biosphere', 3),
    (v_exam_id, v_sec_a_id, 'Seasonal tropical forests are ranked as the second largest forest after:', 'short_answer', 'Equatorial forests', 4),
    (v_exam_id, v_sec_a_id, 'The density of plant life in Somalia is high in the:', 'short_answer', 'Northern regions', 5),
    (v_exam_id, v_sec_a_id, 'The causes of air pollution include:', 'short_answer', 'The emission of carbon monoxide from cars', 6),
    (v_exam_id, v_sec_a_id, 'The chemical method to prevent desertification is:', 'short_answer', 'Petroleum products of sticky spray applied to the surface soil', 7),
    (v_exam_id, v_sec_a_id, 'Environmental problems in Somalia include:', 'short_answer', 'Cutting trees phenomenon', 8),
    (v_exam_id, v_sec_a_id, 'Which of the following countries is landlocked?', 'short_answer', 'Uganda', 9),
    (v_exam_id, v_sec_a_id, 'The plateau zone in Somalia prevails in the:', 'short_answer', 'Northern regions', 10),
    (v_exam_id, v_sec_a_id, 'The region that has a high population density in Somalia is:', 'short_answer', 'Southern regions', 11),
    (v_exam_id, v_sec_a_id, 'The land transport in Somalia includes:', 'short_answer', 'Cars', 12),
    (v_exam_id, v_sec_a_id, 'Natural factors affecting population distribution include:', 'short_answer', 'Mineral resources', 13),
    (v_exam_id, v_sec_a_id, 'The urban problem in the following is:', 'short_answer', 'Lack of an efficient method to dispose of waste materials', 14),
    (v_exam_id, v_sec_a_id, 'The most important industrial regions in the world include:', 'short_answer', 'East of North America', 15),
    (v_exam_id, v_sec_a_id, 'Tourism intended for necessity, not entertainment, is known as:', 'short_answer', 'Medical tourism', 16),
    (v_exam_id, v_sec_a_id, 'The lines that define the area of land over which a country exercises sovereignty are called:', 'short_answer', 'Political borders', 17),
    (v_exam_id, v_sec_a_id, 'Somalia–Ethiopia border is a type of:', 'short_answer', 'Geometric', 18),
    (v_exam_id, v_sec_a_id, 'Kashmir is located between:', 'short_answer', 'Pakistan and India', 19),
    (v_exam_id, v_sec_a_id, 'Climate change is regarded as another environmental concern which emerged during the:', 'short_answer', 'Modern age', 20);

    -- 4. Insert Questions (Section B)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Mention two of biosphere''s characteristics', 'short_answer', 'Supports living organisms. Includes land, water and air where life exists.', 21),
    (v_exam_id, v_sec_b_id, 'Classify the types of natural plants in the world', 'short_answer', 'Forest vegetation. Grassland vegetation.', 22),
    (v_exam_id, v_sec_b_id, 'Latitude is more important than longitude, why?', 'short_answer', 'Latitude affects climate because it determines solar radiation received.', 23),
    (v_exam_id, v_sec_b_id, 'The physical features of Somalia can be divided into three types, mention these', 'short_answer', 'Mountains. Plateaus. Plains.', 24),
    (v_exam_id, v_sec_b_id, 'Write three human factors affecting population distribution', 'short_answer', 'Employment opportunities. Infrastructure. Security.', 25),
    (v_exam_id, v_sec_b_id, 'Differentiate between renewable and non-renewable energy', 'short_answer', 'Renewable energy replenishes naturally. Non-renewable energy has limited quantity.', 26),
    (v_exam_id, v_sec_b_id, 'Propose solutions for urban problems', 'short_answer', 'Improve waste management. Increase housing planning.', 27),
    (v_exam_id, v_sec_b_id, 'List the stages of designing political boundaries', 'short_answer', 'Definition. Delimitation. Demarcation.', 28),
    (v_exam_id, v_sec_b_id, 'How did Somalia deal with solving the problems of its territories occupied by neighbors?', 'short_answer', 'Used diplomatic negotiations and international legal bodies.', 29),
    (v_exam_id, v_sec_b_id, 'Write the concept of energy', 'short_answer', 'Energy is the ability to perform work.', 30);

END $$;
