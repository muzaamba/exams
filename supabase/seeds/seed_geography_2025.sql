-- Geography National Exam 2025 Seeding Script (Somali)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Geography National Exam 2025', 'geography', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Qaybta 1aad: Xulasho (Multiple Choice)', 100, 1);

    -- 3. Insert Questions (Section A: Multiple Choice)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Noocyada carrada ee dhulka Soomaaliya waa kala jaad, maxaa keena kala duwanaanta?', 'short_answer', 'Nooca cimilada iyo dhadhaabta', 1),
    (v_exam_id, v_sec_a_id, 'Qaybta ugu weyn uguna muhiimsan dhirta waxaa lagu magacaabaa:', 'short_answer', 'Keymaha', 2),
    (v_exam_id, v_sec_a_id, 'Tilmaan lambarka muujinaya gobolka Jubbada Hoose:', 'short_answer', 'Lambarka 12aad', 3),
    (v_exam_id, v_sec_a_id, 'Maxay noqon kartaa heerka kororka dadka marka uu dhasho?', 'short_answer', 'Kordha', 4),
    (v_exam_id, v_sec_a_id, 'Jiidaha dulaha dhulka Soomaaliya waxaa loo qeybiyaa ilaa:', 'short_answer', '3 qeybood', 5),
    (v_exam_id, v_sec_a_id, 'Waa maxay taran furan?', 'short_answer', 'Taran furan', 6),
    (v_exam_id, v_sec_a_id, 'Xaalad ka dhalata hoos u dhac ku yimid roobka muddo dheer waa:', 'short_answer', 'Abaar', 7),
    (v_exam_id, v_sec_a_id, 'Maxaa kamid ah waxyaabaha saameeya cufnaanta dadka?', 'short_answer', 'Cimilada', 8),
    (v_exam_id, v_sec_a_id, 'Meel cufnaanta dadkeedu ka sarreyso 100 qof halkii km² waa meel cufnaan:', 'short_answer', 'Sarreyso', 9),
    (v_exam_id, v_sec_a_id, 'Sanadkii 1970, tirada warshadaha Soomaaliya waxay ahaayeen:', 'short_answer', '122 warshadood', 10),
    (v_exam_id, v_sec_a_id, 'Marka laysku qeybiya tirada dadka iyo baaxadda dalka waxaa loo yaqaan:', 'short_answer', 'Cufnaanta dadka', 11),
    (v_exam_id, v_sec_a_id, 'Tilmaan jaantuska hoose, sheeg ilaha tamarta loo adeegsado:', 'short_answer', 'Tamarta qorraxda', 12),
    (v_exam_id, v_sec_a_id, 'Goobaha ugu warshadaha badan adduunka waxaa ka mid ah:', 'short_answer', 'Galbeedka Yurub', 13),
    (v_exam_id, v_sec_a_id, 'Laanta jiyooloji ee uu adeegsado injineer dhisaya buundo waa:', 'short_answer', 'Jiyoolojiga handasada', 14),
    (v_exam_id, v_sec_a_id, 'Dadka dunida ku nool dhulka dushiisa waxay ugu filiqsan yihiin qaab:', 'short_answer', 'Aan isla ekeyn', 15),
    (v_exam_id, v_sec_a_id, 'Diwaangelinta tirada dhalashada, dhimashada iyo guurka waa:', 'short_answer', 'Tirikoob muhiim ah', 16),
    (v_exam_id, v_sec_a_id, 'Ilaha tamarta dib loo cusboonaysiin karo waxaa kamid ah:', 'short_answer', 'Tamarta cadceedda', 17),
    (v_exam_id, v_sec_a_id, 'Xuduud lagu qeexo iyadoo la adeegsanayo buuro waa:', 'short_answer', 'Buuro', 18),
    (v_exam_id, v_sec_a_id, 'Midkee aan ka mid ahayn shaqooyinka sohdinta siyaasadeed?', 'short_answer', 'Ilaalinta dhaqaalaha', 19),
    (v_exam_id, v_sec_a_id, 'Nooca carrada xeebaha ah waa:', 'short_answer', 'Carro bannaan xeebeed', 20),
    (v_exam_id, v_sec_a_id, 'Heer kulka kulul wuxuu ku beegan yahay dhul ka sareeya:', 'short_answer', '23 digrii', 21),
    (v_exam_id, v_sec_a_id, 'Wadarta warshadaha Muqdisho iyo Hargeysa (31 warshadood) waa:', 'short_answer', '153 warshadood', 22),
    (v_exam_id, v_sec_a_id, 'Magaalo dadku ku mashquulsan yihiin waxbarasho waxaa loo yaqaan:', 'short_answer', 'Magaalo aqooneed', 23),
    (v_exam_id, v_sec_a_id, 'Xogta la isticmaalo cilmi baarista waa:', 'short_answer', 'Xog tilmaaman', 24),
    (v_exam_id, v_sec_a_id, 'Heerarka diyaarin juqraafi waa:', 'short_answer', 'Shan heer', 25),
    (v_exam_id, v_sec_a_id, 'Waa maxay haro ama marin cariiri ah?', 'short_answer', 'Waxey leedahay marin cariiri ah', 26),
    (v_exam_id, v_sec_a_id, 'Heer kulka marka uu kordho ama hoos u dhaco waa:', 'short_answer', 'Sarreyn', 27),
    (v_exam_id, v_sec_a_id, 'Marka noole weeraro noole kale si uu u noolaado waxaa loo yaqaan:', 'short_answer', 'Ugaadhsi', 28),
    (v_exam_id, v_sec_a_id, 'Lambarka Masar ee khariidada waa:', 'short_answer', 'Lambarka 51aad', 29),
    (v_exam_id, v_sec_a_id, 'Maxaa dhaca haddii dadkii aqoonta lahaa ka baxaan dalka?', 'short_answer', 'Maan go''id', 30),
    (v_exam_id, v_sec_a_id, 'Astaamaha degmooyinka miyiga ka duwan kuwa magaalooyinka waa:', 'short_answer', 'Xajmigooda oo yar', 31),
    (v_exam_id, v_sec_a_id, 'Meeraha ugu dhaw qorraxda waa:', 'short_answer', 'Meerkuri', 32),
    (v_exam_id, v_sec_a_id, 'Haddii Muqdisho 45E ay tahay 10:00AM waqtiga Qaahira 30E waa:', 'short_answer', '09:00AM', 33),
    (v_exam_id, v_sec_a_id, 'Calaamad ka mid ah calaamadaha khariidada?', 'short_answer', 'Dug baxa khariidada', 34),
    (v_exam_id, v_sec_a_id, 'Wadanka ugu wax soo saarka badan gaaska dabiiciga ah waa:', 'short_answer', 'Qadar', 35),
    (v_exam_id, v_sec_a_id, 'Nooca folkaano ee sawirka ah waa:', 'short_answer', 'Folkaano huruda', 36),
    (v_exam_id, v_sec_a_id, 'Khariidada muujisa beeraha, warshadaha iyo ganacsiga waa:', 'short_answer', 'Khariidada dhaqaalaha', 37),
    (v_exam_id, v_sec_a_id, 'Dad 8,000,000, dhul 67,657 km², cufnaanta waa:', 'short_answer', '118 qof/km²', 38);

END $$;
