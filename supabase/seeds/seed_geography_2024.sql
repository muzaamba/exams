-- Geography National Exam 2024 Seeding Script (Somali)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
    v_sec_c_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Geography National Exam 2024', 'geography', 'form4', 2024, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Qaybta 1aad: Xulasho (Multiple Choice)', 20, 1),
    (v_sec_b_id, v_exam_id, 'Qaybta 2aad: Isku-xir (Matching)', 10, 2),
    (v_sec_c_id, v_exam_id, 'Qaybta 3aad: Su''aalo Gaagaaban (Structured)', 70, 3);

    -- 3. Insert Questions (Section A: Multiple Choice)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Soomaaliya waxay dhacdaa:', 'short_answer', 'Bariga qaaradda Afrika', 1),
    (v_exam_id, v_sec_a_id, 'Bedka gibil biyoodku waa:', 'short_answer', '71% dhulka dushiisa', 2),
    (v_exam_id, v_sec_a_id, 'Saamiga wax soo saarka saliida ee qaaradda Afrika waa:', 'short_answer', '10% saliidda guud ee dunida', 3),
    (v_exam_id, v_sec_a_id, 'Qaaradda Afrika waxaa dhanka bari ka xiga:', 'short_answer', 'Badweynta Hindiya', 4),
    (v_exam_id, v_sec_a_id, 'Dalagyada saliidda laga soo saaro waxaa ka mid ah:', 'short_answer', 'Sinsinta', 5),
    (v_exam_id, v_sec_a_id, 'Dalagyada ugu waaweyn Afrika waxaa ka mid ah:', 'short_answer', 'Sarreynka', 6),
    (v_exam_id, v_sec_a_id, 'Asalka erayga Juqraafi waa:', 'short_answer', 'Gariig', 7),
    (v_exam_id, v_sec_a_id, 'Webiga ugu dheer waa:', 'short_answer', 'Niil', 8),
    (v_exam_id, v_sec_a_id, 'Cilmiga daraaseeya carrada iyo biyaha waa juqraafiga:', 'short_answer', 'Deegaanka', 9),
    (v_exam_id, v_sec_a_id, 'Aaladda Rikhtarka waxaa loo adeegsadaa la socodka:', 'short_answer', 'Dhulgariirka', 10);

    -- 4. Insert Questions (Section B: Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Isku xir: Dubay', 'short_answer', 'Ganacsi', 11),
    (v_exam_id, v_sec_b_id, 'Isku xir: Hargeysa', 'short_answer', 'Maamul', 12),
    (v_exam_id, v_sec_b_id, 'Isku xir: Tookiyo', 'short_answer', 'Warshadeed', 13),
    (v_exam_id, v_sec_b_id, 'Isku xir: Madiina', 'short_answer', 'Diimeed', 14),
    (v_exam_id, v_sec_b_id, 'Isku xir: Oxfoor', 'short_answer', 'Waxbarasho', 15);

    -- 5. Insert Questions (Section C: Structured)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_c_id, 'Sheeg sababaha keena in ay dadku u hayaamaan magaalooyinka', 'short_answer', 'Shaqo helid. Adeegyo caafimaad iyo waxbarasho.', 16),
    (v_exam_id, v_sec_c_id, 'Sheeg waxa uu meeraha dhalku kaga duwanyahay meerayaasha kale', 'short_answer', 'Biyo dusha sare ku jira. Ogsijiinta hawada.', 17),
    (v_exam_id, v_sec_c_id, 'Kalasaar farqiga u dhaxeeya biyo gobaleed iyo biyaha caalamiga ah', 'short_answer', 'Biyo gobaleed waa kuwa ku jira gudaha waddan. Biyaha caalamiga ah waa kuwa aan waddan gaar u lahayn.', 18),
    (v_exam_id, v_sec_c_id, 'Falanqee xiriirka ka dhaxeeya gumaysiga iyo dhibaatooyinka sohdinta siyaasadeed', 'short_answer', 'Gumaysigu wuxuu sameeyay soohdimo aan ku salaysnayn qabiilo, taas oo keentay khilaafyo siyaasadeed iyo dagaallo.', 19),
    (v_exam_id, v_sec_c_id, 'Faahfaahi waxyaabaha saameynta ku leh filiqsanaanta dadka', 'short_answer', 'Shaqo la’aan. Colaado. Fursado dhaqaale.', 20),
    (v_exam_id, v_sec_c_id, 'Sharax dhibaatooyinka ay daadadku u geystaan deegaanka', 'short_answer', 'Burbur dhul iyo guryo. Difaac beero iyo kaydiyo.', 21),
    (v_exam_id, v_sec_c_id, 'Qeex waxa loola jeedo gobol dabiici ah', 'short_answer', 'Gobol leh muuqaal, cimilo, dhir iyo xoolo isku mid ah.', 22),
    (v_exam_id, v_sec_c_id, 'Caddee muhiimadda ay leedahay soohdinta badda', 'short_answer', 'Kalluumaysi. Ganacsiga dekedaha.', 23),
    (v_exam_id, v_sec_c_id, 'Sheeg laba kamid ah caqabadaha tilmaamidda tirada dadka Soomaaliyeed', 'short_answer', 'Socdaal badan oo dadka. Amni darro.', 24),
    (v_exam_id, v_sec_c_id, 'Sheeg laba kamid ah ilaha dhaqaale ee Soomaaliya', 'short_answer', 'Xoolaha. Kalluumaysiga.', 25),
    (v_exam_id, v_sec_c_id, 'Ka dood caqabadaha haysta dhirta iyo xayawaannada dhulka Soomaaliya', 'short_answer', 'Jarista dhirta, abaaraha, ugaarsiga sharci darrada.', 26),
    (v_exam_id, v_sec_c_id, 'Falanqee kaabayaasha aadanaha oo ay dowladdu ku taagantahay', 'short_answer', 'Waxbarashada. Caafimaadka. Isgaarsiinta.', 27),
    (v_exam_id, v_sec_c_id, 'Sheeg qaybaha uu ka kooban yahay gibilka noolaleyda', 'short_answer', 'Dhir. Xoolo.', 28),
    (v_exam_id, v_sec_c_id, 'Caddee caqabadaha waaxda kalluumaysiga Soomaaliya', 'short_answer', 'Kalluumaysi shisheeye oo sharci darro ah. Qalab yari.', 29),
    (v_exam_id, v_sec_c_id, 'Sheeg magacyada labada dal ee ku muransan gobolka Kashmiir', 'short_answer', 'Pakistan. Hindiya.', 30),
    (v_exam_id, v_sec_c_id, 'Maxaa sababa abaaraha dalka ku soo laabta?', 'short_answer', 'Isbedelka cimilada. Dhir jaris.', 31),
    (v_exam_id, v_sec_c_id, 'Sababee ahmiyadda istaraatiijiga ah ee Afrika', 'short_answer', 'Kheyraad dabiici ah. Meel muhiim ah oo juquraafi ah.', 32),
    (v_exam_id, v_sec_c_id, 'Haddii dunidu noqoto meeraha 1aad ama 5aad maxaa dhici lahaa?', 'short_answer', 'Heerkulka aad buu u kordhi lahaa ama u dhici lahaa taas oo ka dhigi lahayd nolol adag.', 33),
    (v_exam_id, v_sec_c_id, 'Haddii udub dhexaadka dhulku ahaan lahaa mid qotoma maxaa dhici lahaa?', 'short_answer', 'Dhacdada xilliyeedka waa baaba’i lahayd.', 34),
    (v_exam_id, v_sec_c_id, 'Xallinta waqtiga Muqdisho iyo Qaahira', 'short_answer', 'Farqiga waa 15 darajo oo u dhiganta 1 saac. Marka 8 subaxnimo Muqdisho waa 7 subaxnimo Qaahira.', 35),
    (v_exam_id, v_sec_c_id, 'Caddee cawaamisha saameeya cimiladda Soomaaliya', 'short_answer', 'Badweynta Hindiya. Monsoon.', 36),
    (v_exam_id, v_sec_c_id, 'Caddee saameynta fatahaadaha', 'short_answer', 'Luminta hanti. Barakac.', 37),
    (v_exam_id, v_sec_c_id, 'Sidee loo xakameyn karaa fatahaadaha?', 'short_answer', 'Dhisidda barkado. Nadaafadda webiyada. Dhisidda xayndaabyo.', 38),
    (v_exam_id, v_sec_c_id, 'Sharax talaabooyinkii Soomaaliya u qaaday dib u soo celinta dhulalkii lumay', 'short_answer', 'Diblomaasiyad. Dadaal militari.', 39),
    (v_exam_id, v_sec_c_id, 'Falanqee caqabadaha heysta dowladaha aan laheyn bad', 'short_answer', 'Ganacsi adag. Kharash sare oo gaadiid.', 40),
    (v_exam_id, v_sec_c_id, 'Soomaaliya waxay qaadatay nidaamka federaalka 2004. A) Wuu ku habboon yahay sabab', 'short_answer', 'Waxay siisaa maamul goboleedyada awood.', 41),
    (v_exam_id, v_sec_c_id, 'Soomaaliya waxay qaadatay nidaamka federaalka 2004. B) Kuma habboona sabab', 'short_answer', 'Khilaaf iyo kala qaybsanaan ayaa kordha.', 42),
    (v_exam_id, v_sec_c_id, 'Sharax hannaanka maamul ee madaxtooyada', 'short_answer', 'Waxay leedahay madaxweyne, gole fulineed iyo gole sharci dejin.', 43),
    (v_exam_id, v_sec_c_id, 'Cadee muuqaallada oogada dhulka sare ee Soomaaliya', 'short_answer', 'Buuro. Bannaan. Dooxooyin.', 44),
    (v_exam_id, v_sec_c_id, 'Ku muuji khariidadda Soomaaliya gobolka Awdal, Bari, Mudug, Sh/Dhexe, Gedo', 'short_answer', 'Awdal waqooyi galbeed, Bari waqooyi bari, Mudug bartamaha, Shabeellaha Dhexe bartamaha koonfur, Gedo koonfur galbeed.', 45);

END $$;
