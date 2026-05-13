-- Arabic National Exam 2024 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec1_id UUID := gen_random_uuid();
    v_sec2_id UUID := gen_random_uuid();
    v_sec3_id UUID := gen_random_uuid();
    v_sec4_id UUID := gen_random_uuid();
    v_sec5_id UUID := gen_random_uuid();
    v_sec6_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Arabic National Exam 2024', 'arabic', 'form4', 2024, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec1_id, v_exam_id, 'الفهم والاستيعاب', 20, 1),
    (v_sec2_id, v_exam_id, 'الاختيار من متعدد', 30, 2),
    (v_sec3_id, v_exam_id, 'القواعد والمفردات', 20, 3),
    (v_sec4_id, v_exam_id, 'المزاوجة', 10, 4),
    (v_sec5_id, v_exam_id, 'الصرف', 10, 5),
    (v_sec6_id, v_exam_id, 'التعبير', 10, 6);

    -- 3. Insert Questions (Section 1 - Comprehension)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec1_id, 'ما هي الهواية المفضلة؟ وما هواية الطالبة؟', 'short_answer', 'الرسم؛ النحت', 1),
    (v_exam_id, v_sec1_id, 'من رسم علم الصومال؟ وماذا تحتاج إليه النحت؟', 'short_answer', 'محمد عوالي ليبان؛ القوة والتركيز', 2),
    (v_exam_id, v_sec1_id, 'جمع: هواية، أخت. مفرد: الصخور.', 'short_answer', 'هوايات؛ أخوات؛ صخرة', 3),
    (v_exam_id, v_sec1_id, 'معنى قائدة، ضد بعيد، مرادف جدا.', 'short_answer', 'زعيمة؛ قريب؛ كثيرا', 4),
    (v_exam_id, v_sec1_id, 'لفظ توكيد معنوي.', 'short_answer', 'نفس', 5);

    -- 4. Insert Questions (Section 2 - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec2_id, 'الخطابة نوع من:', 'mcq', 'مقالة', 'مسرحية', 'خطابة', 'قصة', 'c', 6),
    (v_exam_id, v_sec2_id, 'الشعر الوطني من أنواع الشعر:', 'mcq', 'وطني', 'السياسي', 'ديني', 'ملحمي', 'a', 7),
    (v_exam_id, v_sec2_id, 'الهلع يعني:', 'mcq', 'شدة الخوف', 'شدة الحب', 'شدة الجوع', 'شدة الرعب', 'd', 8),
    (v_exam_id, v_sec2_id, 'جمع كلمة دولة:', 'mcq', 'دول', 'دولات', 'دولات', 'دويلات', 'a', 9),
    (v_exam_id, v_sec2_id, 'رائد مدرسة الإحياء:', 'mcq', 'حافظ إبراهيم', 'محمود البارودي', 'أحمد شوقي', 'أحمد محرم', 'b', 10),
    (v_exam_id, v_sec2_id, 'المقصود بالكلمة بلا واو:', 'mcq', 'نعت', 'عطف', 'توكيد', 'بدل', 'b', 11),
    (v_exam_id, v_sec2_id, 'الشعر الملحمي يكون:', 'mcq', 'ملحميا', 'دينيا', 'تعليميا', 'سياسيا', 'a', 12),
    (v_exam_id, v_sec2_id, 'أركان التشبيه:', 'mcq', 'الوجه والأداة', 'المشبه والمشبه به', 'المشبه والوجه', 'الأداة والمشبه به', 'b', 13),
    (v_exam_id, v_sec2_id, 'الأسلوب البلاغي في العبارة:', 'mcq', 'قصر', 'استعارة', 'طباق', 'تشبيه', 'b', 14),
    (v_exam_id, v_sec2_id, 'الانتشار عكس:', 'mcq', 'الخطأ', 'ارتفاع', 'انتشار', 'اندلاع', 'd', 15),
    (v_exam_id, v_sec2_id, 'العلاقة البلاغية:', 'mcq', 'سببية', 'كلية', 'جزئية', 'حالية', 'a', 16),
    (v_exam_id, v_sec2_id, 'معنى كلمة الذود:', 'mcq', 'الدفاع', 'الحرب', 'المعركة', 'الإقدام', 'a', 17);

    -- 5. Insert Questions (Section 3 - Grammar)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec3_id, 'أعرب: قالت المديرة بعينه', 'short_answer', 'قالت: فعل ماض، المديرة: فاعل مرفوع', 18),
    (v_exam_id, v_sec3_id, 'أعرب: العربية لسان القرآن', 'short_answer', 'العربية: مبتدأ، لسان: خبر، القرآن: مضاف إليه', 19),
    (v_exam_id, v_sec3_id, 'أعرب: كتبت الدرس على السبورة', 'short_answer', 'كتبت: فعل وفاعل، الدرس: مفعول به، على: حرف جر، السبورة: اسم مجرور', 20),
    (v_exam_id, v_sec3_id, 'جمع الأشجار ومرادف الكفاح ومعنى الوطن', 'short_answer', 'شجرة؛ النضال؛ البلد', 21);

    -- 6. Insert Questions (Section 4 - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec4_id, 'صل: الاستعارة المكنية، أداة التشبيه، السجع، التراث', 'short_answer', 'الاستعارة المكنية -> حذف المشبه به؛ أداة التشبيه -> اسم/فعل/حرف؛ السجع -> تشابه الأواخر؛ التراث -> ما خلفه الأجداد', 22);

    -- 7. Insert Questions (Section 5 - Morphology)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec5_id, 'هات اسم الفاعل والمفعول من: سمح، قرأ، أمر', 'vocabulary', 'سمح: سامح/مسموح؛ قرأ: قارئ/مقروء؛ أمر: آمر/مأمور', 23);

    -- 8. Insert Questions (Section 6 - Essay)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec6_id, 'اكتب عن: أهمية الإخاء في الإسلام، أو مكانة المعلم في المجتمع', 'essay', 'يتناول القيم الإسلامية أو دور التعليم.', 24);

END $$;
