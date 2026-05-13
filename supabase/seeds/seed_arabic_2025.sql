-- Arabic National Exam 2025 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec1_id UUID := gen_random_uuid();
    v_sec2_id UUID := gen_random_uuid();
    v_sec3_id UUID := gen_random_uuid();
    v_sec4_id UUID := gen_random_uuid();
    v_sec5_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Arabic National Exam 2025', 'arabic', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec1_id, v_exam_id, 'الفهم والاستيعاب (اختيار من متعدد)', 40, 1),
    (v_sec2_id, v_exam_id, 'المفردات والتراكيب', 30, 2),
    (v_sec3_id, v_exam_id, 'القسم الثاني: الشعر والبلاغة', 10, 3),
    (v_sec4_id, v_exam_id, 'الصرف (الموازين)', 10, 4),
    (v_sec5_id, v_exam_id, 'التعبير', 10, 5);

    -- 3. Insert Questions (Section 1 - Comprehensive MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec1_id, 'ضد كلمة الكرم:', 'mcq', 'الحقد', 'الحمس', 'الترف', 'البخل', 'd', 1),
    (v_exam_id, v_sec1_id, 'إعراب كلمة تطوع:', 'mcq', 'مفعول به', 'مفعول لأجله', 'مفعول معه', 'مفعول فيه', 'b', 2),
    (v_exam_id, v_sec1_id, 'الأسلوب البلاغي في القطعة:', 'mcq', 'الجناس', 'المقابلة', 'الطباق', 'السجع', 'c', 3),
    (v_exam_id, v_sec1_id, 'مفرد كلمة الأدلة:', 'mcq', 'دليل', 'دليلات', 'دل', 'دلة', 'a', 4),
    (v_exam_id, v_sec1_id, 'مرادف كلمة التعاون:', 'mcq', 'المشاركة', 'التضحية', 'النصيحة', 'المساعدة', 'd', 5),
    (v_exam_id, v_sec1_id, 'اسم الفاعل من الفعل (المعنى الاصطلاحي):', 'mcq', 'اسم الفاعل', 'اسم المفعول', 'صيغة التعجب', 'صيغة المصدر', 'a', 6),
    (v_exam_id, v_sec1_id, 'عكس كلمة مسافر:', 'mcq', 'مقيم', 'مؤقت', 'مواطن', 'راحل', 'a', 7),
    (v_exam_id, v_sec1_id, 'مفرد كلمة دعاة:', 'mcq', 'داعية', 'دعاء', 'دواعي', 'دعوات', 'a', 8),
    (v_exam_id, v_sec1_id, 'كلمة خسائر هي جمع:', 'mcq', 'التكسير', 'المذكر السالم', 'المؤنث السالم', 'القلة', 'a', 9),
    (v_exam_id, v_sec1_id, 'المقصود بالمحن:', 'mcq', 'المظاهر', 'المحن', 'المصاب', 'المسائل', 'c', 10),
    (v_exam_id, v_sec1_id, 'ضد كلمة الغنى:', 'mcq', 'القفر', 'الفقر', 'الحاجة', 'العوز', 'b', 11),
    (v_exam_id, v_sec1_id, 'جمع كلمة رجل:', 'mcq', 'رجالات', 'أجيال', 'رجولات', 'رجال', 'd', 12),
    (v_exam_id, v_sec1_id, 'من أدوات النصب التي وردت في القطعة:', 'mcq', 'كي حتى', 'أن لن', 'فاء السببية', 'واو المعية', 'b', 13),
    (v_exam_id, v_sec1_id, 'ميزان كلمة مساعدة:', 'mcq', 'مفاعلة', 'فاعلة', 'مفاعيل', 'مفعيل', 'a', 14),
    (v_exam_id, v_sec1_id, 'اتفاق أواخر الجمل في الحروف يسمى:', 'mcq', 'مقابلة', 'جناس', 'طباق', 'سجع', 'd', 15),
    (v_exam_id, v_sec1_id, 'نوع الاستعارة التي حذف منها المشبه به:', 'mcq', 'مكنية', 'تصريحية', 'مرشحة', 'مطلقة', 'a', 16),
    (v_exam_id, v_sec1_id, 'الفتاة فاتنة (بلاغياً):', 'mcq', 'استعارة', 'تشبيه', 'كناية', 'مجاز', 'c', 17);

    -- 4. Insert Questions (Section 2 - Vocabulary & Structure)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec2_id, 'مرادف كلمة الجليس، ومعنى كلمة الإملاق، والمقصود بكلمة الظلم.', 'short_answer', 'الصاحب؛ الفقر؛ الاستعمار', 18),
    (v_exam_id, v_sec2_id, 'ضد كلمة ينام، وضد كلمة الغنى.', 'short_answer', 'يستيقظ؛ الفقر', 19),
    (v_exam_id, v_sec2_id, 'جمع كلمة أسجية، ومفرد المنايا.', 'short_answer', 'سجايا؛ منية', 20),
    (v_exam_id, v_sec2_id, 'قائل البيت: فإذا زفت خليقة محمودة.', 'short_answer', 'معروف الرصافي', 21),
    (v_exam_id, v_sec2_id, 'من أسماء الإشارة القريبة، ومن أدوات النداء.', 'short_answer', 'هذا؛ يا', 22);

    -- 5. Insert Questions (Section 3 - Poetry)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec3_id, 'أكمل البيت: قم للمعلم وفه التبجيلا...', 'short_answer', 'كاد المعلم أن يكون رسولا', 23),
    (v_exam_id, v_sec3_id, 'شبه الشاعر البعوضة بـ:', 'short_answer', 'البرق', 24),
    (v_exam_id, v_sec3_id, 'ما نوع القصر في (ما نجح إلا علي)؟', 'short_answer', 'قصر حقيقي (أو إضافي حسب السياق)', 25);

    -- 6. Insert Questions (Section 4 - Morphology)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec4_id, 'زن الكلمات: مسموع، شكور، مقدام.', 'vocabulary', 'مفعول؛ فعول؛ مفعال', 26);

    -- 7. Insert Questions (Section 5 - Essay)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec5_id, 'اكتب عن: العدل في الإسلام، التعليم بين الماضي والحاضر، أو أهمية القراءة.', 'essay', 'يتناول القيم الاجتماعية والتطور الثقافي.', 27);

END $$;
