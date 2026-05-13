-- Arabic National Exam 2022 Seeding Script
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
    VALUES (v_exam_id, 'Arabic National Exam 2022', 'arabic', 'form4', 2022, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec1_id, v_exam_id, 'القسم الأول: ضع دائرة حول حرف الإجابة الصحيحة', 40, 1),
    (v_sec2_id, v_exam_id, 'القسم الثاني: صل العبارات', 20, 2),
    (v_sec3_id, v_exam_id, 'القسم الثالث: الأسئلة', 20, 3),
    (v_sec4_id, v_exam_id, 'القطعة والفهم', 10, 4),
    (v_sec5_id, v_exam_id, 'التعبير', 10, 5);

    -- 3. Insert Questions (Section 1 - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec1_id, 'عصر النهضة والعصر الحديث اسمان لمسمى واحد، وهو آخر العصور:', 'mcq', 'الأدبية', 'التاريخية', 'القديمة', 'الحديثة', 'a', 1),
    (v_exam_id, v_sec1_id, 'الأدب الرسمي هو الأدب الذي ينتقل إلينا عبر اللغة الفصحى مثل:', 'mcq', 'المسرحيات', 'الدواوين', 'العاميات', 'القصص', 'b', 2),
    (v_exam_id, v_sec1_id, 'من أهداف الشعر الوطني:', 'mcq', 'حث الناس على أن يدافعوا عن أوطانهم ضد الظلم', 'حث الناس على الإسلام', 'حث الناس على الاعتذار', 'حث الناس على العصبية والقبيلة', 'a', 3),
    (v_exam_id, v_sec1_id, 'صاحب قصيدة (قم للمعلم وفه التبجيلا) هو:', 'mcq', 'أحمد محرم', 'أحمد شوقي', 'إيليا أبي ماضي', 'محمود سامي البارودي', 'b', 4),
    (v_exam_id, v_sec1_id, 'من الحروف التي تجر الاسم الكاف ويفيد معنى:', 'mcq', 'التشبيه', 'الاستعلاء', 'المجاوزة', 'الابتداء', 'a', 5),
    (v_exam_id, v_sec1_id, 'العدل يوفر للجميع:', 'mcq', 'الخوف', 'القلق', 'الفزع', 'الطمأنينة', 'd', 6),
    (v_exam_id, v_sec1_id, 'قال تعالى: (واجعل لي لسان صدق في الآخرين) المجاز في الآية هو:', 'mcq', 'السببية', 'المسببية', 'الجزئية', 'الكلية', 'a', 7),
    (v_exam_id, v_sec1_id, 'تم تأسيس جامعة الدول العربية في مصر سنة:', 'mcq', '1932م', '1945م', '1935م', '1939م', 'b', 8),
    (v_exam_id, v_sec1_id, 'وإنهضوا من بني الإسلام قاطبة تعني:', 'mcq', 'كافية', 'جميعاً', 'جزئياً', 'قليلاً', 'b', 9),
    (v_exam_id, v_sec1_id, 'مرادف كلمة الحديث:', 'mcq', 'القديم', 'الاندفاع', 'الجديد', 'السريع', 'c', 10),
    (v_exam_id, v_sec1_id, 'من خصائص الرسالة الرسمية:', 'mcq', 'الموضوعية', 'الإيجاز', 'الدقة والوضوح', 'كل ما ذكر', 'd', 11),
    (v_exam_id, v_sec1_id, 'يصاغ اسم الفاعل من الفعل الثلاثي على وزن:', 'mcq', 'فعال', 'مفعول', 'فاعل', 'مفاعلة', 'c', 12),
    (v_exam_id, v_sec1_id, 'ضد كلمة الارتفاع:', 'mcq', 'الانفصال', 'الاتصال', 'الانخفاض', 'الاعتدال', 'c', 13),
    (v_exam_id, v_sec1_id, 'العدل يهدم الأمم والشعوب، في الجملة السابقة:', 'mcq', 'خطأ نحوي', 'خطأ صرفي', 'خطأ في البلاغة', 'خطأ في المعنى', 'd', 14),
    (v_exam_id, v_sec1_id, 'امرأة نقيبة الجيب كناية عن:', 'mcq', 'العفة', 'الخيانة', 'اللبس', 'الخمار', 'a', 15),
    (v_exam_id, v_sec1_id, 'إضاعة الوقت وعدم إدراك الفرد لأهمية الوقت يدل على:', 'mcq', 'الذكاء', 'الحماقة', 'المعرفة', 'الفطنة', 'b', 16),
    (v_exam_id, v_sec1_id, 'النعت:', 'mcq', 'نوعان', 'ثلاثة أنواع', 'أربعة أنواع', 'خمسة أنواع', 'a', 17),
    (v_exam_id, v_sec1_id, 'كلام علي كالعسل يدل على:', 'mcq', 'في اللون', 'في الحلاوة', 'في الطمأنينة', 'في الطبيعة', 'b', 18),
    (v_exam_id, v_sec1_id, 'يا طالباً احذر من كل:', 'mcq', 'المخدرات', 'المعارف', 'المعلومات', 'المحاسن', 'a', 19),
    (v_exam_id, v_sec1_id, 'بيان أو تقرير شخصي موجز عن معلومات شخصية حول تاريخ عمل ومؤهلات شخص، هذا تعريف:', 'mcq', 'التقرير', 'السيرة الذاتية', 'الرسالة الرسمية', 'الرسالة الشخصية', 'b', 20);

    -- 4. Insert Questions (Section 2 - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec2_id, 'صل العبارات: الربط، المعلم، الخطابة، الإيجاز، النثر الأدبي، النثر العادي، العصر العباسي، العصر الحديث', 'short_answer', 'الربط -> بدأ من عام إلى عام؛ المعلم -> يربي الجيل؛ الخطابة -> فن مخاطبة الجماهير؛ الإيجاز -> الابتعاد عن الحشو؛ النثر الأدبي -> كلام جميل؛ النثر العادي -> لغة التخاطب؛ العصر العباسي -> يختلف اتجاه العين؛ العصر الحديث -> بدأ بالحملة الفرنسية', 21);

    -- 5. Insert Questions (Section 3 - Short Answers)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec3_id, 'اذكر أربعة من أهم حروف النداء', 'short_answer', 'يا، أيا، هيا، أي', 22),
    (v_exam_id, v_sec3_id, 'ما هو المكنى عنه في: (أين السبيل)؟', 'short_answer', 'الطريق أو الوسيلة', 23),
    (v_exam_id, v_sec3_id, 'كيف أسهمت حركة إحياء التراث في تطور الأدب العربي الحديث؟', 'short_answer', 'أسهمت بإحياء اللغة العربية والاهتمام بالشعر والنثر وربط الأدب الحديث بالتراث القديم.', 24),
    (v_exam_id, v_sec3_id, 'استخرج أركان التشبيه من المثال: العلم كالنور في الهداية', 'short_answer', 'المشبه: العلم، المشبه_به: النور، الأداة: الكاف، وجه_الشبه: الهداية', 25),
    (v_exam_id, v_sec3_id, 'ما رأيك في الزميل الذي لا يحرص على نظافة جسمه؟', 'short_answer', 'تصرفه غير صحيح لأن النظافة من الإيمان وتحافظ على الصحة.', 26),
    (v_exam_id, v_sec3_id, 'مثل لكل من حروف القسم الآتية: الباء، الواو، التاء', 'short_answer', 'بالله لأجتهدن، والله لأصدقن، تالله لن أنسى فضلك', 27),
    (v_exam_id, v_sec3_id, 'ما مفرد الكلمات: الدواوين، المكتبات، الأطفال، الضيوف', 'short_answer', 'ديوان، مكتبة، طفل، ضيف', 28),
    (v_exam_id, v_sec3_id, 'حول الجموع إلى مفرد: المدن، الجامعات، الكتب، الرجال، المدارس', 'short_answer', 'مدينة، جامعة، كتاب، رجل، مدرسة', 29);

    -- 6. Insert Questions (Section 4 - Comprehension)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec4_id, 'أين كان الرجل؟ ولماذا أرسل ابنه للمدينة؟', 'short_answer', 'كان في البادية؛ أرسله للتعليم.', 30),
    (v_exam_id, v_sec4_id, 'ماذا تعني العبارة: (أن الغدير مملوء)؟', 'short_answer', 'تعني أن إناء السمن ممتلئ.', 31),
    (v_exam_id, v_sec4_id, 'استخرج من القطعة: اسم مكان تجمع الماء، كلمة تدل على كناية، اسمين مجرورين، جمع مؤنث سالم، ضد كثير، جمع مذكر سالم، ضد البادية', 'short_answer', 'الغدير؛ الغدير مملوء؛ إلى المدينة، من اللحم؛ الصلوات؛ قليل؛ المسافرين؛ المدينة', 32),
    (v_exam_id, v_sec4_id, 'كيف عرف الابن أن الطعام مفقود؟ ولماذا اندهش المسافر؟', 'short_answer', 'من الرسالة؛ لذكاء الابن.', 33);

    -- 7. Insert Questions (Section 5 - Essay)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec5_id, 'اكتب عن أحد المواضيع: الهمة العالية، الأمن القبلية، التلوث', 'essay', 'المواضيع تتعلق بالنجاح، الاستقرار، وحماية البيئة.', 34);

END $$;
