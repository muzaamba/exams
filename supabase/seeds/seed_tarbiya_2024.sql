-- Islamic Studies National Exam 2024 Seeding Script (Arabic)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
    v_sec_terms_id UUID := gen_random_uuid();
    v_sec_defs_id UUID := gen_random_uuid();
    v_sec_quran_id UUID := gen_random_uuid();
    v_sec_essay_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Islamic Studies National Exam 2024', 'islamic_studies', 'form4', 2024, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'القسم الأول (Multiple Choice)', 35, 1),
    (v_sec_terms_id, v_exam_id, 'المصطلحات والتعاريف (Terminology)', 20, 2),
    (v_sec_defs_id, v_exam_id, 'التعاريف (Definitions)', 15, 3),
    (v_sec_quran_id, v_exam_id, 'الآيات والقرآن (Quran & Hadith)', 15, 4),
    (v_sec_essay_id, v_exam_id, 'الأسئلة المقالية (Essay Questions)', 15, 5);

    -- 3. Insert Questions (Section 1: MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'القرآن هو:', 'mcq', 'القرآن', 'الأحاديث', 'التفسير', 'الفقه', 'أ', 1),
    (v_exam_id, v_sec_mcq_id, 'الحكم الشرعي الذي ليس بواجب:', 'mcq', 'الوجوب', 'المندوب', 'المكروه', 'المحرم', 'ب', 2),
    (v_exam_id, v_sec_mcq_id, 'من قبائل اليهود الذين حاربهم النبي ﷺ:', 'mcq', 'بنو النضير', 'بنو قينقاع', 'النضير وأهل الشام', 'قريظة وبنو قينقاع', 'د', 3),
    (v_exam_id, v_sec_mcq_id, 'الدين الذي يعبد أتباعه النار هو:', 'mcq', 'المجوسية', 'النصرانية', 'اليهودية', 'الهندوسية', 'أ', 4),
    (v_exam_id, v_sec_mcq_id, 'العقيدة التي تقوم على فكرة التثليث:', 'mcq', 'المسيحية', 'اليهودية', 'المجوسية', 'الهندوسية', 'أ', 5),
    (v_exam_id, v_sec_mcq_id, 'المد الأصلي يسمى أيضاً:', 'mcq', 'المنفصل', 'العارض للسكون', 'الأصلي الطبيعي', 'المد المتصل', 'ج', 6),
    (v_exam_id, v_sec_mcq_id, 'حكم صيام يوم عاشوراء:', 'mcq', 'مباح', 'سنة', 'واجب', 'مكروه', 'ب', 7),
    (v_exam_id, v_sec_mcq_id, 'من الكبائر التي ورد ذكرها في الحديث:', 'mcq', 'الزنا', 'شرب الخمر', 'غصب الأموال', 'قتل المسلم بغير حق', 'د', 8),
    (v_exam_id, v_sec_mcq_id, 'صاحب تفسير (الجامع لأحكام القرآن) هو:', 'mcq', 'الإمام النووي', 'الإمام الشافعي', 'الإمام القرطبي', 'ابن حجر', 'ج', 9),
    (v_exam_id, v_sec_mcq_id, 'من أهم صفات المؤمنين التي ذكرت في القرآن:', 'mcq', 'الصبر', 'الكرم', 'الشجاعة', 'العدل', 'أ', 10),
    (v_exam_id, v_sec_mcq_id, 'أهم ركن من أركان الحج:', 'mcq', 'الوقوف بعرفة', 'الإحرام', 'السعي', 'الطواف', 'أ', 11),
    (v_exam_id, v_sec_mcq_id, 'عدد مرات الاستئذان المشروعة:', 'mcq', 'مرتين', 'ثلاث مرات', 'أربع مرات', 'مرة واحدة', 'ب', 12),
    (v_exam_id, v_sec_mcq_id, 'من أهم أسباب الفتنة التي وردت في سورة القصص:', 'mcq', 'المال والغنى', 'القوة الجسدية', 'الوحي الإلهي', 'المظهر والجمال', 'أ', 13),
    (v_exam_id, v_sec_mcq_id, 'العقد الذي يتم فيه دفع المال مقابل المنفعة يسمى:', 'mcq', 'الوصية', 'الإجارة', 'التجارة', 'الهبة', 'ب', 14),
    (v_exam_id, v_sec_mcq_id, 'الصحابية التي جادلت النبي ﷺ في زوجها (صاحبة قصة الظهار):', 'mcq', 'خديجة بنت خويلد', 'خولة بنت ثعلبة', 'صفية بنت عبد المطلب', 'أسماء بنت عميس', 'ب', 15),
    (v_exam_id, v_sec_mcq_id, 'عدة المرأة الحامل تنتهي بـ:', 'mcq', 'وضع الحمل', 'ثلاث حيضات', 'أربعة أشهر وعشر', 'ثلاثة أشهر', 'أ', 16),
    (v_exam_id, v_sec_mcq_id, 'درجة الحديث: (اتقوا النار ولو بشق تمرة):', 'mcq', 'حسن', 'ضعيف', 'صحيح', 'موضوع', 'ج', 17);

    -- 4. Insert Questions (Section 2: Terminology)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_terms_id, 'إطالة الصوت بحرف من حروف المد الثلاثة يسمى:', 'short_answer', 'المد', 18),
    (v_exam_id, v_sec_terms_id, 'الانقياد لله ظاهرا وباطنا يسمى:', 'short_answer', 'الإيمان', 19),
    (v_exam_id, v_sec_terms_id, 'كل اعتداء على الناس بغير حق يسمى:', 'short_answer', 'البغي', 20),
    (v_exam_id, v_sec_terms_id, 'كل ذنب يحتاج إلى التوبة (سياق الفواحش):', 'short_answer', 'الفواحش', 21),
    (v_exam_id, v_sec_terms_id, 'كل ما أمر به الشرع واستحسنه العقل يسمى:', 'short_answer', 'المعروف', 22),
    (v_exam_id, v_sec_terms_id, 'كل ما غطى العقل أو أزاله يسمى:', 'short_answer', 'المسكرات', 23),
    (v_exam_id, v_sec_terms_id, 'أن لا يوجد في السلعة غش أو كذب:', 'short_answer', 'من آداب البيع', 24),
    (v_exam_id, v_sec_terms_id, 'الذنوب التي تفسد الأخلاق تسمى:', 'short_answer', 'الفواحش', 25),
    (v_exam_id, v_sec_terms_id, 'ما نزل القرآن في شأنه وقت وقوعه يسمى:', 'short_answer', 'سبب النزول', 26),
    (v_exam_id, v_sec_terms_id, 'وكل الله (المصطلح المرادف):', 'short_answer', 'التوكل', 27);

    -- 5. Insert Questions (Section 3: Definitions)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_defs_id, 'من يظهر الإسلام ويبطن الكفر يسمى:', 'short_answer', 'المنافق', 28),
    (v_exam_id, v_sec_defs_id, 'التعدي على النفس الذي يوجب القصاص يسمى:', 'short_answer', 'القتل العمد', 29),
    (v_exam_id, v_sec_defs_id, 'كل ما يفسد الصوم ويضيع أجره يسمى:', 'short_answer', 'المفطرات', 30),
    (v_exam_id, v_sec_defs_id, 'من علامات الساعة الكبرى التي وردت في السنة:', 'short_answer', 'الدخان', 31),
    (v_exam_id, v_sec_defs_id, 'المال الواجب إخراجه للفقراء والمساكين يسمى:', 'short_answer', 'الزكاة', 32);

    -- 6. Insert Questions (Section 4: Quran & Hadith)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_quran_id, 'أكمل قوله تعالى: (وإذا كالوهم...)', 'short_answer', 'أو وزنوهم يخسرون', 33),
    (v_exam_id, v_sec_quran_id, 'أكمل قوله تعالى: (قالوا ربنا اصرف عنا عذاب جهنم...)', 'short_answer', 'إن عذابها كان غراما', 34),
    (v_exam_id, v_sec_quran_id, 'أكمل قوله تعالى: (إن قارون كان من قوم موسى...)', 'short_answer', 'فبغى عليهم', 35),
    (v_exam_id, v_sec_quran_id, 'أكمل الحديث: (ليس منا...)', 'short_answer', 'من دعا إلى عصبية', 36),
    (v_exam_id, v_sec_quran_id, 'الآيات التي تتحدث عن المنافقين هي غالباً:', 'short_answer', 'الآيات المدنية', 37),
    (v_exam_id, v_sec_quran_id, 'الآيات التي تذكر قصص الأنبياء هي غالباً:', 'short_answer', 'الآيات المكية', 38),
    (v_exam_id, v_sec_quran_id, 'الآيات التي توضح أحكام المعاملات والحدود:', 'short_answer', 'الآيات المدنية', 39),
    (v_exam_id, v_sec_quran_id, 'عدد مواضع السجدات في القرآن الكريم:', 'short_answer', 'خمسة عشر موضعا', 40);

    -- 7. Insert Questions (Section 5: Essay)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_essay_id, 'هات دليلا من القرآن على مشروعية القصاص:', 'essay', 'ولكم في القصاص حياة يا أولي الألباب لعلكم تتقون', 41),
    (v_exam_id, v_sec_essay_id, 'ما أهمية الحديث عن طلب العلم في الإسلام؟', 'essay', 'العلم يرفع مكانة الإنسان ويهديه إلى الطريق الصحيح ويبني الحضارات.', 42),
    (v_exam_id, v_sec_essay_id, 'ما هي دية الإنسان المسلم الحر؟', 'essay', 'مائة من الإبل', 43);

END $$;
