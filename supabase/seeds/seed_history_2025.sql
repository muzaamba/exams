-- History National Exam 2025 Seeding Script (Somali)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'History National Exam 2025', 'history', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'Qaybta 1aad: Xulasho (Multiple Choice)', 100, 1);

    -- 3. Insert Questions (Multiple Choice)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'Suldaankii ugu dambeeyay Cusmaaniyiinta waxa uu ahaa?', 'mcq', 'Cabdulxamiid II', 'Saliim', 'Muraad', 'Muxammad I', 'A', 1),
    (v_exam_id, v_sec_mcq_id, 'Dowladdii Cabbaasiyiintu waxay ku dhalatay qaab:', 'mcq', 'Shuuro', 'Doorasho', 'Kacdoon', 'Tanaasul', 'C', 2),
    (v_exam_id, v_sec_mcq_id, 'Sanadkii 1969 Madaxweyne Cabdirashiid wuxuu lagu dilay magaalada:', 'mcq', 'Laas Qoray', 'Burco', 'Boorama', 'Laas Caanood', 'A', 3),
    (v_exam_id, v_sec_mcq_id, 'Dagaalkii 2aad waxa uu kaga duwanaa dagaalkii 1aad in la sameeyay nidaam:', 'mcq', 'Boqortooyo', 'Kali-talis', 'Dawladdnimo gaarsiis', 'Dawladd dhexe', 'C', 4),
    (v_exam_id, v_sec_mcq_id, 'Dhaqdhaqaaqii Mahdiga Suudaan waxa sababay:', 'mcq', 'Kacdoonkii', 'Dagaalkii 1aad', 'Dagaalkii Sahyuuniyiinta', 'Gumeysiga Ingiriiska', 'D', 5),
    (v_exam_id, v_sec_mcq_id, 'Shirkii Baarliin ee qeybinta Afrika waxa la qabtay:', 'mcq', '1894', '1848', '1849', '1884', 'D', 6),
    (v_exam_id, v_sec_mcq_id, 'Dadka ugu badan ee ku nool Kashmiir waxay haystaan diin:', 'mcq', 'Islaam', 'Masiixi', 'Hindu', 'Majuus', 'A', 7),
    (v_exam_id, v_sec_mcq_id, 'Jabbaan oo dhul balaarsi rabtay waxay Shiinaha weerartay sanadkii:', 'mcq', '1931', '1936', '1932', '1937', 'A', 8),
    (v_exam_id, v_sec_mcq_id, 'Laaluushku waa qayb ka mid ah:', 'mcq', 'Qabyaalad', 'Eex', 'Musuqmaasuq', 'Qof-jecleysi', 'C', 9),
    (v_exam_id, v_sec_mcq_id, 'Ujeedooyinka la aas-aasay Jaamacadda Carabta waxaa kamid ahaa:', 'mcq', 'Kacdoonka Carabta', 'Madaxbannaani siyaasadeed', 'Dhul ballaarsi', 'Samaynta Dawladaha Carabta', 'B', 10),
    (v_exam_id, v_sec_mcq_id, 'Xarunta Midowga Afrika waa:', 'mcq', 'Masar', 'Koofur Afrika', 'Itoobiya', 'Suudaan', 'C', 11),
    (v_exam_id, v_sec_mcq_id, 'Shidaalka waxaa loo yaqaan:', 'mcq', 'Shidaalka', 'Faanta Maroodiga', 'Biraha xadiidka', 'Geriga labka', 'A', 12),
    (v_exam_id, v_sec_mcq_id, 'Halyeygii Nasiib Buundo wuxuu dhintay sannadkii:', 'mcq', '1906', '1901', '1910', '1909', 'A', 13),
    (v_exam_id, v_sec_mcq_id, 'Talada lagasho cidda heshay waxaa loo yaqaan:', 'mcq', 'Dimuqraadiyad', 'Xorriyad', 'Shacbiyad', 'Shuura', 'D', 14),
    (v_exam_id, v_sec_mcq_id, 'Xarunta Jaamacadda Carabta waa:', 'mcq', 'Jeddah', 'Qaahira', 'Jordan', 'Qaadisiya', 'B', 15),
    (v_exam_id, v_sec_mcq_id, 'Suldaan Maxamed Al-Faatiix wuxuu qabsaday Konstantaniyya sannadkii:', 'mcq', '1452', '1451', '1453', '1463', 'C', 16),
    (v_exam_id, v_sec_mcq_id, 'Sameynta qarannimada Yurub waxaa horseeday:', 'mcq', 'Kali-talisnimo', 'Waddaniyad', 'Gumeysi-doon', 'Boqortooyo', 'B', 17),
    (v_exam_id, v_sec_mcq_id, 'Boqortooyooyinkii Mesobotaamiya waxaa kamid ahaa:', 'mcq', 'Soomaariyiin', 'Biisandhiyiin', 'Cusmaaniyiin', 'Mangooliyiin', 'B', 18),
    (v_exam_id, v_sec_mcq_id, 'Suldaankii hore ee Cusmaaniyiinta wuxuu ahaa:', 'mcq', 'Cusmaan I', 'Muraad I', 'Orkhaan I', 'Muxammad I', 'A', 19),
    (v_exam_id, v_sec_mcq_id, 'SYL waxaa la aas-aasay:', 'mcq', '5 May 1943', '10 Jan 1947', '15 May 1943', '20 July 1949', 'C', 20),
    (v_exam_id, v_sec_mcq_id, 'Dadkii ugu horreeyay ee degay Falastiin waxay ahaayeen:', 'mcq', 'Baabiliyiin', 'Kaadiyiin', 'Kancaniyiin', 'Roomaaniyiin', 'C', 21),
    (v_exam_id, v_sec_mcq_id, 'Mahdiga Suudaan waxa hogaaminay:', 'mcq', 'Yuusuf Shallaali', 'Maxamed Ra’uuf', 'Mahdiga', 'Odayaasha dhaqanka', 'C', 22),
    (v_exam_id, v_sec_mcq_id, 'Sababihii halyeey halganka warshadaha Yurub uga dhashay waxaa kamid ahaa:', 'mcq', 'Kacdoonkii Suudaan', 'Dagaalkii Faransiiska', 'Warshadaha', 'Sahyuuniyiinta', 'C', 23),
    (v_exam_id, v_sec_mcq_id, 'ANC waxa la aas-aasay:', 'mcq', '8 Jan 1912', '10 Jan 1915', '6 Jun 1914', '12 May 1910', 'A', 24),
    (v_exam_id, v_sec_mcq_id, 'Sababtii ugu muhiimsaneyd kacaankii Ruushka:', 'mcq', 'Guushii shaqaalaha', 'Dhibaatooyinka beeraha', 'Dagaalkii galbeedka', 'Dagaalkii qaboobaa', 'A', 25),
    (v_exam_id, v_sec_mcq_id, 'Maxamed Cabdulle Xalane wuxuu dagaal kaga jiray:', 'mcq', 'Harar', 'Xudur', 'Tog-Wajaale', 'Hawaash', 'A', 26),
    (v_exam_id, v_sec_mcq_id, 'Dastuurkii hore ee Soomaaliya la ansixiyay sannadkii:', 'mcq', '1967', '1964', '1965', '1961', 'D', 27),
    (v_exam_id, v_sec_mcq_id, 'Dhaqdhaqaaqii Maxamed Axmed Mahdi wuxuu ka dhacay:', 'mcq', 'Suuriya', 'Suudaan', 'Soomaaliya', 'South Afrika', 'B', 28),
    (v_exam_id, v_sec_mcq_id, 'Asalka nidaamka siyaasadda Islaamka waa:', 'mcq', 'Dimuqraadi', 'Xisbiyo', 'Shuura', 'Federal', 'C', 29),
    (v_exam_id, v_sec_mcq_id, 'Xisbigii Naasiga wuu kaga duwanaa Fashistaha in Naasigu:', 'mcq', 'Qabsaday Ruushka', 'Qabsaday Ethiopia', 'La heshiiyey Yugoslavia', 'Madax ka dhigay Lenin', 'B', 30),
    (v_exam_id, v_sec_mcq_id, 'Soomaaliya waxay ku biirtay Jaamacadda Carabta:', 'mcq', '1972', '1973', '1974', '1975', 'C', 31),
    (v_exam_id, v_sec_mcq_id, 'Mid ka mid ah xertii Sheekh Aweys Baraawe:', 'mcq', 'Sheekh Xasan Barsane', 'Sheekh Cabdi Abikar', 'Sayid Maxamed', 'Nasiib Buundo', 'A', 32),
    (v_exam_id, v_sec_mcq_id, 'Aabaha xisaabta Islaamka waa:', 'mcq', 'Ibnu Masuuwiyah', 'Abu Bakar al-Raasi', 'Khuwaariszmi', 'Al-Mustacsim', 'C', 33),
    (v_exam_id, v_sec_mcq_id, 'Ummayidii waxay kaga duwanaayeen Cabbaasiyiinta in lagu dhisay:', 'mcq', 'Kacdoon', 'Shuura', 'Tanaasul', 'Dhaxal', 'D', 34),
    (v_exam_id, v_sec_mcq_id, 'Waddankii ugu horreeyay ee gumeysi Afrikada yimid:', 'mcq', 'Ingiriis', 'Faransiis', 'Talyaaniga', 'Burtaqiiska', 'D', 35),
    (v_exam_id, v_sec_mcq_id, 'Sahibkii Gacanka Raja Wanaagsan waa:', 'mcq', 'Alfoonso', 'Baartelmuud Diyaas', 'Henerigi', 'Faasko Da Gaama', 'B', 36),
    (v_exam_id, v_sec_mcq_id, 'Farta ay Masaaridii hore adeegsan jireen:', 'mcq', 'Musmariyah', 'Hirooglifiya', 'Baabiliyoon', 'Ashuuri', 'B', 37),
    (v_exam_id, v_sec_mcq_id, 'Qofkii ugu horeeyay ee Rasuulka rumeeya dhanka ragga:', 'mcq', 'Abuubakar', 'Cumar', 'Cusmaan', 'Cali bin Abii Daalib', 'A', 38),
    (v_exam_id, v_sec_mcq_id, 'Habka kaydinta maydka Masaaridu adeegsadeen:', 'mcq', 'Taxniid', 'Dul-yaal', 'Boorayn', 'Akuudin', 'A', 39),
    (v_exam_id, v_sec_mcq_id, 'Cali bin Dhibaal waxaa dilay:', 'mcq', 'Abuu Lu''lu', 'Cabdiraxmaan Binu Muljim', 'Abuu Raafic', 'Qitaam Binu Mutcab', 'B', 40);

END $$;
