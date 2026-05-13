-- Islamic Studies National Exam 2020 Seeding Script (Arabic)
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_quran_id UUID := gen_random_uuid();
    v_sec_tawhid_id UUID := gen_random_uuid();
    v_sec_hadith_id UUID := gen_random_uuid();
    v_sec_fiqh_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Islamic Studies National Exam 2020', 'islamic_studies', 'form4', 2020, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_quran_id, v_exam_id, 'القرآن والتفسير (Quran & Tafsir)', 40, 1),
    (v_sec_tawhid_id, v_exam_id, 'التوحيد (Tawhid)', 20, 2),
    (v_sec_hadith_id, v_exam_id, 'الحديث (Hadith)', 20, 3),
    (v_sec_fiqh_id, v_exam_id, 'الفقه (Fiqh)', 20, 4);

    -- 3. Insert Questions (Section 1: Quran & Tafsir)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_quran_id, 'أكمل من قوله تعالى: إن الذين كفروا سواء عليهم...', 'short_answer', 'أأنذرتهم أم لم تنذرهم لا يؤمنون ختم الله على قلوبهم وعلى سمعهم وعلى أبصارهم غشاوة ولهم عذاب عظيم', 1),
    (v_exam_id, v_sec_quran_id, 'معنى كلمة: يستحيي الله (في سياق ضرب المثل)', 'short_answer', 'لا يترك', 2),
    (v_exam_id, v_sec_quran_id, 'معنى قوله تعالى: إن الله يأمر بالعدل', 'short_answer', 'الإنصاف', 3),
    (v_exam_id, v_sec_quran_id, 'معنى قوله تعالى: ولي حميم', 'short_answer', 'قريب', 4),
    (v_exam_id, v_sec_quran_id, 'معنى قوله تعالى: لا تفسدوا', 'short_answer', 'لا تخربوا', 5),
    (v_exam_id, v_sec_quran_id, 'معنى قوله تعالى: وقضى ربك', 'short_answer', 'أمر', 6),
    (v_exam_id, v_sec_quran_id, 'معنى قوله تعالى: لا خير في كثير من نجواهم', 'short_answer', 'حديثهم السري', 7);

    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_quran_id, 'سبب نزول الآيات الأربع من صدر سورة المجادلة:', 'mcq', 'قصة خولة بنت ثعلبة مع زوجها', 'قصة عثمان بن عفان', 'قصة عائشة مع الرسول', 'قصة فاطمة', 'أ', 8),
    (v_exam_id, v_sec_quran_id, 'الردة تكون في:', 'mcq', 'الخوف', 'الرغبة', 'الفقر', 'الغنى', 'أ', 9),
    (v_exam_id, v_sec_quran_id, 'المراد بثاني اثنين في الغار هو:', 'mcq', 'أبو بكر الصديق', 'عمر بن الخطاب', 'عثمان بن عفان', 'علي بن أبي طالب', 'أ', 10),
    (v_exam_id, v_sec_quran_id, 'سورة (إلهي) وردت في سورة:', 'mcq', 'الفرقان', 'العنكبوت', 'الأحزاب', 'فاطر', 'ب', 11),
    (v_exam_id, v_sec_quran_id, 'تكليم الله لأنبيائه بطرق يسمى:', 'mcq', 'التفسير', 'الإلهام', 'الوحي', 'القرآن', 'ج', 12),
    (v_exam_id, v_sec_quran_id, 'الفحشاء في قوله تعالى (ينهى عن الفحشاء) مكونة من:', 'mcq', 'الزنا فقط', 'الشرك والزنا', 'قتل النفس', 'القول القبيح والزنا', 'د', 13);

    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_quran_id, 'معنى قوله تعالى: نضجت جلودهم', 'short_answer', 'احترقت', 14),
    (v_exam_id, v_sec_quran_id, 'معنى ميثاق الله وعهده في سورة النحل', 'short_answer', 'أوفوا بعهد الله', 15),
    (v_exam_id, v_sec_quran_id, 'معنى: أفئدتهم هواء', 'short_answer', 'قلوبهم خاوية خالية', 16),
    (v_exam_id, v_sec_quran_id, 'معنى: وأنيبوا إلى ربكم', 'short_answer', 'ارجعوا وتوبوا إلى ربكم', 17),
    (v_exam_id, v_sec_quran_id, 'معنى: ولا تنهرهما', 'short_answer', 'ولا تزجرهما', 18),
    (v_exam_id, v_sec_quran_id, 'ما يستوي الأعمى والبصير (المقصود بهما)', 'short_answer', 'الكافر والمؤمن', 19),
    (v_exam_id, v_sec_quran_id, 'أتل ما حرم ربكم عليكم (المعنى)', 'short_answer', 'اقرأ الآيات المبينات ما حرمه الله', 20),
    (v_exam_id, v_sec_quran_id, 'ما هي الآية التي تدل على ذم المبذرين؟', 'short_answer', 'إن المبذرين كانوا إخوان الشياطين', 21),
    (v_exam_id, v_sec_quran_id, 'ما أهمية اتجاه الأمة الإسلامية إلى قبلة واحدة عند الصلاة؟', 'short_answer', 'تحقيق الوحدة والاتحاد بين المسلمين', 22),
    (v_exam_id, v_sec_quran_id, 'ما حكمة طاعة أولي الأمر؟', 'short_answer', 'لحفظ النظام واستقرار المجتمع', 23);

    -- 4. Insert Questions (Section 2: Tawhid)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_tawhid_id, 'تصديق بالقلب وإقرار باللسان وعمل بالجوارح يزيد وينقص', 'short_answer', 'الإيمان', 24),
    (v_exam_id, v_sec_tawhid_id, 'من أركان الإيمان (المتعلق بتقدير الله)', 'short_answer', 'الإيمان بالقدر', 25),
    (v_exam_id, v_sec_tawhid_id, 'أول من أحدث الشرك والانحراف في العقيدة هم:', 'short_answer', 'قوم نوح', 26),
    (v_exam_id, v_sec_tawhid_id, 'هم الملائكة الموكلون بحفظ عمل العبد:', 'short_answer', 'الحفظة', 27),
    (v_exam_id, v_sec_tawhid_id, 'هم أفضل أمة:', 'short_answer', 'الصحابة', 28),
    (v_exam_id, v_sec_tawhid_id, 'هو عدم قبول الحق واحتقار الناس:', 'short_answer', 'الكبر', 29),
    (v_exam_id, v_sec_tawhid_id, 'هو أسلم الأقوال عند حدوث نعمة:', 'short_answer', 'ما شاء الله وحده', 30),
    (v_exam_id, v_sec_tawhid_id, 'من علامات الساعة الكبرى:', 'short_answer', 'الدخان', 31),
    (v_exam_id, v_sec_tawhid_id, 'لغة مأخوذة من العقد وهو ربط الشيء:', 'short_answer', 'العقيدة', 32),
    (v_exam_id, v_sec_tawhid_id, 'في أسفل السافلين تقع:', 'short_answer', 'النار', 33),
    (v_exam_id, v_sec_tawhid_id, 'اذكر الاستعمال المحمود لكلمة (لو)', 'short_answer', 'لو أني فعلت كذا لكان كذا (في سياق الخير والتمني المباح)', 34),
    (v_exam_id, v_sec_tawhid_id, 'كم عدد شعب الإيمان مع ذكر أفضلها؟', 'short_answer', 'بضع وسبعون شعبة وأفضلها قول لا إله إلا الله', 35),
    (v_exam_id, v_sec_tawhid_id, 'ما الفرق بين النبي والرسول؟', 'short_answer', 'الرسول أوحي إليه بشرع وأمر بتبليغه أما النبي فأوحي إليه ولم يؤمر بالتبليغ', 36),
    (v_exam_id, v_sec_tawhid_id, 'الإيمان بالكتب يتضمن أربعة أمور اذكرها:', 'short_answer', 'الإيمان بأنها منزلة من الله والإيمان بما علمنا اسمه منها وتصديق أخبارها والعمل بما لم ينسخ منها', 37),
    (v_exam_id, v_sec_tawhid_id, 'ما مصادر العقيدة الإسلامية؟', 'short_answer', 'القرآن الكريم والسنة النبوية', 38);

    -- 5. Insert Questions (Section 3: Hadith)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_hadith_id, 'الحديث الذي رواه البخاري ومسلم يسمى:', 'short_answer', 'متفق عليه', 39),
    (v_exam_id, v_sec_hadith_id, 'الحديث الذي رواه أصحاب السنن الأربعة يسمى:', 'short_answer', 'رواه أهل السنن الأربعة', 40),
    (v_exam_id, v_sec_hadith_id, 'عرف الحديث لغة واصطلاحا', 'short_answer', 'لغة الجديد واصطلاحا ما أضيف إلى النبي صلى الله عليه وسلم من قول أو فعل أو تقرير', 41),
    (v_exam_id, v_sec_hadith_id, 'اذكر أقسام الحديث من جهة السند', 'short_answer', 'المتواتر والآحاد', 42),
    (v_exam_id, v_sec_hadith_id, 'ما الفرق بين المرفوع الصريح والمرفوع الحكمي؟', 'short_answer', 'الصريح ما أضيف مباشرة للنبي والحكمي ما له حكم الرفع دون تصريح', 43),
    (v_exam_id, v_sec_hadith_id, 'للصبر أنواع اذكرها', 'short_answer', 'الصبر على الطاعة والصبر عن المعصية والصبر على البلاء', 44),
    (v_exam_id, v_sec_hadith_id, 'كيف عامل النبي بني النضير بعد نقضهم العهد؟', 'short_answer', 'أجلاهم من المدينة', 45),
    (v_exam_id, v_sec_hadith_id, 'على ماذا يدل الحديث الحث على السماحة؟', 'short_answer', 'يدل على فضل التسامح وحسن المعاملة في البيع والشراء', 46);

    -- 6. Insert Questions (Section 4: Fiqh)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_fiqh_id, 'مصارف الفيء خمسة اذكر واحدا منها:', 'short_answer', 'الفقراء والمساكين', 47),
    (v_exam_id, v_sec_fiqh_id, 'دية الرجل المسلم من الإبل هي:', 'short_answer', 'مائة من الإبل', 48),
    (v_exam_id, v_sec_fiqh_id, 'هو حل عقد الزواج بين الزوجين بلفظ مخصوص:', 'short_answer', 'الطلاق', 49),
    (v_exam_id, v_sec_fiqh_id, 'أنواع الشركة ثلاثة اذكر واحدا منها:', 'short_answer', 'شركة العنان', 50),
    (v_exam_id, v_sec_fiqh_id, 'عرف الفقه اصطلاحا', 'short_answer', 'العلم بالأحكام الشرعية العملية المكتسبة من أدلتها التفصيلية', 51),
    (v_exam_id, v_sec_fiqh_id, 'ما حكم زكاة الفطر مع الدليل؟', 'short_answer', 'واجبة لحديث فرض رسول الله صلى الله عليه وسلم زكاة الفطر', 52),
    (v_exam_id, v_sec_fiqh_id, 'ما هي شروط وجوب حد الزنا؟', 'short_answer', 'البلوغ والعقل والاختيار وثبوت الجريمة', 53),
    (v_exam_id, v_sec_fiqh_id, 'باع رجل مائة صاع شعير بمائة صاع شعير مؤجلة. ما نوع الربا؟', 'short_answer', 'ربا النسيئة', 54),
    (v_exam_id, v_sec_fiqh_id, 'اشترى رجل بضاعة موصوفة في الذمة على أن يتسلمها بعد شهرين ولم يدفع الثمن إلا عند الاستلام. بين حكم المعاملة.', 'short_answer', 'لا يجوز لأنه بيع سلم ويشترط دفع الثمن كاملا عند العقد', 55);

END $$;
