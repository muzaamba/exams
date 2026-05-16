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
  "year": 2021,
  "title": "Islamic Studies Grade 8 Exam 2021",
  "sections": [
    {
      "name": "Quran and Tajweed",
      "questions": [
        { "id": 1, "question": "معنى سورة المزمل", "answer": "المتلفف بالثوب" },
        { "id": 2, "question": "صلاة الليل أفضل من", "answer": "صلاة النهار" },
        { "id": 3, "question": "السمع يعين على", "answer": "ضبط الجوارح والكتمان" },
        { "id": 4, "question": "من حروف أقصى الحلق", "answer": "الهمزة والهاء" },
        { "id": 5, "question": "سميت سورة الجن بهذا الاسم لأنها", "answer": "ذكرت فيها الجن" },
        { "id": 6, "question": "الصراط هو جسر أدق من", "answer": "الشعرة" }
      ]
    },
    {
      "name": "Aqeedah and Belief",
      "questions": [
        { "id": 7, "question": "اليوم الآخر من أسمائه", "answer": "يوم الدين" },
        { "id": 8, "question": "البرزخ هو الفترة بين", "answer": "الدنيا والآخرة" },
        { "id": 9, "question": "من علامات الإيمان", "answer": "زيادة الإيمان" },
        { "id": 10, "question": "راوي حديث", "answer": "عبد الرحمن بن عوف" }
      ]
    },
    {
      "name": "Fiqh and Sharia",
      "questions": [
        { "id": 11, "question": "الزكاة لغة تعني", "answer": "النماء والزيادة" },
        { "id": 12, "question": "تجب الزكاة في", "answer": "الأموال والأنعام والذهب والفضة" },
        { "id": 13, "question": "تبدأ أشواط الطواف من", "answer": "الحجر الأسود" },
        { "id": 14, "question": "من شروط الزكاة", "answer": "الملك التام وبلوغ النصاب" }
      ]
    },
    {
      "name": "Seerah",
      "questions": [
        { "id": 15, "question": "صلح الحديبية وقع في", "answer": "السنة السادسة للهجرة" },
        { "id": 16, "question": "نتيجة صلح الحديبية", "answer": "انتشار الإسلام" },
        { "id": 17, "question": "فتح مكة كان إيذانًا بـ", "answer": "إعلاء دين الإسلام" }
      ]
    },
    {
      "name": "General Knowledge",
      "questions": [
        { "id": 18, "question": "النماء والزيادة تعني", "answer": "الزكاة" },
        { "id": 19, "question": "الذين دخلوا في الإسلام", "answer": "المسلمون" },
        { "id": 20, "question": "تجب الزكاة في", "answer": "الأموال" }
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
