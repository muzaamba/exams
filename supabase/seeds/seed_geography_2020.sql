-- Geography National Exam 2020 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
    v_sec_short_id UUID := gen_random_uuid();
    v_sec_essay_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Geography National Exam 2020', 'geography', 'form4', 2020, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'Part One: Multiple Choice', 40, 1),
    (v_sec_short_id, v_exam_id, 'Part Two: Short Answer Questions', 30, 2),
    (v_sec_essay_id, v_exam_id, 'Part Three: Essay Questions', 30, 3);

    -- 3. Insert Questions (Part One: MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'Somalia has a land area of about:', 'mcq', '637,657 km2', '677,657 km2', '667,547 km2', '697,657 km2', 'A', 1),
    (v_exam_id, v_sec_mcq_id, 'The source of River Jubbah and Shebelle is:', 'mcq', 'Kenyan highlands', 'Ethiopian highlands', 'Djibouti highlands', 'Uganda highlands', 'B', 2),
    (v_exam_id, v_sec_mcq_id, 'Maize was first grown in:', 'mcq', 'Argentina', 'Colombia', 'Mexico', 'Brazil', 'C', 3),
    (v_exam_id, v_sec_mcq_id, 'Which one of the following is a land locked country:', 'mcq', 'Somalia', 'Djibouti', 'Eritrea', 'Rwanda', 'D', 4),
    (v_exam_id, v_sec_mcq_id, 'Before the invention of the steam engine, vessels use:', 'mcq', 'Sun power', 'Flowing water', 'Water power', 'Wind power', 'D', 5),
    (v_exam_id, v_sec_mcq_id, 'The first air route was opened between:', 'mcq', 'London and Paris', 'Berlin and Roma', 'Paris and Berlin', 'Moscow and London', 'A', 6),
    (v_exam_id, v_sec_mcq_id, 'The Suez Canal connects the:', 'mcq', 'Dead sea and Black sea', 'Mediterranean sea and Red sea', 'Red sea and Black sea', 'Arabian sea and Gulf of Eden', 'B', 7),
    (v_exam_id, v_sec_mcq_id, 'The least common type of migration is:', 'mcq', 'Rural to Rural', 'Rural to Urban', 'Urban to Rural', 'Urban to Urban', 'C', 8),
    (v_exam_id, v_sec_mcq_id, 'The sun overheads at midday along the tropic of Cancer:', 'mcq', '23rd September', '22 December', '21 March', '21 June', 'D', 9),
    (v_exam_id, v_sec_mcq_id, 'The largest Ocean of the world is:', 'mcq', 'Arctic Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Pacific Ocean', 'D', 10),
    (v_exam_id, v_sec_mcq_id, 'The largest lake in Africa is:', 'mcq', 'Victoria', 'Albert', 'Malawi', 'Turkana', 'A', 11),
    (v_exam_id, v_sec_mcq_id, 'Which of the following regions of Somalia has NO coast line?', 'mcq', 'Bakool', 'Mudug', 'Galgadud', 'Middle Shabelle', 'A', 12),
    (v_exam_id, v_sec_mcq_id, 'The highest mountain in Africa is:', 'mcq', 'Mount Kenya', 'Elgon', 'Kilimanjaro', 'Ras-dashan', 'C', 13),
    (v_exam_id, v_sec_mcq_id, 'If the time in Cairo (30 E) is 9:00am, what is the time in Mogadishu (45E)?', 'mcq', '10:00am', '8:00am', '7:00am', '6:00am', 'A', 14),
    (v_exam_id, v_sec_mcq_id, 'Which of the following regions river Jubba does NOT flow through?', 'mcq', 'Lower Jubba', 'Middle Jubba', 'Gedo', 'Middle Shabelle', 'D', 15),
    (v_exam_id, v_sec_mcq_id, 'The most important export of Somalia is:', 'mcq', 'Banana', 'Livestock', 'Fruits', 'Fish', 'B', 16),
    (v_exam_id, v_sec_mcq_id, 'The following fishing method is seasonal?', 'mcq', 'Traps', 'Seining', 'Barrier', 'Gillnet', 'A', 17),
    (v_exam_id, v_sec_mcq_id, 'The longest river in Africa is:', 'mcq', 'Niger', 'Nile', 'Congo', 'Jubba', 'B', 18),
    (v_exam_id, v_sec_mcq_id, 'The summer monsoon rain called "Xagayo" is common in the region of:', 'mcq', 'Sool', 'Bay', 'Bakol', 'Banadir', 'D', 19),
    (v_exam_id, v_sec_mcq_id, 'The largest desert in Africa is:', 'mcq', 'Arabian', 'Namibian', 'Kalahari', 'Sahara', 'D', 20);

    -- 4. Insert Questions (Part Two: Short Answer)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_short_id, 'Where does River Jubba flow into the Indian Ocean?', 'short_answer', 'It flows into the Indian Ocean near Kismayo.', 21),
    (v_exam_id, v_sec_short_id, 'State two regions that River Shabelle flows through?', 'short_answer', 'Hiran and Middle Shabelle.', 22),
    (v_exam_id, v_sec_short_id, 'The two main rainy seasons in Somalia are:', 'short_answer', 'Gu and Deyr.', 23),
    (v_exam_id, v_sec_short_id, 'What are the types of agriculture?', 'short_answer', 'Subsistence agriculture and commercial agriculture.', 24),
    (v_exam_id, v_sec_short_id, 'Define the term "fisheries"?', 'short_answer', 'Fisheries is the occupation or industry of catching or rearing fish.', 25),
    (v_exam_id, v_sec_short_id, 'List down two basic types of fish communities?', 'short_answer', 'Pelagic fish and Demersal fish.', 26),
    (v_exam_id, v_sec_short_id, 'Mention two major types of inland fishing grounds?', 'short_answer', 'Rivers and lakes.', 27),
    (v_exam_id, v_sec_short_id, 'Define the term "energy"?', 'short_answer', 'Energy is the ability to do work.', 28),
    (v_exam_id, v_sec_short_id, 'Industrialization has negative effects on environment. State two effects.', 'short_answer', 'Air pollution and water pollution.', 29),
    (v_exam_id, v_sec_short_id, 'Write down any two major sea routes?', 'short_answer', 'The North Atlantic route and the Suez Canal route.', 30),
    (v_exam_id, v_sec_short_id, 'When is the sun overhead at midday along the equator?', 'short_answer', 'On March 21st and September 23rd (Equinoxes).', 31),
    (v_exam_id, v_sec_short_id, 'There are types population census. List two of them.', 'short_answer', 'De facto census and De jure census.', 32),
    (v_exam_id, v_sec_short_id, 'Which is the most easterly country in Africa?', 'short_answer', 'Somalia.', 33),
    (v_exam_id, v_sec_short_id, 'Define the term "internal migration"?', 'short_answer', 'The movement of people from one place to another within the same country.', 34),
    (v_exam_id, v_sec_short_id, 'What does mortality refer to?', 'short_answer', 'Mortality refers to the number of deaths in a given population.', 35);

    -- 5. Insert Questions (Part Three: Essay)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_essay_id, 'Somalia is a land of rolling plains. Explain.', 'essay', 'Somalia has a relatively flat terrain consisting mainly of plateaus, plains, and highlands, making it a land of rolling plains.', 36),
    (v_exam_id, v_sec_essay_id, 'Describe two fishing methods?', 'essay', 'Netting (using nets to catch fish) and line fishing (using a fishing line with hooks).', 37),
    (v_exam_id, v_sec_essay_id, 'Renewable and non-renewable are the two main sources of energy. Compare and contrast?', 'essay', 'Renewable energy comes from sources that naturally replenish (e.g., solar, wind), while non-renewable energy comes from finite resources (e.g., coal, oil).', 38),
    (v_exam_id, v_sec_essay_id, 'Differentiate between Industry and Industrialization?', 'essay', 'Industry refers to economic activity concerned with processing raw materials, while industrialization is the development of industries in a country or region on a wide scale.', 39),
    (v_exam_id, v_sec_essay_id, 'Flooding is a common phenomenon in our country every year. Discuss how this calamity can be prevented.', 'essay', 'Flooding can be prevented by building dams, planting trees, constructing flood channels, and proper urban planning.', 40),
    (v_exam_id, v_sec_essay_id, 'Identify the countries that border Somalia in the parts labeled A to D in the map below?', 'essay', 'A: Djibouti, B: Ethiopia, C: Kenya, D: Gulf of Aden / Indian Ocean', 41),
    (v_exam_id, v_sec_essay_id, 'There are some severe circumstances which force people to migrate from Somalia. Explain two causes?', 'essay', 'Droughts causing famine, and political instability/conflict.', 42),
    (v_exam_id, v_sec_essay_id, 'People use forests for many purposes causing desertification in our country. Evaluate how we can discourage people from these practices', 'essay', 'By introducing alternative energy sources like solar or gas instead of charcoal, and enforcing strict laws against deforestation.', 43);

END $$;
