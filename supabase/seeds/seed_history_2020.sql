-- History National Exam 2020 Seeding Script
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
    VALUES (v_exam_id, 'History National Exam 2020', 'history', 'form4', 2020, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'Part One: Multiple Choice', 40, 1),
    (v_sec_short_id, v_exam_id, 'Part Two: Short Answer', 30, 2),
    (v_sec_essay_id, v_exam_id, 'Part Three: Essay', 30, 3);

    -- 3. Insert Questions (Part One: Multiple Choice)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'The first World War started in:', 'mcq', '1939', '1914', '1918', '1920', 'B', 1),
    (v_exam_id, v_sec_mcq_id, 'The capital city for Caliph Murad I during his rule was:', 'mcq', 'Ankara', 'Istanbul', 'Edirne', 'Bursa', 'C', 2),
    (v_exam_id, v_sec_mcq_id, 'Which of the following countries was NOT in the Triple Alliance:', 'mcq', 'Britain', 'Germany', 'Italy', 'Austria Hungary', 'A', 3),
    (v_exam_id, v_sec_mcq_id, 'The man who founded the Ottoman Empire was:', 'mcq', 'Suleyman Shah', 'Ertugrul', 'Mahmud II', 'Osman', 'D', 4),
    (v_exam_id, v_sec_mcq_id, 'Which of the following countries did NOT ratify the treaty of Versailles?', 'mcq', 'USA', 'Britain', 'Austria Hungary', 'Bulgaria', 'A', 5),
    (v_exam_id, v_sec_mcq_id, 'Second World War ended in:', 'mcq', '1939', '1945', '1918', '1914', 'B', 6),
    (v_exam_id, v_sec_mcq_id, 'The first atomic bomb was dropped at:', 'mcq', 'Nagasaki', 'Tokyo', 'Hiroshima', 'Normandy', 'C', 7),
    (v_exam_id, v_sec_mcq_id, 'Which one of the following countries is among the five permanent members of the United Nations?', 'mcq', 'Turkey', 'Germany', 'Italy', 'France', 'D', 8),
    (v_exam_id, v_sec_mcq_id, 'The term ''cold war'' refers to the rivalry which emerged after the Second World War between:', 'mcq', 'USA and USSR', 'Britain and France', 'USSR and Germany', 'France and China', 'A', 9),
    (v_exam_id, v_sec_mcq_id, 'The only two African countries that were not colonized are:', 'mcq', 'South Africa and Namibia', 'Sudan and Algeria', 'Ethiopia and Liberia', 'Eritrea and Djibouti', 'C', 10),
    (v_exam_id, v_sec_mcq_id, 'The most populated country in Africa is:', 'mcq', 'Niger', 'Ghana', 'Nigeria', 'Chad', 'C', 11),
    (v_exam_id, v_sec_mcq_id, 'The country that colonized southern Somalia is:', 'mcq', 'Italy', 'France', 'Belgium', 'Britain', 'A', 12),
    (v_exam_id, v_sec_mcq_id, 'Benito Mussolini founded a party called:', 'mcq', 'Communist', 'Nazi', 'Fascist', 'Democrat', 'C', 13),
    (v_exam_id, v_sec_mcq_id, 'The great depression began in:', 'mcq', 'Italy', 'France', 'Britain', 'USA', 'D', 14),
    (v_exam_id, v_sec_mcq_id, 'Mohamed Siyad Barre came to power in:', 'mcq', '1969', '1990', '1991', '1970', 'A', 15),
    (v_exam_id, v_sec_mcq_id, 'The colonists divided Somalia into the following parts:', 'mcq', 'Four', 'Two', 'Five', 'Three', 'C', 16),
    (v_exam_id, v_sec_mcq_id, 'Hitler committed suicide on:', 'mcq', '30 May 1945', '30 April 1945', '29 June 1945', '30 January 1945', 'B', 17),
    (v_exam_id, v_sec_mcq_id, 'The first prime minister of Somalia was:', 'mcq', 'Mohamed Ibrahim Egal', 'Abdirazak Haji Hussein', 'Abdirashid Ali Sharmarke', 'Aden Abdulle Osman', 'C', 18),
    (v_exam_id, v_sec_mcq_id, 'Which of the following was NOT one of the causes of the First World War?', 'mcq', 'The rise of dictatorship', 'Imperialism', 'Arms race', 'Sarajevo assassination', 'A', 19),
    (v_exam_id, v_sec_mcq_id, 'Mohamed Siyad Barre''s government collapsed in:', 'mcq', '1994', '1991', '1992', '1993', 'B', 20);

    -- 4. Insert Questions (Part Two: Short Answer)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_short_id, 'State two of the Austrian demands to Serbia after the assassination of Franz Ferdinand.', 'short_answer', 'Serbia must suppress anti-Austrian propaganda. Serbia must allow Austrian officials to take part in investigations.', 21),
    (v_exam_id, v_sec_short_id, 'Name two economic crises that resulted from the First World War.', 'short_answer', 'Inflation and Unemployment.', 22),
    (v_exam_id, v_sec_short_id, 'Name the place where the constitution of the League of Nations was finally adopted.', 'short_answer', 'Paris Peace Conference', 23),
    (v_exam_id, v_sec_short_id, 'Define the ''appeasement agreement'' between Britain, Russia and France.', 'short_answer', 'It was a policy to avoid war by meeting some demands of aggressive powers.', 24),
    (v_exam_id, v_sec_short_id, 'When was the Somali Youth League (SYL) established?', 'short_answer', '15 May 1943', 25),
    (v_exam_id, v_sec_short_id, 'Write down the headquarters of the African Union.', 'short_answer', 'Addis Ababa', 26),
    (v_exam_id, v_sec_short_id, 'When was the United Nations established?', 'short_answer', '1945', 27),
    (v_exam_id, v_sec_short_id, 'Name two official languages used in the United Nations.', 'short_answer', 'English and French.', 28),
    (v_exam_id, v_sec_short_id, 'Who was the first Secretary General of the United Nations?', 'short_answer', 'Trygve Lie', 29),
    (v_exam_id, v_sec_short_id, 'Name the first president of the Somali Republic.', 'short_answer', 'Aden Abdulle Osman', 30),
    (v_exam_id, v_sec_short_id, 'What does W.H.O stand for?', 'short_answer', 'World Health Organization', 31),
    (v_exam_id, v_sec_short_id, 'Name any two African countries who are members of the Commonwealth.', 'short_answer', 'Kenya and Uganda.', 32),
    (v_exam_id, v_sec_short_id, 'State two Somali freedom fighters.', 'short_answer', 'Sayid Mohamed Abdulle Hassan and Hawo Tako.', 33),
    (v_exam_id, v_sec_short_id, 'Which is the second largest continent of the world?', 'short_answer', 'Africa', 34),
    (v_exam_id, v_sec_short_id, 'When did Somalia attain its independence?', 'short_answer', '1 July 1960', 35);

    -- 5. Insert Questions (Part Three: Essay)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_essay_id, 'Explain why the USA remained neutral in the First World War up to 1917.', 'essay', 'The USA wanted to avoid European conflict, protect trade interests, and follow isolationist policy until German actions forced intervention.', 36),
    (v_exam_id, v_sec_essay_id, 'List four major organizations of the United Nations.', 'essay', 'UNICEF, UNESCO, WHO, and UNDP.', 37),
    (v_exam_id, v_sec_essay_id, 'Describe two reasons why the USA joined the First World War.', 'essay', 'German submarine attacks on American ships. Zimmerman telegram encouraging Mexico to attack the USA.', 38),
    (v_exam_id, v_sec_essay_id, 'Discuss two causes that led to the collapse of the League of Nations.', 'essay', 'Lack of military force to enforce decisions. Failure to stop aggressor nations.', 39),
    (v_exam_id, v_sec_essay_id, 'Why was the United Nations established?', 'essay', 'To maintain peace and prevent future world conflicts after World War II.', 40),
    (v_exam_id, v_sec_essay_id, 'Compare and contrast the responsibilities of the Security Council and the International Court of Justice.', 'essay', 'The Security Council maintains peace and security, while the International Court of Justice settles legal disputes between states.', 41),
    (v_exam_id, v_sec_essay_id, 'Discuss two causes of the Second World War.', 'essay', 'Harsh terms of the Treaty of Versailles and Aggression by Germany under Hitler.', 42);

END $$;
