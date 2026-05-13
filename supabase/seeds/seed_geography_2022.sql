-- Geography National Exam 2022 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Geography National Exam 2022', 'geography', 'form4', 2022, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice Questions', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Short Answer Questions', 60, 2);

    -- 3. Insert Questions (Section A)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'The scientific study of earth''s soil, water and finding solutions to pollution is called:', 'short_answer', 'Environmental geology', 1),
    (v_exam_id, v_sec_a_id, 'The type of soil found in the Shabeelle and Jubba river deltas is:', 'short_answer', 'Black clay', 2),
    (v_exam_id, v_sec_a_id, 'Somalia is bordered on the east by:', 'short_answer', 'Indian ocean', 3),
    (v_exam_id, v_sec_a_id, 'Somalia consists of how many regions?', 'short_answer', '18', 4),
    (v_exam_id, v_sec_a_id, 'Which mountain has the highest peak in Somalia?', 'short_answer', 'Calmadow', 5),
    (v_exam_id, v_sec_a_id, 'The most important commodity which Somalia exports is:', 'short_answer', 'Livestock', 6),
    (v_exam_id, v_sec_a_id, 'The busiest seaport which generates the most revenue is located in:', 'short_answer', 'Mogadishu', 7),
    (v_exam_id, v_sec_a_id, 'A population growth which exceeds the natural resources of a country is called:', 'short_answer', 'Explosion', 8),
    (v_exam_id, v_sec_a_id, 'A group selected randomly to represent a population is called:', 'short_answer', 'Sample', 9),
    (v_exam_id, v_sec_a_id, 'The first source from which population number and characteristics are obtained is:', 'short_answer', 'Census', 10),
    (v_exam_id, v_sec_a_id, 'Borders marked by mountains, rivers and seas are called:', 'short_answer', 'Natural border', 11),
    (v_exam_id, v_sec_a_id, 'The colonial power that assisted Ethiopia in annexing Western Somalia is:', 'short_answer', 'England', 12),
    (v_exam_id, v_sec_a_id, 'One factor that led to the establishment of borders is:', 'short_answer', 'Colonialism', 13),
    (v_exam_id, v_sec_a_id, 'A characteristic of tropical regions is:', 'short_answer', 'High temperatures all year long', 14),
    (v_exam_id, v_sec_a_id, 'One cause of increased temperatures is:', 'short_answer', 'Use of fossil fuels oil and gas', 15),
    (v_exam_id, v_sec_a_id, 'Unclean water is dangerous to:', 'short_answer', 'Human health', 16),
    (v_exam_id, v_sec_a_id, 'Which of the following countries is popular for tourism?', 'short_answer', 'Turkey', 17),
    (v_exam_id, v_sec_a_id, 'What is the longest river in the world?', 'short_answer', 'Nile', 18),
    (v_exam_id, v_sec_a_id, 'The Jubba River in Somalia joins with the:', 'short_answer', 'Indian ocean', 19),
    (v_exam_id, v_sec_a_id, 'Fishing zones in Somalia include:', 'short_answer', 'Marka and Kismayo', 20);

    -- 4. Insert Questions (Section B)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Define geology.', 'short_answer', 'The study of the earth''s structure, materials and processes.', 21),
    (v_exam_id, v_sec_b_id, 'Label Somalia and the neighboring countries on the map.', 'short_answer', 'Somalia borders Djibouti, Ethiopia and Kenya.', 22),
    (v_exam_id, v_sec_b_id, 'Explain the importance of the sea.', 'short_answer', 'It provides transport, fishing resources and trade routes.', 23),
    (v_exam_id, v_sec_b_id, 'Describe the strategic location of Somalia.', 'short_answer', 'It lies along major international shipping routes connecting the Red Sea and Indian ocean.', 24),
    (v_exam_id, v_sec_b_id, 'Determine the barriers inhibiting the conduct of a census in Somalia.', 'short_answer', 'Insecurity and lack of infrastructure.', 25),
    (v_exam_id, v_sec_b_id, 'Identify the largest age group in Somalia''s population.', 'short_answer', 'Youth.', 26),
    (v_exam_id, v_sec_b_id, 'Compare challenges facing fishing and farming sectors in Somalia.', 'short_answer', 'Fishing lacks equipment. Farming depends on unreliable rainfall.', 27),
    (v_exam_id, v_sec_b_id, 'Describe reasons behind rural to urban migration.', 'short_answer', 'Search for jobs and better services.', 28),
    (v_exam_id, v_sec_b_id, 'Identify the sources of underground water.', 'short_answer', 'Rainwater infiltration and aquifers.', 29),
    (v_exam_id, v_sec_b_id, 'Analyze ways to reduce cutting trees for charcoal.', 'short_answer', 'Use alternative energy and enforce regulations.', 30);

END $$;
