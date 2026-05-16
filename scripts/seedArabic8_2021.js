import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in .env.local');
  process.exit(1);
}

const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

const examData = {
  "subject": "arabic",
  "grade": "grade8",
  "year": 2021,
  "title": "Arabic Grade 8 Exam 2021",
  "questions": [
    { "q": "يصيب مرض البلهارسيا", "options": ["الكبد والرئتين", "الدماغ", "الجهاز الهضمي", "الجهاز العصبي"], "answer": "الجهاز الهضمي" },
    { "q": "ينتشر مرض الملاريا عن طريق", "options": ["الذباب", "الجراد", "البعوض", "الطيور"], "answer": "البعوض" },
    { "q": "غسل الفواكه قبل أكلها", "options": ["شراء", "تقطيع", "غسل", "تكسير"], "answer": "غسل" },
    { "q": "في معظم دول العالم قسم...", "options": ["أغلب", "كثير", "بعض", "قليل"], "answer": "أغلب" },
    { "q": "من أعراض الملاريا الصداع و...", "options": ["الحُمى", "المغص", "الركام", "السعال"], "answer": "الحُمى" },
    { "q": "زيارة المريض حثّ عليها...", "options": ["قبل", "بعد", "قبل وبعد", "لا شيء"], "answer": "قبل" },
    { "q": "الوقاية من الملاريا تكون عبر", "options": ["التوستاريا", "الملاريا", "التيفويد", "البلهارسيا"], "answer": "الملاريا" },
    { "q": "الوقاية خير من...", "options": ["المرض", "العلاج", "الحمية", "الدواء"], "answer": "العلاج" },
    { "q": "يعيش البعوض في المياه...", "options": ["الجارية", "الراكدة", "البحرية", "المالحة"], "answer": "الراكدة" },
    { "q": "مفرد كلمة المستنقعات", "options": ["المستنقع", "مستنقعون", "مستقعات", "مستقع"], "answer": "المستنقع" },
    { "q": "من أعراض مرض البلهارسيا", "options": ["الحمى", "الصداع", "قرحة الدم", "الحكة"], "answer": "الحكة" },
    { "q": "للوقاية من الملاريا علينا", "options": ["تغطية الفواكه", "غسل اليدين", "عدم السباحة", "النوم تحت الناموسية"], "answer": "النوم تحت الناموسية" },
    { "q": "أهم أسباب مرض البلهارسيا", "options": ["الماء الراكد", "الماء النظيف", "الأدوية", "الفواكه"], "answer": "الماء الراكد" },
    { "q": "نهى الإسلام عن التلوث في", "options": ["الهواء", "الأرض", "الماء", "الغابات"], "answer": "الماء" },
    { "q": "من أعراض الدوسنتاريا", "options": ["الحمى", "الصداع", "الإسهال الشديد", "المغص"], "answer": "الإسهال الشديد" },
    { "q": "الملاريا من الأمراض", "options": ["الشائعة", "الوراثية", "المغذية", "النادرة"], "answer": "الشائعة" },
    { "q": "نوع المعطوف في كلمة (البدل والمبدل منه)", "options": ["البدل", "العطف", "المعطوف", "المعطوف عليه"], "answer": "البدل" },
    { "q": "علامة الترقيم المناسبة للقوس", "options": ["الفاصلة", "الغاصلة", "القوسان", "النقطة"], "answer": "القوسان" },
    { "q": "بدل الشيء من الشيء غيره يسمى", "options": ["بدل الكل من الكل", "بدل البعض من الكل", "بدل الاشتمال", "بدل ظرف"], "answer": "بدل الكل من الكل" },
    { "q": "ضد كلمة الأرض", "options": ["السماء", "الكوكب", "الشهب", "الجماد"], "answer": "السماء" },
    { "q": "حرف العطف (أو) يستخدم", "options": ["للجمع", "لتعيين أحد الشيئين", "للتمني", "للإضراب"], "answer": "لتعيين أحد الشيئين" },
    { "q": "المضاف والمضاف إليه هما", "options": ["اسم وحرف", "اسم واسم", "فعل واسم", "فعل وحرف"], "answer": "اسم واسم" },
    { "q": "كلمة (سماء) نوع الألف فيها", "options": ["مقصورة", "ممدودة", "مبسوطة", "مكتوبة"], "answer": "ممدودة" },
    { "q": "ضد كلمة الداخل", "options": ["الخارج", "اليسار", "اليمين", "الأعلى"], "answer": "الخارج" },
    { "q": "الكاتب حضر", "options": ["خالد", "المدير", "الطالب", "المعلم"], "answer": "خالد" },
    { "q": "كلمة (ينجر) معناها", "options": ["يسقط", "يتحرك", "يتأثر", "ينتج"], "answer": "يتأثر" },
    { "q": "المراد بالأحشاء", "options": ["البطن", "القلب", "الجلد", "الدم"], "answer": "البطن" },
    { "q": "كلمة (المغتاب) معناها", "options": ["النمام", "المشاغب", "الغيور", "الصادق"], "answer": "النمام" },
    { "q": "كلمة (العمود الفقري)", "options": ["العصب", "الظهر", "الهيكل", "العظم"], "answer": "الظهر" },
    { "q": "كلمة (انتهى)", "options": ["بدأ", "انكسر", "توقف", "هرب"], "answer": "توقف" }
  ]
};

async function seed() {
  console.log('Starting seed process for', examData.title);

  // Check if exam exists
  const { data: existingExam } = await supabase
    .from('exams')
    .select('id')
    .eq('title', examData.title)
    .single();

  let examId;
  if (existingExam) {
    examId = existingExam.id;
    console.log('Using existing exam ID:', examId);
  } else {
    const { data: newExam, error: examErr } = await supabase.from('exams').insert({
      year: examData.year,
      subject: examData.subject.toLowerCase(),
      title: examData.title,
      grade: examData.grade,
      status: 'published'
    }).select('id').single();

    if (examErr) {
      console.error('Error inserting exam:', examErr);
      return;
    }
    examId = newExam.id;
    console.log('Created new exam with ID:', examId);
  }

  // Create a single section for all MCQs
  const { data: section, error: secErr } = await supabase.from('sections').insert({
    exam_id: examId,
    section_name: "Part One: Multiple Choice Questions (الجزء الأول: اختيار من متعدد)",
    sort_order: 1
  }).select('id').single();

  if (secErr) {
    console.error('Error inserting section:', secErr.message);
  }

  const sectionId = section?.id;
  const questionsToInsert = examData.questions.map((q, index) => {
    const indexAns = q.options.indexOf(q.answer);
    const correctAns = indexAns === 0 ? 'a' : indexAns === 1 ? 'b' : indexAns === 2 ? 'c' : indexAns === 3 ? 'd' : null;

    return {
      exam_id: examId,
      section_id: sectionId,
      question_number: index + 1,
      question_type: 'mcq',
      topic: "Arabic Language",
      question_text: q.q,
      option_a: q.options[0],
      option_b: q.options[1],
      option_c: q.options[2],
      option_d: q.options[3],
      correct_answer: correctAns,
      difficulty: 'medium'
    };
  });

  const { error: qErr } = await supabase.from('questions').insert(questionsToInsert);
  if (qErr) {
    console.error(`Failed to insert questions:`, qErr.message);
  } else {
    console.log(`Successfully inserted ${questionsToInsert.length} questions.`);
  }

  console.log('Seeding completed!');
}

seed().catch(console.error);
