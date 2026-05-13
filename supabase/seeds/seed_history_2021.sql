-- History National Exam 2021 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'History National Exam 2021', 'history', 'form4', 2021, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'Multiple Choice Questions', 100, 1);

    -- 3. Insert Questions (Multiple Choice)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'Fiditankii dowladda Cusmaaniyiinta waxay gaarsiisay gobolladeeda:', 'mcq', '50 states', '32 states', '43 states', '23 states', 'A', 1),
    (v_exam_id, v_sec_mcq_id, 'Caqabadda ugu wayn ee haysatay ciidanka Cusmaaniyiinta marka ay furanayeen Konistantinoobal:', 'mcq', 'to move ships', 'the conflict between them', 'power of enemy', 'lack of weapons', 'A', 2),
    (v_exam_id, v_sec_mcq_id, 'Dowladda Cusmaaniyiinta markii ay tabar yaraatay waxaa loogu yeeri jiray:', 'mcq', 'The sick man of Europe', 'The powerful man of Europe', 'Ottoman Empire', 'The Islamic state', 'A', 3),
    (v_exam_id, v_sec_mcq_id, 'Ururka Sahyuuniyadda caalamiga ah waxaa asaasay:', 'mcq', 'Theodore Hertzl', 'Ben-Gurion', 'Isak Rabin', 'Golda Meir', 'A', 4),
    (v_exam_id, v_sec_mcq_id, 'Dadka ku nool gobolka Kashmir waxaa Muslim ah:', 'mcq', '40%', '80%', '60%', '10%', 'B', 5),
    (v_exam_id, v_sec_mcq_id, 'Hay’adda rasmiga u xilsaaran maxkamadaynta dambiyada ka dhanka ah xuquuqul insaanka:', 'mcq', 'ICC', 'Security Council', 'AU', 'Arab League', 'A', 6),
    (v_exam_id, v_sec_mcq_id, 'Golaha guud ee Qaramada Midoobay waxa uu go’aamiyay in Soomaaliya la hoos geeyo talis talis muddo:', 'mcq', '15 years', '17 years', '10 years', '5 years', 'A', 7),
    (v_exam_id, v_sec_mcq_id, 'Taliyihii ugu horeeyay ciidanka Soomaaliya markii la dhisay:', 'mcq', 'Gen. Mohamed Siad', 'Gen. Daud Abdulle Hirsi', 'Gen. Aynanshe', 'Gen. Galaal', 'B', 8),
    (v_exam_id, v_sec_mcq_id, '1976 waxaa la kala diray golihii sare ee kacanka marka laga reebo:', 'mcq', '5 members', '7 members', '4 members', 'none', 'A', 9),
    (v_exam_id, v_sec_mcq_id, 'Dhaqdhaqaaqa Mahdiyiinta wuxuu ka dhacay:', 'mcq', 'Sudan', 'Libya', 'Egypt', 'South Africa', 'A', 10),
    (v_exam_id, v_sec_mcq_id, 'Jamhuuriyadda Midowga Koofur Afrika waxay tusaale u ahayd:', 'mcq', 'battle', 'racial discrimination', 'famine', 'corruption', 'B', 11),
    (v_exam_id, v_sec_mcq_id, 'German forces ignited WW2 after crossing the border of:', 'mcq', 'Poland', 'USA', 'Russia', 'France', 'A', 12),
    (v_exam_id, v_sec_mcq_id, 'Khasaaraha ku dhintay WW2 waxaa lagu qiyaasay:', 'mcq', '50 million', '62 million', '30 million', '20 million', 'B', 13),
    (v_exam_id, v_sec_mcq_id, 'Dagaalkii Qaboobaa Yurub waxay u kala qeybsantay:', 'mcq', 'two major camps', 'three major camps', 'four major camps', 'multiple camps', 'A', 14),
    (v_exam_id, v_sec_mcq_id, 'Xoghayaha guud ee Qaramada Midoobay waxaa loo magacaabaa muddo:', 'mcq', '4 years', '5 years', '6 years', '7 years', 'A', 15),
    (v_exam_id, v_sec_mcq_id, 'Dowladaha xubnaha ka ah Midowga Afrika waa:', 'mcq', '34 states', '50 states', '54 states', '100 states', 'C', 16),
    (v_exam_id, v_sec_mcq_id, 'Fikradda asaasidda OIC waxaa soo jeediyay madaxweynihii Soomaaliya:', 'mcq', 'Aden Adde', 'Abdirishid Ali', 'Mohamed Siyad', 'Abdikasim Salad', 'A', 17),
    (v_exam_id, v_sec_mcq_id, 'Dastuurkii Soomaaliya 1961 wuxuu ahaa:', 'mcq', 'first', 'second', 'third', 'fourth', 'A', 18),
    (v_exam_id, v_sec_mcq_id, 'Tiirarka dimuqraadiyadda waxaa ka mid ah:', 'mcq', 'dictatorship', 'using power', 'elections', 'long time leader', 'C', 19),
    (v_exam_id, v_sec_mcq_id, 'Doorashadii 1969 tirada xubnaha baarlamaanka waxay ahayd:', 'mcq', '132', '123', '213', '231', 'A', 20);

END $$;
