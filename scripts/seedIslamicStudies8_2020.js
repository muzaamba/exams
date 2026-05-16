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
  "subject": "islamic_studies",
  "grade": "grade8",
  "year": 2020,
  "title": "Islamic Studies Grade 8 Exam 2020",
  "sections": [
    {
      "name": "Tafsir",
      "questions": [
        { "id": 1, "question": "ما يستفاد من سورة المزمل", "answer": "قيام الليل أفضل من صلاة النهار" },
        { "id": 2, "question": "سورة المزمل تحث على", "answer": "قيام الليل" },
        { "id": 3, "question": "إن في الآخرة ...", "answer": "العقاب والثواب" },
        { "id": 4, "question": "الله سيعاقب على", "answer": "الذنوب والمعاصي" },
        { "id": 5, "question": "أهوال القيامة يشيب", "answer": "الصغار والكبار" },
        { "id": 6, "question": "الراحة مقابل", "answer": "التعب والإرهاق" },
        { "id": 7, "question": "من مظاهر الكون", "answer": "السماء والأرض والمياه" }
      ]
    },
    {
      "name": "Hadith",
      "questions": [
        { "id": 8, "question": "راوي حديث صلة الرحم", "answer": "عبد الرحمن بن عوف" },
        { "id": 9, "question": "صلة الرحم من أخلاق", "answer": "الإيمان" },
        { "id": 10, "question": "مظاهر قطيعة الرحم", "answer": "ضعف الإيمان" },
        { "id": 11, "question": "صلة الرحم سببها", "answer": "البركة وزيادة الرزق" },
        { "id": 12, "question": "معنى الرحم", "answer": "الأقرباء" },
        { "id": 13, "question": "سبب قطيعة الرحم", "answer": "التكبر على الأقارب" },
        { "id": 14, "question": "آثار صلة الرحم", "answer": "دخول الجنة وزيادة المحبة" }
      ]
    },
    {
      "name": "Tawhid",
      "questions": [
        { "id": 15, "question": "الأمانة هي", "answer": "حفظ الأسرار" },
        { "id": 16, "question": "مجتمع فيه أمانة هو", "answer": "مجتمع مهذب" },
        { "id": 17, "question": "الإنسان الأمين هو", "answer": "صادق" },
        { "id": 18, "question": "العصبية هي", "answer": "التعصب للقبيلة" },
        { "id": 19, "question": "التعاون على البر معروف بأنه", "answer": "ممدوح" },
        { "id": 20, "question": "التعصب أساسه", "answer": "الجهل" },
        { "id": 21, "question": "من أضرار التعصب", "answer": "تفكك المجتمع" }
      ]
    },
    {
      "name": "Fiqh",
      "questions": [
        { "id": 22, "question": "الزكاة لغة", "answer": "النماء والطهارة" },
        { "id": 23, "question": "لا تجب الزكاة على", "answer": "الكافر" },
        { "id": 24, "question": "هدف الزكاة", "answer": "مساعدة الفقراء" },
        { "id": 25, "question": "من شروط الزكاة", "answer": "النصاب (ربع العشر)" },
        { "id": 26, "question": "الصيام شرعاً", "answer": "الإمساك عن الطعام من الفجر إلى غروب الشمس" },
        { "id": 27, "question": "من شروط وجوب الصيام", "answer": "الإسلام والبلوغ والعقل" },
        { "id": 28, "question": "لا يجب الصيام إلا على", "answer": "البالغ" }
      ]
    },
    {
      "name": "Sirah",
      "questions": [
        { "id": 29, "question": "مدة هدنة الحديبية", "answer": "عشر سنوات" },
        { "id": 30, "question": "وقعت فتح مكة في", "answer": "السنة الثامنة للهجرة" },
        { "id": 31, "question": "بنود صلح الحديبية", "answer": "الأمن ووقف القتال بين المسلمين وقريش" }
      ]
    }
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

  let totalQuestions = 0;

  for (let i = 0; i < examData.sections.length; i++) {
    const sec = examData.sections[i];
    console.log(`Processing section: ${sec.name}`);

    const { data: section, error: secErr } = await supabase.from('sections').insert({
      exam_id: examId,
      section_name: sec.name,
      sort_order: i + 1
    }).select('id').single();

    if (secErr) {
      console.error('Error inserting section', sec.name, secErr.message);
    }

    const sectionId = section?.id;
    const questionsToInsert = sec.questions.map((q) => {
      totalQuestions++;
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: q.id || totalQuestions,
        question_type: 'short_answer',
        topic: sec.name,
        question_text: q.question,
        correct_answer: null,
        explanation: q.answer,
        difficulty: 'medium'
      };
    });

    const { error: qErr } = await supabase.from('questions').insert(questionsToInsert);
    if (qErr) {
      console.error(`Failed to insert questions for ${sec.name}:`, qErr.message);
    } else {
      console.log(`Successfully inserted ${questionsToInsert.length} questions for ${sec.name}.`);
    }
  }

  console.log('Seeding completed! Total questions processed:', totalQuestions);
}

seed().catch(console.error);
