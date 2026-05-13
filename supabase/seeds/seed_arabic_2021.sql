-- Arabic National Exam 2021 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec1_id UUID := gen_random_uuid();
    v_sec2_id UUID := gen_random_uuid();
    v_sec3_id UUID := gen_random_uuid();
    v_sec4_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Arabic National Exam 2021', 'arabic', 'form4', 2021, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec1_id, v_exam_id, 'ضع دائرة حول رقم الإجابة الصحيحة', 40, 1),
    (v_sec2_id, v_exam_id, 'القسم الثاني', 30, 2),
    (v_sec3_id, v_exam_id, 'المفردات', 15, 3),
    (v_sec4_id, v_exam_id, 'صل العبارات', 15, 4);

    -- 3. Insert Questions (Section 1 - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec1_id, 'ولد الشاعر أحمد شوقي عام:', 'mcq', '1745', '1799', '1780', '1868', 'd', 1),
    (v_exam_id, v_sec1_id, 'قائل قصيدة (اللغة العربية) هو:', 'mcq', 'أحمد شوقي', 'أحمد محرم', 'حافظ إبراهيم', 'محمود غنيم', 'c', 2),
    (v_exam_id, v_sec1_id, 'جمع كلمة (عظم) هو:', 'mcq', 'عظامي', 'أناتي', 'نكي', 'غبي', 'a', 3),
    (v_exam_id, v_sec1_id, 'المحسن البديعي في قولهم (الصدق ينجي والكذب يهلك) هو:', 'mcq', 'البدل', 'العطف', 'الجناس', 'المقابلة', 'd', 4),
    (v_exam_id, v_sec1_id, 'إعراب كلمة (المجتهد) في جملة (نجح الطالب المجتهد) هو:', 'mcq', 'البدل', 'العطف', 'التوكيد', 'النعت', 'd', 5),
    (v_exam_id, v_sec1_id, 'الكلمة الصحيحة إملائياً هي:', 'mcq', 'نافعا', 'محبوبا', 'كتابا', 'قرأات', 'b', 6),
    (v_exam_id, v_sec1_id, 'كلمة (الطلاب) نوع جمعها:', 'mcq', 'جمع مذكر سالم', 'جمع تكسير', 'المثنى', 'جمع مؤنث سالم', 'b', 7),
    (v_exam_id, v_sec1_id, 'الكلمة المرادفة لكلمة (كفاح):', 'mcq', 'سباق', 'فرار', 'نضال', 'نقاش', 'c', 8),
    (v_exam_id, v_sec1_id, 'الضد لكلمة (الظلام):', 'mcq', 'العلم', 'النور', 'الكآبة', 'الهداية', 'b', 9),
    (v_exam_id, v_sec1_id, 'القاهرة هي:', 'mcq', 'جوهر', 'عاصمة', 'الوسطى', 'مدينة', 'b', 10),
    (v_exam_id, v_sec1_id, 'عنوان الموضوع يكتب في:', 'mcq', 'رأس الصفحة', 'وسط الصفحة', 'نهاية الصفحة', 'رأس الصفحة ووسطها', 'd', 11),
    (v_exam_id, v_sec1_id, 'الشعر الوجداني:', 'mcq', 'يدور حول موضوع ديني', 'يرتبط بالمشاعر الإنسانية', 'يحمل مبادئ دينية', 'سهلاً ومفهوماً', 'b', 12),
    (v_exam_id, v_sec1_id, 'الذي يبني ويربي الجيل هو:', 'mcq', 'المهندس', 'المعلم', 'الطبيب', 'الشاعر', 'b', 13),
    (v_exam_id, v_sec1_id, 'في جملة (رأيت أسداً يقاتل) نوع البلاغة:', 'mcq', 'المجاز المرسل', 'المجاز العقلي', 'الاستعارة', 'الكناية', 'c', 14),
    (v_exam_id, v_sec1_id, 'الفواصل القرآنية تشبه:', 'mcq', 'السجع', 'الفواصل', 'الجناس', 'القوافي', 'a', 15),
    (v_exam_id, v_sec1_id, 'اسم المفعول في كلمة (محبوب):', 'mcq', 'ثلاثي', 'رباعي', 'خماسي', 'سداسي', 'a', 16),
    (v_exam_id, v_sec1_id, 'العبارة (الوقت هو الحياة) تدل على:', 'mcq', 'وجود الوقت ضرورة إنسانية', 'أن الوقت هو عماد سير الحياة', 'الوقت شيء في الحياة', 'أن الوقت شيء آخر', 'b', 17),
    (v_exam_id, v_sec1_id, 'الخطأ في الجملة (الطلاب مجتهدونن) هو:', 'mcq', 'خطأ صرفي', 'خطأ نحوي', 'خطأ في المعنى', 'خطأ في البلاغة', 'a', 18),
    (v_exam_id, v_sec1_id, 'الصحة تعني:', 'mcq', 'اسم الشخص', 'صحة الشخص', 'المهارات الشخصية', 'الحياة', 'b', 19);

    -- 4. Insert Questions (Section 2 - Short Answer)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec2_id, 'اذكر أربعة من حروف الجر', 'short_answer', 'من، إلى، عن، على', 20),
    (v_exam_id, v_sec2_id, 'كيف ساهمت الحكمة العربية في النهضة العربية؟', 'short_answer', 'ساهمت في نشر العلم والمعرفة وتطوير الفكر والأدب.', 21),
    (v_exam_id, v_sec2_id, 'ما غرض الشاعر في البيت المذكور؟', 'short_answer', 'الفخر والاعتزاز.', 22),
    (v_exam_id, v_sec2_id, 'عرف القبلية', 'short_answer', 'القبلية هي التعصب للقبيلة وتفضيلها على غيرها دون حق.', 23),
    (v_exam_id, v_sec2_id, 'اذكر مظهرين من مظاهر القبلية', 'short_answer', 'التعصب، والنزاعات بين القبائل.', 24),
    (v_exam_id, v_sec2_id, 'ما موقف الإسلام من القبلية؟', 'short_answer', 'الإسلام يرفض القبلية ويدعو إلى المساواة والأخوة.', 25),
    (v_exam_id, v_sec2_id, 'اجمع الكلمات: فرصة، بيت', 'short_answer', 'فرص، بيوت', 26),
    (v_exam_id, v_sec2_id, 'استخرج اسم مفعول من القطعة', 'short_answer', 'مظلومة', 27),
    (v_exam_id, v_sec2_id, 'هات ضد الكلمات: الردى، العصبية', 'short_answer', 'الحياة، التسامح', 28),
    (v_exam_id, v_sec2_id, 'هات مرادف الكلمات: الخلاف، مظلومة', 'short_answer', 'النزاع، مقهورة', 29),
    (v_exam_id, v_sec2_id, 'لماذا نهى الإسلام عن القبلية؟', 'short_answer', 'لأنها تسبب الفرقة والعداوة بين الناس.', 30),
    (v_exam_id, v_sec2_id, 'استخرج من القطعة حرف عطف', 'short_answer', 'و', 31);

    -- 5. Insert Questions (Section 3 - Vocabulary)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec3_id, 'حول المفردات إلى جمع: ديوان، طفل، منزل، مدينة، مطبعة', 'vocabulary', 'ديوان -> دواوين; طفل -> أطفال; منزل -> منازل; مدينة -> مدن; مطبعة -> مطابع', 32);

    -- 6. Insert Questions (Section 4 - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec4_id, 'صل العبارات (المخدرات، النداء، الشعر السياسي، النثر)', 'short_answer', 'المخدرات -> في العصر الحديث؛ النداء -> توجيه الدعوة؛ الشعر السياسي -> يعتمد على الحقائق؛ النثر -> يختلف عن الشعر', 33);

END $$;
