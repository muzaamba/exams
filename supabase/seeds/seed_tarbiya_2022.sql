-- Islamic Studies National Exam 2022 Seeding Script (Arabic)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
    v_sec_short_id UUID := gen_random_uuid();
    v_sec_comp_id UUID := gen_random_uuid();
    v_sec_essay_id UUID := gen_random_uuid();
    v_sec_tajwid_id UUID := gen_random_uuid();
    v_sec_defs_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Islamic Studies National Exam 2022', 'islamic_studies', 'form4', 2022, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'القسم الأول (Multiple Choice)', 35, 1),
    (v_sec_short_id, v_exam_id, 'القسم الثاني (Short Statements)', 20, 2),
    (v_sec_comp_id, v_exam_id, 'القسم الثالث (Completion)', 10, 3),
    (v_sec_essay_id, v_exam_id, 'القسم الرابع (Analysis)', 15, 4),
    (v_sec_tajwid_id, v_exam_id, 'المدود (Tajwid)', 5, 5),
    (v_sec_defs_id, v_exam_id, 'القسم الخامس (Definitions)', 15, 6);

    -- 3. Insert Questions (Section 1: MCQ)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'الإصلاح بين المتخاصمين يحقق', 'mcq', 'التفرق', 'العداوة', 'الألفة والمحبة', 'التناحر', 'ج', 1),
    (v_exam_id, v_sec_mcq_id, 'تميزت مرحلة تدوين التفسير', 'mcq', 'الاعتماد على الرواية', 'انتشار كتب التفسير', 'الاعتماد على الأسانيد في التفسير', 'انفصاله عن الحديث الشريف', 'ب', 2),
    (v_exam_id, v_sec_mcq_id, 'لابن جرير الطبري كتاب اسمه', 'mcq', 'جامع البيان', 'صحيح البخاري', 'الموطأ', 'سنن الترمذي', 'أ', 3),
    (v_exam_id, v_sec_mcq_id, 'أقسام الحكم التكليفي هو', 'mcq', 'سبعة', 'خمسة', 'ثمانية', 'د ستة', 'ب', 4),
    (v_exam_id, v_sec_mcq_id, 'حكم الدعوة إلى الله', 'mcq', 'سنة', 'فرض عين', 'فرض كفاية', 'مباح', 'ج', 5),
    (v_exam_id, v_sec_mcq_id, 'مراعاة أحوال المدعوين وأعرافهم للداعية', 'mcq', 'واجب', 'فرض كفاية', 'سنة', 'مباح', 'أ', 6),
    (v_exam_id, v_sec_mcq_id, 'العصبة القبلية عادة', 'mcq', 'إسلامية', 'جاهلية', 'قومية', 'عربية', 'ب', 7),
    (v_exam_id, v_sec_mcq_id, 'عاصمة الدولة الإسلامية في عهد النبي صلى الله عليه وسلم', 'mcq', 'مكة المكرمة', 'دمشق', 'بغداد', 'المدينة المنورة', 'د', 8),
    (v_exam_id, v_sec_mcq_id, 'حكم إعادة الخلافة الإسلامية', 'mcq', 'واجب', 'سنة', 'فرض كفاية', 'مباح', 'ج', 9),
    (v_exam_id, v_sec_mcq_id, 'بولس هو رجل', 'mcq', 'يهودي', 'مجوسي', 'هندوسي', 'نصراني', 'أ', 10),
    (v_exam_id, v_sec_mcq_id, 'أسباب المد الفرعي', 'mcq', 'ثلاثة', 'ستة', 'خمسة', 'سبعة', 'أ', 11),
    (v_exam_id, v_sec_mcq_id, 'حروف المد', 'mcq', 'خمسة', 'ستة', 'ثلاثة', 'أربعة', 'ج', 12),
    (v_exam_id, v_sec_mcq_id, 'الدعوة إلى الله تفيد', 'mcq', 'المجتمع', 'الفرد', 'الفرد والمجتمع', 'البلاد', 'ج', 13),
    (v_exam_id, v_sec_mcq_id, 'الخليفة هو من يكون', 'mcq', 'حاكماً عليه', 'مسيطراً عليه', 'قضي عليه', 'طلب منه', 'أ', 14),
    (v_exam_id, v_sec_mcq_id, 'توفي الخليفة الزاهد عمر بن عبد العزيز سنة', 'mcq', '103هـ', '101هـ', '105هـ', '106هـ', 'ب', 15),
    (v_exam_id, v_sec_mcq_id, 'إظهار الإيمان وإبطان الكفر تعريف', 'mcq', 'الإلحاد', 'الكفر', 'النفاق', 'الفسوق', 'ج', 16),
    (v_exam_id, v_sec_mcq_id, 'توفي الإمام الشافعي رحمه الله سنة', 'mcq', '205هـ', '204هـ', '210هـ', '215هـ', 'ب', 17),
    (v_exam_id, v_sec_mcq_id, 'استمرت الدولة الإسلامية في عهد النبي', 'mcq', 'عشر سنوات', 'ست سنوات', 'خمس سنوات', 'د سبع سنوات', 'أ', 18);

    -- 4. Insert Questions (Section 2: Short)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_short_id, 'ما الحكمة من مشروعية اللعان؟', 'short_answer', 'حفظ الأعراض والأنساب', 19),
    (v_exam_id, v_sec_short_id, 'الطهارة شرط لصحة الصلاة (نوع الحكم)', 'short_answer', 'هذا حكم وضعي', 20),
    (v_exam_id, v_sec_short_id, 'لا تصح الصلاة بدون وضوء (نوع الحكم)', 'short_answer', 'هذا حكم تكليفي', 21),
    (v_exam_id, v_sec_short_id, 'معنى كلمة أغصان (في سياق الذبيحة)', 'short_answer', 'ملتوية القرنين', 22),
    (v_exam_id, v_sec_short_id, 'الاعتراف بالفضل من سمات:', 'short_answer', 'الأخوة الصادقة', 23),
    (v_exam_id, v_sec_short_id, 'مقدار الوصية الجائزة شرعاً', 'short_answer', 'الثلث', 24),
    (v_exam_id, v_sec_short_id, 'من شروط المفسر لكتاب الله أن يكون:', 'short_answer', 'سليم العقيدة', 25),
    (v_exam_id, v_sec_short_id, 'أمر الإسلام المحافظة على (سياق البيئة):', 'short_answer', 'الموارد الطبيعية', 26);

    -- 5. Insert Questions (Section 3: Completion)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_comp_id, 'أكمل الآية: إن الله كان...', 'short_answer', 'عفوا شكورا', 27),
    (v_exam_id, v_sec_comp_id, 'أكمل الحديث: من رأى منكم منكرا...', 'short_answer', 'فليغيره بيده', 28);

    -- 6. Insert Questions (Section 4: Analysis)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_essay_id, 'وضح كيف يؤثر الإيمان في حياة الفرد', 'essay', 'الإيمان يجعل الإنسان مستقيم السلوك مطمئن النفس ويقوي علاقته بالله تعالى ويبعده عن المعاصي.', 29),
    (v_exam_id, v_sec_essay_id, 'دلل على تحريف الإنجيل', 'essay', 'من الأدلة اختلاف النسخ وكثرة التناقضات واعتراف بعض العلماء بتحريفه.', 30),
    (v_exam_id, v_sec_essay_id, 'اذكر المذاهب الأربعة حسب التسلسل التاريخي', 'essay', 'المذهب الحنفي ثم المالكي ثم الشافعي ثم الحنبلي.', 31);

    -- 7. Insert Questions (Section 5: Tajwid)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_tajwid_id, 'نوع المد في كلمة: آياتنا', 'short_answer', 'مد بدل', 32),
    (v_exam_id, v_sec_tajwid_id, 'نوع المد في كلمة: إسرائيل', 'short_answer', 'مد طبيعي', 33),
    (v_exam_id, v_sec_tajwid_id, 'نوع المد في كلمة: إنه', 'short_answer', 'مد طبيعي', 34),
    (v_exam_id, v_sec_tajwid_id, 'نوع المد في كلمة: وكيلا', 'short_answer', 'مد طبيعي', 35);

    -- 8. Insert Questions (Section 6: Definitions)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_defs_id, 'عقوبة مقدرة شرعا تقوم على معاقبة الجاني المتعمد بمثل ما فعل', 'short_answer', 'القصاص', 36),
    (v_exam_id, v_sec_defs_id, 'عبارة موجزة تتضمن أحكاما تشريعية عامة', 'short_answer', 'القواعد الفقهية', 37),
    (v_exam_id, v_sec_defs_id, 'إطالة الصوت بحرف من حروف المد الثلاثة', 'short_answer', 'المد', 38),
    (v_exam_id, v_sec_defs_id, 'دين النصارى الذين يزعمون أنهم أتباع المسيح', 'short_answer', 'النصرانية', 39),
    (v_exam_id, v_sec_defs_id, 'تمليك مضاف إلى ما بعد الموت بطريق التبرع', 'short_answer', 'الوصية', 40),
    (v_exam_id, v_sec_defs_id, 'العلم الذي يعرف به فهم كتاب الله', 'short_answer', 'علم التفسير', 41),
    (v_exam_id, v_sec_defs_id, 'خطاب الله المتعلق بأفعال المكلفين', 'short_answer', 'الحكم الشرعي', 42),
    (v_exam_id, v_sec_defs_id, 'قيام الداعية المؤهل بإيصال دين الإسلام', 'short_answer', 'الدعوة', 43),
    (v_exam_id, v_sec_defs_id, 'كل ما أمر به الشارع واستحسنه العقل', 'short_answer', 'المعروف', 44),
    (v_exam_id, v_sec_defs_id, 'ما نزل القرآن في شأنه وقت وقوعه', 'short_answer', 'أسباب النزول', 45);

END $$;
