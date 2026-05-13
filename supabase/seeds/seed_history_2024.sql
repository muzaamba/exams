-- History National Exam 2024 Seeding Script (Somali)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
    v_sec_match_id UUID := gen_random_uuid();
    v_sec_written_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'History National Exam 2024', 'history', 'form4', 2024, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'Qaybta 1aad: Xulasho (Multiple Choice)', 40, 1),
    (v_sec_match_id, v_exam_id, 'Qaybta 2aad: Isku-xir (Matching)', 20, 2),
    (v_sec_written_id, v_exam_id, 'Qaybta 3aad: Su''aalo Gaagaaban (Written)', 40, 3);

    -- 3. Insert Questions (Section 1: MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'Dowladdii Cusmaaniyiinta waxa ay dhalatay tarikdu markii ay ahayd:', 'mcq', '1299', '1297', '1290', '1899', 'A', 1),
    (v_exam_id, v_sec_mcq_id, 'Raysulwasaarhii hore ee Soomaaliya 1956 waxa uu ahaa:', 'mcq', 'Cabdirashiid Cali Sharmaake', 'Cabdullaahi Ciisse Maxamuud', 'Cabdirisaaq Xaaji Xuseen', 'Maxamad Xaaji Ibraahim Cigaal', 'B', 2),
    (v_exam_id, v_sec_mcq_id, 'Dagaalkii Abaleyle ee dhexmaray Daraawiish iyo Ingiriiska waxa dhacay:', 'mcq', '1920', '1921', '1905', '1901', 'C', 3),
    (v_exam_id, v_sec_mcq_id, 'Asalka Dowladdii Cusmaaniyiintu waxa uu ahaa:', 'mcq', 'Iraaniyiin', 'Giriig', 'Turki', 'Carab', 'C', 4),
    (v_exam_id, v_sec_mcq_id, 'Tirada golihii sare ee dowladdii kacaanka waxa ay ahayd:', 'mcq', '23', '25', '26', '24', 'B', 5),
    (v_exam_id, v_sec_mcq_id, 'Xarunta rasmiga ah ee Ururka Midowga Afrika waa:', 'mcq', 'Nayroobi', 'Adis Ababa', 'Kambaala', 'Khartuum', 'B', 6),
    (v_exam_id, v_sec_mcq_id, 'Salaadiintii Cusmaaniyiinta waxaa ka mid ahaa:', 'mcq', 'Salaxuddiin Al-ayuubi', 'Sulaymaan Al-qaanuuni', 'Cabdiraxmaan Al-daakhil', 'Haaruun Al-rashiid', 'B', 7),
    (v_exam_id, v_sec_mcq_id, 'Dadkii ugu horeeyay ee soo degay dhulka Falastiin waxa ay ahaayeen:', 'mcq', 'Baabiliyiin', 'Faarisiyiin', 'Kaldaaniyiin', 'Kancaaniin', 'D', 8),
    (v_exam_id, v_sec_mcq_id, 'Ballan-qaadkii Belfoor waxa uu dhacay sanadkii:', 'mcq', '1920', '1919', '1917', '1911', 'C', 9),
    (v_exam_id, v_sec_mcq_id, 'Xilligii uu soo gaaray Islaamku Kashmiir waxa ay ahayd:', 'mcq', '60 hijri', '100 hijri', '80 hijri', '90 hijri', 'A', 10),
    (v_exam_id, v_sec_mcq_id, 'Muddadii dowladda rayidka ee Soomaaliya waxa ay ahayd:', 'mcq', '1954-1960', '1980-1991', '1969-1980', '1960-1969', 'D', 11),
    (v_exam_id, v_sec_mcq_id, 'Abaartii Dabadheer waxa ay dhacday:', 'mcq', '1984', '1976', '1967', '1974', 'D', 12),
    (v_exam_id, v_sec_mcq_id, 'Sababihii keena dagaalkii adduunka 1aad waxaa ka mid ahaa ballaarinta awla:', 'mcq', 'Jabbaan', 'Faransiiska', 'Turkiga', 'Jarmalka', 'D', 13),
    (v_exam_id, v_sec_mcq_id, 'Tirada dowladaha xubnaha ka ah golaha ammaanka waa:', 'mcq', '25', '20', '15', '10', 'C', 14),
    (v_exam_id, v_sec_mcq_id, 'Dowladihii aasasay jaamacadda Carabta waxaa ka mid ahaa:', 'mcq', 'Soomaaliya', 'Marooko', 'Masar', 'Falastiin', 'C', 15),
    (v_exam_id, v_sec_mcq_id, 'Tirada dalalka Midowga Afrika waa:', 'mcq', '54', '45', '64', '50', 'A', 16),
    (v_exam_id, v_sec_mcq_id, 'Sababihii keenay in la aasaso OIC waxaa ka mid ahaa:', 'mcq', 'Qabsashada Falastiin', 'Gubistii Masjid Al Aqsaa', 'Dagaalkii 2aad', 'Dhicitaanka Cusmaaniyiinta', 'B', 17),
    (v_exam_id, v_sec_mcq_id, 'Shirkii lagu qeybiyey Afrika 1884 waxaa lagu qabtay:', 'mcq', 'London', 'Baariis', 'Baarliin', 'Rooma', 'C', 18),
    (v_exam_id, v_sec_mcq_id, 'Asaasihii dowladdii Cusmaaniyiinta waxa uu ahaa:', 'mcq', 'Haaruun Rashiid', 'Abu Jacfar Al Mansuur', 'Abuu Cabaas Al-safaax', 'Cusmaan Ardhogral', 'D', 19),
    (v_exam_id, v_sec_mcq_id, 'Dagaalkii Omdurman ee Suudaan 1898 waxa ku dhintay:', 'mcq', '4000', '3000', '2000', '5000', 'A', 20);

    -- 4. Insert Questions (Section 2: Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Aasaaskii Midowga Afrika', 'short_answer', '1963', 21),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Afgembigii Ciidanka Soomaaliya', 'short_answer', '1969', 22),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Doorashadii Madaxweyne Cabdirashiid Sharmaake', 'short_answer', '1967', 23),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Magacaabistii RW C/risaaq Xaaji Xuseen', 'short_answer', '1964', 24),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Burburkii Dowladdii Dhexe', 'short_answer', '1991', 25),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Aasaaskii UN', 'short_answer', '1945', 26),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Abaartii Dabadheer', 'short_answer', '1974', 27),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Aasaaskii SYL', 'short_answer', '1943', 28),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Xornimadii Ruwanda', 'short_answer', '1962', 29),
    (v_exam_id, v_sec_match_id, 'Isku-xir (Sanadkii): Xornimadii Toogo', 'short_answer', '1960', 30);

    -- 5. Insert Questions (Section 3: Written)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_written_id, 'Soo ifbixii dowladdii Cusmaaniyiinta', 'short_answer', 'Waxa ay soo baxday qarnigii 13aad. Waxa ay ka soo farcantay qabiilka Oghuz ee Turkiga. Waxay dhiseen dawlad xoog leh oo ku fiday Aasiya iyo Yurub.', 31),
    (v_exam_id, v_sec_written_id, 'Maxammad Al Faatix maxaa loogu magacaabay Suldaankii aad', 'short_answer', 'Wuxuu qabsaday magaalada Qusdanbiya 1453 taas oo ahayd guul ay dowladda u horseeday ballaarin.', 32),
    (v_exam_id, v_sec_written_id, 'Ujeeddooyinkii gumeystaha uu u yimid Soomaaliya', 'short_answer', 'Si uu u helo marin-badeed, kheyraad dabiici ah, iyo istaraatiijiyad militari oo gudaha Afrika.', 33),
    (v_exam_id, v_sec_written_id, 'Sababaha gudaha ee daciifiyey Cusmaaniyiinta', 'short_answer', 'Musuq. Dagaallo gudaha ah. Dhaqaale xumo. Teknooloji liita marka loo eego Yurub.', 34),
    (v_exam_id, v_sec_written_id, 'Muhiimadda Kashmir u leedahay Baakistaan', 'short_answer', 'Biyaha webiyada ugu waaweyn ayaa halkaas ka yimaada. Waxa ay leedahay goob istaraatiiji ah oo ku yaal xadka.', 35),
    (v_exam_id, v_sec_written_id, 'Madaxweynayaashii dowladdii rayidka', 'short_answer', 'Aden Cadde. Cabdirashiid Cali Sharmaake.', 36),
    (v_exam_id, v_sec_written_id, 'Isbarbardhig dimuqraadiyadda iyo shuurada', 'short_answer', 'Dimuqraadiyad waa cod dadweyne. Shuurada waa wada tashi culimo iyo hoggaan.', 37),
    (v_exam_id, v_sec_written_id, 'Shanta dal ee leh veto', 'short_answer', 'USA. UK. France. Russia. China.', 38),
    (v_exam_id, v_sec_written_id, 'Goorma Soomaaliya ku biirtay Jaamacadda Carabta', 'short_answer', '1974', 39),
    (v_exam_id, v_sec_written_id, 'Dadkii ugu horeeyey ee degay Falastiin', 'short_answer', 'Kancaaniin oo ahaa qoomiyad Carbeed.', 40),
    (v_exam_id, v_sec_written_id, 'Muhiimadda Shuuradu', 'short_answer', 'Waxay dhistaa go''aan wadaag iyo kalsooni bulshada dhexdeeda.', 41),
    (v_exam_id, v_sec_written_id, 'Isbarbardhig JA & AU', 'short_answer', 'JA waa dalal Carbeed. AU waa dalal Afrika ah. Labaduba waxay rabaan midnimo siyaasadeed.', 42),
    (v_exam_id, v_sec_written_id, 'Sababihii dagaalkii 2aad', 'short_answer', 'Ballaarinta Jarmalka, fashilaaddii heshiiskii Versailles, iyo musuqmaasuq siyaasadeed oo Yurub ka jiray.', 43),
    (v_exam_id, v_sec_written_id, 'Aayad shuurada tilmaamaysa', 'short_answer', 'Qur''aan 42:38 oo ka hadasha shuurada bulshada.', 44),
    (v_exam_id, v_sec_written_id, 'Loolankii dowladaha waaweyn ee Soomaaliya', 'short_answer', 'Ingiriis, Talyaani, Faransiis ayaa u loolamay marin istaraatiiji iyo kheyraad.', 45),
    (v_exam_id, v_sec_written_id, 'Faa''idada midnimada dalka', 'short_answer', 'Waxay kordhisaa horumar, amni, iyo adeegyo dadweyne oo wanaagsan.', 46),
    (v_exam_id, v_sec_written_id, 'Qeex: Dastuur, Sharci, Muwaadinnimo, Hijra', 'short_answer', 'Dastuur: Xeerka ugu sareeya. Sharci: Xeer lagu maamulo. Muwaadinnimo: Dhalasho waddan. Hijra: Guuritaanka muslimiinta Madiina.', 47),
    (v_exam_id, v_sec_written_id, 'Xarunta Jaamacadda Carabta', 'short_answer', 'Qaahira', 48),
    (v_exam_id, v_sec_written_id, 'Immisa qaybood gumeystuhu u kala qeybiyey Soomaalida', 'short_answer', '5 qaybood', 49),
    (v_exam_id, v_sec_written_id, 'Sababihii keena afgembigii 1969', 'short_answer', 'Khasaaraha siyaasadeed ee doorashada 1969 iyo khalalaasaha maamulka.', 50);

END $$;
