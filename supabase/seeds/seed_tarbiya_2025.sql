-- Islamic Studies National Exam 2025 Seeding Script (Arabic)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_mcq_id UUID := gen_random_uuid();
    v_sec_part2_id UUID := gen_random_uuid();
    v_sec_diya_id UUID := gen_random_uuid();
    v_sec_essay_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Islamic Studies National Exam 2025', 'islamic_studies', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_mcq_id, v_exam_id, 'الاختيار من متعدد (Multiple Choice)', 40, 1),
    (v_sec_part2_id, v_exam_id, 'القسم الثاني (Part 2)', 30, 2),
    (v_sec_diya_id, v_exam_id, 'الدية (Blood Money)', 10, 3),
    (v_sec_essay_id, v_exam_id, 'المقال (Essay Questions)', 20, 4);

    -- 3. Insert Questions (Section 1: MCQ - formatted as short_answer)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_mcq_id, 'عدة المرأة التي مات عنها زوجها', 'short_answer', 'أربعة أشهر وعشرا', 1),
    (v_exam_id, v_sec_mcq_id, 'الكون يشمل', 'short_answer', 'الناس', 2),
    (v_exam_id, v_sec_mcq_id, 'الطلاق الواقع بطلقة واحدة هو', 'short_answer', 'السني', 3),
    (v_exam_id, v_sec_mcq_id, 'أول مذهب فقهي', 'short_answer', 'الحنفي', 4),
    (v_exam_id, v_sec_mcq_id, 'من صفات حامل القرآن', 'short_answer', 'التهجد ليلا', 5),
    (v_exam_id, v_sec_mcq_id, 'من مؤلفات أحمد بن حنبل', 'short_answer', 'المسند', 6),
    (v_exam_id, v_sec_mcq_id, 'عدد أبواب الجنة', 'short_answer', 'ثمانية', 7),
    (v_exam_id, v_sec_mcq_id, 'من نتائج المعصية', 'short_answer', 'الهلاك', 8),
    (v_exam_id, v_sec_mcq_id, 'من صور النفاق الاعتقادي', 'short_answer', 'تكذيب القرآن', 9),
    (v_exam_id, v_sec_mcq_id, 'ينقسم الحديث إلى', 'short_answer', 'المتواتر والآحاد', 10),
    (v_exam_id, v_sec_mcq_id, 'علم الفقه من العلوم', 'short_answer', 'الفقهية', 11),
    (v_exam_id, v_sec_mcq_id, 'من آداب المشتري', 'short_answer', 'إقالة النادم', 12),
    (v_exam_id, v_sec_mcq_id, 'المد في كلمة هؤلاء', 'short_answer', 'البدل', 13),
    (v_exam_id, v_sec_mcq_id, 'الكتاب المنزل على عيسى عليه السلام', 'short_answer', 'الإنجيل', 14),
    (v_exam_id, v_sec_mcq_id, 'الحكم الأصلي للزواج', 'short_answer', 'الاستحباب', 15),
    (v_exam_id, v_sec_mcq_id, 'السورة التي تسمى قلب القرآن', 'short_answer', 'سورة يس', 16),
    (v_exam_id, v_sec_mcq_id, 'علم التوحيد يسمى', 'short_answer', 'العقيدة', 17),
    (v_exam_id, v_sec_mcq_id, 'المقصود بكلمة عضباء', 'short_answer', 'مقطوعة القرنين', 18),
    (v_exam_id, v_sec_mcq_id, 'الحيض مانع ووجوبه حكم', 'short_answer', 'وضعي', 19),
    (v_exam_id, v_sec_mcq_id, 'حكم الدعوة إلى الله تعالى', 'short_answer', 'فرض كفاية', 20),
    (v_exam_id, v_sec_mcq_id, 'معنى الاستواء', 'short_answer', 'العلو', 21),
    (v_exam_id, v_sec_mcq_id, 'دية أصبع واحد من أصابع اليدين', 'short_answer', 'عشر الدية', 22),
    (v_exam_id, v_sec_mcq_id, 'الشورى من أسس', 'short_answer', 'الخلافة', 23),
    (v_exam_id, v_sec_mcq_id, 'الطلاق بالكناية يسمى', 'short_answer', 'الكناية', 24),
    (v_exam_id, v_sec_mcq_id, 'من أمثلة أفعال الأمر', 'short_answer', 'أطعموني', 25),
    (v_exam_id, v_sec_mcq_id, 'من أسباب حصول الشفاعة كثرة', 'short_answer', 'قراءة القرآن', 26),
    (v_exam_id, v_sec_mcq_id, 'للزوجة عند عدم الولد', 'short_answer', 'الربع', 27),
    (v_exam_id, v_sec_mcq_id, 'الإنفاق من أنواع', 'short_answer', 'العبادة', 28),
    (v_exam_id, v_sec_mcq_id, 'حكم السحر في الشريعة الإسلامية', 'short_answer', 'كفر', 29),
    (v_exam_id, v_sec_mcq_id, 'المقصود بالحرابة هو', 'short_answer', 'قطع الطريق', 30),
    (v_exam_id, v_sec_mcq_id, 'الكتاب المنزل على موسى عليه السلام', 'short_answer', 'التوراة', 31),
    (v_exam_id, v_sec_mcq_id, 'القرآن الذي نزل بمكة يسمى', 'short_answer', 'المكي', 32),
    (v_exam_id, v_sec_mcq_id, 'زكاة الإبل من خمس إلى تسع', 'short_answer', 'شاة', 33),
    (v_exam_id, v_sec_mcq_id, 'الفروض المقدرة في الميراث هي', 'short_answer', 'ستة', 34),
    (v_exam_id, v_sec_mcq_id, 'من شروط خيار العيب', 'short_answer', 'أن يكون العيب قديما', 35),
    (v_exam_id, v_sec_mcq_id, 'من أشهر الحج', 'short_answer', 'شوال', 36),
    (v_exam_id, v_sec_mcq_id, 'التسبيح معناه', 'short_answer', 'تمجيد الله', 37),
    (v_exam_id, v_sec_mcq_id, 'وقعت صلح الحديبية في السنة', 'short_answer', 'السادسة للهجرة', 38),
    (v_exam_id, v_sec_mcq_id, 'الإيمان بالكتب ركن من أركان', 'short_answer', 'الإيمان', 39),
    (v_exam_id, v_sec_mcq_id, 'حكم التوبة من الذنب', 'short_answer', 'واجب', 40);

    -- 4. Insert Questions (Section 2: Part 2)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_part2_id, 'نصاب الغنم من 40 إلى 120', 'short_answer', 'شاة واحدة', 41),
    (v_exam_id, v_sec_part2_id, 'نصاب الإبل من 5 إلى 9', 'short_answer', 'شاة واحدة', 42),
    (v_exam_id, v_sec_part2_id, 'نصاب البقر من 30 إلى 39', 'short_answer', 'تبيع أو تبيعة', 43),
    (v_exam_id, v_sec_part2_id, 'قال تعالى: وهو الغفور الودود', 'short_answer', 'سورة البروج', 44),
    (v_exam_id, v_sec_part2_id, 'قال تعالى: الآن وقد عصيت قبل', 'short_answer', 'سورة يونس', 45),
    (v_exam_id, v_sec_part2_id, 'قال تعالى: قد جاءكم من الله نور', 'short_answer', 'سورة المائدة', 46),
    (v_exam_id, v_sec_part2_id, 'قال تعالى: وإذ قال إبراهيم لأبيه آزر', 'short_answer', 'سورة الأنعام', 47);

    -- 5. Insert Questions (Section 3: Diya)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_diya_id, 'دية عين واحدة', 'short_answer', 'نصف الدية', 48),
    (v_exam_id, v_sec_diya_id, 'دية خمسة أسنان', 'short_answer', 'خمس الدية', 49),
    (v_exam_id, v_sec_diya_id, 'دية أصابع اليدين', 'short_answer', 'الدية كاملة', 50);

    -- 6. Insert Questions (Section 4: Essay)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_essay_id, 'حقوق المرأة في الإسلام', 'essay', 'أعطى الإسلام المرأة حقوقا عظيمة مثل حق التعليم والعمل والميراث واختيار الزوج، كما أمر بحسن معاملتها وصيانتها.', 51),
    (v_exam_id, v_sec_essay_id, 'أنواع المواقيت', 'essay', 'المواقيت نوعان: زمانية وهي أشهر الحج، ومكانية وهي الأماكن التي يحرم منها الحجاج والمعتمرون.', 52),
    (v_exam_id, v_sec_essay_id, 'مراتب النفوس', 'essay', 'مراتب النفوس هي: النفس الأمارة بالسوء، والنفس اللوامة، والنفس المطمئنة.', 53);

END $$;
