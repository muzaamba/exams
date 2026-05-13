-- Islamic Studies National Exam 2021 Seeding Script (Arabic)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
    v_sec_part2_id UUID := gen_random_uuid();
    v_sec_diya_id UUID := gen_random_uuid();
    v_sec_terms_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Islamic Studies National Exam 2021', 'islamic_studies', 'form4', 2021, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'اختر الإجابة الصحيحة (Multiple Choice)', 40, 1),
    (v_sec_part2_id, v_exam_id, 'القسم الثاني (Short Answers)', 30, 2),
    (v_sec_diya_id, v_exam_id, 'مقادير الديات (Blood Money)', 15, 3),
    (v_sec_terms_id, v_exam_id, 'المصطلحات (Terminology)', 15, 4);

    -- 3. Insert Questions (Section 1: MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'الدار التي أعدها الله للكافرين', 'mcq', 'الجنة', 'النار', 'الخلد', 'البرزخ', 'ب', 1),
    (v_exam_id, v_sec_mcq_id, 'معنى كلمة بالقسط', 'mcq', 'الصدق', 'الرحمة', 'العدل', 'الأمن', 'ج', 2),
    (v_exam_id, v_sec_mcq_id, 'إظهار الإسلام وإبطان الكفر هو', 'mcq', 'الردة', 'الشرك', 'النفاق', 'الفسق', 'ج', 3),
    (v_exam_id, v_sec_mcq_id, 'اللعان يترتب عليه', 'mcq', 'ثبوت النسب', 'انقطاع النكاح بينهما', 'تتابع الشهادات', 'وجوب نصح الحاكم', 'ب', 4),
    (v_exam_id, v_sec_mcq_id, 'راوي حديث إذا غرس المسلم غرساً', 'mcq', 'أنس بن مالك', 'جابر بن عبدالله', 'أبي بن كعب', 'أبو هريرة', 'ب', 5),
    (v_exam_id, v_sec_mcq_id, 'الملقب بخامس الخلفاء الراشدين', 'mcq', 'عثمان بن عفان', 'معاوية بن أبي سفيان', 'عمر بن الخطاب', 'عمر بن عبدالعزيز', 'د', 6),
    (v_exam_id, v_sec_mcq_id, 'من خصائص الرسالة الإسلامية', 'mcq', 'محلية الرسالة الإسلامية', 'عالمية الرسالة الإسلامية', 'إقليمية الرسالة الإسلامية', 'اقتصار الرسالة في بقعة معينة', 'ب', 7),
    (v_exam_id, v_sec_mcq_id, 'من صفات عباد الرحمن', 'mcq', 'الغلظة في المعاملة', 'التواضع', 'السعي إلى المنصب', 'التكبر', 'ب', 8),
    (v_exam_id, v_sec_mcq_id, 'إطالة الصوت بحرف من الحروف الهجائية', 'mcq', 'الإظهار', 'الإخفاء', 'الإدغام', 'المد', 'د', 9),
    (v_exam_id, v_sec_mcq_id, 'بعث النبي ﷺ بالإسلام إلى', 'mcq', 'أهل الكتاب فقط', 'المشركين فقط', 'الإفريقيين فقط', 'الناس جميعاً', 'د', 10),
    (v_exam_id, v_sec_mcq_id, 'من أضرار المخدرات', 'mcq', 'ضرر نهب الأموال', 'ضرر المخدرات', 'ضرر المجتمع', 'فساد الأخلاق', 'ب', 11),
    (v_exam_id, v_sec_mcq_id, 'الطلاق الواقع في الحيض يسمى', 'mcq', 'طلاق بدعي', 'طلاق سني', 'طلاق صريح', 'طلاق كناية', 'أ', 12),
    (v_exam_id, v_sec_mcq_id, 'كان النبي ﷺ مشهوراً بـ', 'mcq', 'عبادته', 'شجاعته', 'جواده', 'رحمته', 'د', 13),
    (v_exam_id, v_sec_mcq_id, 'حكم الأضحية', 'mcq', 'محرم', 'مندوب', 'مكروه', 'مباح', 'ب', 14),
    (v_exam_id, v_sec_mcq_id, 'الأصل في المعاملات البيع', 'mcq', 'حرام', 'مكروه', 'مندوب', 'مباح', 'د', 15),
    (v_exam_id, v_sec_mcq_id, 'المقصود بقوله تعالى فالق الإصباح', 'mcq', 'الله هو الذي شق ضياء الصباح من ظلام الليل', 'طلوع الشمس فقط', 'الشمس أصل المواقيت', 'طلوع البدر فقط', 'أ', 16),
    (v_exam_id, v_sec_mcq_id, 'من الوصايا الضرورية', 'mcq', 'تحريم الشرك بالله تعالى', 'تحريم قتل الأولاد خشية الفقر', 'الأمر بالعبادات', 'جميع ما ذكر', 'د', 17),
    (v_exam_id, v_sec_mcq_id, 'تدوين النظام الاقتصادي الرأسمالي مظهر من', 'mcq', 'مظاهر الحضارة الإسلامية', 'مظاهر العولمة', 'مظاهر سياسة عدم الانحياز', 'مظاهر الاقتصاد الإسلامي', 'ب', 18),
    (v_exam_id, v_sec_mcq_id, 'أكرم المخلوقات', 'mcq', 'الإنسان', 'الجن', 'الحيوان', 'الملائكة', 'أ', 19);

    -- 4. Insert Questions (Section 2: Part 2)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_part2_id, 'أكمل الآية: وإن تدع مثقلة إلى حملها...', 'short_answer', 'وإن تدع مثقلة إلى حملها لا يحمل منه شيء', 20),
    (v_exam_id, v_sec_part2_id, 'استدل من السنة على مشروعية القصاص', 'short_answer', 'قال رسول الله ﷺ: النفس بالنفس', 21),
    (v_exam_id, v_sec_part2_id, 'اذكر القواعد الفقهية الخمس الكبرى', 'short_answer', 'الأمور بمقاصدها، اليقين لا يزول بالشك، المشقة تجلب التيسير، الضرر يزال، العادة محكمة', 22),
    (v_exam_id, v_sec_part2_id, 'ما اسم الحكم من حيث الورود؟', 'short_answer', 'الحكم الشرعي', 23),
    (v_exam_id, v_sec_part2_id, 'ما مراتب تغيير المنكر؟', 'short_answer', 'باليد ثم باللسان ثم بالقلب', 24),
    (v_exam_id, v_sec_part2_id, 'ما عورة المرأة بالنسبة إلى الرجل؟', 'short_answer', 'جميع بدنها ما عدا الوجه والكفين', 25),
    (v_exam_id, v_sec_part2_id, 'أحمد يملك خمسين من الإبل، كم عليه من الزكاة؟', 'short_answer', 'حقة', 26);

    -- 5. Insert Questions (Section 3: Diya)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_diya_id, 'مقدار دية العين الواحدة', 'short_answer', 'خمسون من الإبل', 27),
    (v_exam_id, v_sec_diya_id, 'مقدار دية اللسان', 'short_answer', 'مائة من الإبل', 28),
    (v_exam_id, v_sec_diya_id, 'مقدار دية المسلم الحر من الذكر', 'short_answer', 'مائة من الإبل', 29),
    (v_exam_id, v_sec_diya_id, 'مقدار دية الجفن', 'short_answer', 'خمسة وعشرون من الإبل', 30),
    (v_exam_id, v_sec_diya_id, 'مقدار دية الإصبع الواحدة', 'short_answer', 'عشر من الإبل', 31);

    -- 6. Insert Questions (Section 4: Terminology)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_terms_id, 'ما نزل من القرآن بشأن واقعة أو سؤال', 'short_answer', 'سبب النزول', 32),
    (v_exam_id, v_sec_terms_id, 'المصطلح المرادف للإمامة هو:', 'short_answer', 'الخلافة', 33),
    (v_exam_id, v_sec_terms_id, 'العلم الذي يبحث في الأدلة الشرعية', 'short_answer', 'الفقه', 34),
    (v_exam_id, v_sec_terms_id, 'علم يعرف به حال الراوي والمروي من حيث القبول والرد', 'short_answer', 'مصطلح الحديث', 35),
    (v_exam_id, v_sec_terms_id, 'خطاب الله المتعلق بأفعال المكلفين', 'short_answer', 'الحكم الشرعي', 36);

END $$;
