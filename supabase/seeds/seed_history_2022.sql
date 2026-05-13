-- History National Exam 2022 Seeding Script (Somali)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'History National Exam 2022', 'history', 'form4', 2022, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'Multiple Choice Questions (Xulasho)', 100, 1);

    -- 3. Insert Questions (Multiple Choice)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'Asaasihii Dawladda Cusmaaniyiintu wuxuu ahaa:', 'mcq', 'Maxamed Faatix', 'Cusmaan Ardhogral', 'Muraadkii 1aad', 'Muraadkii 2aad', 'B', 1),
    (v_exam_id, v_sec_mcq_id, 'Markii ay fidday Baaxadda dawladda Cusmaaniyiinta waxa maamul ahaan loo qaybiyay:', 'mcq', '23 gobol', '28 gobol', '32 gobol', '34 gobol', 'B', 2),
    (v_exam_id, v_sec_mcq_id, 'Sannadkii 1514tii Cusmaaniyiintu waxa ay dagaalkii Jaaldiiraan ku jebiyeen:', 'mcq', 'Safawiyiinta', 'Saljuuqiyiinta', 'Mamaaliikta', 'Dhammaantood', 'A', 3),
    (v_exam_id, v_sec_mcq_id, 'Caqabadda ugu wayn ee haysatay ciidanka Cusmaaniyiinta waxay ahayd:', 'mcq', 'Maraakiibta dekedda Bosfoor', 'Tirada ciidanka cadawga oo badan', 'Hub yarida', 'Tirada Cusmaaniyiinta oo yar', 'A', 4),
    (v_exam_id, v_sec_mcq_id, 'Isirka Cusmaaniyiinta waxa uu ka soo jeedaa:', 'mcq', 'Hindida', 'Turkida', 'Carabta', 'Faarisiyiinta', 'B', 5),
    (v_exam_id, v_sec_mcq_id, 'Sadrul-Acdam waxa lagu magacaabi jiray:', 'mcq', 'Taliyaha ciidanka', 'Suldaanka', 'Wasiirka 1aad', 'Guddoomiyaha gobolka', 'C', 6),
    (v_exam_id, v_sec_mcq_id, 'Sannadkii 1302dii, Magaalada Buursa waxa magaalo madax ka dhigtay:', 'mcq', 'Cusmaaniyiinta', 'Safawiyiinta', 'Saljuqiyiinta', 'Hindida', 'A', 7),
    (v_exam_id, v_sec_mcq_id, 'Sannadkii 1897dii, Ururka Sahyuuniyadda waxa shirkiisii koowaad lagu qabtay:', 'mcq', 'Baariis', 'Rooma', 'Baarliin', 'Baasil', 'D', 8),
    (v_exam_id, v_sec_mcq_id, 'Dadkii ugu horeeyay ee soo dega dhulka Falastiin waxay ahaayeen:', 'mcq', 'Aaraamiyiin', 'Fiiniiqiyiin', 'Kancaaniyiin', 'Baabiliyiin', 'C', 9),
    (v_exam_id, v_sec_mcq_id, 'Heshiiskii Muslimiintu la galeen reer Baytul Maqdis waxa lagu magacaabaa:', 'mcq', 'Abuubakar', 'Cumar', 'Cusmaan', 'Cali', 'B', 10),
    (v_exam_id, v_sec_mcq_id, 'Gobolka Kashmiir waxa Islaamku soo gaaray sannadkii 90 Hijri, waxaana keenay:', 'mcq', 'Xajaaj bin Yuusuf', 'Maxamed Bin Qaasim', 'Muusa Bin Nuseyr', 'Daariq Bin Siyaad', 'B', 11),
    (v_exam_id, v_sec_mcq_id, 'Ruhinga waa dad muslimiin ah oo ku nool:', 'mcq', 'Shiinaha', 'Hindiya', 'Miyanmaar', 'Sirilaanka', 'C', 12),
    (v_exam_id, v_sec_mcq_id, 'Hannaankii talyaaniga ee dawladnimo gaarsiinta waxa uu Soomaaliya ka dhaqan galay:', 'mcq', '1943', '1948', '1950', '1945', 'C', 13),
    (v_exam_id, v_sec_mcq_id, 'Calanka Soomaaliya waxa hindisey:', 'mcq', 'Maxamed Cawaale Liibaan', 'Cabdullahi Ciise', 'Xaaji Bashiir', 'Aadan Cadde', 'A', 14),
    (v_exam_id, v_sec_mcq_id, 'Ereyada “Cadawgu bir ma aha…” waxaa yiri halyey:', 'mcq', 'Xalane', 'Kaarshe', 'Idile', 'Samatar', 'B', 15),
    (v_exam_id, v_sec_mcq_id, 'Gobollada koofurta iyo waqooyiga Soomaaliya waxa ay midoobeen:', 'mcq', '1961', '1962', '1960', '1963', 'C', 16),
    (v_exam_id, v_sec_mcq_id, 'Sheekh Munye waxa loo magacaabay guddoomiyaha degmada:', 'mcq', 'Baydhabo', 'Xuddur', 'Kismaayo', 'Diinsoor', 'B', 17),
    (v_exam_id, v_sec_mcq_id, 'Go’aankii “Baqshadda Guduudan” waxaa 60 shaqaale shaqada ka eryey:', 'mcq', 'Cabdirashiid Cali Sharmaarke', 'Cabdirisaaq Xaaji Xuseen', 'Cigaal', 'Cumar Carte', 'B', 18),
    (v_exam_id, v_sec_mcq_id, 'Golahii sare ee kacaanka waxa uu ka koobnaa:', 'mcq', '20 sarkaal', '25 sarkaal', '18 sarkaal', '23 sarkaal', 'B', 19),
    (v_exam_id, v_sec_mcq_id, 'Qaab dagaalkii Cumar Mukhtaar adeegsaday wuxuu ahaa:', 'mcq', 'Ku dhufo oo ka dhaqaaq', 'Dagaal qabow', 'Iska hor imaad', 'Nooc kale', 'A', 20);

END $$;
